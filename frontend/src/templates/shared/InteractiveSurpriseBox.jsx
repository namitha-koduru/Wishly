import React, { useState } from 'react';

export function InteractiveSurpriseBox({
  buttonLabel = 'Click to reveal a surprise 🎁',
  surpriseMessage = 'You mean the absolute world to everyone around you! May this year bring endless smiles, wild adventures, and dreams fulfilled.',
  surpriseTitle = 'A Little Secret Just For You'
}) {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <div className="surprise-box-wrapper">
      {!isRevealed ? (
        <div className="surprise-closed-state">
          <p className="surprise-prompt-text">There is one more special note waiting...</p>
          <button
            type="button"
            className="btn btn-primary btn-md surprise-trigger-btn pulse-glow"
            onClick={() => setIsRevealed(true)}
          >
            {buttonLabel}
          </button>
        </div>
      ) : (
        <div className="surprise-revealed-state animate-fade-in">
          <span className="surprise-sparkle-icon">🎉✨</span>
          <h4 className="surprise-revealed-title">{surpriseTitle}</h4>
          <p className="surprise-revealed-msg">"{surpriseMessage}"</p>
        </div>
      )}
    </div>
  );
}

export default InteractiveSurpriseBox;
