import React, { useState } from 'react';

/**
 * Section 8: "Anniversary Moment" — Grand Romantic Toast & Forever ♡ Interaction
 * 100% data-driven from section prop.
 */
export function AnniversaryCelebrationSection({ section = {}, senderName = "Vikram", onCelebrationToggle, onNext }) {
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const {
    subhead = "Together Forever & Always",
    title = "Happy Anniversary, My Love",
    toast = "Here's to the love we never expected, the life we built together, and all the beautiful years still waiting for us.",
    buttonText = "Forever ♡",
    celebratedButtonText = "Forever & Always With You ✨",
    revealNote = "Every second with you has been my favorite chapter.",
    nextButtonText = "Read Our Final Vow →"
  } = section;

  const handleForeverClick = () => {
    setHasCelebrated(true);
    if (onCelebrationToggle) {
      onCelebrationToggle(true);
    }
  };

  return (
    <section className="tpl3-section tpl3-celebration-stage">
      <div className="celebration-champagne-light" />
      <div className="celebration-golden-rays" />

      <div className="celebration-content-wrapper">
        {/* Intertwined Golden Rings & Rose Floral Crest */}
        <div className="celebration-crest-box">
          <div className="crest-rings-icon">
            <svg viewBox="0 0 100 60" width="80" height="48" className="crest-rings-svg">
              <circle cx="38" cy="30" r="20" fill="none" stroke="#D4AF37" strokeWidth="3.5" />
              <circle cx="62" cy="30" r="20" fill="none" stroke="#E5C378" strokeWidth="3.5" />
              <polygon points="38,8 41,12 38,16 35,12" fill="#FFFFFF" />
            </svg>
          </div>
          {subhead && <span className="celebration-subhead">{subhead}</span>}
        </div>

        {title && <h2 className="celebration-main-title">{title}</h2>}
        {toast && <p className="celebration-toast-text">{toast}</p>}

        {/* Forever Interactive Celebration Button */}
        <div className="celebration-action-area">
          <button
            type="button"
            className={`btn-forever-interactive ${hasCelebrated ? 'celebrated' : ''}`}
            onClick={handleForeverClick}
          >
            <span className="forever-heart-icon">♡</span>
            <span className="forever-btn-text">
              {hasCelebrated ? celebratedButtonText : buttonText}
            </span>
            <span className="forever-glow-aura" />
          </button>

          {hasCelebrated && revealNote && (
            <div className="forever-faded-note">
              <p className="forever-note-text">
                "{revealNote}"
              </p>
              {senderName && <span className="forever-signoff">— All my love, {senderName}</span>}
            </div>
          )}
        </div>

        {onNext && (
          <div className="stage-forward-action celebration-nav">
            <button
              type="button"
              className="btn-story-primary"
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

export default AnniversaryCelebrationSection;
