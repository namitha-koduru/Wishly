import React, { useState } from 'react';

/**
 * Final Section: "We Found Home in Each Other"
 * Pure, serene ivory minimalist aesthetic with emotional paced reveals.
 * 100% data-driven from section prop.
 */
export function FinalHomeSection({ section = {}, recipientName = "Aditi & Vikram", onReplay }) {
  const [copied, setCopied] = useState(false);
  const {
    monogramDate = "November 24",
    stanzas = [
      "We didn't just get married.",
      "We built a life.",
      "We found a love.",
      "And somehow…"
    ],
    climax = "We found home in each other.",
    signoff = "Happy Anniversary ❤️",
    replayButtonText = "↺ Replay Our Story",
    shareButtonText = "Share Love Story 💌"
  } = section;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="tpl3-section tpl3-finalhome-stage">
      <div className="pure-ivory-ambient" />

      <div className="finalhome-inner-container">
        {/* Minimal Monogram Crest */}
        <div className="final-crest-monogram">
          <span className="monogram-initials">A & V</span>
          <span className="monogram-divider">✦</span>
          {monogramDate && <span className="monogram-date">{monogramDate}</span>}
        </div>

        {/* Paced Line Revelations */}
        {Array.isArray(stanzas) && stanzas.length > 0 && (
          <div className="final-stanzas">
            {stanzas.map((line, idx) => (
              <p key={idx} className={`final-line stanza-${idx + 1}`}>
                {line}
              </p>
            ))}
          </div>
        )}

        {/* Grand Final Truth */}
        <div className="final-grand-reveal">
          {climax && (
            <h1 className="final-climax-text">
              “{climax}”
            </h1>
          )}
          {signoff && (
            <h2 className="final-happy-anniv">
              {signoff}
            </h2>
          )}
          {recipientName && (
            <p className="final-forever-names">
              Forever in love, <span className="gold-name">{recipientName}</span>
            </p>
          )}
        </div>

        {/* Final Actions */}
        <div className="final-action-buttons">
          {replayButtonText && (
            <button
              type="button"
              className="btn-replay-story"
              onClick={onReplay}
            >
              {replayButtonText}
            </button>
          )}

          {shareButtonText && (
            <button
              type="button"
              className="btn-share-story"
              onClick={handleShare}
            >
              {copied ? "Link Copied to Clipboard ✨" : shareButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default FinalHomeSection;
