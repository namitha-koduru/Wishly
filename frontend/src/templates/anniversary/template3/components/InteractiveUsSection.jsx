import React, { useState } from 'react';

/**
 * Section 7: Interactive "Us" — Floating Words of Love
 * 100% data-driven from section prop.
 */
export function InteractiveUsSection({ section = {}, onNext }) {
  const [selectedWord, setSelectedWord] = useState(0);
  const {
    badge = "Chapter VI • The Meaning",
    title = "You Are My Everything",
    subtitle = "Tap each word to unveil what you mean to my heart.",
    cards = [],
    nextButtonText = "Next: Anniversary Moment →"
  } = section;

  return (
    <section className="tpl3-section tpl3-interactiveus-stage">
      <div className="us-aura-glow" />

      <div className="interactiveus-header">
        {badge && <span className="section-step-badge">{badge}</span>}
        {title && <h2 className="interactiveus-title">{title}</h2>}
        {subtitle && <p className="interactiveus-sub">{subtitle}</p>}
      </div>

      {/* Floating Interactive Word Chips / Cards */}
      {Array.isArray(cards) && cards.length > 0 && (
        <div className="us-cards-flex">
          {cards.map((item, idx) => {
            const isSelected = selectedWord === idx;
            return (
              <div
                key={item.id || idx}
                className={`us-floating-card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedWord(idx)}
                onMouseEnter={() => setSelectedWord(idx)}
              >
                <div className="card-top-indicator">
                  <span className="card-dot" />
                  <span className="card-label">0{idx + 1}</span>
                </div>
                {item.word && <h3 className="us-word-heading">{item.word}</h3>}
                {item.meaning && <p className="us-word-meaning">{item.meaning}</p>}
                <div className="card-halo-effect" />
              </div>
            );
          })}
        </div>
      )}

      {/* Spotlight Active Quote Display */}
      {cards[selectedWord] && (
        <div className="us-spotlight-display">
          <span className="spotlight-quote-mark">“</span>
          <p className="spotlight-quote-text">{cards[selectedWord].meaning}</p>
          <span className="spotlight-tag">— {cards[selectedWord].word}</span>
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

export default InteractiveUsSection;
