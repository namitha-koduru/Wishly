import React from 'react';

/**
 * PageTransition for Graduation Template 1
 */
export function PageTransition({ active, direction = 'next', children }) {
  if (!active) return null;

  return (
    <div
      className={`grad-page-stage grad-page-active grad-slide-${direction}`}
      role="region"
      aria-hidden={!active}
    >
      <div className="grad-page-content-wrapper">
        {children}
      </div>
    </div>
  );
}

export default PageTransition;
