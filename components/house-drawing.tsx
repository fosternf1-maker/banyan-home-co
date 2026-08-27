/**
 * Still brochure drawings. No labels, no geography, no exploded layers.
 */
export function HouseDrawing() {
  return (
    <svg
      className="house-drawing"
      viewBox="0 0 640 420"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter id="hd-grain" x="-4%" y="-4%" width="108%" height="108%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            result="n"
          />
          <feColorMatrix in="n" type="saturate" values="0" result="g" />
          <feBlend in="SourceGraphic" in2="g" mode="multiply" />
        </filter>
        <linearGradient id="hd-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7FB3A0" stopOpacity="0.28" />
          <stop offset="48%" stopColor="#EFF1ED" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#EFF1ED" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="hd-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F7F8F5" />
          <stop offset="100%" stopColor="#D5DDD2" />
        </linearGradient>
        <linearGradient id="hd-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3D6B5A" />
          <stop offset="100%" stopColor="#2C5145" />
        </linearGradient>
        <linearGradient id="hd-oak" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#4A7A68" />
          <stop offset="100%" stopColor="#2C5145" />
        </linearGradient>
      </defs>

      <rect width="640" height="420" fill="#EFF1ED" />
      <rect width="640" height="420" fill="url(#hd-sky)" />
      <rect
        width="640"
        height="420"
        fill="#14211C"
        opacity="0.035"
        filter="url(#hd-grain)"
      />

      <g>
        <ellipse cx="92" cy="168" rx="58" ry="42" fill="#7FB3A0" opacity="0.28" />
        <ellipse cx="148" cy="132" rx="64" ry="48" fill="#2C5145" opacity="0.22" />
        <path
          d="M 28 352 C 34 292 16 242 42 198 C 18 186 14 142 52 128 C 38 92 76 64 118 88 C 130 48 188 42 210 86 C 246 62 280 96 256 132 C 292 146 282 198 248 208 C 258 248 236 304 222 352"
          fill="url(#hd-oak)"
          opacity="0.9"
        />
        <path
          d="M 118 352 L 124 236 M 86 186 C 108 172 146 178 168 206 M 148 150 C 132 168 128 198 136 228"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.38"
        />
      </g>

      <ellipse cx="336" cy="358" rx="268" ry="24" fill="#2C5145" opacity="0.1" />
      <path
        d="M 18 354 C 140 338 280 366 408 348 C 512 334 598 358 630 348"
        fill="none"
        stroke="#2C5145"
        strokeWidth="1.25"
        strokeLinecap="round"
        opacity="0.38"
      />

      <g>
        <path
          d="M 164 172 L 348 88 L 532 172 L 510 182 L 348 110 L 186 182 Z"
          fill="url(#hd-roof)"
        />
        <path
          d="M 164 172 L 348 88 L 532 172"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.65"
          strokeLinejoin="round"
        />
        <path
          d="M 186 182 L 348 110 L 510 182"
          fill="none"
          stroke="#0E1714"
          strokeWidth="0.7"
          opacity="0.35"
        />

        <rect x="424" y="104" width="22" height="52" fill="#5C6E66" />
        <rect x="420" y="98" width="30" height="8" fill="#2C5145" />
        <rect
          x="424"
          y="104"
          width="22"
          height="52"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.1"
        />

        <path d="M 186 182 L 510 182 L 510 340 L 186 340 Z" fill="url(#hd-wall)" />
        <path
          d="M 186 182 L 510 182 L 510 340 L 186 340 Z"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.5"
        />

        <path
          d="M 246 222 L 348 188 L 450 222 L 442 230 L 348 200 L 254 230 Z"
          fill="#2C5145"
        />
        <path
          d="M 246 222 L 348 188 L 450 222"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />

        <path
          d="M 254 230 L 442 230 L 442 340 L 254 340 Z"
          fill="#F4F6F2"
          opacity="0.72"
        />
        <path
          d="M 254 230 L 442 230 L 442 340"
          fill="none"
          stroke="#14211C"
          strokeWidth="1.15"
        />

        <rect
          x="266"
          y="230"
          width="11"
          height="110"
          fill="#EFF1ED"
          stroke="#14211C"
          strokeWidth="1.1"
        />
        <rect
          x="419"
          y="230"
          width="11"
          height="110"
          fill="#EFF1ED"
          stroke="#14211C"
          strokeWidth="1.1"
        />
        <rect x="262" y="226" width="19" height="7" fill="#2C5145" />
        <rect x="415" y="226" width="19" height="7" fill="#2C5145" />

        <rect
          x="326"
          y="254"
          width="44"
          height="86"
          fill="#2C5145"
          stroke="#14211C"
          strokeWidth="1.2"
        />
        <line
          x1="348"
          y1="256"
          x2="348"
          y2="338"
          stroke="#14211C"
          strokeWidth="0.7"
          opacity="0.4"
        />
        <rect
          x="334"
          y="264"
          width="12"
          height="15"
          fill="#7FB3A0"
          opacity="0.5"
          stroke="#14211C"
          strokeWidth="0.55"
        />
        <rect
          x="350"
          y="264"
          width="12"
          height="15"
          fill="#7FB3A0"
          opacity="0.5"
          stroke="#14211C"
          strokeWidth="0.55"
        />
        <circle cx="364" cy="300" r="2.5" fill="#8F6620" />
        <rect
          x="326"
          y="238"
          width="44"
          height="14"
          fill="#7FB3A0"
          opacity="0.4"
          stroke="#14211C"
          strokeWidth="0.9"
        />

        <g>
          <rect
            x="204"
            y="232"
            width="36"
            height="48"
            fill="#7FB3A0"
            opacity="0.42"
            stroke="#14211C"
            strokeWidth="1.15"
          />
          <line
            x1="222"
            y1="232"
            x2="222"
            y2="280"
            stroke="#14211C"
            strokeWidth="0.7"
          />
          <line
            x1="204"
            y1="256"
            x2="240"
            y2="256"
            stroke="#14211C"
            strokeWidth="0.7"
          />
          <path
            d="M 202 232 L 222 220 L 242 232"
            fill="none"
            stroke="#14211C"
            strokeWidth="1.1"
          />
          <rect x="200" y="232" width="6" height="48" fill="#2C5145" />
          <rect x="238" y="232" width="6" height="48" fill="#2C5145" />
        </g>

        <g>
          <rect
            x="456"
            y="232"
            width="36"
            height="48"
            fill="#7FB3A0"
            opacity="0.42"
            stroke="#14211C"
            strokeWidth="1.15"
          />
          <line
            x1="474"
            y1="232"
            x2="474"
            y2="280"
            stroke="#14211C"
            strokeWidth="0.7"
          />
          <line
            x1="456"
            y1="256"
            x2="492"
            y2="256"
            stroke="#14211C"
            strokeWidth="0.7"
          />
          <path
            d="M 454 232 L 474 220 L 494 232"
            fill="none"
            stroke="#14211C"
            strokeWidth="1.1"
          />
          <rect x="452" y="232" width="6" height="48" fill="#2C5145" />
          <rect x="490" y="232" width="6" height="48" fill="#2C5145" />
        </g>

        <path
          d="M 312 340 L 384 340 L 392 354 L 304 354 Z"
          fill="#D6DED4"
          stroke="#14211C"
          strokeWidth="1"
        />
        <path
          d="M 308 354 L 388 354 L 394 366 L 302 366 Z"
          fill="#C4CFC3"
          stroke="#14211C"
          strokeWidth="1"
        />
        <line
          x1="186"
          y1="340"
          x2="510"
          y2="340"
          stroke="#14211C"
          strokeWidth="1.7"
        />

        <g opacity="0.72">
          <rect
            x="526"
            y="310"
            width="36"
            height="28"
            rx="2"
            fill="#D8E0D6"
            stroke="#14211C"
            strokeWidth="1"
          />
          <line
            x1="532"
            y1="318"
            x2="556"
            y2="318"
            stroke="#14211C"
            strokeWidth="0.6"
          />
          <line
            x1="532"
            y1="324"
            x2="556"
            y2="324"
            stroke="#14211C"
            strokeWidth="0.6"
          />
          <line
            x1="532"
            y1="330"
            x2="556"
            y2="330"
            stroke="#14211C"
            strokeWidth="0.6"
          />
        </g>
      </g>

      <g opacity="0.58">
        <ellipse cx="612" cy="214" rx="42" ry="32" fill="#7FB3A0" opacity="0.45" />
        <path
          d="M 558 352 C 568 300 548 258 580 228 C 562 204 576 172 610 182 C 620 152 656 162 650 196 C 678 208 672 250 642 258 C 654 292 636 332 620 352"
          fill="#2C5145"
        />
      </g>
    </svg>
  );
}

export function OakDrawing() {
  return (
    <svg
      className="oak-drawing"
      viewBox="0 0 220 96"
      xmlns="http://www.w3.org/2000/svg"
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <ellipse cx="78" cy="38" rx="52" ry="28" fill="#7FB3A0" opacity="0.22" />
      <path
        d="M 18 78 C 24 52 12 30 30 18 C 16 6 36 -4 52 10 C 62 -8 92 -6 98 16 C 118 4 140 18 126 36 C 148 42 140 66 120 70 C 116 84 94 92 74 78"
        fill="#2C5145"
        opacity="0.16"
      />
      <path
        d="M 18 78 C 24 52 12 30 30 18 C 16 6 36 -4 52 10 C 62 -8 92 -6 98 16 C 118 4 140 18 126 36 C 148 42 140 66 120 70"
        fill="none"
        stroke="#2C5145"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M 62 78 L 68 28 M 48 42 C 60 34 78 36 88 52 M 78 36 C 86 48 90 62 86 74"
        fill="none"
        stroke="#14211C"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.42"
      />
      <path
        d="M 132 48 C 158 40 188 56 208 46"
        fill="none"
        stroke="#7FB3A0"
        strokeWidth="1.15"
        opacity="0.85"
      />
    </svg>
  );
}
