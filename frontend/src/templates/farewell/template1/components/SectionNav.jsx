import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'section-opening', label: 'Opening', short: '00' },
  { id: 'section-beginning', label: 'The Beginning', short: '01' },
  { id: 'section-chaos', label: 'The Chaos', short: '02' },
  { id: 'section-people', label: 'The People', short: '03' },
  { id: 'section-little-things', label: 'Little Things', short: '04' },
  { id: 'section-one-last-page', label: 'One Last Page', short: '05' },
  { id: 'section-farewell', label: 'Farewell', short: '06' },
];

export function SectionNav({ activeSection, onNavigate }) {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fw-floating-nav" aria-label="Editorial chapter navigation">
      {/* Top Reading Progress Bar */}
      <div className="fw-nav-progress-track">
        <div
          className="fw-nav-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapters list */}
      <div className="fw-nav-inner">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              className={`fw-nav-dot-btn ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(sec.id)}
              aria-label={`Jump to ${sec.label}`}
              title={sec.label}
            >
              <span className="fw-nav-num">{sec.short}</span>
              <span className="fw-nav-title">{sec.label}</span>
              <span className="fw-nav-dot" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default SectionNav;
