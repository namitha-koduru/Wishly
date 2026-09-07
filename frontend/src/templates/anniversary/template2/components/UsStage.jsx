import React, { useState, useEffect } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * UsStage component (Section 1: "US")
 * "Okay… let's talk about us. ♡"
 * Sequential Polaroid landings from left, right, and top with handwritten captions.
 */
export function UsStage({ data = {}, onContinue }) {
  const {
    usHeading = "Okay… let's talk about us. ♡",
    usPhotos = [],
    usClosing = "and somehow… we're still here. ♡"
  } = data;

  const [visibleCount, setVisibleCount] = useState(0);
  const [showClosing, setShowClosing] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisibleCount(1), 300);  // Photo 1 from left
    const t2 = setTimeout(() => setVisibleCount(2), 900);  // Photo 2 from right
    const t3 = setTimeout(() => setVisibleCount(3), 1500); // Photo 3 from top
    const t4 = setTimeout(() => setShowClosing(true), 2100); // "and somehow… we're still here. ♡"

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
    <div className={`petals-stage-wrapper petals-us-stage ${isTransitioning ? 'petals-screen-burst-out' : ''}`}>
      {/* Corner Flowers */}
      <BouquetDecor variant="peeking-flower" className="petals-us-peek-tr" />
      <BouquetDecor variant="corner-slide" className="petals-us-bq-bl" />

      {/* Heading */}
      <div className="petals-us-header pop-bounce-in">
        <div className="petals-tag-pill">
          <span>🌸 Chapter 01 🌸</span>
        </div>
        <h2 className="petals-us-main-title">
          {usHeading}
        </h2>
      </div>

      {/* Sequential Polaroids Scrapbook Cluster */}
      <div className="petals-us-scrapbook-cluster">
        {usPhotos.map((photo, idx) => {
          const isVisible = visibleCount > idx;
          const animClass = idx === 0 ? 'fly-in-left' : idx === 1 ? 'fly-in-right' : 'drop-in-top';
          const tilt = idx === 0 ? -3.5 : idx === 1 ? 3 : -1.5;

          if (!photo.src) return null;

          return (
            <div
              key={photo.id || idx}
              className={`petals-polaroid-card ${isVisible ? animClass : 'hidden-polaroid'}`}
              style={{ '--card-tilt': `${tilt}deg` }}
            >
              {/* Pink Tape Detail */}
              <div className="petals-washi-tape">
                <span>{idx === 0 ? 'Day One 🥹' : idx === 1 ? 'Pure Smiles ✨' : 'Real Chaos 😂'}</span>
              </div>

              <div className="petals-polaroid-box">
                <img src={photo.src} alt={photo.caption} loading="lazy" />
              </div>

              <div className="petals-polaroid-footer">
                <p className="petals-polaroid-handwritten">
                  "{photo.caption}"
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Step 4: "and somehow… we're still here. ♡" */}
      {showClosing && (
        <div className="petals-us-closing-block pop-bounce-in">
          <h3 className="petals-us-closing-text">
            {usClosing}
          </h3>

          <div className="petals-btn-container" style={{ marginTop: '1.5rem' }}>
            <button
              type="button"
              className="petals-btn-primary"
              onClick={handleNext}
              id="continue-to-little-things-btn"
            >
              <span className="petals-btn-flower-sparkle">🌸</span>
              <span className="petals-btn-label">Wait, there's more ♡</span>
              <span className="petals-btn-flower-sparkle">🌸</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UsStage;
