import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDay, formatInstalled, formatLong, tierLabel } from "@/lib/format";
import { getHome } from "@/lib/queries";
import { readStore } from "@/lib/read";
import { StandingPill, StatusPill } from "@/components/pills";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const record = getHome(await readStore(), id);
  return { title: record?.home.name ?? "Home" };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = getHome(await readStore(), id);
  if (!record) notFound();
  const { home, equipment, visits, actCount } = record;
  const rows = visits.map((visit, index) => ({
    visit,
    showMonth:
      index === 0 || visit.date.slice(0, 7) !== visits[index - 1].date.slice(0, 7),
  }));

  return (
    <div className="page">
      <p className="back">
        <Link href="/homes">All homes</Link>
      </p>
      <header className="record-head">
        <div>
          <p className="eyebrow">
            {home.neighborhood} · {home.zip} · {tierLabel[home.tier]}
          </p>
          <h1>{home.name}</h1>
          <p className="lede">
            One record for this house: the systems, and every visit that touched
            them. {home.member}. On the record since {formatLong(home.memberSince)}.
          </p>
        </div>
        <dl className="record-facts">
          <div>
            <dt>Address</dt>
            <dd>
              {home.address}
              <br />
              {home.city}, {home.state} {home.zip}
            </dd>
          </div>
          <div>
            <dt>Phone</dt>
            <dd>{home.phone}</dd>
          </div>
          <div>
            <dt>Access</dt>
            <dd>{home.access}</dd>
          </div>
          <div>
            <dt>To act on</dt>
            <dd>{actCount === 0 ? "Nothing open" : `${actCount} systems`}</dd>
          </div>
        </dl>
      </header>

      <section className="sheet" aria-labelledby="equipment-heading">
        <div className="sheet__bar">
          <h2 id="equipment-heading">Equipment</h2>
          <p>Install date, plate, and the latest note on that system.</p>
        </div>
        <ul className="equip">
          {equipment.map((item) => (
            <li key={item.id}>
              <Link href={`/homes/${home.id}/equipment/${item.id}`}>
                <span className="equip__system">{item.system}</span>
                <span className="equip__name">{item.name}</span>
                <span className="equip__plate">
                  {item.manufacturer} {item.model}
                  <br />
                  <span>Serial {item.serial}</span>
                </span>
                <span className="equip__installed">Installed {formatInstalled(item.installed)}</span>
                <StandingPill standing={item.standing} />
                {item.latest ? (
                  <span className="equip__latest">
                    {formatDay(item.latest.date, false)} · {item.latest.summary}
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="sheet" aria-labelledby="timeline-heading">
        <div className="sheet__bar">
          <h2 id="timeline-heading">The record</h2>
          <p>{visits.length} visits, newest first.</p>
        </div>
        <ol className="timeline">
          {rows.map(({ visit, showMonth }) => (
              <li key={visit.id}>
                {showMonth ? (
                  <p className="timeline__month">
                    {new Date(visit.date + "T00:00:00").toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                ) : null}
                <Link href={`/visits/${visit.id}`} className="timeline__row">
                  <time dateTime={visit.date}>{formatDay(visit.date)}</time>
                  <span>
                    <strong>{visit.kindName}</strong>
                    <span className="timeline__label">{visit.label}</span>
                    {visit.equipmentNames.length > 0 ? (
                      <span className="timeline__systems">{visit.equipmentNames.join(" · ")}</span>
                    ) : null}
                  </span>
                  <StatusPill status={visit.status} />
                </Link>
              </li>
            ))}
        </ol>
      </section>
    </div>
  );
}
