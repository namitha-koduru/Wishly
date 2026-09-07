import React, { useState } from 'react';
import WeddingBouquet from './WeddingBouquet.jsx';
import CrossMotif from './CrossMotif.jsx';

/**
 * WeddingAlbumStage component
 * Luxury Wedding Album Gallery:
 * Clean white frames, subtle gold hairline borders, elegant captions, and photo magnification modal.
 */
export function WeddingAlbumStage({ photos = [], onContinue }) {
  const [activePhoto, setActivePhoto] = useState(null);

  const defaultCaptions = [
    "The day it all began.",
    "A lifetime of beautiful memories.",
    "Growing together in grace.",
    "Love through every season."
  ];

  return (
    <div className="grace-stage-wrapper grace-album-stage">
      {/* Altar Wreath Header */}
      <WeddingBouquet variant="altar-wreath" className="grace-album-wreath" />

      {/* Header */}
      <div className="grace-album-header">
        <div className="grace-card-cross-header">
          <CrossMotif size={22} />
        </div>
        <div className="grace-chapter-tag">
          <span>CHAPTER 05 • SACRED MEMORIES</span>
        </div>
        <h2 className="grace-stage-heading">
          Our Wedding Keepsake
        </h2>
        <p className="grace-album-subtext">
          "Every memory is a testament to God's faithfulness and love."
        </p>
      </div>

      {/* Luxury Wedding Album Grid */}
      <div className="grace-album-grid">
        {photos.map((item, idx) => {
          const imgSrc = typeof item === 'object' ? (item.src || item.url) : item;
          const caption = (typeof item === 'object' && item.caption) ? item.caption : defaultCaptions[idx % defaultCaptions.length];
          const dateLabel = (typeof item === 'object' && item.date) ? item.date : `Memory #${idx + 1}`;

          if (!imgSrc) return null;

          return (
            <div
              key={item.id || idx}
              className="grace-album-card"
              onClick={() => setActivePhoto({ src: imgSrc, caption, date: dateLabel })}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setActivePhoto({ src: imgSrc, caption, date: dateLabel });
                }
              }}
              aria-label={`View photo: ${caption}`}
            >
              {/* Photo Box with Fine Double Border */}
              <div className="grace-album-img-frame">
                <img src={imgSrc} alt={caption} loading="lazy" />
                <span className="grace-album-zoom-hint">🔍</span>
              </div>

              {/* Caption Area */}
              <div className="grace-album-card-footer">
                <span className="grace-album-date-stamp">{dateLabel}</span>
                <p className="grace-album-caption">"{caption}"</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Continue to Final Blessing */}
      <div className="grace-cta-container" style={{ marginTop: '3rem' }}>
        <button
          type="button"
          className="grace-btn-sacred"
          onClick={onContinue}
          id="continue-to-final-blessing-btn"
        >
          <span className="grace-btn-shimmer" />
          <span className="grace-btn-text">Read Our Final Blessing 🕊️</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="grace-modal-overlay"
          onClick={() => setActivePhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="grace-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="grace-modal-close-btn"
              onClick={() => setActivePhoto(null)}
              aria-label="Close photo"
            >
              ✕
            </button>
            <img src={activePhoto.src} alt={activePhoto.caption} className="grace-modal-img" />
            <span className="grace-modal-date">{activePhoto.date}</span>
            <p className="grace-modal-caption">"{activePhoto.caption}"</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeddingAlbumStage;
