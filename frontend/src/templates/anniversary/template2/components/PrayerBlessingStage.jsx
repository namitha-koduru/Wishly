import React from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * PrayerBlessingStage component
 * Christian Blessing & Scripture Section:
 * "A Prayer for Your Marriage" + 1 Corinthians 13:13
 */
export function PrayerBlessingStage({ data = {}, onContinue }) {
  const {
    prayerHeading = "A Prayer for Your Marriage",
    prayerBody = "May God continue to fill your home with peace, your hearts with patience, and your journey together with everlasting joy.",
    scriptureVerse = "“And now these three remain: faith, hope and love. But the greatest of these is love.”",
    scriptureRef = "1 Corinthians 13:13"
  } = data;

  return (
    <div className="grace-stage-wrapper grace-prayer-stage">
      {/* Altar Wreath Header */}
      <WeddingBouquet variant="altar-wreath" className="grace-prayer-wreath" />

      {/* Main Card */}
      <div className="grace-card-stationery grace-prayer-card">
        <div className="grace-card-cross-header">
          <CrossMotif size={26} />
        </div>

        <div className="grace-chapter-tag">
          <span>CHAPTER 03 • BLESSING & FAITH</span>
        </div>

        <h2 className="grace-stage-heading">
          {prayerHeading}
        </h2>

        {/* Prayer Message */}
        <p className="grace-prayer-body-text">
          "{prayerBody}"
        </p>

        <div className="grace-divider-filigree" />

        {/* Sacred Scripture Box */}
        <div className="grace-scripture-box">
          <span className="grace-scripture-icon">📖</span>
          <p className="grace-scripture-verse">
            {scriptureVerse}
          </p>
          <span className="grace-scripture-reference">
            — {scriptureRef}
          </span>
        </div>

        {/* Continue Action */}
        <div className="grace-cta-container" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="grace-btn-sacred"
            onClick={onContinue}
            id="continue-to-devotion-btn"
          >
            <span className="grace-btn-shimmer" />
            <span className="grace-btn-text">Walk Hand in Hand 🤍</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrayerBlessingStage;
