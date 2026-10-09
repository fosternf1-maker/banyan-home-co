import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  checklists,
  hurricaneDisclaimer,
  shoppingList,
  type Printable,
} from "../lib/hurricane.ts";

const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const MARGIN_X = 54;
const TOP = 742;
const BOTTOM = 54;

type Line = {
  text: string;
  size: number;
  font: "F1" | "F2";
  indent: number;
  box: boolean;
  gap: number;
};

function ascii(value: string) {
  return value
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/[^\x09\x0A\x0D\x20-\x7E]/g, "");
}

function escapePdf(value: string) {
  return ascii(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrap(text: string, size: number, width: number) {
  const max = Math.max(24, Math.floor(width / (size * 0.52)));
  const words = ascii(text).split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > max && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }

  if (current) lines.push(current);
  return lines.length > 0 ? lines : [""];
}

function pushWrapped(
  lines: Line[],
  text: string,
  size: number,
  font: Line["font"],
  width: number,
  gap: number,
) {
  const wrapped = wrap(text, size, width);
  wrapped.forEach((line, index) => {
    lines.push({
      text: line,
      size,
      font,
      indent: 0,
      box: false,
      gap: index === wrapped.length - 1 ? gap : Math.round(size * 1.25),
    });
  });
}

function linesFor(doc: Printable): Line[] {
  const width = PAGE_WIDTH - MARGIN_X * 2;
  const lines: Line[] = [];
  pushWrapped(lines, "Banyan Home Co.", 11, "F2", width, 18);
  pushWrapped(lines, doc.title, 20, "F2", width, 16);
  pushWrapped(lines, doc.dek, 11, "F1", width, 14);
  pushWrapped(lines, hurricaneDisclaimer, 9, "F1", width, 18);

  for (const group of doc.groups) {
    lines.push({
      text: group.title,
      size: 13,
      font: "F2",
      indent: 0,
      box: false,
      gap: 16,
    });
    for (const item of group.items) {
      const wrapped = wrap(item, 11, PAGE_WIDTH - MARGIN_X * 2 - 22);
      wrapped.forEach((text, index) => {
        lines.push({
          text,
          size: 11,
          font: "F1",
          indent: 18,
          box: index === 0,
          gap: 15,
        });
      });
    }
    lines.push({ text: "", size: 11, font: "F1", indent: 0, box: false, gap: 8 });
  }

  lines.push({
    text: "Sources",
    size: 13,
    font: "F2",
    indent: 0,
    box: false,
    gap: 16,
  });

  for (const source of doc.sources) {
    for (const text of wrap(`${source.name} — ${source.href}`, 9, PAGE_WIDTH - MARGIN_X * 2)) {
      lines.push({ text, size: 9, font: "F1", indent: 0, box: false, gap: 12 });
    }
  }

  return lines;
}

function paginate(lines: Line[]) {
  const pages: Line[][] = [];
  let page: Line[] = [];
  let y = TOP;

  for (const line of lines) {
    if (y - line.gap < BOTTOM) {
      pages.push(page);
      page = [];
      y = TOP;
    }
    page.push(line);
    y -= line.gap;
  }

  if (page.length > 0) pages.push(page);
  return pages;
}

function renderPage(lines: Line[], pageNumber: number, pageCount: number) {
  const ops: string[] = [];
  let y = TOP;

  for (const line of lines) {
    if (line.box) {
      const box = 9;
      ops.push(
        `${MARGIN_X} ${y - box + 2} ${box} ${box} re S`,
      );
    }
    if (line.text) {
      ops.push(
        `BT /${line.font} ${line.size} Tf 1 0 0 1 ${MARGIN_X + line.indent} ${y} Tm (${escapePdf(line.text)}) Tj ET`,
      );
    }
    y -= line.gap;
  }

  ops.push(
    `BT /F1 9 Tf 1 0 0 1 ${MARGIN_X} 36 Tm (${escapePdf(`Banyan Home Co. - Page ${pageNumber} of ${pageCount}`)}) Tj ET`,
  );

  return ops.join("\n");
}

function buildPdf(doc: Printable) {
  const pages = paginate(linesFor(doc));
  const rendered = pages.map((lines, index) =>
    renderPage(lines, index + 1, pages.length),
  );

  const objects: string[] = [];
  objects.push("<< /Type /Catalog /Pages 2 0 R >>");

  const fontRegularId = 3;
  const fontBoldId = 4;
  const pageObjectIds: number[] = [];
  let nextId = 5;

  const pageNodes: { id: number; contentId: number; stream: string }[] = [];

  for (const stream of rendered) {
    const pageId = nextId;
    nextId += 1;
    const contentId = nextId;
    nextId += 1;
    pageObjectIds.push(pageId);
    pageNodes.push({ id: pageId, contentId, stream });
  }

  objects.push(
    `<< /Type /Pages /Count ${pageObjectIds.length} /Kids [${pageObjectIds
      .map((id) => `${id} 0 R`)
      .join(" ")}] >>`,
  );
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>");
  objects.push("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>");

  for (const page of pageNodes) {
    objects[page.id - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_WIDTH} ${PAGE_HEIGHT}] /Resources << /Font << /F1 ${fontRegularId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${page.contentId} 0 R >>`;
    objects[page.contentId - 1] = `<< /Length ${Buffer.byteLength(page.stream)} >>\nstream\n${page.stream}\nendstream`;
  }

  let body = "%PDF-1.4\n";
  const offsets: number[] = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(body));
    body += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xref = Buffer.byteLength(body);
  body += `xref\n0 ${objects.length + 1}\n`;
  body += "0000000000 65535 f \n";
  for (let index = 1; index < offsets.length; index += 1) {
    body += `${String(offsets[index]).padStart(10, "0")} 00000 n \n`;
  }
  body += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return Buffer.from(body);
}

const docs = [...checklists, shoppingList];
const outDir = path.join(process.cwd(), "public", "hurricane");
await mkdir(outDir, { recursive: true });

for (const doc of docs) {
  const file = path.join(outDir, `${doc.slug}.pdf`);
  await writeFile(file, buildPdf(doc));
  console.log(file);
}
