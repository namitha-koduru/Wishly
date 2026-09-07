import React from 'react';

/**
 * Section 1: Cinematic Romantic Hero Landing
 * Fully data-driven with customizable title, names, lead lines, date, and button.
 */
export function HeroSection({ section = {}, onStart }) {
  const {
    title = "Happy Anniversary",
    overheadTag = "A Celebration of Real Love",
    coupleName = "Aditi & Vikram",
    datePill = "November 24 • 7 Years of Us",
    storyLead = [
      "Some stories begin with love.",
      "Some begin with two people simply meeting.",
      "And some begin with an arranged marriage… and become the greatest love story of all."
    ],
    ctaText = "Our Story ♡",
    scrollHint = "Scroll down or click to begin the journey",
    showRings = true
  } = section;

  return (
    <section className="tpl3-section tpl3-hero-stage">
      {/* Sunlight Ray Beam Effects */}
      <div className="sunlight-flare" />
      <div className="sunlight-glow" />

      {/* Decorative Floral & Ring Frame */}
      <div className="hero-emblem-wrapper">
        {showRings && (
          <div className="rings-intertwined-svg">
            <svg viewBox="0 0 120 70" className="hero-rings-graphic">
              <defs>
                <linearGradient id="goldRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E8B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#997A15" />
                </linearGradient>
                <linearGradient id="goldRing2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="50%" stopColor="#E5C378" />
                  <stop offset="100%" stopColor="#AA8222" />
                </linearGradient>
              </defs>
              {/* Ring 1 */}
              <circle cx="45" cy="35" r="24" fill="none" stroke="url(#goldRing1)" strokeWidth="4.5" className="ring-left" />
              <circle cx="45" cy="35" r="21" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <polygon points="45,7 48,12 45,17 42,12" fill="#FFFFFF" className="diamond-sparkle" />
              
              {/* Ring 2 */}
              <circle cx="75" cy="35" r="24" fill="none" stroke="url(#goldRing2)" strokeWidth="4.5" className="ring-right" />
              <circle cx="75" cy="35" r="21" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            </svg>
          </div>
        )}
        {datePill && <span className="hero-date-pill">{datePill}</span>}
      </div>

      {/* Hero Headings */}
      <div className="hero-content-box">
        {overheadTag && <span className="hero-overhead-tag">{overheadTag}</span>}
        {title && <h1 className="hero-title">{title}</h1>}
        {coupleName && <h2 className="hero-couple-name">{coupleName}</h2>}

        {/* Narrative Opening Lines */}
        {Array.isArray(storyLead) && storyLead.length > 0 && (
          <div className="hero-story-lead">
            {storyLead.map((line, idx) => (
              <p
                key={idx}
                className={`lead-line line-${idx + 1} ${idx === storyLead.length - 1 ? 'lead-highlight-wrap' : ''}`}
              >
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Interactive CTA */}
        {ctaText && (
          <div className="hero-cta-wrap">
            <button
              type="button"
              className="hero-story-cta-btn"
              onClick={onStart}
              aria-label="Begin our romantic story experience"
            >
              <span className="btn-text">{ctaText}</span>
              <span className="btn-glow-ring" />
            </button>
            {scrollHint && <p className="hero-scroll-hint">{scrollHint}</p>}
          </div>
        )}
      </div>

      {/* Subtle Botanical Corner Details */}
      <div className="botanical-accent corner-tl" />
      <div className="botanical-accent corner-tr" />
      <div className="botanical-accent corner-bl" />
      <div className="botanical-accent corner-br" />
    </section>
  );
}

export default HeroSection;
