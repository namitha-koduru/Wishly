import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="header-container">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenu}>
          <span className="brand-sparkle">✦</span>
          <span className="brand-text">Wishly</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="/#occasions" className="nav-item">
            Occasions
          </a>
          <Link to="/templates" className={`nav-item ${isActive('/templates') ? 'active' : ''}`}>
            Templates
          </Link>
          <a href="/#how-it-works" className="nav-item">
            How It Works
          </a>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Subtle GitHub / Community Support Pill */}
          <a
            href="https://github.com/namitha-koduru/Wishly"
            target="_blank"
            rel="noopener noreferrer"
            className="github-star-pill"
            aria-label="Star Wishly on GitHub"
            title="Star Wishly on GitHub"
          >
            <span className="github-star-icon">⭐</span>
            <span className="github-star-label">Star on GitHub</span>
          </a>

          <Link to="/templates" className="btn btn-primary btn-sm cta-header">
            Create a Wish ✨
          </Link>

          {/* Mobile hamburger toggle */}
          <button
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" onClick={closeMenu}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-logo" onClick={closeMenu}>
                <span className="brand-sparkle">✦</span>
                <span className="brand-text">Wishly</span>
              </Link>
              <button
                className="mobile-drawer-close"
                onClick={closeMenu}
                aria-label="Close Navigation"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-drawer-nav">
              <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                Home
              </Link>
              <a href="/#occasions" className="mobile-nav-item" onClick={closeMenu}>
                Occasions
              </a>
              <Link to="/templates" className={`mobile-nav-item ${isActive('/templates') ? 'active' : ''}`} onClick={closeMenu}>
                Templates
              </Link>
              <a href="/#how-it-works" className="mobile-nav-item" onClick={closeMenu}>
                How It Works
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="https://github.com/namitha-koduru/Wishly"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-github-link"
                onClick={closeMenu}
              >
                ⭐ Star on GitHub
              </a>
              <Link to="/templates" className="btn btn-primary btn-block" onClick={closeMenu}>
                Create a Wish ✨
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
