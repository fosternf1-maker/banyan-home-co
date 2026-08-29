import { BanyanLivingMark } from "@/components/banyan-living-mark";
import { BanyanMark } from "@/components/banyan-mark";
import { site } from "@/lib/site";

type Props = {
  href?: string;
  size?: "sm" | "md" | "lg";
  mark?: "living" | "simple";
};

export function Wordmark({
  href = "#top",
  size = "md",
  mark = "simple",
}: Props) {
  const Tag = href ? "a" : "span";

  return (
    <Tag
      href={href || undefined}
      className={`wordmark wordmark--${size}`}
      aria-label={site.name}
    >
      {mark === "living" ? (
        <BanyanLivingMark className="wordmark__tree" />
      ) : (
        <BanyanMark className="wordmark__tree" />
      )}
      <span className="wordmark__text" aria-hidden="true">
        <span className="wordmark__name">Banyan</span>
        <span className="wordmark__co">Home Co.</span>
      </span>
    </Tag>
  );
}
