import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionLittleThings({ data, onNext, onPrev, isPageMode = false, pageIndex = 4, totalPages = 7 }) {
  const { littleThings = {} } = data;
  const {
    heading = '04 / THE LITTLE THINGS',
    title = 'Archived Details',
    subtitle = 'The tiny habits, quotes, and memories that defined an era.',
    items = []
  } = littleThings;

  return (
    <section id="section-little-things" className="fw-section fw-section-little-things">
      {/* Section Header */}
      <div className="fw-section-header">
        <span className="fw-section-tag">{heading}</span>
        <h2 className="fw-section-title">{title}</h2>
        {subtitle && <p className="fw-section-subtitle">{subtitle}</p>}
      </div>

      {/* Editorial Vignette Cards */}
      <div className="fw-little-grid">
        {items.map((item, idx) => (
          <div key={idx} className="fw-little-card">
            <div className="fw-little-top">
              <span className="fw-little-num">REF. {String(idx + 1).padStart(2, '0')}</span>
              {item.label && <span className="fw-little-label">{item.label}</span>}
            </div>
            <p className="fw-little-value">{item.value}</p>
            {item.meta && (
              <div className="fw-little-meta-row">
                <span className="fw-little-meta-bullet">•</span>
                <span className="fw-little-meta">{item.meta}</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Page Navigation Controls */}
      {isPageMode && (
        <PagePaginationControls
          currentIndex={pageIndex}
          totalCount={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          nextLabel="One Last Page →"
        />
      )}
    </section>
  );
}

export default SectionLittleThings;
