import React from 'react';

/**
 * PageTransition for Farewell Template 1
 * Provides smooth, performant fade and subtle slide transitions between story pages.
 */
export function PageTransition({ active, direction = 'next', children }) {
  if (!active) return null;

  return (
    <div
      className={`fw-page-stage fw-page-active fw-slide-${direction}`}
      role="region"
      aria-hidden={!active}
    >
      <div className="fw-page-content-wrapper">
        {children}
      </div>
    </div>
  );
}

export default PageTransition;
