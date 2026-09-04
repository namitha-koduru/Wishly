import React, { useState } from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionMemories({ data, onNext, onPrev, isPageMode = false, pageIndex = 2, totalPages = 7 }) {
  const { memories = {} } = data;
  const {
    heading = '02 / MEMORIES',
    title = 'Moments in Between',
    subtitle = "The days we didn't know we'd miss.",
    items = []
  } = memories;

  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section id="grad-section-memories" className="grad-section grad-section-memories">
      {/* Section Header */}
      <div className="grad-section-header">
        <span className="grad-section-tag">{heading}</span>
        <h2 className="grad-section-title">{title}</h2>
        {subtitle && <p className="grad-section-subtitle">{subtitle}</p>}
      </div>

      {/* Varied Editorial Gallery */}
      <div className="grad-memories-mosaic">
        {items.map((item, idx) => {
          const isFeatured = idx === 0 || idx === 3;
          return (
            <div
              key={item.id || idx}
              className={`grad-memory-card ${isFeatured ? 'grad-memory-featured' : 'grad-memory-compact'}`}
              onMouseEnter={() => setActiveMemory(item.id)}
              onMouseLeave={() => setActiveMemory(null)}
              onClick={() => setActiveMemory(activeMemory === item.id ? null : item.id)}
            >
              <div className="grad-memory-media">
                {item.tag && <span className="grad-memory-tag">{item.tag}</span>}
                <img
                  src={item.photo}
                  alt={item.title}
                  className="grad-memory-img"
                  loading="lazy"
                />
              </div>

              <div className="grad-memory-caption-wrap">
                <span className="grad-memory-index">ARCHIVE #{String(idx + 1).padStart(2, '0')}</span>
                <h4 className="grad-memory-title">{item.title}</h4>
                <p className="grad-memory-caption">"{item.caption}"</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Page Navigation Controls */}
      {isPageMode && (
        <PagePaginationControls
          currentIndex={pageIndex}
          totalCount={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          nextLabel="The People →"
        />
      )}
    </section>
  );
}

export default SectionMemories;
