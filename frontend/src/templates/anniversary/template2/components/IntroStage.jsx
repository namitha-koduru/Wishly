import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * IntroStage component for Petals & Us
 * Opening Screen with progressive timed flower reveals, "Hey… ♡", "Don't open it yet…",
 * and bouncy squish button drama.
 */
export function IntroStage({ data = {}, onStart }) {
  const {
    recipientName = 'Cutie',
    introTitle = 'Hey… ♡',
    introSub = 'I made something for you.',
    introTease = "Don't open it yet…",
    introBtn = 'Okay, open it ♡'
  } = data;

  const [step, setStep] = useState(0);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400);  // Flower peeks & bouquet slides
    const t2 = setTimeout(() => setStep(2), 1100); // "Hey… ♡"
    const t3 = setTimeout(() => setStep(3), 1900); // "I made something for you." + "Don't open it yet…"
    const t4 = setTimeout(() => setStep(4), 2600); // "Okay, open it ♡" button pops in

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleOpenClick = () => {
    setIsOpening(true);
    // Button drama: squish, heart pop, burst before transition
    setTimeout(() => {
      onStart();
    }, 650);
  };

  return (
    <div className={`petals-stage-wrapper petals-intro-stage ${isOpening ? 'petals-screen-burst-out' : ''}`}>
      {/* Animated peeking flower characters & sliding bouquet */}
      {step >= 1 && (
        <>
          <BouquetDecor variant="peeking-flower" className="petals-intro-peek-bl peek-in-bottom-left" />
          <BouquetDecor variant="peeking-flower" className="petals-intro-peek-tr peek-in-top-right" />
          <BouquetDecor variant="corner-slide" className="petals-intro-bq-right slide-in-top-right" />
        </>
      )}

      {/* Main Clean White Card */}
      <div className={`petals-card-paper petals-intro-card ${step >= 2 ? 'pop-bounce-in' : 'hidden-stage-card'}`}>
        {/* Cute Bow Header */}
        <div className="petals-bow-header">
          <BouquetDecor variant="ribbon-bow" />
        </div>

        {/* Step 2: "Hey… ♡" */}
        {step >= 2 && (
          <h1 className="petals-intro-hey-title">
            {introTitle}
          </h1>
        )}

        {/* Step 3: Subtitle & Tease */}
        {step >= 3 && (
          <div className="petals-intro-narrative">
            <h2 className="petals-intro-sub-text">
              {introSub}
            </h2>
            <p className="petals-intro-tease-text">
              ({introTease})
            </p>
          </div>
        )}

        {/* Step 4: Button Drama */}
        {step >= 4 && (
          <div className="petals-btn-container">
            <button
              type="button"
              className={`petals-btn-primary ${isOpening ? 'btn-squish-burst' : ''}`}
              onClick={handleOpenClick}
              id="open-petals-button"
            >
              <span className="petals-btn-flower-sparkle">🌸</span>
              <span className="petals-btn-label">{introBtn}</span>
              <span className="petals-btn-flower-sparkle">🌸</span>
            </button>
            <span className="petals-btn-hint">Tap for a little anniversary surprise ✨</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default IntroStage;
