import React, { useState } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * MemoryChaosStage component (Section 4: "MEMORY CHAOS")
 * "Our little collection of memories ♡"
 * Multi-directional flying Polaroids with handwritten comments & photo zoom modal.
 */
export function MemoryChaosStage({ data = {}, onContinue }) {
  const {
    memoryChaos = [
      {
        id: "mc-1",
        src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80",
        comment: "this one 🥹",
        type: "slide-left"
      },
      {
        id: "mc-2",
        src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80",
        comment: "favorite.",
        type: "fall-top"
      },
      {
        id: "mc-3",
        src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
        comment: "look at youuuu",
        type: "pop-up"
      },
      {
        id: "mc-4",
        src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80",
        comment: "I love this day.",
        type: "rotate-in"
      }
    ]
  } = data;

  const [activePhoto, setActivePhoto] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div className={`petals-stage-wrapper petals-chaos-stage ${isTransitioning ? 'petals-screen-burst-out' : ''}`}>
      {/* Corner Flowers */}
      <BouquetDecor variant="peeking-flower" className="petals-chaos-peek-tl" />
      <BouquetDecor variant="corner-slide" className="petals-chaos-bq-br" />

      {/* Header */}
      <div className="petals-chaos-header pop-bounce-in">
        <div className="petals-tag-pill">
          <span>🌸 Chapter 04 🌸</span>
        </div>
        <h2 className="petals-chaos-title">
          Our little collection of memories ♡
        </h2>
        <p className="petals-chaos-sub">
          (literally my favorite moments in the world 🥹)
        </p>
      </div>

      {/* Dynamic Scrapbook Chaos Grid */}
      <div className="petals-chaos-grid">
        {memoryChaos.map((item, idx) => {
          const animClass = item.type === 'slide-left'
            ? 'fly-in-left'
            : item.type === 'fall-top'
            ? 'drop-in-top'
            : item.type === 'pop-up'
            ? 'pop-bounce-in'
            : 'fly-in-right';

          const tilt = idx % 2 === 0 ? -3 : 2.5;

          if (!item.src) return null;

          return (
            <div
              key={item.id || idx}
              className={`petals-chaos-item ${animClass}`}
              style={{
                '--item-tilt': `${tilt}deg`,
                animationDelay: `${idx * 0.15}s`
              }}
              onClick={() => setActivePhoto(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActivePhoto(item);
                }
              }}
              aria-label={`View photo: ${item.comment}`}
            >
              {/* Cute Washi Note */}
              <div className="petals-tape-comment">
                <span>{item.comment}</span>
              </div>

              <div className="petals-chaos-img-box">
                <img src={item.src} alt={item.comment} loading="lazy" />
                <span className="petals-zoom-icon">🔍</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <div className="petals-btn-container" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="petals-btn-primary"
          onClick={handleNext}
          id="continue-to-fav-person-btn"
        >
          <span className="petals-btn-flower-sparkle">🌸</span>
          <span className="petals-btn-label">Wait… there's more ♡</span>
          <span className="petals-btn-flower-sparkle">🌸</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="anniv2-modal-overlay"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="anniv2-cute-modal-card pop-bounce-in" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="anniv2-modal-close-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
            >
              ✕
            </button>
            <div className="anniv2-modal-sticker-top">
              <span>{activePhoto.comment}</span>
            </div>
            <img src={activePhoto.src} alt={activePhoto.comment} className="anniv2-modal-img" />
            <h3 className="anniv2-modal-caption">"{activePhoto.comment}"</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default MemoryChaosStage;
