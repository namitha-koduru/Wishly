import React, { useState } from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionChaos({ data, onNext, onPrev, isPageMode = false, pageIndex = 2, totalPages = 7 }) {
  const { chaos = {} } = data;
  const {
    heading = '02 / THE CHAOS',
    title = 'The Unplanned Moments',
    subtitle = 'The best stories were never in the schedule.',
    items = []
  } = chaos;

  const [activeItem, setActiveItem] = useState(null);

  return (
    <section id="section-chaos" className="fw-section fw-section-chaos">
      {/* Section Header */}
      <div className="fw-section-header">
        <span className="fw-section-tag">{heading}</span>
        <h2 className="fw-section-title">{title}</h2>
        {subtitle && <p className="fw-section-subtitle">{subtitle}</p>}
      </div>

      {/* Asymmetric Candid Grid */}
      <div className="fw-chaos-grid">
        {items.map((item, idx) => {
          const isHovered = activeItem === item.id;
          const rotation = item.rotation || (idx % 2 === 0 ? -1.2 : 1.2);

          return (
            <div
              key={item.id || idx}
              className={`fw-chaos-card fw-chaos-card-${(idx % 4) + 1} ${
                isHovered ? 'fw-chaos-card-active' : ''
              }`}
              style={{ '--card-rotation': `${rotation}deg` }}
              onMouseEnter={() => setActiveItem(item.id)}
              onMouseLeave={() => setActiveItem(null)}
              onClick={() => setActiveItem(activeItem === item.id ? null : item.id)}
              tabIndex={0}
              role="button"
              aria-label={`View candid memory: ${item.title}`}
            >
              {/* Photo Frame */}
              <div className="fw-chaos-media-frame">
                {item.tag && <span className="fw-chaos-tag-badge">{item.tag}</span>}
                <img
                  src={item.photo}
                  alt={item.title}
                  className="fw-chaos-img"
                  loading="lazy"
                />
              </div>

              {/* Editorial Note overlay/caption */}
              <div className="fw-chaos-info">
                <div className="fw-chaos-info-top">
                  <span className="fw-chaos-num">MEMO #{String(idx + 1).padStart(2, '0')}</span>
                  <h4 className="fw-chaos-title">{item.title}</h4>
                </div>
                <p className="fw-chaos-note">{item.note}</p>
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

export default SectionChaos;
