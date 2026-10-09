import type { SourceLink } from "@/lib/hurricane";

export function SourceList({ sources }: { sources: SourceLink[] }) {
  return (
    <section className="hurr-sources" aria-labelledby="sources-heading">
      <h2 id="sources-heading">Sources</h2>
      <ul>
        {sources.map((source) => (
          <li key={source.href}>
            <a href={source.href} rel="noreferrer">
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
