import React from 'react';

export function PagePaginationControls({
  currentIndex,
  totalCount,
  onPrev,
  onNext,
  nextLabel = 'Next Chapter'
}) {
  return (
    <div className="grad-page-nav-controls">
      {onPrev ? (
        <button
          type="button"
          onClick={onPrev}
          className="grad-page-btn grad-page-btn-prev"
          aria-label="Previous Chapter"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Previous</span>
        </button>
      ) : <div className="grad-page-btn-spacer" />}

      {/* Chapter Index Pill */}
      <span className="grad-page-counter-badge">
        {String(currentIndex + 1).padStart(2, '0')} / {String(totalCount).padStart(2, '0')}
      </span>

      {onNext ? (
        <button
          type="button"
          onClick={onNext}
          className="grad-page-btn grad-page-btn-next"
          aria-label={nextLabel}
        >
          <span>{nextLabel}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      ) : <div className="grad-page-btn-spacer" />}
    </div>
  );
}

export default PagePaginationControls;
