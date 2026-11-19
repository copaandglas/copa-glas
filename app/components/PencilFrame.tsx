import type { ReactNode } from "react";

/**
 * A ruled border drawn around an image, as if in graphite on paper. The four
 * lines run a little past each corner, as a draughtsman's lines do, and carry
 * a faint grain and waver so they read as drawn, not printed.
 */
export default function PencilFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative p-3 md:p-4 ${className}`}>
      {children}
      <svg
        aria-hidden
        className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
      >
        <defs>
          <filter id="pencil-line" x="-5%" y="-5%" width="110%" height="110%">
            {/* A slow waver, so the line is not ruler-straight. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="1" seed="7" result="waver" />
            <feDisplacementMap in="SourceGraphic" in2="waver" scale="1.1" xChannelSelector="R" yChannelSelector="G" result="drawn" />
            {/* Fine grain, where the graphite catches the paper. */}
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" seed="3" result="grain" />
            <feColorMatrix in="grain" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0.6 0 0 0 0.5" result="grainMask" />
            <feComposite in="drawn" in2="grainMask" operator="in" />
          </filter>
        </defs>
        <g
          filter="url(#pencil-line)"
          stroke="#2e2c2a"
          strokeOpacity="0.55"
          strokeWidth="1"
          strokeLinecap="round"
          fill="none"
        >
          {/* Each corner overshoots by a slightly different amount, as by hand. */}
          <line x1="-1.2%" y1="0" x2="101.8%" y2="0" />
          <line x1="100%" y1="-1.6%" x2="100%" y2="101%" />
          <line x1="-1.9%" y1="100%" x2="101.3%" y2="100%" />
          <line x1="0" y1="-1%" x2="0" y2="101.6%" />
        </g>
      </svg>
    </div>
  );
}
