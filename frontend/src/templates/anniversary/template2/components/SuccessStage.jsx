import React, { useState } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * SuccessStage component
 * Celebratory romantic reward card with floating flowers and scrapbook CTA.
 */
export function SuccessStage({ data = {}, onContinue }) {
  const {
    successTitle = "Aww, you passed! 🥹🌸",
    successSubtitle = "Every single moment with you is my favorite.",
    successNote = "Now take a deep breath... because our scrapbook is waiting ♡"
  } = data;

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleContinue = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div className={`anniv2-stage-wrapper anniv2-success-stage ${isTransitioning ? 'anniv2-screen-burst-out' : ''}`}>
      {/* Peeking Flower Bouquets */}
      <BouquetDecor variant="peeking-flower" className="anniv2-success-peek-tr" />
      <BouquetDecor variant="corner-slide" className="anniv2-success-bouquet-bl" />

      {/* Floating cute sticker */}
      <div className="anniv2-cute-floating-sticker sticker-success">
        <span>my favorite human 🌸</span>
      </div>

      {/* Main Success Paper Card */}
      <div className="anniv2-card-paper anniv2-success-card pop-bounce-in">
        {/* Bow Header */}
        <div className="anniv2-intro-bow-header">
          <BouquetDecor variant="ribbon-bow" />
        </div>

        {/* Big Heart Badge */}
        <div className="anniv2-success-sparkle-circle">
          <span>💖</span>
        </div>

        <h2 className="anniv2-success-cute-title">
          {successTitle}
        </h2>

        <p className="anniv2-success-cute-subtitle">
          "{successSubtitle}"
        </p>

        <div className="anniv2-cute-divider-line" />

        <p className="anniv2-success-cute-note">
          {successNote}
        </p>

        {/* CTA Button to Scrapbook */}
        <div className="anniv2-btn-wrapper-dramatic">
          <button
            type="button"
            className="anniv2-btn-cute-primary"
            onClick={handleContinue}
            id="open-scrapbook-btn"
          >
            <span className="anniv2-btn-flower-icon">📖</span>
            <span className="anniv2-btn-label">Open Our Scrapbook ♡</span>
            <span className="anniv2-btn-flower-icon">✨</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuccessStage;
