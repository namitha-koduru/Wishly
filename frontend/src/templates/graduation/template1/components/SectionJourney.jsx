import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionJourney({ data, onNext, onPrev, isPageMode = false, pageIndex = 1, totalPages = 7 }) {
  const { journey = {} } = data;
  const {
    heading = '01 / THE JOURNEY',
    title = 'The Path to the Finish Line',
    quote = "It always seems impossible until it's done.",
    milestones = []
  } = journey;

  return (
    <section id="grad-section-journey" className="grad-section grad-section-journey">
      {/* Section Header */}
      <div className="grad-section-header">
        <span className="grad-section-tag">{heading}</span>
        <h2 className="grad-section-title">{title}</h2>
        {quote && <p className="grad-section-quote">"{quote}"</p>}
      </div>

      {/* Visual Timeline */}
      <div className="grad-timeline-container">
        <div className="grad-timeline-line" aria-hidden="true" />

        {milestones.map((milestone, idx) => (
          <div
            key={idx}
            className={`grad-timeline-item ${idx % 2 === 1 ? 'grad-timeline-reverse' : ''}`}
          >
            {/* Marker */}
            <div className="grad-timeline-marker">
              <span className="grad-marker-dot" />
            </div>

            {/* Milestone Card */}
            <div className="grad-timeline-card">
              <div className="grad-milestone-header">
                <span className="grad-milestone-index">STAGE {String(idx + 1).padStart(2, '0')}</span>
                <span className="grad-milestone-date">{milestone.date}</span>
              </div>
              <h3 className="grad-milestone-title">{milestone.title}</h3>
              <p className="grad-milestone-desc">{milestone.description}</p>
            </div>

            {/* Photo */}
            {milestone.photo && (
              <div className="grad-timeline-photo-wrap">
                <div className="grad-photo-frame">
                  <img
                    src={milestone.photo}
                    alt={milestone.title || `Milestone ${idx + 1}`}
                    className="grad-timeline-img"
                    loading="lazy"
                  />
                  {milestone.caption && (
                    <span className="grad-photo-caption">{milestone.caption}</span>
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
          nextLabel="Memories →"
        />
      )}
    </section>
  );
}

export default SectionJourney;
