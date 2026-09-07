import React from 'react';

/**
 * Stage Navigation Bar for Anniversary Template 3
 * Dynamically renders dots & labels for all active sections.
 */
export function ChapterNav({ sections = [], currentSectionId, onSectionSelect }) {
  const getLabel = (section) => {
    if (section.title) return section.title.slice(0, 14);
    if (section.heading) return section.heading.slice(0, 14);
    const standardLabels = {
      hero: 'Hero',
      arranged: 'How It Began',
      gettingToKnow: 'Conversations',
      fallingInLove: 'In Love',
      loveWeBuilt: 'Passion',
      ourLittleLife: 'Our Life',
      interactiveUs: 'Us',
      celebration: 'Celebrate',
      final: 'Home',
      loveLetter: 'Letter',
      photoGallery: 'Gallery',
      timeline: 'Timeline',
      reasonsLove: 'Reasons',
      quote: 'Promise',
      customSection: 'Note'
    };
    return standardLabels[section.type] || section.type || 'Chapter';
  };

  const currentIdx = sections.findIndex(s => s.id === currentSectionId);

  return (
    <nav className="tpl3-chapter-nav" aria-label="Love story stages">
      <div className="chapter-nav-inner">
        {sections.map((sec, idx) => {
          const isActive = currentSectionId === sec.id;
          const isPassed = idx < currentIdx;
          const label = getLabel(sec);

          return (
            <button
              key={sec.id}
              type="button"
              className={`chapter-step-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => onSectionSelect(sec.id)}
              aria-label={`Go to chapter: ${label}`}
              title={label}
            >
              <span className="step-dot" />
              <span className="step-label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default ChapterNav;
