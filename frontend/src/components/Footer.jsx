import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="brand-sparkle">✨</span>
            <span className="brand-text">Wishly</span>
          </div>
          <p className="footer-tagline">Wishes, made personal.</p>
          <p className="footer-desc">
            Create beautiful personalized web experiences for every occasion and share them with the ones you cherish.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Navigation</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><a href="/#occasions">Occasions</a></li>
            <li><Link to="/templates">All Templates</Link></li>
            <li><a href="/#how-it-works">How It Works</a></li>
          </ul>
        </div>

        <div className="footer-links-group">
          <h4>Occasions</h4>
          <ul>
            <li><Link to="/templates/birthday">🎂 Birthday</Link></li>
            <li><Link to="/templates/anniversary">💍 Anniversary</Link></li>
            <li><Link to="/templates/graduation">🎓 Graduation</Link></li>
            <li><Link to="/templates/valentines">❤️ Valentine's</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Wishly. Wishes, made personal. Built with care.</p>
      </div>
    </footer>
  );
}

export default Footer;
