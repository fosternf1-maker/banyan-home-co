import type { Metadata } from "next";
import Link from "next/link";
import { formatDay, tierLabel } from "@/lib/format";
import { listHomes } from "@/lib/queries";
import { readStore } from "@/lib/read";
import { StandingPill } from "@/components/pills";

export const metadata: Metadata = { title: "Homes" };

export default async function HomesPage() {
  const homes = listHomes(await readStore());

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">One record per house</p>
        <h1>Homes</h1>
        <p className="lede">
          Membership is a house, not a stack of work orders. Open one and read
          the visits in the order they happened.
        </p>
      </header>
      <ul className="home-index">
        {homes.map(({ home, visitCount, nextVisit, actCount, lastVisitDate }) => (
          <li key={home.id}>
            <Link href={`/homes/${home.id}`}>
              <span className="home-index__where">{home.neighborhood}</span>
              <span className="home-index__name">{home.name}</span>
              <span className="home-index__member">
                {home.member} · {tierLabel[home.tier]}
              </span>
              <span className="home-index__facts">
                <span>{visitCount} visits</span>
                {lastVisitDate ? <span>Last {formatDay(lastVisitDate, false)}</span> : null}
                {actCount > 0 ? (
                  <StandingPill standing="act" />
                ) : (
                  <span>Nothing to act on</span>
                )}
              </span>
              <span className="home-index__next">
                {nextVisit
                  ? `Next · ${nextVisit.kindName} · ${formatDay(nextVisit.date)}`
                  : "Nothing open"}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
