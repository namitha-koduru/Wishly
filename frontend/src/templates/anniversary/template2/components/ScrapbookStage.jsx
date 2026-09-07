import React, { useState } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * ScrapbookStage component for "Petals & Us"
 * "Look at us…"
 * Photos appear one at a time, each flying in, rotating slightly, landing like a Polaroid,
 * with tiny heart/petal and handwritten captions ("The beginning ♡", "The chaos 😂", etc.).
 */
export function ScrapbookStage({ memories = [], onContinue, subtitle = 'Look at us…' }) {
  const [activePhoto, setActivePhoto] = useState(null);
  const [isFinishing, setIsFinishing] = useState(false);

  // Handwritten couple stickers
  const defaultStickers = [
    "still my favorite",
    "how are you this cute?",
    "hehe ♡",
    "one more year?",
    "obviously yes.",
    "my person."
  ];

  const handleFinish = () => {
    setIsFinishing(true);
    setTimeout(() => {
      onContinue();
    }, 500);
  };

  return (
    <div className={`anniv2-stage-wrapper anniv2-scrapbook-stage ${isFinishing ? 'anniv2-screen-burst-out' : ''}`}>
      {/* Peeking corner flowers */}
      <BouquetDecor variant="peeking-flower" className="anniv2-scrapbook-peek-top" />
      <BouquetDecor variant="corner-slide" className="anniv2-scrapbook-bouquet-bottom" />

      {/* Floating cute stickers around the board */}
      <div className="anniv2-cute-floating-sticker" style={{ top: '10px', left: '15px', transform: 'rotate(-6deg)' }}>
        <span>my person. ♡</span>
      </div>
      <div className="anniv2-cute-floating-sticker" style={{ top: '15px', right: '15px', transform: 'rotate(5deg)' }}>
        <span>hehe ♡</span>
      </div>

      {/* Scrapbook Header */}
      <div className="anniv2-scrapbook-cute-header pop-bounce-in">
        <div className="anniv2-cute-tag-pill">
          <span>🌸 Our Memory Scrapbook 🌸</span>
        </div>
        <h2 className="anniv2-scrapbook-main-title">
          Look at us…
        </h2>
        <p className="anniv2-scrapbook-cute-subtitle">
          (and it turned out to be my favorite adventure 🥹)
        </p>
      </div>

      {/* Scrapbook Board with Polaroids */}
      <div className="anniv2-scrapbook-board">
        <div className="anniv2-scrapbook-grid">
          {memories.map((m, idx) => {
            const imgSrc = typeof m === 'object' ? (m.src || m.url) : m;
            const caption = typeof m === 'object' && m.caption ? m.caption : `Memory #${idx + 1}`;
            const chapter = typeof m === 'object' && m.chapterTitle ? m.chapterTitle : (idx === 0 ? "The beginning ♡" : idx === 1 ? "The chaos 😂" : idx === 2 ? "The little moments" : "My favorite person");
            const sticker = typeof m === 'object' && m.sticker ? m.sticker : defaultStickers[idx % defaultStickers.length];
            const angle = typeof m === 'object' && m.angle ? m.angle : (idx % 2 === 0 ? -2.5 : 2.5);

            if (!imgSrc) return null;

            return (
              <div
                key={m.id || idx}
                className="anniv2-cute-polaroid-item"
                style={{
                  '--polaroid-tilt': `${angle}deg`,
                  animationDelay: `${idx * 0.18}s`
                }}
                onClick={() => setActivePhoto({ src: imgSrc, caption, chapter, sticker })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setActivePhoto({ src: imgSrc, caption, chapter, sticker });
                  }
                }}
                aria-label={`View photo: ${chapter} - ${caption}`}
              >
                {/* Washi Tape Strip with sticker note */}
                <div className="anniv2-washi-tape-sticker">
                  <span>{sticker}</span>
                </div>

                {/* Photo Image Box */}
                <div className="anniv2-polaroid-photo-box">
                  <img src={imgSrc} alt={caption} loading="lazy" />
                  <span className="anniv2-photo-heart-badge">♡</span>
                </div>

                {/* Chapter & Caption Footer */}
                <div className="anniv2-polaroid-caption-area">
                  <h4 className="anniv2-polaroid-chapter-tag">{chapter}</h4>
                  <p className="anniv2-polaroid-note-text">"{caption}"</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dramatic CTA to Final Screen */}
      <div className="anniv2-btn-wrapper-dramatic" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="anniv2-btn-cute-primary"
          onClick={handleFinish}
          id="continue-to-final-btn"
        >
          <span className="anniv2-btn-flower-icon">💌</span>
          <span className="anniv2-btn-label">Wait… one last thing ♡</span>
          <span className="anniv2-btn-flower-icon">🌸</span>
        </button>
      </div>

      {/* Lightbox Photo Zoom Modal */}
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
              <span>{activePhoto.sticker}</span>
            </div>
            <img src={activePhoto.src} alt={activePhoto.caption} className="anniv2-modal-img" />
            <h3 className="anniv2-modal-chapter">{activePhoto.chapter}</h3>
            <p className="anniv2-modal-caption">"{activePhoto.caption}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ScrapbookStage;
