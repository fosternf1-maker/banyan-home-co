import { standingLabel, statusLabel } from "@/lib/format";
import type { Standing, VisitStatus } from "@/lib/types";

export function StatusPill({ status }: { status: VisitStatus }) {
  return <span className={`pill pill--${status}`}>{statusLabel[status]}</span>;
}

export function StandingPill({ standing }: { standing: Standing }) {
  return (
    <span className={`standing standing--${standing}`}>{standingLabel[standing]}</span>
  );
}
