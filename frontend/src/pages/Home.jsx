import React from 'react';
import { Link } from 'react-router-dom';
import { OCCASIONS } from '../data/occasions.js';
import OccasionCard from '../components/OccasionCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import TemplateGallery from '../components/TemplateGallery.jsx';

export function Home() {
  return (
    <div className="home-page">
      {/* Visual Hero Section */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span>✨ Wishly</span>
            </div>
            <h1 className="hero-title">
              Wishes, made personal.
            </h1>
            <p className="hero-subtitle">
              Create a beautiful little website for someone special.
            </p>

            <div className="hero-cta-group">
              <Link to="/templates" className="btn btn-primary btn-lg pulse-glow">
                Create Your Wish ✨
              </Link>
              <a href="#occasions" className="btn btn-secondary btn-lg">
                Explore Templates ↓
              </a>
            </div>

            {/* Quick feature pills */}
            <div className="hero-feature-pills">
              <span className="feature-pill">🎂 7 Occasions</span>
              <span className="feature-pill">🎨 35 Handcrafted Designs</span>
              <span className="feature-pill">⚡ Instant Shareable URL</span>
              <span className="feature-pill">🔒 No Recipient Login Required</span>
            </div>
          </div>

          {/* Visual Hero Showcase Composition */}
          <div className="hero-visual-showcase" aria-hidden="true">
            <div className="hero-card-stack">
              {/* Card 1: Birthday Celebration */}
              <div className="hero-floating-card hero-card-1">
                <div className="card-badge">🎂 BIRTHDAY</div>
                <div className="card-person-row">
                  <div className="person-avatar">🎉</div>
                  <div>
                    <h4>Happy Birthday, Ananya!</h4>
                    <p>May your year be full of magic & laughter ✨</p>
                  </div>
                </div>
                <div className="card-mini-footer">
                  <span>With love always, Alex</span>
                  <span className="card-pill-tag">wishly.app/w/ananya-21</span>
                </div>
              </div>

              {/* Card 2: Romantic Love Letter */}
              <div className="hero-floating-card hero-card-2">
                <div className="card-badge card-badge-romance">❤️ VALENTINE'S</div>
                <h4>Dearest Sophia,</h4>
                <p>"Every second with you is my favorite memory in life."</p>
                <div className="card-mini-footer">
                  <span>— Forever Yours ❦</span>
                </div>
              </div>

              {/* Card 3: Milestone Graduation */}
              <div className="hero-floating-card hero-card-3">
                <div className="card-badge card-badge-grad">🎓 CLASS OF 2026</div>
                <h4>Bravo, Marcus! 🏆</h4>
                <p>All the hard work paid off. The world is yours!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasion Section: "What's the occasion?" */}
      <section className="occasions-section" id="occasions">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">CHOOSE AN OCCASION</span>
            <h2 className="section-title">What's the occasion?</h2>
            <p className="section-subtitle">
              Select an occasion to browse designs tailored for every special moment.
            </p>
          </div>

          <div className="occasions-grid">
            {OCCASIONS.map((occ) => (
              <OccasionCard key={occ.id} occasion={occ} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section (4 Steps) */}
      <HowItWorks />

      {/* Template Gallery Section */}
      <section className="featured-templates-section" id="templates">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">TEMPLATES</span>
            <h2 className="section-title">Find the perfect way to say it.</h2>
            <p className="section-subtitle">
              Choose a design, make it yours, and send it with love.
            </p>
          </div>

          <TemplateGallery initialOccasion="all" />
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-banner-card">
            <span className="cta-banner-badge">✨ MAKE MOMENTS SPECIAL</span>
            <h2 className="cta-banner-title">Ready to make someone's day?</h2>
            <p className="cta-banner-desc">
              Create something they'll want to keep forever. Pick a template and customize your wish in minutes.
            </p>
            <Link to="/templates" className="btn btn-primary btn-lg pulse-glow">
              Create Your Wish ✨
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
