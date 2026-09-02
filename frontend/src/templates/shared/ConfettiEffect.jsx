import React from 'react';

export function ConfettiEffect({ count = 12 }) {
  const colors = ['#E05368', '#F1C40F', '#2ECC71', '#3498DB', '#9B59B6', '#E67E22'];
  const confettiPieces = Array.from({ length: count }, (_, i) => ({
    id: i,
    color: colors[i % colors.length],
    left: `${(i * 100) / count + (i % 3) * 2}%`,
    animationDelay: `${(i * 0.3).toFixed(1)}s`,
    animationDuration: `${3 + (i % 3)}s`,
    size: 6 + (i % 4) * 2
  }));

  return (
    <div className="confetti-container" aria-hidden="true">
      {confettiPieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            backgroundColor: piece.color,
            left: piece.left,
            animationDelay: piece.animationDelay,
            animationDuration: piece.animationDuration,
            width: `${piece.size}px`,
            height: `${piece.size * 1.5}px`
          }}
        />
      ))}
    </div>
  );
}

export default ConfettiEffect;
