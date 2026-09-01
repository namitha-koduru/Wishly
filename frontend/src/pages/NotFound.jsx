import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container text-center py-5">
        <div className="not-found-icon">✨ 404</div>
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-desc">
          The page or wish link you are looking for does not exist or might have moved.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">Go to Home</Link>
          <Link to="/templates" className="btn btn-secondary">Browse Templates</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
