import React from 'react';

export function TimelineView({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="template-timeline-container">
      <div className="timeline-track-line" aria-hidden="true"></div>
      <div className="timeline-items-list">
        {items.map((item, index) => (
          <div key={index} className="timeline-item-card">
            <div className="timeline-marker-dot">
              <span className="marker-inner"></span>
            </div>
            <div className="timeline-card-content">
              {item.date && <span className="timeline-date-badge">{item.date}</span>}
              <h4 className="timeline-item-title">{item.title}</h4>
              {item.description && <p className="timeline-item-desc">{item.description}</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelineView;
