import React, { useState } from 'react';

/**
 * Section 3: "And Then… We Got To Know Each Other"
 * Cute, intimate everyday beginnings & memory polaroids.
 * 100% data-driven from section prop.
 */
export function GettingToKnowSection({ section = {}, onNext }) {
  const [selectedMoment, setSelectedMoment] = useState(0);
  const {
    badge = "Chapter II • The Spark",
    heading = "Somewhere between the conversations…",
    subTags = [
      "…the laughter…",
      "…the little arguments…",
      "…and all those ordinary days…"
    ],
    revealText = "We became us.",
    subtitle = "Little Milestones of Falling in Love:",
    image = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80",
    photoNote = "Where friendship turned into home ♡",
    moments = [],
    nextButtonText = "Next: How We Fell in Love →"
  } = section;

  return (
    <section className="tpl3-section tpl3-gettingtoknow-stage">
      <div className="cute-ambient-glow" />

      {/* Chapter Tag & Main Emotional Lead */}
      <div className="gettingtoknow-header">
        {badge && <span className="section-step-badge">{badge}</span>}
        {heading && <h2 className="gettingtoknow-title">{heading}</h2>}
        
        {Array.isArray(subTags) && subTags.length > 0 && (
          <div className="sub-lines-animated">
            {subTags.map((tag, idx) => (
              <span key={idx} className={`sub-tag tag-${idx + 1}`}>{tag}</span>
            ))}
          </div>
        )}

        {/* Large Emotional Reveal Banner */}
        {revealText && (
          <div className="reveal-banner-cute">
            <span className="heart-accent">🤍</span>
            <h3 className="reveal-banner-text">{revealText}</h3>
          </div>
        )}
      </div>

      {/* Interactive Cute Moments Collage & Polaroids */}
      <div className={`gettingtoknow-grid ${!image ? 'no-image-layout' : ''}`}>
        {/* Left: Interactive Moment Cards */}
        {Array.isArray(moments) && moments.length > 0 && (
          <div className="moments-tabs-container">
            {subtitle && <h4 className="moments-section-sub">{subtitle}</h4>}
            <div className="moments-list">
              {moments.map((m, idx) => (
                <div
                  key={m.id || idx}
                  className={`moment-interactive-card ${selectedMoment === idx ? 'active' : ''}`}
                  onClick={() => setSelectedMoment(idx)}
                >
                  <div className="moment-card-top">
                    {m.tag && <span className="moment-tag-pill">{m.tag}</span>}
                    <span className="moment-star">✦</span>
                  </div>
                  {m.title && <h5 className="moment-card-title">{m.title}</h5>}
                  {(m.desc || m.text) && <p className="moment-card-desc">{m.desc || m.text}</p>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Right: Floating Polaroid Keepsake (if image present) */}
        {image && (
          <div className="candid-polaroid-wrapper">
            <div className="cute-polaroid-frame">
              <div className="polaroid-pin">📌</div>
              <div className="polaroid-photo-box">
                <img
                  src={image}
                  alt="Getting to know each other"
                  className="polaroid-img"
                />
              </div>
              <div className="polaroid-handwritten-note">
                <p className="note-handwriting">
                  "{moments[selectedMoment]?.title || 'Every conversation brought us closer'}"
                </p>
                {photoNote && <span className="note-date">{photoNote}</span>}
              </div>
            </div>
          </div>
        )}
      </div>

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

export default GettingToKnowSection;
