import React, { useState, useEffect, useRef } from 'react';
import SectionOpening from './components/SectionOpening.jsx';
import SectionBeginning from './components/SectionBeginning.jsx';
import SectionChaos from './components/SectionChaos.jsx';
import SectionPeople from './components/SectionPeople.jsx';
import SectionLittleThings from './components/SectionLittleThings.jsx';
import SectionOneLastPage from './components/SectionOneLastPage.jsx';
import SectionFarewell from './components/SectionFarewell.jsx';
import SectionNav from './components/SectionNav.jsx';
import PageTransition from './components/PageTransition.jsx';
import defaultFarewellData from './defaultData.js';
import './FarewellTemplate1.css';

const CHAPTERS = [
  { id: 'section-opening', title: 'Before We Go', short: '00' },
  { id: 'section-beginning', title: 'The Beginning', short: '01' },
  { id: 'section-chaos', title: 'The Chaos', short: '02' },
  { id: 'section-people', title: 'The People', short: '03' },
  { id: 'section-little-things', title: 'Little Things', short: '04' },
  { id: 'section-one-last-page', title: 'One Last Page', short: '05' },
  { id: 'section-farewell', title: 'Farewell', short: '06' },
];

/**
 * Normalizes data passed from Wishly Creator / Customizer / GeneratedWish
 */
function normalizeFarewellData(incoming = {}) {
  const data = incoming.config || incoming.customData || incoming;
  const base = defaultFarewellData;

  const recipientName = data.recipientName || base.recipientName;
  const senderName = data.senderName || base.senderName;
  const teamName = data.teamName || base.teamName;
  const role = data.role || data.degree || base.role;
  const date = data.date || base.date;
  const batch = data.batch || data.classYear || base.batch;
  const message = data.message || base.message;
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

  const beginningMilestones = customMilestones
    ? customMilestones.map((m, idx) => ({
        date: m.date || `Chapter ${idx + 1}`,
        title: m.title || `Milestone ${idx + 1}`,
        description: m.description || m.desc || '',
        photo: normalizedPhotos[idx + 1] || base.beginning.milestones[idx % base.beginning.milestones.length]?.photo,
        caption: m.caption || `Chapter ${idx + 1} archive`
      }))
    : base.beginning.milestones.map((m, idx) => ({
        ...m,
        photo: normalizedPhotos[idx + 1] || m.photo
      }));

  const chaosItems = base.chaos.items.map((item, idx) => ({
    ...item,
    photo: normalizedPhotos[idx + 4] || item.photo
  }));

  const peopleMembers = (data.people || base.people.members).map((member, idx) => ({
    ...member,
    photo: normalizedPhotos[idx + 8] || member.photo
  }));

  const oneLastPagePhoto = normalizedPhotos[normalizedPhotos.length - 1] || base.oneLastPage.photo;

  return {
    ...base,
    recipientName,
    senderName,
    teamName,
    role,
    date,
    batch,
    message,
    subtitle,
    heroPhoto,
    beginning: {
      ...base.beginning,
      milestones: beginningMilestones
    },
    chaos: {
      ...base.chaos,
      items: chaosItems
    },
    people: {
      ...base.people,
      members: peopleMembers
    },
    littleThings: {
      ...base.littleThings,
      items: data.littleThings || base.littleThings.items
    },
    oneLastPage: {
      ...base.oneLastPage,
      photo: oneLastPagePhoto
    },
    farewell: {
      ...base.farewell
    }
  };
}

export function FarewellTemplate1({ data = {}, config: configOverride }) {
  const normalizedData = normalizeFarewellData(configOverride || data);
  
  // Page mode is true by default for captivating chapter jumps
  const [isPageMode, setIsPageMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [slideDirection, setSlideDirection] = useState('next');
  const [activeScrollSection, setActiveScrollSection] = useState('section-opening');

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Jump to specific page
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

  // Keyboard navigation (Arrow keys)
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
        // Swiped Left -> Go Next
        goNext();
      } else {
        // Swiped Right -> Go Prev
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
      className={`wishly-farewell-template-1 ${isPageMode ? 'fw-mode-pages' : 'fw-mode-scroll'}`}
      onTouchStart={isPageMode ? handleTouchStart : undefined}
      onTouchEnd={isPageMode ? handleTouchEnd : undefined}
    >
      {/* Editorial paper grain overlay */}
      <div className="fw-paper-grain" aria-hidden="true" />

      {/* Top Experience Bar */}
      <header className="fw-top-experience-bar">
        <div className="fw-top-bar-inner">
          <div className="fw-top-chapter-status">
            <span className="fw-top-badge">CHAPTER {String((isPageMode ? currentPage : 0) + 1).padStart(2, '0')}</span>
            <span className="fw-top-chapter-title">
              {CHAPTERS[isPageMode ? currentPage : 0]?.title}
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="fw-mode-toggle-wrap">
            <button
              type="button"
              className={`fw-mode-btn ${isPageMode ? 'active' : ''}`}
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
              className={`fw-mode-btn ${!isPageMode ? 'active' : ''}`}
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

      {/* PAGE MODE (Story Cards with Page Jumps) */}
      {isPageMode ? (
        <div className="fw-paged-narrative-stage">
          {/* Page 0: Opening */}
          <PageTransition active={currentPage === 0} direction={slideDirection}>
            <SectionOpening
              data={normalizedData}
              onBegin={goNext}
            />
          </PageTransition>

          {/* Page 1: The Beginning */}
          <PageTransition active={currentPage === 1} direction={slideDirection}>
            <SectionBeginning
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={1}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 2: The Chaos */}
          <PageTransition active={currentPage === 2} direction={slideDirection}>
            <SectionChaos
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

          {/* Page 4: The Little Things */}
          <PageTransition active={currentPage === 4} direction={slideDirection}>
            <SectionLittleThings
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={4}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 5: One Last Page */}
          <PageTransition active={currentPage === 5} direction={slideDirection}>
            <SectionOneLastPage
              data={normalizedData}
              onNext={goNext}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={5}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Page 6: Farewell */}
          <PageTransition active={currentPage === 6} direction={slideDirection}>
            <SectionFarewell
              data={normalizedData}
              onReplay={goRestart}
              onPrev={goPrev}
              isPageMode={true}
              pageIndex={6}
              totalPages={CHAPTERS.length}
            />
          </PageTransition>

          {/* Bottom Floating Story Chapters Bar */}
          <nav className="fw-floating-page-bar" aria-label="Story chapter jumps">
            <div className="fw-page-pills-row">
              {CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  className={`fw-page-pill-btn ${idx === currentPage ? 'active' : ''}`}
                  onClick={() => goToPage(idx)}
                  aria-label={`Jump to page ${idx + 1}: ${ch.title}`}
                  title={`${ch.short} · ${ch.title}`}
                >
                  <span className="fw-pill-num">{ch.short}</span>
                  <span className="fw-pill-label">{ch.title}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      ) : (
        /* CONTINUOUS SCROLL MODE */
        <>
          <SectionNav
            activeSection={activeScrollSection}
            onNavigate={scrollToSection}
          />

          <main className="fw-editorial-body">
            <SectionOpening
              data={normalizedData}
              onBegin={() => scrollToSection('section-beginning')}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionBeginning
              data={normalizedData}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionChaos
              data={normalizedData}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionPeople
              data={normalizedData}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionLittleThings
              data={normalizedData}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionOneLastPage
              data={normalizedData}
            />

            <div className="fw-section-divider" aria-hidden="true">
              <span className="fw-divider-line" />
              <span className="fw-divider-glyph">✤</span>
              <span className="fw-divider-line" />
            </div>

            <SectionFarewell
              data={normalizedData}
              onReplay={() => scrollToSection('section-opening')}
            />
          </main>
        </>
      )}

      {/* Editorial Footer */}
      <footer className="fw-editorial-footer">
        <p className="fw-footer-credit">A Wishly Memory Chronicle · Created with care</p>
      </footer>
    </div>
  );
}

export const MemoryWallTemplate = FarewellTemplate1;
export const FarewellTemplate = FarewellTemplate1;
export default FarewellTemplate1;
