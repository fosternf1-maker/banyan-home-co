"use client";

import { useActionState, useEffect, useRef, useState, type ChangeEvent } from "react";
import { joinFoundingList } from "@/app/actions";
import { Field } from "@/components/forms/field";
import { track } from "@/lib/analytics";
import {
  contactRoles,
  homeTypes,
  idleState,
  type AreaVerdict,
  type FieldErrors,
} from "@/lib/forms/schema";
import {
  neighborhoods,
  site,
  tierFromParam,
  tierInterestOptions,
  year1Zips,
  type TierInterest,
} from "@/lib/site";

const successCopy: Record<AreaVerdict, { title: string; body: string }> = {
  "year-one": {
    title: "You're on the list.",
    body: "We open mid-January 2027. We'll write before anyone can buy a membership.",
  },
  expansion: {
    title: "You're on the expansion list.",
    body: `Year one is South Tampa only — ${year1Zips.join(", ")}. We'll keep your name if we expand by neighborhood.`,
  },
  "out-of-area": {
    title: "We're not the right fit for that address.",
    body: "We would rather say so than keep you waiting on something we cannot deliver. If you are a licensed trade, the trade form is the right door.",
  },
};

const fieldLabels: Record<string, string> = {
  name: "Name",
  email: "Email",
  zip: "ZIP",
  mobile: "Mobile",
  neighborhood: "Neighborhood",
  homeType: "Home type",
  contactRole: "Who should we contact",
  tier: "Interested tier",
  note: "Anything we should know",
};

const detailFields = [
  "mobile",
  "neighborhood",
  "homeType",
  "contactRole",
  "tier",
  "note",
];

function tierFromLocation() {
  return tierFromParam(new URLSearchParams(window.location.search).get("tier"));
}

type DraftKey =
  | "name"
  | "email"
  | "zip"
  | "mobile"
  | "neighborhood"
  | "homeType"
  | "contactRole"
  | "note";

const emptyDraft: Record<DraftKey, string> = {
  name: "",
  email: "",
  zip: "",
  mobile: "",
  neighborhood: "",
  homeType: "",
  contactRole: "",
  note: "",
};

export function FoundingList({
  initialTier = "not-sure",
}: {
  initialTier?: TierInterest;
}) {
  const [state, formAction, pending] = useActionState(
    joinFoundingList,
    idleState,
  );
  const [tier, setTier] = useState<TierInterest>(initialTier);
  const [detailsOpen, setDetailsOpen] = useState(initialTier !== "not-sure");
  const [draft, setDraft] = useState(emptyDraft);

  function update(key: DraftKey) {
    return (
      event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      const value = event.target.value;
      setDraft((current) => ({ ...current, [key]: value }));
    };
  }
  const summary = useRef<HTMLDivElement>(null);
  const stamp = useRef<HTMLInputElement>(null);

  /* Write-once value for a field nobody looks at — set on the node rather
     than re-rendering the form through state to fill one hidden input. */
  useEffect(() => {
    if (stamp.current) stamp.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    function syncTier() {
      const next = tierFromLocation();
      setTier(next);
      if (next !== "not-sure") setDetailsOpen(true);
    }

    window.addEventListener("banyan:tier", syncTier);
    window.addEventListener("popstate", syncTier);
    return () => {
      window.removeEventListener("banyan:tier", syncTier);
      window.removeEventListener("popstate", syncTier);
    };
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

  const errors: FieldErrors = state.status === "error" ? state.errors : {};
  const errorEntries = Object.entries(errors);
  const detailError = detailFields.some((key) => errors[key]);
  const detailsVisible = detailsOpen || detailError;

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
        className={`form__summary${state.status === "error" ? " form__summary--error" : ""}`}
        ref={summary}
        tabIndex={-1}
        role={state.status === "error" ? "alert" : undefined}
      >
        {state.status === "error" && state.message ? (
          <div className="form__summary-text">
            <p>{state.message}</p>
            {errorEntries.length > 0 ? (
              <ul className="form__summary-list">
                {errorEntries.map(([key, message]) => (
                  <li key={key}>
                    <a
                      href={`#f-${key}`}
                      onClick={(event) => {
                        const field = document.getElementById(
                          event.currentTarget.hash.slice(1),
                        );
                        if (field?.closest("details")) setDetailsOpen(true);
                      }}
                    >
                      {(fieldLabels[key] ?? key) + ": " + message}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="form__grid">
        <Field name="name" label="Name" error={errors.name} required>
          {(a) => (
            <input
              {...a}
              type="text"
              autoComplete="name"
              autoCapitalize="words"
              value={draft.name}
              onChange={update("name")}
            />
          )}
        </Field>

        <Field name="email" label="Email" error={errors.email} required>
          {(a) => (
            <input
              {...a}
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={draft.email}
              onChange={update("email")}
            />
          )}
        </Field>

        <Field name="zip" label="ZIP" error={errors.zip} required>
          {(a) => (
            <input
              {...a}
              type="text"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={5}
              pattern="[0-9]*"
              spellCheck={false}
              value={draft.zip}
              onChange={update("zip")}
            />
          )}
        </Field>
      </div>

      <details
        className="form__more"
        open={detailsVisible}
        onToggle={(event) => {
          setDetailsOpen(event.currentTarget.open);
        }}
      >
        <summary>Add details (optional)</summary>
        <div className="form__grid">
          <Field
            name="mobile"
            label="Mobile"
            error={errors.mobile}
            hint="So we can text you when membership opens."
          >
            {(a) => (
              <input
                {...a}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={draft.mobile}
                onChange={update("mobile")}
              />
            )}
          </Field>

          <Field
            name="neighborhood"
            label="Neighborhood"
            error={errors.neighborhood}
          >
            {(a) => (
              <select
                {...a}
                autoComplete="off"
                value={draft.neighborhood}
                onChange={update("neighborhood")}
              >
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
            <select
              {...a}
              autoComplete="off"
              value={draft.homeType}
              onChange={update("homeType")}
            >
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
            <select
              {...a}
              autoComplete="off"
              value={draft.contactRole}
              onChange={update("contactRole")}
            >
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
            name="tier"
            label="Interested tier"
            error={errors.tier}
            wide
          >
            {(a) => (
              <select
                {...a}
                autoComplete="off"
                value={tier}
                onChange={(event) =>
                  setTier(tierFromParam(event.target.value))
                }
              >
                {tierInterestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
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
            {(a) => (
              <textarea
                {...a}
                rows={3}
                maxLength={300}
                value={draft.note}
                onChange={update("note")}
              />
            )}
          </Field>
        </div>
      </details>

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
      <input type="hidden" name="rendered_at" ref={stamp} defaultValue="" />

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
