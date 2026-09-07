import React, { useState } from 'react';

/**
 * Section 6: "Our Little Life" — Everyday Married Life Moments
 * 100% data-driven from section prop.
 */
export function OurLittleLifeSection({ section = {}, onNext }) {
  const [activeMomentIdx, setActiveMomentIdx] = useState(null);
  const {
    badge = "Chapter V • Married Life",
    heading = "Maybe the best part of love…",
    subtitle = "…is having someone to share all the ordinary moments with.",
    warmthQuote = "Finding someone who makes ordinary days feel like poetry.",
    moments = [],
    nextButtonText = "Next: Who We Are To Each Other →"
  } = section;

  return (
    <section className="tpl3-section tpl3-ourlittlelife-stage">
      <div className="settled-warm-ambient" />

      <div className="ourlittlelife-header">
        {badge && <span className="section-step-badge">{badge}</span>}
        {heading && <h2 className="ourlittlelife-heading">{heading}</h2>}
        {subtitle && <p className="ourlittlelife-subtitle">{subtitle}</p>}
      </div>

      {/* Grid of Everyday Married Life Moments */}
      {Array.isArray(moments) && moments.length > 0 && (
        <div className="married-moments-grid">
          {moments.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`married-moment-tile ${activeMomentIdx === idx ? 'expanded' : ''}`}
              onClick={() => setActiveMomentIdx(activeMomentIdx === idx ? null : idx)}
              onMouseEnter={() => setActiveMomentIdx(idx)}
            >
              <div className="tile-icon-bubble">
                <span className="tile-emoji">{item.icon || "🤍"}</span>
              </div>
              <div className="tile-text-wrap">
                {item.title && <h4 className="tile-title">{item.title}</h4>}
                {(item.desc || item.text) && <p className="tile-desc">{item.desc || item.text}</p>}
              </div>
              <div className="tile-hover-glow" />
            </div>
          ))}
        </div>
      )}

      {/* Sweet marriage quote banner */}
      {warmthQuote && (
        <div className="marriage-warmth-quote">
          <span className="quote-heart-ico">🏡</span>
          <p className="warmth-quote-text">
            "{warmthQuote}"
          </p>
        </div>
      )}

      {onNext && (
        <div className="stage-forward-action">
          <button
            type="button"
            className="btn-story-primary"
            onClick={onNext}
          >
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export default OurLittleLifeSection;
