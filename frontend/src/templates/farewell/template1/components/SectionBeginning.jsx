import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionBeginning({ data, onNext, onPrev, isPageMode = false, pageIndex = 1, totalPages = 7 }) {
  const { beginning = {} } = data;
  const {
    heading = '01 / THE BEGINNING',
    title = 'Where it all started.',
    quote = 'Every memorable chapter starts with a simple hello.',
    milestones = []
  } = beginning;

  return (
    <section id="section-beginning" className="fw-section fw-section-beginning">
      {/* Section Header */}
      <div className="fw-section-header">
        <span className="fw-section-tag">{heading}</span>
        <h2 className="fw-section-title">{title}</h2>
        {quote && <p className="fw-section-quote">"{quote}"</p>}
      </div>

      {/* Editorial Timeline */}
      <div className="fw-timeline-container">
        <div className="fw-timeline-line" aria-hidden="true" />

        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`fw-timeline-item ${idx % 2 === 1 ? 'fw-timeline-reverse' : ''}`}
          >
            {/* Dot marker */}
            <div className="fw-timeline-marker">
              <span className="fw-marker-dot" />
            </div>

            {/* Content card */}
            <div className="fw-timeline-card">
              <div className="fw-milestone-header">
                <span className="fw-milestone-index">CH. {String(idx + 1).padStart(2, '0')}</span>
                <span className="fw-milestone-date">{milestone.date}</span>
              </div>
              <h3 className="fw-milestone-title">{milestone.title}</h3>
              <p className="fw-milestone-desc">{milestone.description}</p>
            </div>

            {/* Photo */}
            {milestone.photo && (
              <div className="fw-timeline-photo-wrap">
                <div className="fw-photo-frame">
                  <img
                    src={milestone.photo}
                    alt={milestone.title || `Milestone ${idx + 1}`}
                    className="fw-timeline-img"
                    loading="lazy"
                  />
                  {milestone.caption && (
                    <span className="fw-photo-caption">{milestone.caption}</span>
                  )}
                </div>
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
          nextLabel="The Chaos →"
        />
      )}
    </section>
  );
}

export default SectionBeginning;
