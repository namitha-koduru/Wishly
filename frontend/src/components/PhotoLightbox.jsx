import React, { useEffect, useCallback } from 'react';

export function PhotoLightbox({ photos = [], currentIndex = 0, onClose, onIndexChange }) {
  const currentPhoto = photos[currentIndex] || null;
  const currentUrl = typeof currentPhoto === 'string' ? currentPhoto : currentPhoto?.url;
  const currentCaption = typeof currentPhoto === 'object' ? currentPhoto?.caption : '';

  const handlePrev = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex - 1 + photos.length) % photos.length;
    onIndexChange(nextIdx);
  }, [currentIndex, photos.length, onIndexChange]);

  const handleNext = useCallback(() => {
    if (photos.length <= 1) return;
    const nextIdx = (currentIndex + 1) % photos.length;
    onIndexChange(nextIdx);
  }, [currentIndex, photos.length, onIndexChange]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, handlePrev, handleNext]);

  if (!currentUrl) return null;

  return (
    <div
      className="photo-lightbox-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged celebration photo viewer"
    >
      {/* Close button */}
      <button
        type="button"
        className="lightbox-close-btn"
        onClick={onClose}
        aria-label="Close photo preview"
        title="Close (Esc)"
      >
        ✕
      </button>

      {/* Navigation Arrows */}
      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="lightbox-nav-btn prev"
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            aria-label="Previous memory photo"
            title="Previous (Arrow Left)"
          >
            ‹
          </button>
          <button
            type="button"
            className="lightbox-nav-btn next"
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            aria-label="Next memory photo"
            title="Next (Arrow Right)"
          >
            ›
          </button>
        </>
      )}

      {/* Center Image Content */}
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentUrl}
          alt={currentCaption || `Celebration memory ${currentIndex + 1}`}
          className="lightbox-img"
        />

        <div className="lightbox-footer-info">
          {currentCaption && <p className="lightbox-caption">"{currentCaption}"</p>}
          {photos.length > 1 && (
            <span className="lightbox-counter">
              {currentIndex + 1} / {photos.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhotoLightbox;
