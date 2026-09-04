import React from 'react';
import { Link } from 'react-router-dom';

export function TemplateNotFound({
  title = "This design seems to have flown away.",
  description = "The template you are trying to customize or preview does not exist or has been moved.",
  suggestedAction = { to: "/templates", label: "Browse 35 Curated Designs ✨" }
}) {
  return (
    <div className="template-not-found-page not-found-page">
      <div className="container not-found-container">
        <div className="not-found-card text-center">
          {/* 3D Template Not Found Envelope & Magnifier Illustration */}
          <div className="not-found-image-wrap template-not-found-wrap">
            <div className="not-found-glow-halo"></div>
            <img
              src="/template-not-found.png"
              alt="Template Not Found"
              className="not-found-illustration template-not-found-illustration"
            />
            <span className="not-found-float-sparkle sparkle-1">💌</span>
            <span className="not-found-float-sparkle sparkle-2">✈️</span>
          </div>

          <span className="not-found-tag">TEMPLATE NOT FOUND</span>
          <h1 className="not-found-title">{title}</h1>
          <p className="not-found-desc">
            {description}
          </p>

          <div className="not-found-actions">
            <Link to={suggestedAction.to} className="btn btn-primary btn-lg">
              {suggestedAction.label}
            </Link>
            <Link to="/" className="btn btn-secondary btn-lg">
              ← Return Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TemplateNotFound;
