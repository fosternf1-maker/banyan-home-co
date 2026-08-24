import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  tone?: "light" | "dark";
};

export function SectionHeader({
  eyebrow,
  title,
  lede,
  tone = "light",
}: Props) {
  return (
    <header className={`band-head ${tone === "dark" ? "band-head--dark" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {lede ? <p className="band-head__lede">{lede}</p> : null}
    </header>
  );
}
