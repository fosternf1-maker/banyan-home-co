import type { PrintGroup } from "@/lib/hurricane";

export function CheckList({ groups }: { groups: PrintGroup[] }) {
  return (
    <div className="hurr-groups">
      {groups.map((group) => (
        <section key={group.title} className="hurr-group">
          <h2>{group.title}</h2>
          <ul>
            {group.items.map((item) => (
              <li key={`${group.title}-${item}`}>
                <label className="hurr-check">
                  <input type="checkbox" />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
