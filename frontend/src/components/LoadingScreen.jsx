import React from 'react';

export function LoadingScreen({
  title = 'Preparing something special...',
  subtitle = 'Unwrapping your personalized keepsake ✨',
  fullScreen = true,
  compact = false
}) {
  return (
    <div className={`wishly-loading-container ${fullScreen ? 'wishly-loading-fullscreen' : 'wishly-loading-inline'} ${compact ? 'wishly-loading-compact' : ''}`} role="status" aria-live="polite">
      <div className="wishly-loading-card">
        {/* Floating animated official logo */}
        <div className="wishly-loading-logo-wrap">
          <div className="wishly-logo-glow"></div>
          <img src="/logo.png" alt="Wishly" className="wishly-loading-logo-img" />
          <span className="wishly-floating-heart heart-1">💖</span>
          <span className="wishly-floating-heart heart-2">✨</span>
          <span className="wishly-floating-heart heart-3">🌸</span>
        </div>

        {/* Brand Tagline */}
        <span className="wishly-loading-brand">WISHLY</span>

        {/* Message */}
        <h3 className="wishly-loading-title">{title}</h3>
        {subtitle && <p className="wishly-loading-subtitle">{subtitle}</p>}

        {/* Shimmering Luxury Progress Line */}
        <div className="wishly-loading-bar-wrap">
          <div className="wishly-loading-bar-fill"></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
