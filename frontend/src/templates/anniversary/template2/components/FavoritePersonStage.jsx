import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * FavoritePersonStage component (Section 5: "FLOWER SHOWER & FAVORITE PERSON")
 * "And after all this time… You're still my favorite person."
 * Floating paper love notes, dual bouquet entries, and ascending hearts.
 */
export function FavoritePersonStage({ data = {}, onContinue }) {
  const {
    loveNotes = [
      "still obsessed with you ♡",
      "my favorite human",
      "one more year? yes please.",
      "how did I get this lucky?",
      "hehe"
    ]
  } = data;

  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);  // "And after all this time…"
    const t2 = setTimeout(() => setStep(2), 1200); // "You're still my favorite person."
    const t3 = setTimeout(() => setStep(3), 2000); // Floating love notes pop in

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div className={`petals-stage-wrapper petals-fav-stage ${isTransitioning ? 'petals-screen-burst-out' : ''}`}>
      {/* Dual Bouquets from Left and Right */}
      <BouquetDecor variant="corner-slide" className="petals-fav-bq-left slide-in-top-left" />
      <BouquetDecor variant="corner-slide" className="petals-fav-bq-right slide-in-top-right" />

      {/* Main Card */}
      <div className="petals-card-paper petals-fav-card pop-bounce-in">
        <div className="petals-tag-pill">
          <span>🌸 Chapter 05 🌸</span>
        </div>

        {/* Big Heart Sparkle */}
        <div className="petals-fav-heart-icon">
          <span>💖</span>
        </div>

        {/* Step 1: "And after all this time…" */}
        {step >= 1 && (
          <h3 className="petals-fav-sub-title">
            And after all this time…
          </h3>
        )}

        {/* Step 2: "You're still my favorite person." */}
        {step >= 2 && (
          <h1 className="petals-fav-main-title pop-bounce-in">
            You're still my favorite person. <span className="petals-heart-sparkle">🌸</span>
          </h1>
        )}

        <div className="petals-divider-vine" />

        {/* Step 3: Floating Paper Love Notes */}
        {step >= 3 && (
          <div className="petals-love-notes-cluster">
            {loveNotes.map((note, idx) => {
              const tilt = idx % 2 === 0 ? -3 : 3;
              return (
                <div
                  key={idx}
                  className="petals-love-note-tag pop-bounce-in"
                  style={{
                    '--note-tilt': `${tilt}deg`,
                    animationDelay: `${idx * 0.15}s`
                  }}
                >
                  <span className="petals-note-sparkle">✨</span>
                  <span>{note}</span>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 3: CTA */}
        {step >= 3 && (
          <div className="petals-btn-container" style={{ marginTop: '2.5rem' }}>
            <button
              type="button"
              className="petals-btn-primary"
              onClick={handleNext}
              id="continue-to-final-buildup-btn"
            >
              <span className="petals-btn-flower-sparkle">💌</span>
              <span className="petals-btn-label">One last thing to say… ♡</span>
              <span className="petals-btn-flower-sparkle">🌸</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePersonStage;
