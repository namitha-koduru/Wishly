import React from 'react';

/**
 * NavigationRibbon component for Petals & Us
 * Chapter navigation bar at the bottom.
 */
export function NavigationRibbon({ currentStage, onStageSelect, stages = [] }) {
  const stageLabels = {
    intro: 'Surprise',
    us: 'Us ♡',
    'little-things': 'Little Things',
    question: 'Question',
    chaos: 'Memories',
    'fav-person': 'Favorite',
    final: 'Forever ♡'
  };

  return (
    <nav className="petals-nav-ribbon" aria-label="Petals & Us Chapters">
      <div className="petals-nav-bar">
        {stages.map((st, idx) => {
          const isActive = currentStage === st;
          const isPassed = stages.indexOf(currentStage) > idx;

          return (
            <button
              key={st}
              type="button"
              className={`petals-nav-btn ${isActive ? 'active' : ''} ${isPassed ? 'passed' : ''}`}
              onClick={() => onStageSelect(st)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="petals-nav-icon">
                {isPassed ? '🌸' : isActive ? '💖' : '🤍'}
              </span>
              <span className="petals-nav-label">
                {stageLabels[st] || st}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default NavigationRibbon;
