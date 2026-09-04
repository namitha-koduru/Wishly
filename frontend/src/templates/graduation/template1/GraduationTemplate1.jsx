import React, { useState, useEffect, useRef } from 'react';
import SectionHero from './components/SectionHero.jsx';
import SectionJourney from './components/SectionJourney.jsx';
import SectionMemories from './components/SectionMemories.jsx';
import SectionPeople from './components/SectionPeople.jsx';
import SectionLetter from './components/SectionLetter.jsx';
import SectionWhatsNext from './components/SectionWhatsNext.jsx';
import SectionCelebration from './components/SectionCelebration.jsx';
import GradNav from './components/GradNav.jsx';
import PageTransition from './components/PageTransition.jsx';
import defaultGraduationData from './defaultData.js';
import './GraduationTemplate1.css';

const CHAPTERS = [
  { id: 'grad-section-hero', title: 'Opening', short: '00' },
  { id: 'grad-section-journey', title: 'The Journey', short: '01' },
  { id: 'grad-section-memories', title: 'Memories', short: '02' },
  { id: 'grad-section-people', title: 'The People', short: '03' },
  { id: 'grad-section-letter', title: 'Letter', short: '04' },
  { id: 'grad-section-whats-next', title: "What's Next", short: '05' },
  { id: 'grad-section-celebration', title: 'Celebration', short: '06' },
];

/**
 * Normalizes incoming data from Wishly Creator / Customizer / GeneratedWish
 */
function normalizeGraduationData(incoming = {}) {
  const data = incoming.config || incoming.customData || incoming;
  const base = defaultGraduationData;

  const recipientName = data.recipientName || base.recipientName;
  const senderName = data.senderName || base.senderName;
  const degree = data.degree || base.degree;
  const institution = data.institution || data.school || base.institution;
  const classYear = data.classYear || data.batch || base.classYear;
  const date = data.date || base.date;
  const latinHonors = data.latinHonors || data.honors || base.latinHonors;
  const message = data.message || base.letter.message;
  const subtitle = data.subtitle || base.subtitle;

  const rawPhotos = Array.isArray(data.photos) ? data.photos : [];
  const normalizedPhotos = rawPhotos
    .map((p) => {
      if (!p) return null;
      if (typeof p === 'string' && !p.startsWith('{{')) return p;
      if (typeof p === 'object' && p.url && !p.url.startsWith('{{')) return p.url;
      return null;
    })
    .filter(Boolean);

  const heroPhoto = normalizedPhotos[0] || data.heroPhoto || base.heroPhoto;

  const customMilestones = Array.isArray(data.timeline)
    ? data.timeline
    : Array.isArray(data.milestones)
    ? data.milestones
    : null;

  const journeyMilestones = customMilestones
    ? customMilestones.map((m, idx) => ({
        date: m.date || `Milestone ${idx + 1}`,
        title: m.title || `Stage ${idx + 1}`,
        description: m.description || m.desc || '',
        photo: normalizedPhotos[idx + 1] || base.journey.milestones[idx % base.journey.milestones.length]?.photo,
        caption: m.caption || `Stage ${idx + 1} archive`
      }))
    : base.journey.milestones.map((m, idx) => ({
        ...m,
        photo: normalizedPhotos[idx + 1] || m.photo
      }));

  const memoryItems = base.memories.items.map((item, idx) => ({
    ...item,
    photo: normalizedPhotos[idx + 5] || item.photo
  }));

  const peopleMembers = (data.people || base.people.members).map((member, idx) => ({
    ...member,
    photo: normalizedPhotos[idx + 9] || member.photo
  }));

  const whatsNextPhoto = normalizedPhotos[normalizedPhotos.length - 1] || base.whatsNext.photo;

  return {
    ...base,
    recipientName,
    senderName,
    degree,
    institution,
    classYear,
    date,
    latinHonors,
    message,
    subtitle,
    heroPhoto,
    journey: {
      ...base.journey,
      milestones: journeyMilestones
    },
    memories: {
      ...base.memories,
      items: memoryItems
    },
    people: {
      ...base.people,
      members: peopleMembers
    },
    letter: {
      ...base.letter,
      salutation: `Dearest ${recipientName},`,
      message: message
    },
    whatsNext: {
      ...base.whatsNext,
      photo: whatsNextPhoto
    },
    celebration: {
      ...base.celebration,
      line1: `Congratulations, ${recipientName}.`
    }
  };
}

export function GraduationTemplate1({ data = {}, config: configOverride }) {
  const normalizedData = normalizeGraduationData(configOverride || data);

  // Story page mode is active by default for focused chapter cards
  const [isPageMode, setIsPageMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [activeScrollSection, setActiveScrollSection] = useState('grad-section-hero');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToPage = (newIndex) => {
    if (newIndex === currentPage) return;
    setSlideDirection(newIndex > currentPage ? 'next' : 'prev');
    setCurrentPage(newIndex);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goNext = () => {
    if (currentPage < CHAPTERS.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const goPrev = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  const goRestart = () => {
    goToPage(0);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isPageMode) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goNext();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPageMode, currentPage]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goNext();
      } else {
        goPrev();
      }
    }
  };

  // Scroll observer for Continuous Scroll Mode
  useEffect(() => {
    if (isPageMode) return;

    const sectionIds = CHAPTERS.map((c) => c.id);
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveScrollSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isPageMode]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      className={`wishly-graduation-template-1 ${isPageMode ? 'grad-mode-pages' : 'grad-mode-scroll'}`}
      onTouchStart={isPageMode ? handleTouchStart : undefined}
      onTouchEnd={isPageMode ? handleTouchEnd : undefined}
    >
      {/* Editorial paper grain overlay */}
      <div className="grad-paper-grain" aria-hidden="true" />

      {/* Top Experience Bar */}
      <header className="grad-top-experience-bar">
        <div className="grad-top-bar-inner">
          <div className="grad-top-chapter-status">
            <span className="grad-top-badge">CHAPTER {String((isPageMode ? currentPage : 0) + 1).padStart(2, '0')}</span>
            <span className="grad-top-chapter-title">
              {CHAPTERS[isPageMode ? currentPage : 0]?.title}
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="grad-mode-toggle-wrap">
            <button
              type="button"
              className={`grad-mode-btn ${isPageMode ? 'active' : ''}`}
              onClick={() => setIsPageMode(true)}
              title="Page-by-page Story cards"
              aria-label="Switch to Story Page mode"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="12" y1="3" x2="12" y2="21"></line>
              </svg>
              <span>Story Pages</span>
            </button>
            <button
              type="button"
              className={`grad-mode-btn ${!isPageMode ? 'active' : ''}`}
              onClick={() => setIsPageMode(false)}
              title="Full continuous scroll"
              aria-label="Switch to Continuous Scroll mode"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"></line>
                <line x1="8" y1="12" x2="21" y2="12"></line>
                <line x1="8" y1="18" x2="21" y2="18"></line>
                <line x1="3" y1="6" x2="3.01" y2="6"></line>
                <line x1="3" y1="12" x2="3.01" y2="12"></line>
                <line x1="3" y1="18" x2="3.01" y2="18"></line>
              </svg>
              <span>Full Scroll</span>
            </button>
          </div>
        </div>
      </header>

      {/* STORY PAGES MODE */}
      {isPageMode ? (
        <div className="grad-paged-narrative-stage">
          {/* Page 0: Opening */}
          <PageTransition active={currentPage === 0} direction={slideDirection}>
            <SectionHero
              data={normalizedData}
              onBegin={goNext}
            />
          </PageTransition>

          {/* Page 1: The Journey */}
          <PageTransition active={currentPage === 1} direction={slideDirection}>
            <SectionJourney
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={1}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 2: Memories */}
          <PageTransition active={currentPage === 2} direction={slideDirection}>
            <SectionMemories
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={2}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 3: The People */}
          <PageTransition active={currentPage === 3} direction={slideDirection}>
            <SectionPeople
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={3}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 4: Graduation Letter */}
          <PageTransition active={currentPage === 4} direction={slideDirection}>
            <SectionLetter
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={4}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 5: What's Next */}
          <PageTransition active={currentPage === 5} direction={slideDirection}>
            <SectionWhatsNext
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={5}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 6: Final Celebration */}
          <PageTransition active={currentPage === 6} direction={slideDirection}>
            <SectionCelebration
              data={normalizedData}
              onReplay={goRestart}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={6}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Bottom Floating Story Chapters Bar */}
          <nav className="grad-floating-page-bar" aria-label="Graduation story chapter jumps">
            <div className="grad-page-pills-row">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`grad-page-pill-btn ${idx === currentPage ? 'active' : ''}`}
                  onClick={() => goToPage(idx)}
                  aria-label={`Jump to chapter ${idx + 1}: ${ch.title}`}
                  title={`${ch.short} · ${ch.title}`}
                >
                  <span className="grad-pill-num">{ch.short}</span>
                  <span className="grad-pill-label">{ch.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      ) : (
        /* CONTINUOUS SCROLL MODE */
        <>
          <GradNav
            activeSection={activeScrollSection}
            onNavigate={scrollToSection}
          />

          <main className="grad-editorial-body">
            <SectionHero
              data={normalizedData}
              onBegin={() => scrollToSection('grad-section-journey')}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionJourney
              data={normalizedData}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionMemories
              data={normalizedData}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionPeople
              data={normalizedData}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionLetter
              data={normalizedData}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionWhatsNext
              data={normalizedData}
            />

            <div className="grad-section-divider" aria-hidden="true">
              <span className="grad-divider-line" />
              <span className="grad-divider-glyph">✦</span>
              <span className="grad-divider-line" />
            </div>

            <SectionCelebration
              data={normalizedData}
              onReplay={() => scrollToSection('grad-section-hero')}
            />
          </main>
        </>
      )}

      {/* Editorial Footer */}
      <footer className="grad-editorial-footer">
        <p className="grad-footer-credit">A Wishly Commencement Keepsake · Created with pride</p>
      </footer>
    </div>
  );
}

export const ClassOf2026Template = GraduationTemplate1;
export const GraduationTemplate = GraduationTemplate1;
export default GraduationTemplate1;
