import React, { useState } from 'react';
import GradPeopleModal from './GradPeopleModal.jsx';
import PagePaginationControls from './PagePaginationControls.jsx';

export function SectionPeople({ data, onNext, onPrev, isPageMode = false, pageIndex = 3, totalPages = 7 }) {
  const { people = {} } = data;
  const {
    heading = '03 / THE PEOPLE',
    title = 'No One Gets Here Alone',
    subtitle = 'The professors, mentors, family, and lifelong friends who carried you across the finish line.',
    members = []
  } = people;

  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <section id="grad-section-people" className="grad-section grad-section-people">
      {/* Section Header */}
      <div className="grad-section-header">
        <span className="grad-section-tag">{heading}</span>
        <h2 className="grad-section-title">{title}</h2>
        {subtitle && <p className="grad-section-subtitle">{subtitle}</p>}
      </div>

      {/* Editorial People Grid */}
      <div className="grad-people-grid">
        {members.map((member, idx) => (
          <article
            key={member.id || idx}
            className="grad-person-card"
            onClick={() => setSelectedMember(member)}
          >
            {/* Media */}
            <div className="grad-person-media">
              <img
                src={member.photo}
                alt={member.name}
                className="grad-person-img"
                loading="lazy"
              />
              <div className="grad-person-overlay">
                <span className="grad-read-note-pill">Read tribute message →</span>
              </div>
            </div>

            {/* Details */}
            <div className="grad-person-details">
              <div className="grad-person-header">
                <h3 className="grad-person-name">{member.name}</h3>
                {member.role && <span className="grad-person-role">{member.role}</span>}
              </div>
              <p className="grad-person-quote">"{member.quote}"</p>
              <button
                type="button"
                className="grad-person-open-link"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedMember(member);
                }}
                aria-label={`Open message from ${member.name}`}
              >
                View tribute note
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <GradPeopleModal
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
          nextLabel="Graduation Letter →"
        />
      )}
    </section>
  );
}

export default SectionPeople;
