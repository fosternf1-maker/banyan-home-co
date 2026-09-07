"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { joinFoundingList } from "@/app/actions";
import { Field } from "@/components/forms/field";
import { track } from "@/lib/analytics";
import {
  contactRoles,
  homeTypes,
  idleState,
  type AreaVerdict,
} from "@/lib/forms/schema";
import { neighborhoods, site, year1Zips } from "@/lib/site";

const successCopy: Record<AreaVerdict, { title: string; body: string }> = {
  "year-one": {
    title: "You're on the list.",
    body: "We open mid-January 2027. We'll write before anyone can buy a membership.",
  },
  expansion: {
    title: "You're on the expansion list.",
    body: `Year one is South Tampa only — ${year1Zips.join(", ")}. We'll keep your name if we expand by neighbourhood.`,
  },
  "out-of-area": {
    title: "We're not the right fit for that address.",
    body: "We would rather say so than keep you waiting on something we cannot deliver. If you are a licensed trade, the trade form is the right door.",
  },
};

export function FoundingList() {
  const [state, formAction, pending] = useActionState(
    joinFoundingList,
    idleState,
  );
  const [renderedAt, setRenderedAt] = useState(0);
  const [tier, setTier] = useState("");
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRenderedAt(Date.now());
    // Pricing cards deep-link as /#founding-list?tier=signature so the enquiry
    // arrives knowing which tier prompted it.
    const asked = new URLSearchParams(window.location.search).get("tier");
    if (asked) setTier(asked);
  }, []);

  useEffect(() => {
    if (state.status === "error") summary.current?.focus();
    if (state.status === "sent" || state.status === "sent-unconfigured") {
      track("Founding list submit", {
        delivered: state.status === "sent",
        ...(state.status === "sent" ? { area: state.area } : {}),
      });
    }
  }, [state]);

  const errors = state.status === "error" ? state.errors : {};

  if (state.status === "sent") {
    const copy = successCopy[state.area];
    return (
      <div className="form-done" role="status">
        <h3>{copy.title}</h3>
        <p>{copy.body}</p>
        <p className="form-done__quiet">
          Joining this list does not create a membership agreement and does not
          reserve a slot we haven&apos;t promised.
        </p>
      </div>
    );
  }

  if (state.status === "sent-unconfigured") {
    return (
      <div className="form-done" role="status">
        <h3>We have your details.</h3>
        <p>
          Our confirmation email isn&apos;t switched on yet, so you won&apos;t
          get an automatic reply. If you&apos;d like to be certain we saw this,
          call{" "}
          <a className="link-liquid" href={site.phoneHref}>
            {site.phoneDisplay}
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
        <Field name="name" label="Name" error={errors.name} required>
          {(a) => <input {...a} type="text" autoComplete="name" />}
        </Field>

        <Field name="email" label="Email" error={errors.email} required>
          {(a) => <input {...a} type="email" autoComplete="email" />}
        </Field>

        <Field
          name="mobile"
          label="Mobile"
          error={errors.mobile}
          hint="So we can text you when membership opens."
          required
        >
          {(a) => <input {...a} type="tel" autoComplete="tel" />}
        </Field>

        <Field name="zip" label="ZIP" error={errors.zip} required>
          {(a) => (
            <input
              {...a}
              type="text"
              inputMode="numeric"
              maxLength={5}
              autoComplete="postal-code"
            />
          )}
        </Field>

        <Field name="neighborhood" label="Neighbourhood" error={errors.neighborhood}>
          {(a) => (
            <select {...a} defaultValue="">
              <option value="">Select one</option>
              {neighborhoods.map((hood) => (
                <option key={hood} value={hood}>
                  {hood}
                </option>
              ))}
              <option value="Other">Other</option>
            </select>
          )}
        </Field>

        <Field name="homeType" label="Home type" error={errors.homeType}>
          {(a) => (
            <select {...a} defaultValue="">
              <option value="">Select one</option>
              {homeTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="contactRole"
          label="Who should we contact"
          error={errors.contactRole}
        >
          {(a) => (
            <select {...a} defaultValue="">
              <option value="">Select one</option>
              {contactRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          name="note"
          label="Anything we should know"
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
      <input type="hidden" name="tier" value={tier} />

      <div className="form__foot">
        <button className="btn btn--ink" type="submit" disabled={pending}>
          {pending ? "Sending…" : "Join the founding list"}
        </button>
        <p className="form__fine">
          Membership is not for sale. Joining this list does not create an
          agreement, and does not reserve a slot we haven&apos;t promised.
        </p>
      </div>
    </form>
  );
}
