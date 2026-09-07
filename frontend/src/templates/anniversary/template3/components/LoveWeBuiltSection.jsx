import React from 'react';

/**
 * Section 5: "The Love We Built" — Passion, Chemistry & Unshakable Bond
 * 100% data-driven from section prop.
 */
export function LoveWeBuiltSection({ section = {}, onNext }) {
  const {
    badge = "Chapter IV • The Bond",
    heading = "It isn't just love anymore.",
    pillars = [],
    highlight = "It's the kind of love that feels like home.",
    subtext = "Built with devotion, laughter, trust, and unspoken warmth.",
    nextButtonText = "Next: Our Little Life →"
  } = section;

  return (
    <section className="tpl3-section tpl3-lovewebuilt-stage">
      {/* Deep Burgundy & Candlelight Atmosphere */}
      <div className="burgundy-warm-backdrop" />
      <div className="candlelight-flicker-overlay" />

      <div className="lovewebuilt-container">
        {badge && <span className="section-step-badge wine-badge">{badge}</span>}
        {heading && <h2 className="lovewebuilt-main-title">{heading}</h2>}

        {/* Pillars of Passion & Understanding */}
        {Array.isArray(pillars) && pillars.length > 0 && (
          <div className="pillars-grid">
            {pillars.map((pillar, idx) => (
              <div key={pillar.id || idx} className="pillar-glass-card">
                <div className="pillar-flame-icon">
                  <span className="candle-flame">{pillar.icon || "🕯️"}</span>
                </div>
                {pillar.title && <h4 className="pillar-title">{pillar.title}</h4>}
                {pillar.desc && <p className="pillar-desc">{pillar.desc}</p>}
              </div>
            ))}
          </div>
        )}

        {/* Grand Centered Emotional Climax */}
        {(highlight || subtext) && (
          <div className="lovewebuilt-climax-box">
            <div className="climax-ornament">
              <span className="ornament-line" />
              <span className="ornament-gem">⚜️</span>
              <span className="ornament-line" />
            </div>
            {highlight && (
              <h3 className="climax-highlight-text">
                “{highlight}”
              </h3>
            )}
            {subtext && <p className="climax-sub">{subtext}</p>}
          </div>
        )}

        {onNext && (
          <div className="stage-forward-action">
            <button
              type="button"
              className="btn-story-luxury"
              onClick={onNext}
            >
              {nextButtonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default LoveWeBuiltSection;
