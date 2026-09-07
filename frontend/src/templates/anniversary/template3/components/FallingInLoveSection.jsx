import React, { useState } from 'react';

/**
 * Section 4: "We Fell in Love" — The Deep Emotional Romance
 * 100% data-driven from section prop.
 */
export function FallingInLoveSection({ section = {}, onNext }) {
  const [pulseActive, setPulseActive] = useState(false);
  const {
    badge = "Chapter III • The Turning Point",
    heading = "And somewhere along the way…",
    image = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1000&auto=format&fit=crop&q=80",
    quotePart1 = "You stopped being the person I married…",
    quotePart2 = "…and became the person I cannot imagine my life without.",
    subtext = "The moment love stopped being a commitment and became as natural as breathing.",
    heartPrompt = "Touch our heartbeat",
    nextButtonText = "Next: The Love We Built →"
  } = section;

  return (
    <section className="tpl3-section tpl3-fallinginlove-stage">
      {/* Warm Evening Bokeh & Rose Light Reflections */}
      <div className="romantic-evening-glow" />
      <div className="heart-light-reflections" />

      <div className="falling-header">
        {badge && <span className="section-step-badge romantic-badge">{badge}</span>}
        {heading && <h2 className="falling-heading">{heading}</h2>}
      </div>

      <div className="falling-main-card">
        {/* Visual Romance Backdrop & Intertwined Hands (if image present) */}
        {image && (
          <div className="falling-visual-hero">
            <div className="hands-silhouette-frame">
              <img
                src={image}
                alt="Intertwined hands and shared promises"
                className="falling-photo-img"
              />
              <div className="visual-vignette-overlay" />
              
              {/* Romantic Bokeh Heart Pulse Centerpiece */}
              <div
                className={`romantic-heart-centerpiece ${pulseActive ? 'active' : ''}`}
                onClick={() => setPulseActive(!pulseActive)}
                title="Click to send love warmth"
              >
                <svg viewBox="0 0 40 40" className="elegant-heart-svg">
                  <defs>
                    <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#D9A5B3" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#8B263E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M20,35.5 C19.5,35.5 8,24.5 4,16.5 C0.5,9.5 4.5,2.5 12,2.5 C16,2.5 18.5,5.5 20,7.5 C21.5,5.5 24,2.5 28,2.5 C35.5,2.5 39.5,9.5 36,16.5 C32,24.5 20.5,35.5 20,35.5 Z"
                    fill="url(#heartGlow)"
                    stroke="#E5C378"
                    strokeWidth="1.2"
                  />
                </svg>
                {heartPrompt && <span className="heart-click-prompt">{heartPrompt}</span>}
              </div>
            </div>
          </div>
        )}

        {/* Emotionally Climaxing Text Reveal */}
        <div className="falling-text-revelation">
          {quotePart1 && (
            <p className="quote-part-1">
              "{quotePart1}"
            </p>
          )}

          <div className="quote-connector">
            <span className="connector-dash" />
            <span className="connector-symbol">✦</span>
            <span className="connector-dash" />
          </div>

          {quotePart2 && (
            <h3 className="quote-part-2">
              "{quotePart2}"
            </h3>
          )}

          {subtext && (
            <p className="falling-subtext">
              {subtext}
            </p>
          )}
        </div>
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

export default FallingInLoveSection;
