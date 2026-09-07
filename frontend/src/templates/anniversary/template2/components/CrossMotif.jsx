import React from 'react';

/**
 * CrossMotif component
 * Tasteful, delicate Christian cross ornament for elegant marriage blessings.
 */
export function CrossMotif({ size = 28, className = '' }) {
  return (
    <div className={`grace-cross-motif ${className}`} style={{ width: size, height: size * 1.4 }}>
      <svg
        viewBox="0 0 40 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="grace-cross-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="crossGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFBF6A" />
            <stop offset="50%" stopColor="#C99D3B" />
            <stop offset="100%" stopColor="#9C7728" />
          </linearGradient>
          <filter id="crossGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#C99D3B" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Vertical Beam */}
        <path
          d="M20 4 L20 52"
          stroke="url(#crossGoldGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#crossGlow)"
        />

        {/* Horizontal Beam */}
        <path
          d="M8 18 L32 18"
          stroke="url(#crossGoldGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#crossGlow)"
        />

        {/* Delicate Center Floral / Trefoil Detail */}
        <circle cx="20" cy="18" r="2.2" fill="#FFF8E0" stroke="#C99D3B" strokeWidth="0.8" />

        {/* End Accents (Trefoil Points) */}
        <circle cx="20" cy="4" r="1.5" fill="#C99D3B" />
        <circle cx="20" cy="52" r="1.5" fill="#C99D3B" />
        <circle cx="8" cy="18" r="1.5" fill="#C99D3B" />
        <circle cx="32" cy="18" r="1.5" fill="#C99D3B" />
      </svg>
    </div>
  );
}

export default CrossMotif;
