import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page">
      <p className="eyebrow">Field record</p>
      <h1>That page is not on the demo record.</h1>
      <p className="lede">The houses that exist are the four seeded ones.</p>
      <p className="back">
        <Link href="/">Back to dispatch</Link>
      </p>
    </div>
  );
}
