import React from 'react';

export function SectionHero({ data, onBegin }) {
  const {
    recipientName = 'Marcus Johnson',
    degree,
    institution,
    classYear = 'Class of 2026',
    date = 'May 2026',
    latinHonors,
    subtitle = 'A little moment worth remembering forever.',
    heroPhoto
  } = data;

  return (
    <section id="grad-section-hero" className="grad-section grad-section-hero">
      {/* Top Academic Tag */}
      <div className="grad-hero-meta">
        <span className="grad-meta-pill">COMMENCEMENT CHRONICLE</span>
        {classYear && <span className="grad-meta-year">{classYear}</span>}
        {date && <span className="grad-meta-date">• {date}</span>}
      </div>

      {/* Hero Typography */}
      <div className="grad-hero-text-wrap">
        <p className="grad-hero-pretitle">An Extraordinary Milestone</p>
        <h1 className="grad-hero-headline">You did it.</h1>
        <h2 className="grad-hero-name">{recipientName}</h2>
        {degree && <p className="grad-hero-degree">{degree}</p>}
        {institution && <p className="grad-hero-institution">{institution}</p>}
        {latinHonors && <span className="grad-honors-pill">{latinHonors}</span>}
        <p className="grad-hero-subtitle">"{subtitle}"</p>
      </div>

      {/* Prominent Portrait with Archival Matting */}
      {heroPhoto && (
        <div className="grad-hero-photo-container">
          <div className="grad-hero-frame">
            <img
              src={heroPhoto}
              alt={`Graduation portrait of ${recipientName}`}
              className="grad-hero-img"
              loading="eager"
            />
            <div className="grad-hero-caption-bar">
              <span className="grad-caption-index">HONORS ARCHIVE · 2026</span>
              <span className="grad-caption-text">Dedicated to relentless ambition & craft</span>
            </div>
          </div>
        </div>
      )}

      {/* CTA Button */}
      <div className="grad-hero-cta-wrap">
        <button
          type="button"
          onClick={onBegin}
          className="grad-btn-begin"
          aria-label="Begin the graduation journey"
        >
          <span>Begin the story</span>
          <svg
            className="grad-arrow-down"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
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

export default SectionHero;
