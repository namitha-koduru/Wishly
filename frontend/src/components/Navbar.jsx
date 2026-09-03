import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
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
        {/* Brand Wordmark */}
        <Link to="/" className="brand-wordmark" onClick={closeMenu} aria-label="Wishly Home">
          <span className="brand-name">Wishly</span>
          <span className="brand-dot"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <a href="/#occasions" className="nav-link">
            Occasions
          </a>
          <Link to="/templates" className={`nav-link ${isActive('/templates') ? 'active' : ''}`}>
            Templates
          </Link>
          <a href="/#how-it-works" className="nav-link">
            How It Works
          </a>
          <a href="/#philosophy" className="nav-link">
            Philosophy
          </a>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <a
            href="https://github.com/namitha-koduru/Wishly"
            target="_blank"
            rel="noopener noreferrer"
            className="github-pill"
            aria-label="Star Wishly on GitHub"
            title="Star Wishly on GitHub"
          >
            <span className="github-star-icon">⭐</span>
            <span className="github-pill-text">Star</span>
          </a>

          <Link to="/templates" className="btn btn-primary btn-sm nav-cta-btn">
            Create a Wish
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

      {/* Fullscreen Editorial Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer" onClick={closeMenu}>
          <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-wordmark" onClick={closeMenu}>
                <span className="brand-name">Wishly</span>
                <span className="brand-dot"></span>
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
              <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                01. Home
              </Link>
              <a href="/#occasions" className="mobile-nav-link" onClick={closeMenu}>
                02. Occasions
              </a>
              <Link to="/templates" className={`mobile-nav-link ${isActive('/templates') ? 'active' : ''}`} onClick={closeMenu}>
                03. Templates (35)
              </Link>
              <a href="/#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
                04. How It Works
              </a>
              <a href="/#philosophy" className="mobile-nav-link" onClick={closeMenu}>
                05. Philosophy
              </a>
            </nav>

            <div className="mobile-drawer-footer">
              <a
                href="https://github.com/namitha-koduru/Wishly"
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-github-box"
                onClick={closeMenu}
              >
                ⭐ Star Wishly on GitHub
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
