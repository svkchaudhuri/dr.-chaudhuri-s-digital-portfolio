import type { ComponentType, SVGProps } from "react";

type G = ComponentType<SVGProps<SVGSVGElement>>;

const base = {
  viewBox: "0 0 320 140",
  fill: "none",
  role: "img" as const,
  preserveAspectRatio: "xMidYMid meet",
};

/** Control loop with phase trajectory - nonlinear & adaptive control. */
export const ControlLoopGraphic: G = (props) => (
  <svg {...base} aria-label="Feedback control loop with a phase-plane trajectory" {...props}>
    <g stroke="currentColor" strokeWidth="1.1" className="text-primary/35">
      <path d="M14 52h32M92 52h34M172 52h34M254 52v34H14V64" />
      <path d="M14 64v-12" />
    </g>
    {[
      [46, "Ctrl"],
      [126, "Plant"],
      [206, "Sens"],
    ].map(([x, label]) => (
      <g key={label as string}>
        <rect x={x as number} y="36" width="48" height="32" rx="4" className="fill-primary/10 stroke-primary/45" strokeWidth="1.1" />
        <text x={(x as number) + 24} y="56" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="monospace">{label}</text>
      </g>
    ))}
    <circle cx="254" cy="52" r="3" className="fill-primary" />
    <path d="M20 130c26 0 34-10 40-26s12-32 30-32 24 16 30 30 14 24 36 24 38-12 48-24"
      className="stroke-highlight" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    <path d="M20 130c26 0 34-10 40-26" className="stroke-primary/50" strokeWidth="1.6" strokeDasharray="3 4" fill="none" />
  </svg>
);

/** Hull with canting keel and wave field - maritime roll stabilisation. */
export const MaritimeGraphic: G = (props) => (
  <svg {...base} aria-label="Vessel hull with canting keel in a wave field" {...props}>
    <g className="stroke-primary/30" strokeWidth="1">
      {[96, 110, 124].map((y) => (
        <path key={y} d={`M4 ${y}q20-9 40 0t40 0 40 0 40 0 40 0 40 0 40 0 36 0`} fill="none" />
      ))}
    </g>
    <g transform="rotate(-8 160 70)">
      <path d="M104 54h112l-14 30H118z" className="fill-primary/12 stroke-primary/55" strokeWidth="1.3" />
      <path d="M120 54V36h34v18" className="fill-primary/5 stroke-primary/45" strokeWidth="1.1" />
      <path d="M160 84l24 38" className="stroke-highlight" strokeWidth="3" strokeLinecap="round" />
      <circle cx="184" cy="122" r="6" className="fill-highlight/80" />
      <path d="M160 84v34" className="stroke-primary/35" strokeWidth="1" strokeDasharray="3 3" />
      <path d="M160 108a18 18 0 0 0 16-8" className="stroke-primary/50" strokeWidth="1" fill="none" />
    </g>
  </svg>
);

/** Stewart platform with hydraulic cylinders. */
export const StewartGraphic: G = (props) => (
  <svg {...base} aria-label="Six degree-of-freedom Stewart platform with hydraulic actuators" {...props}>
    <ellipse cx="160" cy="34" rx="72" ry="16" className="fill-primary/12 stroke-primary/55" strokeWidth="1.3" />
    <ellipse cx="160" cy="116" rx="104" ry="20" className="fill-primary/5 stroke-primary/40" strokeWidth="1.2" />
    {([
      [104, 40, 66, 114],
      [116, 32, 128, 122],
      [196, 32, 192, 122],
      [216, 40, 254, 114],
      [150, 48, 100, 120],
      [170, 48, 222, 120],
    ] as [number, number, number, number][]).map(([x1, y1, x2, y2]) => (
      <g key={`${x1}-${x2}`}>
        <path d={`M${x1} ${y1}L${x2} ${y2}`} className="stroke-primary/55" strokeWidth="3.2" strokeLinecap="round" />
        <path d={`M${(x1 + x2) / 2} ${(y1 + y2) / 2}L${x2} ${y2}`} className="stroke-highlight" strokeWidth="1.6" strokeLinecap="round" />
      </g>
    ))}
    <circle cx="160" cy="34" r="4" className="fill-primary" />
  </svg>
);

/** Vapour-compression / heat-pump cycle. */
export const ThermalGraphic: G = (props) => (
  <svg {...base} aria-label="Heat pump and refrigeration cycle schematic" {...props}>
    <rect x="60" y="22" width="200" height="96" rx="10" className="stroke-primary/45" strokeWidth="1.2" fill="none" />
    <rect x="108" y="10" width="104" height="24" rx="4" className="fill-primary/10 stroke-primary/50" strokeWidth="1.1" />
    <text x="160" y="26" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-primary">CONDENSER</text>
    <rect x="108" y="106" width="104" height="24" rx="4" className="fill-highlight/15 stroke-highlight/60" strokeWidth="1.1" />
    <text x="160" y="122" textAnchor="middle" fontSize="9" fontFamily="monospace" className="fill-foreground/70">EVAPORATOR</text>
    <circle cx="260" cy="70" r="15" className="fill-primary/10 stroke-primary/55" strokeWidth="1.2" />
    <path d="M254 70h12M260 64v12" className="stroke-primary" strokeWidth="1.2" />
    <path d="M52 58l16 12-16 12z" className="fill-highlight/60" />
    <g className="stroke-primary/45" strokeWidth="1" strokeDasharray="3 3">
      <path d="M130 2v6M160 2v6M190 2v6M130 132v6M160 132v6M190 132v6" />
    </g>
  </svg>
);

/** Cell imaging with visual servoing loop. */
export const BioGraphic: G = (props) => (
  <svg {...base} aria-label="Cell imaging with a visual servoing feedback path" {...props}>
    <circle cx="96" cy="70" r="44" className="fill-primary/8 stroke-primary/45" strokeWidth="1.2" />
    <circle cx="96" cy="70" r="16" className="fill-primary/20 stroke-primary/60" strokeWidth="1.1" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx={96 + 30 * Math.cos((a * Math.PI) / 180)} cy={70 + 30 * Math.sin((a * Math.PI) / 180)} r="4" className="fill-highlight/70" />
    ))}
    <g className="stroke-primary/50" strokeWidth="1.1">
      <path d="M150 70h34" />
      <path d="M232 70h30" />
    </g>
    <rect x="184" y="52" width="48" height="36" rx="4" className="fill-primary/10 stroke-primary/50" strokeWidth="1.1" />
    <text x="208" y="74" textAnchor="middle" fontSize="8" fontFamily="monospace" className="fill-primary">VISION</text>
    <path d="M262 70v42H96v-4" className="stroke-highlight" strokeWidth="1.3" strokeDasharray="4 4" fill="none" />
    <path d="M92 112l4-8 4 8z" className="fill-highlight" />
  </svg>
);

export const pillarGraphics: G[] = [ControlLoopGraphic, StewartGraphic, MaritimeGraphic, ThermalGraphic, BioGraphic];
