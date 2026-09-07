import React from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import WeddingRings from './WeddingRings.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * HeroStage component
 * Peaceful, serene opening screen for Christian Wedding Anniversary template.
 * Features wedding bouquet, intertwined rings, elegant serif typography, and a sacred blessing.
 */
export function HeroStage({ data = {}, onStart }) {
  const {
    recipientName = 'David & Sarah',
    heroTitle = 'Happy Wedding Anniversary',
    heroSubtitle = 'Celebrating the beautiful journey of love, faith & togetherness.',
    heroBlessing = 'May God continue to bless your marriage today and for all the years to come.',
    years = '25 Blessed Years',
    date = 'October 24'
  } = data;

  return (
    <div className="grace-stage-wrapper grace-hero-stage">
      {/* Wedding Floral Bouquets Framing */}
      <WeddingBouquet variant="corner-hero" className="grace-hero-bouquet-right" />
      <WeddingBouquet variant="corner-hero" className="grace-hero-bouquet-left" />

      {/* Main Peaceful White Card */}
      <div className="grace-card-stationery grace-hero-card">
        {/* Sacred Cross Motif Header */}
        <div className="grace-card-cross-header">
          <CrossMotif size={24} />
        </div>

        {/* Milestone / Years Tag */}
        <div className="grace-milestone-tag">
          <span className="grace-tag-sparkle">✦</span>
          <span>{years || date || 'Holy Matrimony Milestone'}</span>
          <span className="grace-tag-sparkle">✦</span>
        </div>

        {/* Couple Dedication */}
        {recipientName && (
          <div className="grace-hero-dedication">
            <span className="grace-dedication-prefix">Honoring & Celebrating</span>
            <h2 className="grace-dedication-names">{recipientName}</h2>
          </div>
        )}

        {/* Main Title */}
        <h1 className="grace-hero-title">
          {heroTitle}
        </h1>

        {/* Intertwined Wedding Rings Centerpiece */}
        <div className="grace-hero-rings-box">
          <WeddingRings size={170} />
        </div>

        {/* Subtitle & Blessing */}
        <p className="grace-hero-subtitle">
          "{heroSubtitle}"
        </p>

        <div className="grace-divider-filigree" />

        <p className="grace-hero-blessing">
          {heroBlessing}
        </p>

        {/* Peaceful Action Button */}
        <div className="grace-cta-container">
          <button
            type="button"
            className="grace-btn-sacred"
            onClick={onStart}
            id="begin-anniversary-journey-btn"
          >
            <span className="grace-btn-shimmer" />
            <span className="grace-btn-text">Open Our Blessing 🕊️</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeroStage;
