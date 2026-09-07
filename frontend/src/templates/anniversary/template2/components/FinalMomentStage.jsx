import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * FinalMomentStage component for "Petals & Us"
 * Dramatic emotional payoff:
 * Starts empty -> "Wait…" -> "One last thing." -> Corner bouquets pop in ->
 * "Happy Anniversary, My Love ♡" -> Love message ->
 * "I'd choose you again. Every time." -> "Here's to us. ♡" + flower celebration!
 */
export function FinalMomentStage({ data = {}, onReplay }) {
  const {
    recipientName = 'My Love',
    senderName = 'Your favorite human',
    message = "Another year of us.\nAnother year of memories.\nAnd somehow, I still get butterflies.\n\nI'd choose you again. Every time.",
    closingLine = "Here's to us. ♡",
    years = 'Happy Anniversary'
  } = data;

  const [revealStep, setRevealStep] = useState(0);

  // Progressive dramatic reveal sequence
  useEffect(() => {
    const t1 = setTimeout(() => setRevealStep(1), 500);  // "Wait…"
    const t2 = setTimeout(() => setRevealStep(2), 1600); // "One last thing."
    const t3 = setTimeout(() => setRevealStep(3), 2700); // Flowers pop in & bouquets slide
    const t4 = setTimeout(() => setRevealStep(4), 3800); // Grand message & flower explosion reveal!

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="anniv2-stage-wrapper anniv2-final-stage">
      {/* Step 1 & 2: Dramatic Suspense Text */}
      {revealStep < 3 && (
        <div className="anniv2-suspense-box pop-bounce-in">
          {revealStep === 1 && (
            <h2 className="anniv2-suspense-text">
              Wait… 🌸
            </h2>
          )}
          {revealStep === 2 && (
            <h2 className="anniv2-suspense-text">
              One last thing. 🥹
            </h2>
          )}
        </div>
      )}

      {/* Step 3+: Sliding Bouquets from all corners */}
      {revealStep >= 3 && (
        <>
          <BouquetDecor variant="corner-slide" className="anniv2-final-bq-top-left slide-in-top-left" />
          <BouquetDecor variant="corner-slide" className="anniv2-final-bq-top-right slide-in-top-right" />
          <BouquetDecor variant="peeking-flower" className="anniv2-final-peek-bottom-left peek-in-bottom-left" />
          <BouquetDecor variant="peeking-flower" className="anniv2-final-peek-bottom-right peek-in-bottom-right" />
          
          <div className="anniv2-cute-floating-sticker sticker-final-left">
            <span>one more year? obviously yes.</span>
          </div>
          <div className="anniv2-cute-floating-sticker sticker-final-right">
            <span>my person. ♡</span>
          </div>
        </>
      )}

      {/* Step 4: The Grand Anniversary Love Card */}
      {revealStep >= 4 && (
        <div className="anniv2-card-paper anniv2-final-card grand-reveal-bounce">
          {/* Bow header */}
          <div className="anniv2-intro-bow-header">
            <BouquetDecor variant="ribbon-bow" />
          </div>

          {/* Sparkle Tag */}
          <div className="anniv2-cute-tag-pill">
            <span>✨ {years || 'Happy Anniversary'} ✨</span>
          </div>

          {/* Grand Headline */}
          <h1 className="anniv2-final-grand-title">
            Happy Anniversary, {recipientName} <span className="anniv2-title-heart">♡</span>
          </h1>

          {/* Love Note Body */}
          <div className="anniv2-final-message-box">
            {message.split('\n').map((line, idx) => (
              line ? (
                <p key={idx} className="anniv2-final-message-text">
                  "{line}"
                </p>
              ) : (
                <div key={idx} style={{ height: '0.6rem' }} />
              )
            ))}
          </div>

          <div className="anniv2-cute-divider-line" />

          {/* Emotional Closing Line */}
          <p className="anniv2-final-closing-note">
            "{closingLine}"
          </p>

          {/* Signoff */}
          <div className="anniv2-final-signoff-area">
            <span className="anniv2-signoff-sub">forever obsessed with you,</span>
            <h3 className="anniv2-signoff-author">{senderName}</h3>
          </div>

          {/* Replay Button */}
          <div className="anniv2-btn-wrapper-dramatic" style={{ marginTop: '2.5rem' }}>
            <button
              type="button"
              className="anniv2-btn-cute-secondary"
              onClick={onReplay}
              id="replay-story-button"
            >
              <span>🌸 Replay Our Story from Beginning ↻</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalMomentStage;
