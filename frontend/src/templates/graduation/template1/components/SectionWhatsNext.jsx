import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionWhatsNext({ data, onNext, onPrev, isPageMode = false, pageIndex = 5, totalPages = 7 }) {
  const { whatsNext = {} } = data;
  const {
    heading = "05 / WHAT'S NEXT",
    line1 = "This isn't the end.",
    line2 = "It's just the first page of what's next.",
    photo = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&auto=format&fit=crop&q=80'
  } = whatsNext;

  return (
    <section id="grad-section-whats-next" className="grad-section grad-section-whats-next">
      <div className="grad-whatsnext-inner">
        <span className="grad-section-tag grad-tag-centered">{heading}</span>

        {/* Heroic Horizon / Future Photograph */}
        {photo && (
          <div className="grad-whatsnext-photo-wrap">
            <div className="grad-whatsnext-frame">
              <img
                src={photo}
                alt="Looking ahead toward the horizon"
                className="grad-whatsnext-img"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {/* Typography */}
        <div className="grad-whatsnext-text">
          <p className="grad-whatsnext-line1">{line1}</p>
          <p className="grad-whatsnext-line2">{line2}</p>
        </div>

        {/* Page Navigation Controls */}
        {isPageMode && (
          <PagePaginationControls
            currentIndex={pageIndex}
            totalCount={totalPages}
            onPrev={onPrev}
            onNext={onNext}
            nextLabel="Final Celebration →"
          />
        )}
      </div>
    </section>
  );
}

export default SectionWhatsNext;
