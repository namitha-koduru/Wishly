import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * FinalExplosionStage component (Section 6: "FINAL BUILDUP & FLOWER EXPLOSION")
 * Dramatic suspense -> "Happy Anniversary ♡ My Love" -> Personalized message ->
 * "And I'd choose you again. Every time." -> 360° flower explosion & "Here's to us. ♡"
 */
export function FinalExplosionStage({ data = {}, onReplay }) {
  const {
    recipientName = 'My Love',
    senderName = 'Your favorite human',
    finalMessage = "Another year of us.\nAnother year of memories.\nAnother year of choosing each other.",
    finalSub = "And I'd choose you again. Every time.",
    finalCheers = "Here's to us. ♡",
    years = 'Happy Anniversary'
  } = data;

  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealStep(1), 400);  // "Wait…"
    const t2 = setTimeout(() => setRevealStep(2), 1500); // "I have one last thing to say."
    const t3 = setTimeout(() => setRevealStep(3), 2600); // Corner flowers enter
    const t4 = setTimeout(() => setRevealStep(4), 3700); // Grand message & flower explosion reveal!

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  return (
    <div className="petals-stage-wrapper petals-final-stage">
      {/* Step 1 & 2: Dramatic Suspense Text */}
      {revealStep < 3 && (
        <div className="petals-suspense-box pop-bounce-in">
          {revealStep === 1 && (
            <h2 className="petals-suspense-word">
              Wait… 🌸
            </h2>
          )}
          {revealStep === 2 && (
            <h2 className="petals-suspense-sentence">
              I have one last thing to say. 🥹
            </h2>
          )}
        </div>
      )}

      {/* Step 3+: Flowers entering from all four edges */}
      {revealStep >= 3 && (
        <>
          <BouquetDecor variant="corner-slide" className="petals-final-bq-top-left slide-in-top-left" />
          <BouquetDecor variant="corner-slide" className="petals-final-bq-top-right slide-in-top-right" />
          <BouquetDecor variant="peeking-flower" className="petals-final-peek-bottom-left peek-in-bottom-left" />
          <BouquetDecor variant="peeking-flower" className="petals-final-peek-bottom-right peek-in-bottom-right" />

          <div className="petals-cute-floating-sticker" style={{ top: '15px', left: '15px', transform: 'rotate(-7deg)' }}>
            <span>one more year? yes please.</span>
          </div>
          <div className="petals-cute-floating-sticker" style={{ bottom: '20px', right: '15px', transform: 'rotate(6deg)' }}>
            <span>my person ♡</span>
          </div>
        </>
      )}

      {/* Step 4: The Grand Anniversary Love Card */}
      {revealStep >= 4 && (
        <div className="petals-card-paper petals-final-card grand-reveal-bounce">
          {/* Bow header */}
          <div className="petals-bow-header">
            <BouquetDecor variant="ribbon-bow" />
          </div>

          <div className="petals-tag-pill">
            <span>✨ {years || 'Happy Anniversary'} ✨</span>
          </div>

          {/* Grand Headline: "Happy Anniversary ♡ My Love" */}
          <h1 className="petals-final-grand-title">
            Happy Anniversary <span className="petals-title-heart">♡</span>
          </h1>
          <h2 className="petals-final-my-love">
            {recipientName ? recipientName : 'My Love'}
          </h2>

          {/* Main Personalized Message */}
          <div className="petals-final-message-box">
            {finalMessage.split('\n').map((line, idx) => (
              line ? (
                <p key={idx} className="petals-final-line">
                  "{line}"
                </p>
              ) : (
                <div key={idx} style={{ height: '0.6rem' }} />
              )
            ))}
          </div>

          <div className="petals-divider-vine" />

          {/* "And I'd choose you again. Every time." */}
          <h3 className="petals-final-sub-promise">
            {finalSub}
          </h3>

          {/* "Here's to us. ♡" */}
          <h2 className="petals-final-cheers-highlight">
            {finalCheers}
          </h2>

          {/* Signoff */}
          <div className="petals-final-signoff">
            <span className="petals-signoff-prefix">forever obsessed with you,</span>
            <h4 className="petals-signoff-name">{senderName}</h4>
          </div>

          {/* Replay Button */}
          <div className="petals-btn-container" style={{ marginTop: '2.5rem' }}>
            <button
              type="button"
              className="petals-btn-secondary"
              onClick={onReplay}
              id="replay-petals-story-button"
            >
              <span>🌸 Replay Our Story from Beginning ↻</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinalExplosionStage;
