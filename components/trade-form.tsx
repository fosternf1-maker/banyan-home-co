"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { applyAsTrade } from "@/app/actions";
import { Field } from "@/components/forms/field";
import { idleState } from "@/lib/forms/schema";
import { site } from "@/lib/site";

const YES_NO = ["Yes", "No"] as const;

export function TradeForm() {
  const [state, formAction, pending] = useActionState(applyAsTrade, idleState);
  const [renderedAt, setRenderedAt] = useState(0);
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => setRenderedAt(Date.now()), []);
  useEffect(() => {
    if (state.status === "error") summary.current?.focus();
  }, [state]);

  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "sent" || state.status === "sent-unconfigured") {
    return (
      <div className="form-done" role="status">
        <h3>We have it.</h3>
        <p>
          No roster exists yet — no vendors are signed. When it does, we verify
          the licence through DBPR before anyone is called. We take no
          commission on your invoices, then or ever.
        </p>
        <p className="form-done__quiet">
          Questions in the meantime:{" "}
          <a className="link-liquid" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form className="form" action={formAction} noValidate>
      <div
        className="form__summary"
        ref={summary}
        tabIndex={-1}
        role={state.status === "error" ? "alert" : undefined}
      >
        {state.status === "error" && state.message ? (
          <p className="form__summary-text">{state.message}</p>
        ) : null}
      </div>

      <div className="form__grid">
        <Field name="company" label="Company name" error={errors.company} required>
          {(a) => <input {...a} type="text" autoComplete="organization" />}
        </Field>

        <Field
          name="license"
          label="Florida licence number"
          error={errors.license}
          hint="We verify every licence through DBPR."
          required
        >
          {(a) => <input {...a} type="text" />}
        </Field>

        <Field
          name="trades"
          label="Trades"
          error={errors.trades}
          hint="HVAC, plumbing, electrical, roofing, irrigation…"
          required
        >
          {(a) => <input {...a} type="text" />}
        </Field>

        <Field name="years" label="Years in residential" error={errors.years}>
          {(a) => <input {...a} type="text" inputMode="numeric" />}
        </Field>

        <Field
          name="zips"
          label="Service ZIPs"
          error={errors.zips}
          hint="Comma separated."
        >
          {(a) => <input {...a} type="text" />}
        </Field>

        <Field
          name="generalLiability"
          label="General liability on file"
          error={errors.generalLiability}
        >
          {(a) => (
            <select {...a} defaultValue="">
              <option value="">Select one</option>
              {YES_NO.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="workersComp"
          label="Workers' compensation"
          error={errors.workersComp}
        >
          {(a) => (
            <select {...a} defaultValue="">
              <option value="">Select one</option>
              {YES_NO.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field name="contact" label="Contact name" error={errors.contact} required>
          {(a) => <input {...a} type="text" autoComplete="name" />}
        </Field>

        <Field name="email" label="Email" error={errors.email} required>
          {(a) => <input {...a} type="email" autoComplete="email" />}
        </Field>

        <Field name="phone" label="Phone" error={errors.phone}>
          {(a) => <input {...a} type="tel" autoComplete="tel" />}
        </Field>

        <Field
          name="note"
          label="Anything else"
          wide
          error={errors.note}
          hint="300 characters."
        >
          {(a) => <textarea {...a} rows={3} maxLength={300} />}
        </Field>
      </div>

      <p className="field field--trap" aria-hidden="true">
        <label htmlFor="f-company_website">Company website</label>
        <input
          id="f-company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </p>
      <input type="hidden" name="rendered_at" value={renderedAt || ""} />

      <div className="form__foot">
        <button className="btn btn--ink" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Send this to Banyan"}
        </button>
        <p className="form__fine">
          No roster exists yet and no vendors are signed. Sending this does not
          create an agreement or a place on a network that has not been built.
        </p>
      </div>
    </form>
  );
}
