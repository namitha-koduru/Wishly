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
          <Link to="/templates" className="btn btn-primary btn-sm cta-header">
            Create Your Wish ✨
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
            <div className="mobile-drawer-cta">
              <Link to="/templates" className="btn btn-primary btn-block" onClick={closeMenu}>
                Create Your Wish ✨
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
