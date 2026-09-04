import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionFarewell({ data, onReplay, onPrev, isPageMode = false, pageIndex = 6, totalPages = 7 }) {
  const {
    recipientName = 'David Kim',
    senderName = 'The Whole Product & Design Team',
    teamName = 'Design & Engineering Studio',
    batch,
    date,
    message = 'Your creativity, kindness, and morning coffee banter made every single workday brighter.',
    farewell = {}
  } = data;

  const {
    heading = '06 / FAREWELL',
    title = 'A Final Word',
    closingLine = 'Until we meet again.'
  } = farewell;

  // Split multi-line or long message paragraphs gracefully
  const paragraphs = String(message)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="section-farewell" className="fw-section fw-section-farewell">
      <div className="fw-farewell-card">
        {/* Header Tag */}
        <div className="fw-farewell-header">
          <span className="fw-section-tag">{heading}</span>
          <h2 className="fw-farewell-title">{title}</h2>
          <div className="fw-farewell-rule" />
        </div>

        {/* Letter Body */}
        <div className="fw-farewell-body">
          <p className="fw-farewell-salutation">Dear {recipientName},</p>
          {paragraphs.map((p, idx) => (
            <p key={idx} className="fw-farewell-para">
              {p}
            </p>
          ))}
        </div>

        {/* Signatures & Metadata */}
        <div className="fw-farewell-signoff-wrap">
          <p className="fw-farewell-signoff-prompt">With deepest gratitude and endless respect,</p>
          <p className="fw-farewell-sender">{senderName}</p>
          {teamName && <p className="fw-farewell-team-meta">{teamName}</p>}
          {(batch || date) && (
            <div className="fw-farewell-stamp-row">
              {batch && <span className="fw-farewell-stamp-item">{batch}</span>}
              {date && <span className="fw-farewell-stamp-item">{date}</span>}
            </div>
          )}
        </div>

        {/* Closing Line */}
        <div className="fw-farewell-final-closing">
          <p className="fw-farewell-closing-phrase">{closingLine}</p>
        </div>

        {/* Page navigation or Replay */}
        {isPageMode ? (
          <div className="fw-farewell-page-nav-wrap">
            <PagePaginationControls
              currentIndex={pageIndex}
              totalCount={totalPages}
              onPrev={onPrev}
              onNext={onReplay}
              nextLabel="Replay Journey ↺"
            />
          </div>
        ) : onReplay ? (
          <div className="fw-farewell-actions">
            <button
              type="button"
              className="fw-btn-replay"
              onClick={onReplay}
              aria-label="Replay memory journey"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
              <span>Back to Beginning</span>
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default SectionFarewell;
