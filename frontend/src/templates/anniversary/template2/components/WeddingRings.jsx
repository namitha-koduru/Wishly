import React from 'react';

/**
 * WeddingRings component
 * High-fidelity, elegant vector SVG of two intertwined gold wedding bands with soft reflection and light shimmer.
 */
export function WeddingRings({ size = 160, className = '' }) {
  return (
    <div className={`grace-wedding-rings-wrapper ${className}`} style={{ width: size, height: size * 0.65 }}>
      <svg
        viewBox="0 0 200 130"
        className="grace-wedding-rings-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          {/* Gold Band Linear Gradient */}
          <linearGradient id="ringGoldGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="25%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#FFF9E5" />
            <stop offset="75%" stopColor="#C99D3B" />
            <stop offset="100%" stopColor="#8A671F" />
          </linearGradient>

          <linearGradient id="ringGoldGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF8E0" />
            <stop offset="30%" stopColor="#DFC06A" />
            <stop offset="60%" stopColor="#FFF3D0" />
            <stop offset="85%" stopColor="#B38B2F" />
            <stop offset="100%" stopColor="#7A5817" />
          </linearGradient>

          {/* Diamond Shimmer Gradient */}
          <radialGradient id="diamondShine" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#EAF2F8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#A9CCE3" stopOpacity="0" />
          </radialGradient>

          {/* Soft Shadow */}
          <filter id="ringSoftShadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#7A5817" floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Ambient Ring Glow / Halo */}
        <ellipse cx="100" cy="75" rx="80" ry="30" fill="rgba(230, 195, 100, 0.08)" />

        {/* Left Ring (Groom Band) */}
        <g filter="url(#ringSoftShadow)">
          <ellipse
            cx="75"
            cy="68"
            rx="42"
            ry="24"
            transform="rotate(-18 75 68)"
            stroke="url(#ringGoldGrad1)"
            strokeWidth="9"
            fill="none"
          />
          {/* Inner Band Shadow/Edge */}
          <ellipse
            cx="75"
            cy="68"
            rx="37.5"
            ry="19.5"
            transform="rotate(-18 75 68)"
            stroke="rgba(120, 85, 20, 0.4)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Highlight Shimmer on top rim */}
          <path
            d="M 45 52 C 55 42, 85 45, 95 58"
            stroke="#FFFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* Right Ring with Solitaire Accent (Bride Band) */}
        <g filter="url(#ringSoftShadow)">
          <ellipse
            cx="125"
            cy="68"
            rx="42"
            ry="24"
            transform="rotate(18 125 68)"
            stroke="url(#ringGoldGrad2)"
            strokeWidth="8.5"
            fill="none"
          />
          {/* Inner Edge */}
          <ellipse
            cx="125"
            cy="68"
            rx="37.5"
            ry="19.5"
            transform="rotate(18 125 68)"
            stroke="rgba(120, 85, 20, 0.4)"
            strokeWidth="1.2"
            fill="none"
          />
          {/* Solitaire Diamond Setting Mount */}
          <g transform="translate(136, 42)">
            {/* Prong Setting */}
            <path d="M-3 6 L0 0 L3 6 Z" fill="#E5C158" />
            {/* Diamond Gem */}
            <circle cx="0" cy="0" r="5" fill="url(#diamondShine)" stroke="#E0E6ED" strokeWidth="0.75" />
            {/* Gem Star Shimmer Sparkle */}
            <path
              d="M0 -4 L1 -1 L4 0 L1 1 L0 4 L-1 1 L-4 0 L-1 -1 Z"
              fill="#FFFFFF"
              className="grace-diamond-sparkle"
            />
          </g>
          {/* Highlight Shimmer */}
          <path
            d="M 105 58 C 115 45, 145 42, 155 52"
            stroke="#FFFDF5"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.85"
          />
        </g>

        {/* Intertwining Front Segment overlap */}
        <path
          d="M 92 62 C 98 68, 104 74, 107 80"
          stroke="url(#ringGoldGrad2)"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

export default WeddingRings;
