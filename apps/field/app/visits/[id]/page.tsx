import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Checklist } from "@/components/checklist";
import { NoteForm } from "@/components/note-form";
import { StandingPill, StatusPill } from "@/components/pills";
import { VisitStatusSelect } from "@/components/visit-status";
import { formatLong, formatTime, tierLabel } from "@/lib/format";
import { getVisit } from "@/lib/queries";
import { readStore } from "@/lib/read";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = getVisit(await readStore(), id);
  return {
    title: record ? `${record.visit.label} · ${record.kind.name}` : "Visit",
  };
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = getVisit(await readStore(), id);
  if (!record) notFound();
  const { visit, home, manager, kind, checklist, notes, equipment, prior, visitCount } =
    record;
  const checkedKey = checklist.map((item) => Number(item.checked)).join("");

  return (
    <div className="page">
      <p className="back">
        <Link href="/">Dispatch</Link>
        <Link href={`/homes/${home.id}`}>{home.name}</Link>
      </p>
      <header className="page-head">
        <p className="eyebrow">
          {visit.label} · {kind.season}
        </p>
        <div className="page-head__row">
          <h1>{kind.name}</h1>
          <StatusPill status={visit.status} />
        </div>
        <p className="lede">{kind.summary}</p>
      </header>

      <div className="split">
        <div className="split__main">
          <dl className="meta">
            <div>
              <dt>When</dt>
              <dd>
                {formatLong(visit.date)}
                <span>
                  {formatTime(visit.time)} · {visit.durationMin} min
                </span>
              </dd>
            </div>
            <div>
              <dt>House</dt>
              <dd>
                <Link href={`/homes/${home.id}`}>{home.name}</Link>
                <span>
                  {home.address}, {home.neighborhood}
                </span>
              </dd>
            </div>
            <div>
              <dt>Home Manager</dt>
              <dd>
                {manager ? (
                  <span className="manager">
                    <i style={{ background: manager.color }} />
                    {manager.name}
                  </span>
                ) : (
                  "Unassigned"
                )}
              </dd>
            </div>
            <div>
              <dt>Priority</dt>
              <dd>{visit.priority === "high" ? "High" : "Normal"}</dd>
            </div>
          </dl>

          <VisitStatusSelect
            key={visit.status}
            visitId={visit.id}
            status={visit.status}
          />

          {visit.notes ? (
            <section className="block">
              <h2>Before you arrive</h2>
              <p>{visit.notes}</p>
            </section>
          ) : null}

          {visit.completionNotes ? (
            <section className="block">
              <h2>What was left on the record</h2>
              <p>{visit.completionNotes}</p>
            </section>
          ) : null}

          <section className="block" aria-labelledby="checklist-heading">
            <h2 id="checklist-heading">Checklist</h2>
            <Checklist key={checkedKey} visitId={visit.id} items={checklist} />
          </section>

          <section className="block" aria-labelledby="notes-heading">
            <h2 id="notes-heading">Notes from the visit</h2>
            {notes.length === 0 ? (
              <p className="quiet">Nothing written on this visit yet.</p>
            ) : (
              <ul className="notes">
                {notes.map((note) => (
                  <li key={note.id}>
                    <time dateTime={note.date}>{formatLong(note.date)}</time>
                    <p>{note.content}</p>
                  </li>
                ))}
              </ul>
            )}
            <NoteForm
              key={notes.length}
              visitId={visit.id}
              equipment={equipment.map((item) => ({ id: item.id, system: item.system }))}
            />
          </section>
        </div>

        <aside className="split__aside">
          <section>
            <h2>This house</h2>
            <p>
              {tierLabel[home.tier]} · {visitCount} visits on the record
            </p>
            {prior ? (
              <p>
                Previous completed visit:{" "}
                <Link href={`/visits/${prior.id}`}>
                  {prior.label} · {prior.kindName}
                </Link>
              </p>
            ) : (
              <p>No completed visit before this one.</p>
            )}
            <p className="quiet">{home.access}</p>
          </section>
          <section>
            <h2>Systems on this visit</h2>
            <ul className="touched">
              {equipment.map((item) => (
                <li key={item.id}>
                  <Link href={`/homes/${home.id}/equipment/${item.id}`}>
                    <span>{item.system}</span>
                    <span>
                      {item.manufacturer} {item.model}
                    </span>
                    <span>Serial {item.serial}</span>
                  </Link>
                  <StandingPill standing={item.standing} />
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
