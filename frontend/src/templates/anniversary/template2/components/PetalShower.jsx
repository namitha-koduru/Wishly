import React, { useMemo, useEffect, useState } from 'react';

/**
 * PetalShower & Flower Particle System
 * Supports:
 * - 'ambient': Gentle, soft floating white & pink petals with occasional hearts
 * - 'burst': Dramatic 360-degree explosion of petals and flowers
 * - 'shower': Continuous lush flower shower for celebratory moments
 */
export function PetalShower({ mode = 'ambient' }) {
  const [clickSparkles, setClickSparkles] = useState([]);

  // Generate particles based on mode
  const count = mode === 'burst' ? 36 : mode === 'shower' ? 30 : 16;

  const particles = useMemo(() => {
    const types = ['blush-petal', 'white-petal', 'baby-rose', 'cute-heart', 'sparkle'];
    const items = [];

    for (let i = 0; i < count; i++) {
      const type = types[i % types.length];
      const left = (Math.random() * 96 + 2).toFixed(1);
      const delay = mode === 'burst' ? (Math.random() * 0.2).toFixed(2) : (Math.random() * 5).toFixed(2);
      const duration = mode === 'burst' ? (1.6 + Math.random() * 1.2).toFixed(2) : (6 + Math.random() * 4).toFixed(2);
      const scale = (0.6 + Math.random() * 0.7).toFixed(2);
      const angle = (Math.random() * 360).toFixed(0);
      const distance = (80 + Math.random() * 220).toFixed(0);
      const sway = (20 + Math.random() * 40).toFixed(0);

      items.push({
        id: `pt-${i}-${mode}`,
        type,
        style: {
          left: `${left}%`,
          animationDelay: `${delay}s`,
          animationDuration: `${duration}s`,
          '--burst-angle': `${angle}deg`,
          '--burst-dist': `${distance}px`,
          '--sway-amount': `${sway}px`,
          '--particle-scale': scale
        }
      });
    }
    return items;
  }, [count, mode]);

  // Interactive subtle click/tap heart burst anywhere on screen
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      const id = Date.now() + Math.random();
      const cuteEmojis = ['🌸', '♡', '✨', '🎀', '🤍'];
      const emoji = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];

      setClickSparkles((prev) => [...prev.slice(-8), { id, x, y, emoji }]);
      setTimeout(() => {
        setClickSparkles((prev) => prev.filter((p) => p.id !== id));
      }, 1000);
    };

    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, []);

  return (
    <div className={`anniv2-particles-root mode-${mode}`} aria-hidden="true">
      {particles.map((p) => (
        <div key={p.id} className={`anniv2-petal-item anniv2-${p.type}`} style={p.style}>
          {p.type === 'blush-petal' && (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path
                d="M12 2C7 6 4 12 6 18c2 5 8 5 11 2s4-10-5-18z"
                fill="url(#cuteBlushGrad)"
                opacity="0.9"
              />
              <defs>
                <linearGradient id="cuteBlushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FFDDE2" />
                  <stop offset="100%" stopColor="#FFA6B6" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 'white-petal' && (
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
              <path
                d="M12 3C8 7 5 13 7 18c2 4 8 4 10 1s3-9-5-16z"
                fill="url(#cuteWhiteGrad)"
                opacity="0.95"
              />
              <defs>
                <linearGradient id="cuteWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="70%" stopColor="#FFF8F8" />
                  <stop offset="100%" stopColor="#F5E8EA" />
                </linearGradient>
              </defs>
            </svg>
          )}

          {p.type === 'baby-rose' && (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <circle cx="12" cy="12" r="9" fill="#FFCCD5" stroke="#FFA6B6" strokeWidth="1" />
              <path d="M7 10 C6 6, 17 6, 16 10 C15 15, 8 15, 7 10 Z" fill="#FFE5EA" />
              <circle cx="12" cy="11.5" r="2.5" fill="#E86E82" />
            </svg>
          )}

          {p.type === 'cute-heart' && (
            <span className="anniv2-heart-particle">♡</span>
          )}

          {p.type === 'sparkle' && (
            <span className="anniv2-sparkle-particle">✦</span>
          )}
        </div>
      ))}

      {/* Click / Tap interactive burst */}
      {clickSparkles.map((sp) => (
        <span
          key={sp.id}
          className="anniv2-tap-sparkle"
          style={{ left: `${sp.x}px`, top: `${sp.y}px` }}
        >
          {sp.emoji}
        </span>
      ))}
    </div>
  );
}

export default PetalShower;
