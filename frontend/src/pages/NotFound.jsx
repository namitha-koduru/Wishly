import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container not-found-container">
        <div className="not-found-card text-center">
          {/* 3D 404 Question Envelope Illustration */}
          <div className="not-found-image-wrap">
            <div className="not-found-glow-halo"></div>
            <img src="/404.png" alt="404 Page Not Found" className="not-found-illustration" />
            <span className="not-found-float-sparkle sparkle-1">✨</span>
            <span className="not-found-float-sparkle sparkle-2">💭</span>
          </div>

          <span className="not-found-tag">404 • LOST IN THE CLOUDS</span>
          <h1 className="not-found-title">This wish seems to have wandered off.</h1>
          <p className="not-found-desc">
            The page or keepsake you are looking for might have been moved, renamed, or never existed in the first place.
          </p>

          <div className="not-found-actions">
            <Link to="/" className="btn btn-primary btn-lg">
              ← Return Home
            </Link>
            <Link to="/templates" className="btn btn-secondary btn-lg">
              Explore 35 Designs ✨
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
