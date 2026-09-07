"use client";

import type { ReactNode } from "react";

type Props = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  wide?: boolean;
  children: (attrs: {
    id: string;
    name: string;
    "aria-invalid": boolean | undefined;
    "aria-describedby": string | undefined;
    required: boolean;
  }) => ReactNode;
};

export function Field({
  name,
  label,
  error,
  hint,
  required = false,
  wide = false,
  children,
}: Props) {
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy =
    [error ? errorId : null, hint ? hintId : null].filter(Boolean).join(" ") ||
    undefined;

  return (
    <p className={`field${wide ? " field--wide" : ""}${error ? " field--invalid" : ""}`}>
      <label className="field__label" htmlFor={id}>
        {label}
        {required ? null : <span className="field__optional">Optional</span>}
      </label>
      {children({
        id,
        name,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": describedBy,
        required,
      })}
      {hint ? (
        <span className="field__hint" id={hintId}>
          {hint}
        </span>
      ) : null}
      {error ? (
        <span className="field__error" id={errorId}>
          {error}
        </span>
      ) : null}
    </p>
  );
}
