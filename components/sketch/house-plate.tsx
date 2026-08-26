import type { SketchLayerId } from "@/lib/sketch";
import { sketchLayers } from "@/lib/sketch";

type Props = {
  activeId: SketchLayerId;
  explode: number;
  onSelect?: (id: SketchLayerId) => void;
  showLabels?: boolean;
};

function iso(x: number, y: number, z: number): [number, number] {
  const ox = 478;
  const oy = 468;
  return [ox + (x - z) * 1.12, oy + (x + z) * 0.5 - y];
}

function pt(x: number, y: number, z: number) {
  return iso(x, y, z).map((n) => n.toFixed(1)).join(",");
}

function poly(points: [number, number, number][]) {
  return points.map(([x, y, z]) => pt(x, y, z)).join(" ");
}

function line(points: [number, number, number][]) {
  return points
    .map(([x, y, z], i) => {
      const [sx, sy] = iso(x, y, z);
      return `${i === 0 ? "M" : "L"}${sx.toFixed(1)},${sy.toFixed(1)}`;
    })
    .join(" ");
}

function layerTransform(id: SketchLayerId, explode: number) {
  const layer = sketchLayers.find((item) => item.id === id);
  if (!layer) return undefined;
  return `translate(${layer.explode.x * explode} ${layer.explode.y * explode})`;
}

const INK = "#14211C";
const CANOPY = "#2C5145";
const SAGE = "#7FB3A0";
const BRASS = "#8F6620";
const STUCCO = "#E7EBE4";
const STUCCO_SIDE = "#D5DCD4";
const TILE = "#2A4A40";
const TILE_SIDE = "#1F3830";
const GLASS = "#C9D8D0";
const LAWN = "#D4DDD2";

const W = 188;
const D = 122;
const H = 92;
const PEAK = 156;
const PORCH = 44;

export function HousePlate({
  activeId,
  explode,
  onSelect,
  showLabels = true,
}: Props) {
  const dim = explode > 0.14;

  function layerClass(id: SketchLayerId) {
    const on = activeId === id;
    return `hp-layer${on ? " is-active" : ""}${dim && !on ? " is-dim" : ""}`;
  }

  const tagOn = showLabels && explode > 0.18;

  return (
    <svg
      viewBox="0 0 960 680"
      role="img"
      aria-labelledby="house-plate-title house-plate-desc"
    >
      <title id="house-plate-title">
        House taken apart into the jobs Banyan coordinates
      </title>
      <desc id="house-plate-desc">
        A line drawing of a one-story hip-roof house with a front porch, live
        oak, irrigation, HVAC, dryer vent, water heater, gutters, and shutters.
      </desc>

      <polygon
        points={poly([
          [-120, 0, -90],
          [280, 0, -90],
          [280, 0, 210],
          [-120, 0, 210],
        ])}
        fill={LAWN}
        stroke={INK}
        strokeWidth="1"
      />
      <path
        d={line([
          [40, 0, -58],
          [70, 1.5, -28],
          [96, 0, 2],
        ])}
        fill="none"
        stroke={INK}
        strokeWidth="1.15"
        opacity="0.45"
      />

      <g
        className={layerClass("roof")}
        transform={layerTransform("roof", explode)}
        onClick={() => onSelect?.("roof")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <LiveOak />
      </g>

      <polygon
        points={poly([
          [0, 0, 0],
          [W, 0, 0],
          [W, 0, D],
          [0, 0, D],
        ])}
        fill="#C7D0C6"
        stroke={INK}
        strokeWidth="1.1"
      />

      <polygon
        points={poly([
          [0, 0, 0],
          [W, 0, 0],
          [W, 8, 0],
          [0, 8, 0],
        ])}
        fill="#B7C2B6"
        stroke={INK}
        strokeWidth="1.05"
      />
      <polygon
        points={poly([
          [W, 0, 0],
          [W, 0, D],
          [W, 8, D],
          [W, 8, 0],
        ])}
        fill="#9AA898"
        stroke={INK}
        strokeWidth="1.05"
      />

      <polygon
        points={poly([
          [0, 8, 0],
          [W, 8, 0],
          [W, H, 0],
          [0, H, 0],
        ])}
        fill={STUCCO}
        stroke={INK}
        strokeWidth="1.2"
      />
      <polygon
        points={poly([
          [W, 8, 0],
          [W, 8, D],
          [W, H, D],
          [W, H, 0],
        ])}
        fill={STUCCO_SIDE}
        stroke={INK}
        strokeWidth="1.2"
      />

      <Opening
        x={28}
        y={38}
        z={0}
        w={32}
        h={42}
      />
      <Opening
        x={128}
        y={38}
        z={0}
        w={32}
        h={42}
      />
      <Door x={78} y={8} z={0} />

      <polygon
        points={poly([
          [28, 8, -PORCH],
          [W - 28, 8, -PORCH],
          [W - 28, 8, 0],
          [28, 8, 0],
        ])}
        fill="#C5CEC3"
        stroke={INK}
        strokeWidth="1.1"
      />
      <polygon
        points={poly([
          [36, 0, -PORCH + 6],
          [W - 36, 0, -PORCH + 6],
          [W - 28, 8, -PORCH],
          [28, 8, -PORCH],
        ])}
        fill="#B4BFB3"
        stroke={INK}
        strokeWidth="1.05"
      />

      <Column x={48} z={-PORCH + 8} />
      <Column x={W - 48} z={-PORCH + 8} />

      <polygon
        points={poly([
          [22, 78, -PORCH - 6],
          [W - 22, 78, -PORCH - 6],
          [W - 18, 78, 8],
          [18, 78, 8],
        ])}
        fill={TILE}
        stroke={INK}
        strokeWidth="1.15"
      />
      <polygon
        points={poly([
          [W - 22, 78, -PORCH - 6],
          [W - 18, 78, 8],
          [W - 18, 70, 8],
          [W - 22, 70, -PORCH - 6],
        ])}
        fill={TILE_SIDE}
        stroke={INK}
        strokeWidth="1"
      />

      <g
        className={layerClass("shutters")}
        transform={layerTransform("shutters", explode)}
        onClick={() => onSelect?.("shutters")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <g transform={`translate(${-36 * explode} 0)`}>
          <Shutter x={17} y={38} z={0} h={42} />
          <Shutter x={117} y={38} z={0} h={42} />
        </g>
        <g transform={`translate(${36 * explode} 0)`}>
          <Shutter x={62} y={38} z={0} h={42} />
          <Shutter x={162} y={38} z={0} h={42} />
        </g>
        <Leader
          on={tagOn && activeId === "shutters"}
          from={iso(20, 58, -4)}
          to={[168, 300]}
          label="Shutters"
          anchor="end"
        />
      </g>

      <g
        className={layerClass("gutters")}
        transform={layerTransform("gutters", explode)}
        onClick={() => onSelect?.("gutters")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <path
          d={line([
            [0, H + 1, 0],
            [W, H + 1, 0],
            [W, H + 1, D],
          ])}
          fill="none"
          stroke={BRASS}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          d={line([
            [W, H + 1, 0],
            [W, 8, 0],
          ])}
          fill="none"
          stroke={BRASS}
          strokeWidth="2.4"
        />
        <Leader
          on={tagOn && activeId === "gutters"}
          from={iso(W, H, D * 0.45)}
          to={[790, 210]}
          label="Gutters"
        />
      </g>

      <g
        className={layerClass("roof")}
        transform={layerTransform("roof", explode)}
        onClick={() => onSelect?.("roof")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <polygon
          points={poly([
            [0, H, 0],
            [W, H, 0],
            [W * 0.68, PEAK, D * 0.5],
            [W * 0.32, PEAK, D * 0.5],
          ])}
          fill={TILE}
          stroke={INK}
          strokeWidth="1.25"
        />
        <polygon
          points={poly([
            [W, H, 0],
            [W, H, D],
            [W * 0.68, PEAK, D * 0.5],
          ])}
          fill={TILE_SIDE}
          stroke={INK}
          strokeWidth="1.25"
        />
        <polygon
          points={poly([
            [0, H, D],
            [W, H, D],
            [W * 0.68, PEAK, D * 0.5],
            [W * 0.32, PEAK, D * 0.5],
          ])}
          fill="#243F36"
          stroke={INK}
          strokeWidth="1.1"
        />
        <TileHatch />
        <path
          d={line([
            [W * 0.32, PEAK, D * 0.5],
            [W * 0.68, PEAK, D * 0.5],
          ])}
          fill="none"
          stroke={SAGE}
          strokeWidth="1.6"
        />
        <Leader
          on={tagOn && activeId === "roof"}
          from={iso(W * 0.5, PEAK - 4, D * 0.5)}
          to={[720, 72]}
          label="Roof & tree line"
        />
      </g>

      <g
        className={layerClass("dryer")}
        transform={layerTransform("dryer", explode)}
        onClick={() => onSelect?.("dryer")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <polygon
          points={poly([
            [8, 48, 0],
            [22, 48, 0],
            [22, 62, 0],
            [8, 62, 0],
          ])}
          fill="#DDE3DA"
          stroke={INK}
          strokeWidth="1.1"
        />
        <path
          d={line([
            [8, 55, 0],
            [-18, 55, -12],
          ])}
          fill="none"
          stroke={INK}
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <circle
          cx={iso(-18, 55, -12)[0]}
          cy={iso(-18, 55, -12)[1]}
          r="5.5"
          fill={STUCCO}
          stroke={INK}
          strokeWidth="1.1"
        />
        <Leader
          on={tagOn && activeId === "dryer"}
          from={iso(-18, 55, -12)}
          to={[150, 250]}
          label="Dryer vent"
          anchor="end"
        />
      </g>

      <g
        className={layerClass("heater")}
        transform={layerTransform("heater", explode)}
        onClick={() => onSelect?.("heater")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <Cylinder x={W + 18} z={38} r={11} h={36} />
        <path
          d={line([
            [W + 18, 44, 38],
            [W + 18, 52, 38],
          ])}
          fill="none"
          stroke={INK}
          strokeWidth="1.4"
        />
        <Leader
          on={tagOn && activeId === "heater"}
          from={iso(W + 18, 40, 38)}
          to={[820, 430]}
          label="Water heater"
        />
      </g>

      <g
        className={layerClass("hvac")}
        transform={layerTransform("hvac", explode)}
        onClick={() => onSelect?.("hvac")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <Hvac x={W + 36} z={78} />
        <Leader
          on={tagOn && activeId === "hvac"}
          from={iso(W + 48, 28, 78)}
          to={[840, 340]}
          label="HVAC"
        />
      </g>

      <g
        className={layerClass("irrigation")}
        transform={layerTransform("irrigation", explode)}
        onClick={() => onSelect?.("irrigation")}
        style={{ cursor: onSelect ? "pointer" : undefined }}
      >
        <Head x={36} z={-36} active={activeId === "irrigation"} />
        <Head x={96} z={-62} active={activeId === "irrigation"} />
        <Head x={150} z={-38} active={activeId === "irrigation"} />
        <Head x={-28} z={48} active={activeId === "irrigation"} />
        <Leader
          on={tagOn && activeId === "irrigation"}
          from={iso(96, 6, -62)}
          to={[300, 620]}
          label="Irrigation"
          anchor="middle"
        />
      </g>
    </svg>
  );
}

function Opening({
  x,
  y,
  z,
  w,
  h,
}: {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
}) {
  return (
    <g>
      <polygon
        points={poly([
          [x, y, z],
          [x + w, y, z],
          [x + w, y + h, z],
          [x, y + h, z],
        ])}
        fill={GLASS}
        stroke={INK}
        strokeWidth="1.15"
      />
      <path
        d={line([
          [x + w / 2, y, z],
          [x + w / 2, y + h, z],
        ])}
        fill="none"
        stroke={INK}
        strokeWidth="0.8"
        opacity="0.55"
      />
      <path
        d={line([
          [x, y + h * 0.45, z],
          [x + w, y + h * 0.45, z],
        ])}
        fill="none"
        stroke={INK}
        strokeWidth="0.8"
        opacity="0.55"
      />
    </g>
  );
}

function Shutter({
  x,
  y,
  z,
  h,
}: {
  x: number;
  y: number;
  z: number;
  h: number;
}) {
  return (
    <polygon
      points={poly([
        [x, y, z],
        [x + 10, y, z],
        [x + 10, y + h, z],
        [x, y + h, z],
      ])}
      fill={CANOPY}
      stroke={INK}
      strokeWidth="1"
    />
  );
}

function Door({ x, y, z }: { x: number; y: number; z: number }) {
  return (
    <g>
      <polygon
        points={poly([
          [x, y, z],
          [x + 32, y, z],
          [x + 32, y + 70, z],
          [x, y + 70, z],
        ])}
        fill={CANOPY}
        stroke={INK}
        strokeWidth="1.2"
      />
      <polygon
        points={poly([
          [x + 6, y + 48, z],
          [x + 26, y + 48, z],
          [x + 26, y + 62, z],
          [x + 6, y + 62, z],
        ])}
        fill={SAGE}
        opacity="0.45"
        stroke={INK}
        strokeWidth="0.7"
      />
      <circle
        cx={iso(x + 26, y + 36, z)[0]}
        cy={iso(x + 26, y + 36, z)[1]}
        r="2.1"
        fill={BRASS}
      />
    </g>
  );
}

function Column({ x, z }: { x: number; z: number }) {
  return (
    <g>
      <polygon
        points={poly([
          [x - 4, 8, z - 4],
          [x + 4, 8, z - 4],
          [x + 4, 78, z - 4],
          [x - 4, 78, z - 4],
        ])}
        fill="#F2F4EF"
        stroke={INK}
        strokeWidth="1.05"
      />
      <polygon
        points={poly([
          [x + 4, 8, z - 4],
          [x + 4, 8, z + 4],
          [x + 4, 78, z + 4],
          [x + 4, 78, z - 4],
        ])}
        fill="#D8DFD6"
        stroke={INK}
        strokeWidth="1.05"
      />
    </g>
  );
}

function Cylinder({
  x,
  z,
  r,
  h,
}: {
  x: number;
  z: number;
  r: number;
  h: number;
}) {
  const [tx, ty] = iso(x, h, z);
  const [bx, by] = iso(x, 8, z);
  const rx = r * 1.15;
  const ry = r * 0.52;
  return (
    <g>
      <path
        d={`M${tx - rx},${ty} L${bx - rx},${by} A${rx} ${ry} 0 0 0 ${bx + rx},${by} L${tx + rx},${ty} A${rx} ${ry} 0 0 1 ${tx - rx},${ty} Z`}
        fill="#E4E8E1"
        stroke={INK}
        strokeWidth="1.1"
      />
      <ellipse
        cx={tx}
        cy={ty}
        rx={rx}
        ry={ry}
        fill="#F3F5F0"
        stroke={INK}
        strokeWidth="1.1"
      />
      <ellipse
        cx={bx}
        cy={by}
        rx={rx}
        ry={ry}
        fill="#C9D2C8"
        stroke={INK}
        strokeWidth="1"
      />
    </g>
  );
}

function Hvac({ x, z }: { x: number; z: number }) {
  const w = 34;
  const d = 28;
  const h = 26;
  return (
    <g>
      <polygon
        points={poly([
          [x, 4, z],
          [x + w, 4, z],
          [x + w, 4, z + d],
          [x, 4, z + d],
        ])}
        fill="#B7C0B6"
        stroke={INK}
        strokeWidth="1"
      />
      <polygon
        points={poly([
          [x, 4, z],
          [x + w, 4, z],
          [x + w, 4 + h, z],
          [x, 4 + h, z],
        ])}
        fill="#DDE3DA"
        stroke={INK}
        strokeWidth="1.1"
      />
      <polygon
        points={poly([
          [x + w, 4, z],
          [x + w, 4, z + d],
          [x + w, 4 + h, z + d],
          [x + w, 4 + h, z],
        ])}
        fill="#C5CEC3"
        stroke={INK}
        strokeWidth="1.1"
      />
      {[0.28, 0.46, 0.64, 0.82].map((t) => (
        <path
          key={t}
          d={line([
            [x + 4, 4 + h * t, z],
            [x + w - 4, 4 + h * t, z],
          ])}
          fill="none"
          stroke={CANOPY}
          strokeWidth="1.05"
          opacity="0.55"
        />
      ))}
    </g>
  );
}

function Head({
  x,
  z,
  active,
}: {
  x: number;
  z: number;
  active: boolean;
}) {
  const [cx, cy] = iso(x, 3, z);
  return (
    <g>
      <ellipse
        className="hp-spray"
        cx={cx}
        cy={cy - 10}
        rx="22"
        ry="10"
        fill={SAGE}
        opacity={active ? 0.35 : 0}
      />
      <circle cx={cx} cy={cy} r="3.2" fill={BRASS} stroke={INK} strokeWidth="0.8" />
    </g>
  );
}

function LiveOak() {
  const [baseX, baseY] = iso(-48, 0, 88);
  const [crownX, crownY] = iso(-52, 78, 92);
  return (
    <g>
      <ellipse
        cx={crownX - 38}
        cy={crownY - 18}
        rx="58"
        ry="34"
        fill="#243F36"
      />
      <ellipse
        cx={crownX + 8}
        cy={crownY - 28}
        rx="64"
        ry="38"
        fill={CANOPY}
      />
      <ellipse
        cx={crownX + 42}
        cy={crownY - 8}
        rx="48"
        ry="30"
        fill={SAGE}
        opacity="0.72"
      />
      <path
        d={`M${baseX},${baseY} C${baseX - 6},${baseY - 28} ${baseX + 4},${baseY - 52} ${crownX},${crownY - 8}`}
        fill="none"
        stroke="#1A3029"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d={`M${crownX - 10},${crownY - 6} C${crownX - 28},${crownY - 22} ${crownX - 40},${crownY - 18} ${crownX - 52},${crownY - 10}`}
        fill="none"
        stroke="#1A3029"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <path
        d={`M${crownX - 36},${crownY + 4} C${crownX - 34},${crownY + 22} ${crownX - 38},${crownY + 36} ${crownX - 42},${crownY + 48} M${crownX + 22},${crownY + 2} C${crownX + 26},${crownY + 18} ${crownX + 20},${crownY + 32} ${crownX + 18},${crownY + 46} M${crownX - 8},${crownY + 6} C${crownX - 10},${crownY + 24} ${crownX - 6},${crownY + 38} ${crownX - 12},${crownY + 52}`}
        fill="none"
        stroke={SAGE}
        strokeWidth="1.05"
        opacity="0.75"
      />
    </g>
  );
}

function TileHatch() {
  const lines = [0.18, 0.32, 0.46, 0.6, 0.74, 0.88];
  return (
    <g opacity="0.45">
      {lines.map((t) => (
        <path
          key={t}
          d={line([
            [W * t * 0.92, H + (PEAK - H) * (1 - Math.abs(t - 0.5) * 0.35), 8],
            [
              W * t * 0.92 + 18,
              H + (PEAK - H) * (1 - Math.abs(t - 0.5) * 0.35) - 6,
              D * 0.42,
            ],
          ])}
          fill="none"
          stroke={SAGE}
          strokeWidth="1"
        />
      ))}
    </g>
  );
}

function Leader({
  on,
  from,
  to,
  label,
  anchor = "start",
}: {
  on: boolean;
  from: [number, number];
  to: [number, number];
  label: string;
  anchor?: "start" | "end" | "middle";
}) {
  const midY = (from[1] + to[1]) / 2;
  return (
    <g>
      <path
        className={`hp-leader${on ? " is-on" : ""}`}
        d={`M${from[0].toFixed(1)},${from[1].toFixed(1)} L${to[0].toFixed(1)},${midY.toFixed(1)} L${to[0].toFixed(1)},${to[1].toFixed(1)}`}
      />
      <text
        className={`hp-tag${on ? " is-on" : ""}`}
        x={to[0]}
        y={to[1] - 8}
        textAnchor={anchor}
      >
        {label}
      </text>
    </g>
  );
}
