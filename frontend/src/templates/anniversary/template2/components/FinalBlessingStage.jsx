import React from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import WeddingRings from './WeddingRings.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * FinalBlessingStage component
 * Peaceful, deeply moving Christian anniversary blessing:
 * "Happy Anniversary 🤍 May your love continue to be blessed, strengthened and renewed..."
 */
export function FinalBlessingStage({ data = {}, onReplay }) {
  const {
    recipientName = 'David & Sarah',
    senderName = 'With our love & prayers, The Family',
    finalHeading = 'Happy Anniversary 🤍',
    finalMessage = 'May your love continue to be blessed, strengthened, and renewed with every passing sunrise.\n\nMay the peace of God rest upon your home and the years ahead bring even more laughter, joy, and cherished moments.',
    finalSub = 'Wishing you many more beautiful, grace-filled years together.',
    finalSignoff = 'With our deepest love & continuous prayers,',
    years = '25 Blessed Years'
  } = data;

  return (
    <div className="grace-stage-wrapper grace-final-stage">
      {/* Wedding Floral Bouquets in Corners */}
      <WeddingBouquet variant="corner-hero" className="grace-final-bq-top-left" />
      <WeddingBouquet variant="corner-hero" className="grace-final-bq-top-right" />
      <WeddingBouquet variant="corner-hero" className="grace-final-bq-bottom-left" />
      <WeddingBouquet variant="corner-hero" className="grace-final-bq-bottom-right" />

      {/* Main Peaceful Blessing Card */}
      <div className="grace-card-stationery grace-final-card">
        {/* Sacred Cross Motif */}
        <div className="grace-card-cross-header">
          <CrossMotif size={28} />
        </div>

        {/* Milestone Tag */}
        <div className="grace-milestone-tag">
          <span className="grace-tag-sparkle">✦</span>
          <span>{years || 'A Blessed Union'}</span>
          <span className="grace-tag-sparkle">✦</span>
        </div>

        {/* Grand Headline */}
        <h1 className="grace-final-title">
          {finalHeading}
        </h1>

        {recipientName && (
          <h2 className="grace-final-couple-names">
            {recipientName}
          </h2>
        )}

        {/* Intertwined Wedding Rings */}
        <div className="grace-final-rings-box">
          <WeddingRings size={160} />
        </div>

        {/* Main Blessing Paragraphs */}
        <div className="grace-final-message-box">
          {finalMessage.split('\n').map((paragraph, idx) => (
            paragraph ? (
              <p key={idx} className="grace-final-paragraph">
                "{paragraph}"
              </p>
            ) : (
              <div key={idx} style={{ height: '0.8rem' }} />
            )
          ))}
        </div>

        <div className="grace-divider-filigree" />

        {/* Sub Blessing */}
        <p className="grace-final-subtext">
          {finalSub}
        </p>

        {/* Signoff */}
        <div className="grace-final-signoff-area">
          <span className="grace-signoff-prefix">{finalSignoff}</span>
          <h3 className="grace-signoff-author">{senderName}</h3>
        </div>

        {/* Bottom Cross Accent */}
        <div className="grace-final-bottom-cross">
          <CrossMotif size={20} />
        </div>

        {/* Replay Option */}
        <div className="grace-cta-container" style={{ marginTop: '2.5rem' }}>
          <button
            type="button"
            className="grace-btn-secondary"
            onClick={onReplay}
            id="replay-blessing-button"
          >
            <span>🕊️ Read Our Blessing Again ↻</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinalBlessingStage;
