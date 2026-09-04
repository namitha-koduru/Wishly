import React from 'react';

export function SectionOpening({ data, onBegin }) {
  const {
    recipientName = 'David Kim',
    teamName,
    role,
    date,
    heroPhoto,
    subtitle = 'A quiet celebration of the chapter we shared.'
  } = data;

  return (
    <section id="section-opening" className="fw-section fw-section-opening">
      {/* Top Header Tag */}
      <div className="fw-opening-meta">
        <span className="fw-meta-pill">FAREWELL CHRONICLE</span>
        {date && <span className="fw-meta-date">{date}</span>}
      </div>

      {/* Hero Typography */}
      <div className="fw-opening-text-wrap">
        <p className="fw-opening-pretitle">Before We Go</p>
        <h1 className="fw-opening-title">
          To {recipientName}
        </h1>
        {role && <p className="fw-opening-role">{role}</p>}
        {teamName && <p className="fw-opening-team">From {teamName}</p>}
        <p className="fw-opening-subtitle">"{subtitle}"</p>
      </div>

      {/* Prominent Hero Photo */}
      {heroPhoto && (
        <div className="fw-hero-photo-container">
          <div className="fw-hero-frame">
            <img
              src={heroPhoto}
              alt={`A tribute to ${recipientName}`}
              className="fw-hero-img"
              loading="eager"
            />
            <div className="fw-hero-caption-bar">
              <span className="fw-caption-index">ARCHIVE NO. 001</span>
              <span className="fw-caption-text">A chapter etched in gratitude</span>
            </div>
          </div>
        </div>
      )}

      {/* Begin Call-To-Action */}
      <div className="fw-opening-cta-wrap">
        <button
          type="button"
          onClick={onBegin}
          className="fw-btn-begin"
          aria-label="Begin the memories journey"
        >
          <span>Begin the memories</span>
          <svg
            className="fw-arrow-down"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default SectionOpening;
