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

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close drawer on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={`site-header ${isScrolled ? 'header-scrolled' : ''} ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="header-container">
        {/* Brand Wordmark */}
        <Link to="/" className="brand-wordmark" onClick={closeMenu} aria-label="Wishly Home">
          <img src="/logo.png" alt="Wishly logo" className="brand-logo-img" />
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

          {/* Mobile hamburger toggle with 3-bar animated lines */}
          <button
            type="button"
            className={`mobile-menu-btn ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="hamburger-box">
              <span className="hamburger-bar top"></span>
              <span className="hamburger-bar middle"></span>
              <span className="hamburger-bar bottom"></span>
            </span>
          </button>
        </div>
      </div>

      {/* Layered Mobile Navigation */}
      {mobileMenuOpen && (
        <>
          {/* Layer 1: Backdrop Overlay covering the page */}
          <div
            className="mobile-menu-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />

          {/* Layer 2: Mobile Navigation Drawer Menu */}
          <nav
            id="mobile-navigation-menu"
            className="mobile-menu-drawer"
            aria-label="Mobile Menu Navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="mobile-drawer-header">
              <Link to="/" className="brand-wordmark" onClick={closeMenu}>
                <img src="/logo.png" alt="Wishly logo" className="brand-logo-img" />
                <span className="brand-name">Wishly</span>
                <span className="brand-dot"></span>
              </Link>
              <button
                type="button"
                className="mobile-drawer-close"
                onClick={closeMenu}
                aria-label="Close Navigation"
              >
                <span className="drawer-close-icon">✕</span>
              </button>
            </div>

            <div className="mobile-drawer-nav">
              <Link to="/" className={`mobile-nav-link ${isActive('/') ? 'active' : ''}`} onClick={closeMenu}>
                <span className="mobile-nav-num">01</span>
                <span className="mobile-nav-text">Home</span>
              </Link>
              <a href="/#occasions" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-num">02</span>
                <span className="mobile-nav-text">Occasions</span>
              </a>
              <Link to="/templates" className={`mobile-nav-link ${isActive('/templates') ? 'active' : ''}`} onClick={closeMenu}>
                <span className="mobile-nav-num">03</span>
                <span className="mobile-nav-text">Templates (35)</span>
              </Link>
              <a href="/#how-it-works" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-num">04</span>
                <span className="mobile-nav-text">How It Works</span>
              </a>
              <a href="/#philosophy" className="mobile-nav-link" onClick={closeMenu}>
                <span className="mobile-nav-num">05</span>
                <span className="mobile-nav-text">Philosophy</span>
              </a>
            </div>

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
              <Link to="/templates" className="btn btn-primary btn-block mobile-create-btn" onClick={closeMenu}>
                Create a Wish ✨
              </Link>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}

export default Navbar;
