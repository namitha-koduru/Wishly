import React, { useState } from 'react';

/**
 * Section 2: "How It All Began" — The Arranged Marriage Journey
 * 100% data driven: badge, heading, lines, image, caption, and button labels.
 */
export function ArrangedBeginningSection({ section = {}, onNext }) {
  const [activeStep, setActiveStep] = useState(0);
  const {
    badge = "Chapter I • The Beginning",
    heading = "It started with an arranged marriage…",
    image = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80",
    imageCaption = "Where two worlds gently converged",
    lines = [
      "Two families brought two people together.",
      "Neither of them knew just how much their lives were about to change.",
      "What started as a decision made by families slowly became a decision their hearts would make for themselves."
    ],
    stepButtonText = "Read More of Our Story ↓",
    nextButtonText = "Next: Getting to Know Each Other →"
  } = section;

  return (
    <section className="tpl3-section tpl3-arranged-stage">
      <div className="section-ambient-glow" />

      <div className="arranged-header-block">
        {badge && <span className="section-step-badge">{badge}</span>}
        {heading && <h2 className="arranged-heading">{heading}</h2>}
      </div>

      <div className={`arranged-story-grid ${!image ? 'no-image-layout' : ''}`}>
        {/* Left Column: Visual Keepsake Frame (if image present) */}
        {image && (
          <div className="arranged-visual-col">
            <div className="arranged-portrait-card">
              <div className="portrait-garland-arch">
                <span className="garland-flower">🌸</span>
                <span className="garland-leaf">🌿</span>
                <span className="garland-flower">🪷</span>
                <span className="garland-leaf">🌿</span>
                <span className="garland-flower">🌸</span>
              </div>
              <div className="portrait-image-container">
                <img
                  src={image}
                  alt={imageCaption || "Two souls brought together"}
                  className="arranged-wedding-img"
                />
                <div className="portrait-overlay-tint" />
              </div>
              {imageCaption && (
                <div className="portrait-caption">
                  <span className="caption-icon">💍</span>
                  <span className="caption-text">{imageCaption}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Column: Progressive Text Reveal & Interactive Steps */}
        <div className="arranged-narrative-col">
          <div className="narrative-steps-list">
            {Array.isArray(lines) && lines.map((line, idx) => (
              <div
                key={idx}
                className={`narrative-step-card ${activeStep >= idx ? 'revealed' : 'dimmed'}`}
                onClick={() => setActiveStep(idx)}
              >
                <div className="step-indicator">
                  <span className="step-number">0{idx + 1}</span>
                  <span className="step-line" />
                </div>
                <p className="step-content-text">{line}</p>
              </div>
            ))}
          </div>

          <div className="arranged-actions">
            {activeStep < (lines?.length || 0) - 1 ? (
              <button
                type="button"
                className="btn-story-step"
                onClick={() => setActiveStep((prev) => Math.min(prev + 1, lines.length - 1))}
              >
                {stepButtonText}
              </button>
            ) : (
              onNext && (
                <button
                  type="button"
                  className="btn-story-primary"
                  onClick={onNext}
                >
                  {nextButtonText}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ArrangedBeginningSection;
