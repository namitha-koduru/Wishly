import React from 'react';

export function FloatingHeartsEffect({ count = 8 }) {
  const hearts = ['❤️', '💖', '✨', '💕', '🌸', '💌'];
  const heartPieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: hearts[i % hearts.length],
    left: `${(i * 100) / count + (i % 2) * 5}%`,
    animationDelay: `${(i * 0.4).toFixed(1)}s`,
    animationDuration: `${4 + (i % 3)}s`,
    fontSize: `${14 + (i % 3) * 4}px`
  }));

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {heartPieces.map((piece) => (
        <span
          key={piece.id}
          className="floating-heart-piece"
          style={{
            left: piece.left,
            animationDelay: piece.animationDelay,
            animationDuration: piece.animationDuration,
            fontSize: piece.fontSize
          }}
        >
          {piece.emoji}
        </span>
      ))}
    </div>
  );
}

export default FloatingHeartsEffect;
