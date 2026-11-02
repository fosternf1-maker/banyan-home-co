"use client";

import { useState, useTransition } from "react";
import { updateVisitStatus } from "@/app/actions";
import { statusLabel } from "@/lib/format";
import { VISIT_STATUSES, type VisitStatus } from "@/lib/types";

export function VisitStatusSelect({
  visitId,
  status,
}: {
  visitId: string;
  status: VisitStatus;
}) {
  const [value, setValue] = useState(status);
  const [pending, startTransition] = useTransition();

  return (
    <label className="status-field">
      <span>Status</span>
      <select
        value={value}
        disabled={pending}
        onChange={(event) => {
          const next = event.target.value as VisitStatus;
          setValue(next);
          startTransition(() => updateVisitStatus(visitId, next));
        }}
      >
        {VISIT_STATUSES.map((option) => (
          <option key={option} value={option}>
            {statusLabel[option]}
          </option>
        ))}
      </select>
    </label>
  );
}
