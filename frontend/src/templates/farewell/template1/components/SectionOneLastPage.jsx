import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionOneLastPage({ data, onNext, onPrev, isPageMode = false, pageIndex = 5, totalPages = 7 }) {
  const { oneLastPage = {} } = data;
  const {
    heading = '05 / ONE LAST PAGE',
    photo = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    line1 = 'Some chapters end.',
    line2 = "The memories don't."
  } = oneLastPage;

  return (
    <section id="section-one-last-page" className="fw-section fw-section-one-last-page">
      <div className="fw-lastpage-inner">
        <span className="fw-section-tag fw-tag-centered">{heading}</span>

        {/* Heroic Minimalist Photograph */}
        {photo && (
          <div className="fw-lastpage-photo-wrap">
            <div className="fw-lastpage-frame">
              <img
                src={photo}
                alt="A lasting memory"
                className="fw-lastpage-img"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Poetic Typography */}
        <div className="fw-lastpage-text">
          <p className="fw-lastpage-line1">{line1}</p>
          <p className="fw-lastpage-line2">{line2}</p>
        </div>

        {/* Page Navigation Controls */}
        {isPageMode && (
          <PagePaginationControls
            currentIndex={pageIndex}
            totalCount={totalPages}
            onPrev={onPrev}
            onNext={onNext}
            nextLabel="Farewell Letter →"
          />
        )}
      </div>
    </section>
  );
}

export default SectionOneLastPage;
