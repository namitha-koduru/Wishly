import React from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * FloralDevotionStage component
 * Full-width floral composition:
 * "Still choosing each other. Still growing together. Still blessed to walk this journey hand in hand."
 */
export function FloralDevotionStage({ data = {}, onContinue }) {
  const {
    devotionLines = [
      "Still choosing each other.",
      "Still growing together in faith.",
      "Still blessed to walk this sacred journey hand in hand."
    ]
  } = data;

  return (
    <div className="grace-stage-wrapper grace-devotion-stage">
      {/* Surrounding Wedding Bouquets */}
      <WeddingBouquet variant="corner-hero" className="grace-devotion-bq-top-right" />
      <WeddingBouquet variant="corner-hero" className="grace-devotion-bq-bottom-left" />

      {/* Main Card */}
      <div className="grace-card-stationery grace-devotion-card">
        <div className="grace-card-cross-header">
          <CrossMotif size={24} />
        </div>

        <div className="grace-chapter-tag">
          <span>CHAPTER 04 • DEVOTION</span>
        </div>

        {/* Devotion Lines */}
        <div className="grace-devotion-lines-box">
          {devotionLines.map((line, idx) => (
            <div key={idx} className="grace-devotion-line-row">
              <span className="grace-devotion-bullet">🕊️</span>
              <h2 className="grace-devotion-text">{line}</h2>
            </div>
          ))}
        </div>

        <div className="grace-divider-filigree" />

        <p className="grace-devotion-subtext">
          "A threefold cord is not quickly broken." — Ecclesiastes 4:12
        </p>

        {/* Continue to Album */}
        <div className="grace-cta-container" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="grace-btn-sacred"
            onClick={onContinue}
            id="continue-to-album-btn"
          >
            <span className="grace-btn-shimmer" />
            <span className="grace-btn-text">View Our Wedding Album 📖</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FloralDevotionStage;
