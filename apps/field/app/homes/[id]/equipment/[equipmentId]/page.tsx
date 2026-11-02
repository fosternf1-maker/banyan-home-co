import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatInstalled, formatLong, standingLabel } from "@/lib/format";
import { getEquipment } from "@/lib/queries";
import { readStore } from "@/lib/read";
import { StandingPill } from "@/components/pills";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; equipmentId: string }>;
}): Promise<Metadata> {
  const { id, equipmentId } = await params;
  const record = getEquipment(await readStore(), id, equipmentId);
  return { title: record ? `${record.equipment.system} · ${record.home.name}` : "Equipment" };
}

export default async function EquipmentPage({
  params,
}: {
  params: Promise<{ id: string; equipmentId: string }>;
}) {
  const { id, equipmentId } = await params;
  const record = getEquipment(await readStore(), id, equipmentId);
  if (!record) notFound();
  const { home, equipment, history } = record;

  return (
    <div className="page">
      <p className="back">
        <Link href={`/homes/${home.id}`}>{home.name}</Link>
      </p>
      <header className="page-head">
        <p className="eyebrow">{home.name} · {equipment.system}</p>
        <div className="page-head__row">
          <h1>{equipment.name}</h1>
          <StandingPill standing={equipment.standing} />
        </div>
        <p className="lede">{equipment.notes}</p>
      </header>

      <dl className="plate">
        <div>
          <dt>Manufacturer</dt>
          <dd>{equipment.manufacturer}</dd>
        </div>
        <div>
          <dt>Model</dt>
          <dd>{equipment.model}</dd>
        </div>
        <div>
          <dt>Serial</dt>
          <dd>{equipment.serial}</dd>
        </div>
        <div>
          <dt>Installed</dt>
          <dd>{formatInstalled(equipment.installed)}</dd>
        </div>
        <div>
          <dt>Standing</dt>
          <dd>{standingLabel[equipment.standing]}</dd>
        </div>
        <div>
          <dt>House</dt>
          <dd>
            {home.address}, {home.neighborhood}
          </dd>
        </div>
      </dl>

      <section className="sheet" aria-labelledby="history-heading">
        <div className="sheet__bar">
          <h2 id="history-heading">Service history</h2>
          <p>{history.length} notes, newest first. Install stays at the bottom.</p>
        </div>
        <ol className="history">
          {history.map((event) => (
            <li key={event.id}>
              <time dateTime={event.date}>{formatLong(event.date)}</time>
              <div>
                <h3>{event.summary}</h3>
                <p>{event.detail}</p>
                {event.visitId && event.visitLabel ? (
                  <Link href={`/visits/${event.visitId}`}>Open {event.visitLabel}</Link>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
