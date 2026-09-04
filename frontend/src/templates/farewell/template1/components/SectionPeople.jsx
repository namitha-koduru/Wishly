import React, { useState } from 'react';
import PeopleModal from './PeopleModal.jsx';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionPeople({ data, onNext, onPrev, isPageMode = false, pageIndex = 3, totalPages = 7 }) {
  const { people = {} } = data;
  const {
    heading = '03 / THE PEOPLE',
    title = 'The Fellowship',
    subtitle = 'Those who made every ordinary day feel like an occasion.',
    members = []
  } = people;

  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="section-people" className="fw-section fw-section-people">
      {/* Section Header */}
      <div className="fw-section-header">
        <span className="fw-section-tag">{heading}</span>
        <h2 className="fw-section-title">{title}</h2>
        {subtitle && <p className="fw-section-subtitle">{subtitle}</p>}
      </div>

      {/* Editorial People Grid */}
      <div className="fw-people-grid">
        {members.map((member, idx) => (
          <article
            key={member.id || idx}
            className="fw-person-card"
            onClick={() => setSelectedMember(member)}
          >
            {/* Portrait Frame */}
            <div className="fw-person-media">
              <img
                src={member.photo}
                alt={member.name}
                className="fw-person-img"
                loading="lazy"
              />
              <div className="fw-person-overlay">
                <span className="fw-read-note-pill">Read personal note →</span>
              </div>
            </div>

            {/* Information */}
            <div className="fw-person-details">
              <div className="fw-person-header">
                <h3 className="fw-person-name">{member.name}</h3>
                {member.role && <span className="fw-person-role">{member.role}</span>}
              </div>
              <p className="fw-person-quote">"{member.quote}"</p>
              <button
                type="button"
                className="fw-person-open-link"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(member);
                }}
                aria-label={`Open note from ${member.name}`}
              >
                View tribute note
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <PeopleModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {/* Page Navigation Controls */}
      {isPageMode && (
        <PagePaginationControls
          currentIndex={pageIndex}
          totalCount={totalPages}
          onPrev={onPrev}
          onNext={onNext}
          nextLabel="The Little Things →"
        />
      )}
    </section>
  );
}

export default SectionPeople;
