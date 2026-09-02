import React from 'react';

export function CharacterCounter({ current = 0, max = 500 }) {
  const isNearLimit = current > max * 0.85;
  const isOverLimit = current > max;

  return (
    <div className="char-counter-wrapper" aria-live="polite">
      <span className={`char-counter-text ${isOverLimit ? 'char-over-limit' : isNearLimit ? 'char-near-limit' : ''}`}>
        {current} / {max}
      </span>
    </div>
  );
}

export default CharacterCounter;
