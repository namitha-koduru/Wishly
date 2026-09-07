import { useMemo } from "react";

// A lightweight decorative burst of floating hearts / confetti bits.
// count controls density, symbols controls which glyphs are used.
export default function FloatingHearts({ count = 14, symbols = ["💗", "💕", "💖"] }) {
  const hearts = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 1.2,
        duration: 2.6 + Math.random() * 2,
        size: 14 + Math.random() * 18,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      })),
    [count, symbols]
  );

  return (
    <div className="floating-hearts" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-hearts__item"
          style={{
            left: `${h.left}%`,
            animationDelay: `${h.delay}s`,
            animationDuration: `${h.duration}s`,
            fontSize: `${h.size}px`,
          }}
        >
          {h.symbol}
        </span>
      ))}
    </div>
  );
}
