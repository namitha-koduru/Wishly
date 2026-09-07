import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * LittleThingsStage component (Section 2: "THE LITTLE THINGS")
 * "Wait… You know what I love? The little things."
 * Bouncing handwritten love notes with animated flowers.
 */
export function LittleThingsStage({ data = {}, onContinue }) {
  const {
    littleThings = [
      "your random messages",
      "your stupid jokes",
      "the way you make me laugh",
      "the tiny moments nobody else sees"
    ]
  } = data;

  const [step, setStep] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 300);  // "Wait…"
    const t2 = setTimeout(() => setStep(2), 1000); // "You know what I love?"
    const t3 = setTimeout(() => setStep(3), 1700); // "The little things."
    const t4 = setTimeout(() => setStep(4), 2400); // Notes pop in

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div className={`petals-stage-wrapper petals-little-things-stage ${isTransitioning ? 'petals-screen-burst-out' : ''}`}>
      {/* Bouquet slowly entering from the side */}
      <BouquetDecor variant="corner-slide" className="petals-lt-bq-left slide-in-top-left" />
      <BouquetDecor variant="peeking-flower" className="petals-lt-peek-br peek-in-bottom-right" />

      {/* Main Container Card */}
      <div className="petals-card-paper petals-little-things-card pop-bounce-in">
        {/* Step 1 & 2: Suspense Heading */}
        <div className="petals-lt-heading-block">
          <div className="petals-tag-pill">
            <span>🌸 Chapter 02 🌸</span>
          </div>

          <h3 className="petals-lt-wait-text">
            {step >= 1 ? 'Wait…' : ''}
          </h3>

          {step >= 2 && (
            <h2 className="petals-lt-question-text">
              You know what I love?
            </h2>
          )}

          {step >= 3 && (
            <h1 className="petals-lt-main-reveal">
              The little things. <span className="petals-heart-sparkle">💖</span>
            </h1>
          )}
        </div>

        {/* Step 4: Notes Grid */}
        {step >= 4 && (
          <div className="petals-notes-grid">
            {littleThings.map((note, idx) => {
              const tilt = idx % 2 === 0 ? -2 : 2.5;
              return (
                <div
                  key={idx}
                  className="petals-cute-note-item pop-bounce-in"
                  style={{
                    '--note-tilt': `${tilt}deg`,
                    animationDelay: `${idx * 0.18}s`
                  }}
                >
                  <span className="petals-note-pin">📌</span>
                  <p className="petals-note-text">"{note}"</p>
                </div>
              );
            })}
          </div>
        )}

        {/* Step 4 Button */}
        {step >= 4 && (
          <div className="petals-btn-container" style={{ marginTop: '2.5rem' }}>
            <button
              type="button"
              className="petals-btn-primary"
              onClick={handleNext}
              id="continue-to-question-btn"
            >
              <span className="petals-btn-flower-sparkle">🌸</span>
              <span className="petals-btn-label">One important question… ♡</span>
              <span className="petals-btn-flower-sparkle">🌸</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LittleThingsStage;
