import React from 'react';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionLetter({ data, onNext, onPrev, isPageMode = false, pageIndex = 4, totalPages = 7 }) {
  const {
    recipientName = 'Marcus Johnson',
    senderName = 'Mom, Dad & The Family',
    degree,
    classYear,
    date,
    letter = {}
  } = data;

  const {
    heading = '04 / GRADUATION LETTER',
    title = 'A Letter for the Graduate',
    salutation = `Dearest ${recipientName},`,
    message = data.message ||
      'All those early mornings, endless problem sets, sacrifices, and quiet moments of perseverance have led to this proud day.\n\nGraduation is more than a diploma — it is a testament to your character, your intellect, and your unwavering determination to see things through.',
    closing = 'With boundless pride, unconditional love, and highest hopes,'
  } = letter;

  const paragraphs = String(message)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section id="grad-section-letter" className="grad-section grad-section-letter">
      <div className="grad-letter-card">
        {/* Letter Header */}
        <div className="grad-letter-header">
          <span className="grad-section-tag">{heading}</span>
          <h2 className="grad-letter-title">{title}</h2>
          <div className="grad-letter-rule" />
        </div>

        {/* Letter Content */}
        <div className="grad-letter-body">
          <p className="grad-letter-salutation">{salutation}</p>
          {paragraphs.map((p, idx) => (
            <p key={idx} className="grad-letter-para">
              {p}
            </p>
          ))}
        </div>

        {/* Sign-off */}
        <div className="grad-letter-signoff-wrap">
          <p className="grad-letter-signoff-prompt">{closing}</p>
          <p className="grad-letter-sender">{senderName}</p>
          {(classYear || degree || date) && (
            <div className="grad-letter-stamp-row">
              {classYear && <span className="grad-letter-stamp">{classYear}</span>}
              {degree && <span className="grad-letter-stamp">{degree}</span>}
              {date && <span className="grad-letter-stamp">{date}</span>}
            </div>
          )}
        </div>

        {/* Page Navigation Controls */}
        {isPageMode && (
          <PagePaginationControls
            currentIndex={pageIndex}
            totalCount={totalPages}
            onPrev={onPrev}
            onNext={onNext}
            nextLabel="What's Next →"
          />
        )}
      </div>
    </section>
  );
}

export default SectionLetter;
