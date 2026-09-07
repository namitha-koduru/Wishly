import React from 'react';
import WeddingRings from './WeddingRings.jsx';
import WeddingBouquet from './WeddingBouquet.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * RingsPromiseStage component
 * Dedicated Marriage Rings Section:
 * "Two lives. One promise. One beautiful journey."
 */
export function RingsPromiseStage({ data = {}, onContinue }) {
  const {
    ringsHeading = "Two lives. One promise. One beautiful journey.",
    ringsPromise = "May the sacred love you promised on your wedding day continue to deepen, flourish, and guide your steps with every passing year."
  } = data;

  return (
    <div className="grace-stage-wrapper grace-rings-stage">
      {/* Framing Wedding Bouquets */}
      <WeddingBouquet variant="corner-hero" className="grace-rings-bq-left" />
      <WeddingBouquet variant="corner-hero" className="grace-rings-bq-right" />

      {/* Main Promise Card */}
      <div className="grace-card-stationery grace-rings-card">
        <div className="grace-card-cross-header">
          <CrossMotif size={24} />
        </div>

        <div className="grace-chapter-tag">
          <span>CHAPTER 02 • THE COVENANT</span>
        </div>

        {/* Grand Wedding Rings Centerpiece */}
        <div className="grace-promise-rings-display">
          <WeddingRings size={190} />
        </div>

        <h2 className="grace-promise-heading">
          {ringsHeading}
        </h2>

        <div className="grace-divider-filigree" />

        <p className="grace-promise-body">
          "{ringsPromise}"
        </p>

        {/* Continue Action */}
        <div className="grace-cta-container" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="grace-btn-sacred"
            onClick={onContinue}
            id="continue-to-prayer-btn"
          >
            <span className="grace-btn-shimmer" />
            <span className="grace-btn-text">A Prayer for Your Marriage 🕊️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RingsPromiseStage;
