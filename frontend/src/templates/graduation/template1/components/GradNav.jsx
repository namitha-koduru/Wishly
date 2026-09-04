import React, { useState, useEffect } from 'react';

const SECTIONS = [
  { id: 'grad-section-hero', label: 'Opening', short: '00' },
  { id: 'grad-section-journey', label: 'The Journey', short: '01' },
  { id: 'grad-section-memories', label: 'Memories', short: '02' },
  { id: 'grad-section-people', label: 'The People', short: '03' },
  { id: 'grad-section-letter', label: 'Letter', short: '04' },
  { id: 'grad-section-whats-next', label: "What's Next", short: '05' },
  { id: 'grad-section-celebration', label: 'Celebration', short: '06' },
];

export function GradNav({ activeSection, onNavigate }) {
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
    <nav className="grad-floating-nav" aria-label="Graduation chapter navigation">
      {/* Top Reading Progress Bar */}
      <div className="grad-nav-progress-track">
        <div
          className="grad-nav-progress-fill"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Chapters list */}
      <div className="grad-nav-inner">
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              className={`grad-nav-dot-btn ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(sec.id)}
              aria-label={`Jump to ${sec.label}`}
              title={sec.label}
            >
              <span className="grad-nav-num">{sec.short}</span>
              <span className="grad-nav-title">{sec.label}</span>
              <span className="grad-nav-dot" />
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default GradNav;
