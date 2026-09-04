import React, { useState } from 'react';
import { SparkleIcon, HandDrawnHeart, BotanicalFlourish } from '../components/DoodleAccents.jsx';
import valAudio from '../utils/SoundEffects.js';

export default function Page1Intro({ data, onNext }) {
  const [isOpening, setIsOpening] = useState(false);
  const recipientName = data.recipientName || 'You';

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    valAudio.playSparkle();
    setTimeout(() => {
      onNext();
    }, 650);
  };

  return (
    <div className={`val-page val-page-intro ${isOpening ? 'val-envelope-opening' : ''}`}>
      {/* Decorative ambient background accents */}
      <div className="val-ambient-sparkles" aria-hidden="true">
        <SparkleIcon className="sparkle-1" />
        <SparkleIcon className="sparkle-2" />
        <SparkleIcon className="sparkle-3" />
      </div>

      <div className="val-intro-card">
        {/* Top handwritten greeting */}
        <div className="val-intro-header">
          <span className="val-whisper-tag">A secret note for</span>
          <h1 className="val-intro-recipient">
            Hey {recipientName}
            <span className="val-dot-pulse">...</span>
          </h1>
        </div>

        {/* Interactive Sealed Envelope / Love Note Visual */}
        <div
          className="val-interactive-envelope"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleOpen()}
          aria-label="Open your Valentine love letter"
        >
          <div className="val-env-flap" />
          <div className="val-env-pocket">
            <div className="val-letter-peeking">
              <span className="val-peek-text">To the one who has my heart</span>
              <HandDrawnHeart className="val-peek-heart" />
            </div>
          </div>
          <div className="val-wax-seal-btn" title="Click to open">
            <span className="val-seal-heart">♥</span>
            <span className="val-seal-ripple" />
          </div>
        </div>

        {/* Message and Call to Action */}
        <div className="val-intro-action-wrap">
          <p className="val-intro-subtext">
            I put a little piece of my heart into this for you.
          </p>

          <button
            type="button"
            className="val-btn-primary val-intro-open-btn"
            onClick={handleOpen}
          >
            <span>Open it</span>
            <span className="val-btn-heart">♥</span>
          </button>
        </div>

        <BotanicalFlourish className="val-intro-flourish" />
      </div>
    </div>
  );
}
