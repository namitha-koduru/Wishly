import React from 'react';

/**
 * AlbumNavigation component
 * Calm, refined chapter navigation thread for Christian Anniversary template.
 */
export function AlbumNavigation({ currentStage, onStageSelect, stages = [] }) {
  const stageLabels = {
    hero: 'Welcome',
    journey: 'Journey',
    rings: 'Covenant',
    prayer: 'Prayer',
    devotion: 'Devotion',
    album: 'Album',
    final: 'Blessing'
  };

  return (
    <nav className="grace-nav-thread" aria-label="Anniversary Chapters">
      <div className="grace-nav-pill-bar">
        {stages.map((st, idx) => {
          const isActive = currentStage === st;
          const isPassed = stages.indexOf(currentStage) > idx;

          return (
            <button
              key={st}
              type="button"
              className={`grace-nav-item ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => onStageSelect(st)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="grace-nav-bullet">
                {isPassed ? '✓' : idx + 1}
              </span>
              <span className="grace-nav-label">
                {stageLabels[st] || st}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default AlbumNavigation;
