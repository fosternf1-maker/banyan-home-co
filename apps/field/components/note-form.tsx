"use client";

import { useActionState } from "react";
import { addNote, type NoteState } from "@/app/actions";

export function NoteForm({
  visitId,
  equipment,
}: {
  visitId: string;
  equipment: { id: string; system: string }[];
}) {
  const [state, action, pending] = useActionState(
    addNote.bind(null, visitId),
    null as NoteState,
  );

  return (
    <form action={action} className="note-form">
      <label className="field">
        <span>System</span>
        <select name="equipmentId" defaultValue={equipment[0]?.id ?? ""}>
          {equipment.map((item) => (
            <option key={item.id} value={item.id}>
              {item.system}
            </option>
          ))}
        </select>
      </label>
      <label className="field">
        <span>Service note</span>
        <textarea
          name="content"
          rows={3}
          maxLength={800}
          required
          placeholder="What you saw, in a sentence the next visit can use."
        />
      </label>
      {state?.error ? (
        <p className="form-error" role="alert">
          {state.error}
        </p>
      ) : null}
      <button className="btn btn--ink" type="submit" disabled={pending}>
        {pending ? "Saving" : "Add to the record"}
      </button>
    </form>
  );
}
