import React from 'react';
import { Link } from 'react-router-dom';

export function OccasionCard({ occasion }) {
  const { id, name, icon, tagline, description, hoverPreview, color } = occasion;

  return (
    <Link to={`/templates/${id}`} className="occasion-card" style={{ '--card-accent': color }}>
      <div className="occasion-card-inner">
        <div className="occasion-card-header">
          <span className="occasion-icon">{icon}</span>
          <span className="occasion-card-index">05 Designs</span>
        </div>

        <h3 className="occasion-name">{name}</h3>
        <p className="occasion-tagline">{tagline}</p>
        <p className="occasion-desc">{description}</p>

        <div className="occasion-card-footer">
          <div className="occasion-preview-tag">
            <span className="preview-label">Tone:</span>
            <span className="preview-text">{hoverPreview || `Personalized ${name}`}</span>
          </div>
          <span className="occasion-arrow">→</span>
        </div>
      </div>
    </Link>
  );
}

export default OccasionCard;
