import React from 'react';
import { Link } from 'react-router-dom';

export function OccasionCard({ occasion }) {
  const { id, name, icon, tagline, description, color, bgLight, featuredBadge } = occasion;

  return (
    <Link to={`/templates/${id}`} className="occasion-card" style={{ '--card-accent': color }}>
      <div className="occasion-card-inner" style={{ background: bgLight || '#fff' }}>
        <div className="occasion-top">
          <span className="occasion-icon">{icon}</span>
          {featuredBadge && (
            <span className="occasion-badge" style={{ backgroundColor: color }}>
              {featuredBadge}
            </span>
          )}
        </div>
        <h3 className="occasion-name">{name}</h3>
        <p className="occasion-tagline">{tagline}</p>
        <p className="occasion-desc">{description}</p>
        <div className="occasion-action">
          <span className="occasion-link-text">Explore 5 Templates →</span>
        </div>
      </div>
    </Link>
  );
}

export default OccasionCard;
