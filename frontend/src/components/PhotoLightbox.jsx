import React, { useEffect } from 'react';

export function PhotoLightbox({ imageSrc, caption, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!imageSrc) return null;

  return (
    <div className="photo-lightbox-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <button
        type="button"
        className="lightbox-close-btn"
        onClick={onClose}
        aria-label="Close photo preview"
      >
        ✕
      </button>

      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <img src={imageSrc} alt={caption || 'Enlarged celebration memory'} className="lightbox-img" />
        {caption && <p className="lightbox-caption">{caption}</p>}
      </div>
    </div>
  );
}

export default PhotoLightbox;
