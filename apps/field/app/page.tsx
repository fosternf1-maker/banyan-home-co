import Link from "next/link";
import { calendarDate, daysInRange, parseDay, shiftDays, weekRange } from "@/lib/calendar";
import { formatLong, formatRange, formatTime } from "@/lib/format";
import { visitsBetween } from "@/lib/queries";
import { readStore } from "@/lib/read";
import { StatusPill } from "@/components/pills";

export default async function DispatchPage({
  searchParams,
}: {
  searchParams: Promise<{ week?: string }>;
}) {
  const { week } = await searchParams;
  const store = await readStore();
  const anchor = parseDay(week) ?? new Date();
  const [start, end] = weekRange(anchor);
  const days = daysInRange(start, end);
  const cards = visitsBetween(store, start, end);
  const today = calendarDate(new Date());
  const [todayStart] = weekRange(new Date());
  const inProgress = cards.filter((card) => card.status === "in_progress").length;
  const open = cards.filter(
    (card) => card.status !== "completed" && card.status !== "cancelled",
  ).length;

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">South Tampa · member visits</p>
        <div className="page-head__row">
          <h1>Dispatch</h1>
          <div className="week-nav">
            <Link className="btn btn--quiet" href="/" aria-current={start === todayStart ? "page" : undefined}>
              This week
            </Link>
            <Link
              className="btn btn--quiet"
              href={`/?week=${shiftDays(start, -7)}`}
              aria-label="Previous week"
            >
              Previous
            </Link>
            <p className="week-nav__range">{formatRange(start, end)}</p>
            <Link
              className="btn btn--quiet"
              href={`/?week=${shiftDays(start, 7)}`}
              aria-label="Next week"
            >
              Next
            </Link>
          </div>
        </div>
        <p className="lede">
          The week’s visits, one house at a time. Open a card for the checklist.
          The house keeps everything that came before it.
        </p>
      </header>

      <dl className="stats">
        <div>
          <dt>On the board</dt>
          <dd>{cards.length}</dd>
        </div>
        <div>
          <dt>Still open</dt>
          <dd>{open}</dd>
        </div>
        <div>
          <dt>In progress</dt>
          <dd>{inProgress}</dd>
        </div>
        <div>
          <dt>Home Managers</dt>
          <dd className="stats__people">
            {store.managers.map((manager) => (
              <span key={manager.id}>
                <i style={{ background: manager.color }} />
                {manager.name}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      {cards.length === 0 ? (
        <p className="lede">
          Nothing on this week. The houses still have their history under Homes.
        </p>
      ) : null}

      <div className="board" role="list">
        {days.map((day) => {
          const dayCards = cards.filter((card) => card.date === day);
          const isToday = day === today;
          return (
            <section
              key={day}
              className={isToday ? "day day--today" : "day"}
              aria-label={formatLong(day)}
              role="listitem"
            >
              <header className="day__head">
                <span>{new Date(day + "T00:00:00").toLocaleDateString("en-US", { weekday: "short" })}</span>
                <strong>{new Date(day + "T00:00:00").getDate()}</strong>
              </header>
              <div className="day__visits">
                {dayCards.length === 0 ? <p className="day__empty">No visits</p> : null}
                {dayCards.map((card) => (
                  <Link
                    key={card.id}
                    href={`/visits/${card.id}`}
                    className="visit"
                    style={{ "--manager": card.managerColor } as React.CSSProperties}
                  >
                    <span className="visit__time">{formatTime(card.time)}</span>
                    <span className="visit__home">{card.homeName}</span>
                    <span className="visit__kind">{card.kindName}</span>
                    <span className="visit__meta">
                      <StatusPill status={card.status} />
                      {card.priority === "high" ? <span className="pill pill--high">High</span> : null}
                    </span>
                    <span className="visit__foot">
                      <span>{card.managerName}</span>
                      <span>
                        {card.checklistDone}/{card.checklistTotal}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
