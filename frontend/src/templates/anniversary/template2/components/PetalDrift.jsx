import React, { useMemo } from 'react';

/**
 * PetalDrift component
 * Calm, serene, peaceful floating white & ivory rose petals.
 * Creates a tranquil, blessed atmosphere.
 */
export function PetalDrift({ density = 'gentle' }) {
  const count = density === 'blessing' ? 22 : 14;

  const petals = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const left = (i * (100 / count) + (Math.random() * 5 - 2.5)).toFixed(1);
      const delay = (Math.random() * 6).toFixed(2);
      const duration = (8 + Math.random() * 6).toFixed(2);
      const scale = (0.65 + Math.random() * 0.5).toFixed(2);
      const sway = (15 + Math.random() * 25).toFixed(0);
      const isBlush = i % 3 === 0;

      items.push({
        id: `drift-${i}`,
        isBlush,
        style: {
          left: `${Math.max(2, Math.min(98, left))}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          transform: `scale(${scale})`,
          '--sway-drift': `${sway}px`
        }
      });
    }
    return items;
  }, [count]);

  return (
    <div className="grace-petal-drift-container" aria-hidden="true">
      {petals.map((p) => (
        <div key={p.id} className="grace-petal-particle" style={p.style}>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
            <path
              d="M12 2C7 6 4 12 6 18c2 4 8 4 11 1s4-9-5-17z"
              fill={p.isBlush ? 'url(#graceBlushGrad)' : 'url(#graceIvoryGrad)'}
              opacity="0.85"
            />
            <defs>
              <linearGradient id="graceIvoryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FAF7F2" />
                <stop offset="100%" stopColor="#EDE2D4" />
              </linearGradient>
              <linearGradient id="graceBlushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="60%" stopColor="#FCECEF" />
                <stop offset="100%" stopColor="#EAB5BF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      ))}
    </div>
  );
}

export default PetalDrift;
