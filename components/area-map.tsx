/**
 * A drawn map of the year-one radius, in brand colours. Schematic on purpose —
 * it orients rather than locates, which is why it says so on its face. Static
 * SVG: no embed, no third-party script, no light-theme iframe to fight.
 */
const hoods = [
  { id: "hyde", name: "Hyde Park", zip: "33606", points: "330,52 452,56 456,152 336,150" },
  { id: "beach", name: "Beach Park", zip: "33609", points: "168,150 262,152 260,258 176,256" },
  { id: "palma", name: "Palma Ceia", zip: "33629", points: "274,172 384,176 380,288 270,284" },
  { id: "culbreath", name: "Culbreath Isles", zip: "33609", points: "122,268 190,264 196,352 130,352" },
  { id: "sunset", name: "Sunset Park", zip: "33629", points: "204,272 264,272 262,372 208,368" },
  { id: "bayshore", name: "Bayshore", zip: "33611", points: "396,178 448,184 424,436 384,424" },
  { id: "harbour", name: "Harbour Island", zip: "33602", points: "508,96 566,102 570,152 512,150" },
];

export function AreaMap() {
  return (
    <div className="areamap">
      <svg viewBox="0 0 620 780" role="img" aria-labelledby="areamap-title areamap-desc">
        <title id="areamap-title">Banyan Home Co. year-one service area</title>
        <desc id="areamap-desc">
          A schematic map of the South Tampa peninsula showing the eight
          neighbourhoods served in year one: Hyde Park, Palma Ceia, Beach Park,
          Davis Islands, Harbour Island, Bayshore, Sunset Park and Culbreath
          Isles, across ZIP codes 33606, 33609, 33611 and 33629.
        </desc>
        <polygon
          className="areamap__land"
          points="150,26 470,26 492,180 470,332 442,472 402,600 352,702 300,764 250,690 210,568 176,438 146,298 130,158"
        />
        {hoods.map((hood) => (
          <polygon key={hood.id} className="areamap__hood" points={hood.points}>
            <title>{`${hood.name} · ${hood.zip}`}</title>
          </polygon>
        ))}
        <path className="areamap__hood" d="M512,196 L572,206 L578,296 L522,304 Z M528,314 L574,320 L570,370 L532,364 Z">
          <title>Davis Islands · 33606</title>
        </path>
        <text className="areamap__water" transform="translate(44,486) rotate(-90)">
          Old Tampa Bay
        </text>
        <text className="areamap__water" transform="translate(600,596) rotate(-90)">
          Hillsborough Bay
        </text>
        <text className="areamap__note" x="14" y="766">
          Schematic · not to scale
        </text>
      </svg>
    </div>
  );
}
