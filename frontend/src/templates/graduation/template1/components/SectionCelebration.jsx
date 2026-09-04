import React, { useState } from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionCelebration({ data, onReplay, onPrev, isPageMode = false, pageIndex = 6, totalPages = 7 }) {
  const {
    recipientName = 'Marcus',
    celebration = {}
  } = data;

  const {
    heading = '06 / FINAL CELEBRATION',
    line1 = `Congratulations, ${recipientName}.`,
    line2 = 'Go make the next chapter yours.',
    toastLabel = 'Toast the Graduate 🥂',
    toastCountText = 'cheers raised in celebration'
  } = celebration;

  const [toastCount, setToastCount] = useState(1);
  const [showSparkle, setShowSparkle] = useState(false);

  const handleToast = () => {
    setToastCount((c) => c + 1);
    setShowSparkle(true);
    setTimeout(() => setShowSparkle(false), 1200);
  };

  return (
    <section id="grad-section-celebration" className="grad-section grad-section-celebration">
      <div className="grad-celebration-card">
        {/* Header Tag */}
        <span className="grad-section-tag grad-tag-centered">{heading}</span>

        {/* Closing Typography */}
        <div className="grad-celebration-text">
          <h2 className="grad-celebration-line1">{line1}</h2>
          <p className="grad-celebration-line2">{line2}</p>
        </div>

        {/* Refined Tasteful Celebration Interaction */}
        <div className="grad-toast-box">
          <button
            type="button"
            className={`grad-btn-toast ${showSparkle ? 'grad-toast-active' : ''}`}
            onClick={handleToast}
            aria-label="Raise a toast for the graduate"
          >
            <span className="grad-toast-icon">🥂</span>
            <span>{toastLabel}</span>
            {showSparkle && (
              <span className="grad-golden-shimmer-burst" aria-hidden="true">
                <span className="shimmer-dot s1">✦</span>
                <span className="shimmer-dot s2">✨</span>
                <span className="shimmer-dot s3">✦</span>
                <span className="shimmer-dot s4">✨</span>
              </span>
            )}
          </button>
          <p className="grad-toast-count">
            <strong>{toastCount}</strong> {toastCountText}
          </p>
        </div>

        {/* Page Navigation or Replay */}
        {isPageMode ? (
          <div className="grad-celebration-nav-wrap">
            <PagePaginationControls
              currentIndex={pageIndex}
              totalCount={totalPages}
              onPrev={onPrev}
              onNext={onReplay}
              nextLabel="Back to Beginning ↺"
            />
          </div>
        ) : onReplay ? (
          <div className="grad-celebration-actions">
            <button
              type="button"
              className="grad-btn-replay"
              onClick={onReplay}
              aria-label="Replay celebration journey"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Back to Beginning</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default SectionCelebration;
