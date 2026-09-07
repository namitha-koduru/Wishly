import React from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * MarriageJourneyStage component
 * "A Beautiful Journey Together"
 * Refined white photo frame surrounded by white roses and baby's breath.
 */
export function MarriageJourneyStage({ data = {}, onContinue }) {
  const {
    journeyHeading = "A Beautiful Journey Together",
    journeyQuote1 = "Two hearts, one journey, and a love that continues to grow.",
    journeyQuote2 = "Through every season, God has blessed your journey together.",
    photos = []
  } = data;

  const featuredImg = photos[0]?.src || photos[0]?.url || (typeof photos[0] === 'string' ? photos[0] : 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80');

  return (
    <div className="grace-stage-wrapper grace-journey-stage">
      {/* Altar Floral Wreath Header */}
      <WeddingBouquet variant="altar-wreath" className="grace-journey-wreath" />

      {/* Main Wedding Album Card */}
      <div className="grace-card-stationery grace-journey-card">
        <div className="grace-card-cross-header">
          <CrossMotif size={22} />
        </div>

        <div className="grace-chapter-tag">
          <span>CHAPTER 01 • OUR UNION</span>
        </div>

        <h2 className="grace-stage-heading">
          {journeyHeading}
        </h2>

        {/* Featured Wedding Photo Frame */}
        <div className="grace-luxury-photo-frame">
          <div className="grace-photo-inner">
            <img src={featuredImg} alt="Our Sacred Marriage" loading="lazy" />
          </div>
          <span className="grace-photo-caption">"Joined together in holy love"</span>
        </div>

        {/* Marriage Narrative Quotes */}
        <div className="grace-journey-narrative">
          <p className="grace-journey-quote-primary">
            "{journeyQuote1}"
          </p>
          <div className="grace-divider-filigree" />
          <p className="grace-journey-quote-secondary">
            "{journeyQuote2}"
          </p>
        </div>

        {/* Continue Action */}
        <div className="grace-cta-container" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="grace-btn-sacred"
            onClick={onContinue}
            id="continue-to-rings-btn"
          >
            <span className="grace-btn-shimmer" />
            <span className="grace-btn-text">The Sacred Promise 🤍</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MarriageJourneyStage;
