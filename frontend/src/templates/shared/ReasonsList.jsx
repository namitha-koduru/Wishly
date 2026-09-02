import React from 'react';

export function ReasonsList({ reasons = [], title = "Reasons Why You're Special" }) {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="template-reasons-container">
      {title && <h3 className="reasons-heading">{title}</h3>}
      <div className="reasons-grid">
        {reasons.map((reason, index) => (
          <div key={index} className="reason-item-card">
            <span className="reason-number">#{index + 1}</span>
            <p className="reason-text">{reason}</p>
            <span className="reason-heart-icon">💖</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReasonsList;
