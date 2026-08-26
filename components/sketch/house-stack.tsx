import type { SketchLayerId } from "@/lib/sketch";

type Props = {
  activeId: SketchLayerId;
  onSelect?: (id: SketchLayerId) => void;
};

const INK = "#14211C";
const CANOPY = "#2C5145";
const SAGE = "#7FB3A0";
const BRASS = "#8F6620";
const STUCCO = "#E7EBE4";
const TILE = "#2A4A40";
const GLASS = "#C9D8D0";
const LAWN = "#D4DDD2";

function layerClass(id: SketchLayerId, activeId: SketchLayerId) {
  return `hp-layer${activeId === id ? " is-active" : " is-dim"}`;
}

export function HouseStack({ activeId, onSelect }: Props) {
  return (
    <svg
      viewBox="0 0 300 378"
      role="img"
      aria-labelledby="house-stack-title house-stack-desc"
    >
      <title id="house-stack-title">
        House taken apart into the jobs Banyan coordinates
      </title>
      <desc id="house-stack-desc">
        A front elevation of a one-story house, already apart. Tap a system in
        the list to read it. Roof, tree, gutters, shutters, HVAC, dryer vent,
        water heater, and irrigation.
      </desc>

      <g
        className={layerClass("irrigation", activeId)}
        onClick={() => onSelect?.("irrigation")}
      >
        <rect x="10" y="328" width="280" height="40" fill={LAWN} stroke={INK} strokeWidth="1.1" />
        {[46, 96, 150, 204, 254].map((x) => (
          <g key={x}>
            <ellipse cx={x} cy="342" rx="14" ry="7" fill={SAGE} className="hp-spray" />
            <circle cx={x} cy="352" r="3.6" fill={BRASS} stroke={INK} strokeWidth="0.8" />
          </g>
        ))}
      </g>

      <g
        className={layerClass("heater", activeId)}
        onClick={() => onSelect?.("heater")}
      >
        <rect x="248" y="278" width="32" height="46" rx="12" fill="#E4E8E1" stroke={INK} strokeWidth="1.15" />
        <ellipse cx="264" cy="278" rx="16" ry="7" fill="#F3F5F0" stroke={INK} strokeWidth="1.15" />
        <path d="M264 270 v-10" fill="none" stroke={INK} strokeWidth="1.5" />
      </g>

      <g
        className={layerClass("hvac", activeId)}
        onClick={() => onSelect?.("hvac")}
      >
        <rect x="246" y="222" width="46" height="36" fill="#DDE3DA" stroke={INK} strokeWidth="1.2" />
        {[232, 240, 248, 256].map((y) => (
          <path
            key={y}
            d={`M254 ${y} H284`}
            fill="none"
            stroke={CANOPY}
            strokeWidth="1.15"
            opacity="0.7"
          />
        ))}
      </g>

      <g
        className={layerClass("dryer", activeId)}
        onClick={() => onSelect?.("dryer")}
      >
        <rect x="44" y="248" width="16" height="16" fill="#DDE3DA" stroke={INK} strokeWidth="1.1" />
        <path d="M44 256 H28" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="24" cy="256" r="5.5" fill={STUCCO} stroke={INK} strokeWidth="1.1" />
      </g>

      <g>
        <rect x="64" y="168" width="172" height="150" fill={STUCCO} stroke={INK} strokeWidth="1.25" />
        <Window x="80" y="196" />
        <Window x="184" y="196" />
        <rect x="132" y="214" width="36" height="104" fill={CANOPY} stroke={INK} strokeWidth="1.2" />
        <circle cx="161" cy="270" r="2.2" fill={BRASS} />
      </g>

      <g
        className={layerClass("shutters", activeId)}
        onClick={() => onSelect?.("shutters")}
      >
        <Shutter x="68" y="196" />
        <Shutter x="122" y="196" />
        <Shutter x="172" y="196" />
        <Shutter x="226" y="196" />
      </g>

      <g
        className={layerClass("gutters", activeId)}
        onClick={() => onSelect?.("gutters")}
      >
        <path d="M56 154 H244" fill="none" stroke={BRASS} strokeWidth="4" strokeLinecap="round" />
        <path d="M236 154 V318" fill="none" stroke={BRASS} strokeWidth="2.6" strokeLinecap="round" />
      </g>

      <g
        className={layerClass("roof", activeId)}
        onClick={() => onSelect?.("roof")}
      >
        <ellipse cx="48" cy="78" rx="36" ry="22" fill="#243F36" />
        <ellipse cx="68" cy="68" rx="34" ry="24" fill={CANOPY} />
        <ellipse cx="86" cy="80" rx="22" ry="16" fill={SAGE} opacity="0.8" />
        <path d="M66 118 C64 100 62 86 70 70" fill="none" stroke="#1A3029" strokeWidth="6" strokeLinecap="round" />
        <polygon
          points="150,22 54,132 246,132"
          fill={TILE}
          stroke={INK}
          strokeWidth="1.25"
        />
        <path
          d="M78 112 L150 42 L222 112"
          fill="none"
          stroke={SAGE}
          strokeWidth="1.1"
          opacity="0.55"
        />
      </g>
    </svg>
  );
}

function Window({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <rect x={x} y={y} width="36" height="48" fill={GLASS} stroke={INK} strokeWidth="1.15" />
      <path d={`M${x + 18} ${y} V${y + 48} M${x} ${y + 22} H${x + 36}`} fill="none" stroke={INK} strokeWidth="0.8" opacity="0.55" />
    </g>
  );
}

function Shutter({ x, y }: { x: number; y: number }) {
  return (
    <rect x={x} y={y} width="10" height="48" fill={CANOPY} stroke={INK} strokeWidth="1" />
  );
}
