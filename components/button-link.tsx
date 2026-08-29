import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "ink" | "outline";

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`.trim()}>
      {children}
    </a>
  );
}
