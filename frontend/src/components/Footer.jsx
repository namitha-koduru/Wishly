import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo.png" alt="Wishly" className="footer-logo-img" />
            <span className="brand-text">Wishly</span>
          </div>
          <p className="footer-tagline">Make moments special.</p>
          <p className="footer-desc">
            The internet's little way of saying I care. Create beautiful, shareable keepsake websites for every milestone, celebration, and heartfelt human moment.
          </p>
        </div>

        <div className="footer-links-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="/#occasions">Occasions</a></li>
            <li><Link to="/templates">All 35 Templates</Link></li>
            <li><a href="/#how-it-works">How It Works</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Occasions</h4>
          <ul>
            <li><Link to="/templates/birthday">🎂 Birthday Wishes</Link></li>
            <li><Link to="/templates/anniversary">💍 Anniversary</Link></li>
            <li><Link to="/templates/graduation">🎓 Graduation</Link></li>
            <li><Link to="/templates/valentines">❤️ Valentine's</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Community</h4>
          <ul>
            <li>
              <a
                href="https://github.com/namitha-koduru/Wishly"
                target="_blank"
                rel="noopener noreferrer"
              >
                ⭐ Star on GitHub
              </a>
            </li>
            <li><Link to="/templates">Create a Wish</Link></li>
            <li><a href="#about" onClick={(e) => e.preventDefault()}>About Wishly</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p>&copy; {new Date().getFullYear()} Wishly. All rights reserved. Wishes, made personal.</p>
          <p className="footer-secondary-note">Designed with care for human moments.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
