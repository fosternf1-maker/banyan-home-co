"use client";

import { useState, useTransition } from "react";
import { toggleChecklist } from "@/app/actions";
import type { ChecklistItem } from "@/lib/types";

export function Checklist({
  visitId,
  items,
}: {
  visitId: string;
  items: ChecklistItem[];
}) {
  const [rows, setRows] = useState(items);
  const [pending, startTransition] = useTransition();
  const done = rows.filter((item) => item.checked).length;

  return (
    <div>
      <p className="check-count">
        {done} of {rows.length} on the list
      </p>
      <ul className="checks">
        {rows.map((item) => (
          <li key={item.id}>
            <label className={item.checked ? "check check--on" : "check"}>
              <input
                type="checkbox"
                checked={item.checked}
                disabled={pending}
                onChange={() => {
                  const next = !item.checked;
                  setRows((current) =>
                    current.map((row) =>
                      row.id === item.id ? { ...row, checked: next } : row,
                    ),
                  );
                  startTransition(() => toggleChecklist(visitId, item.id));
                }}
              />
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
