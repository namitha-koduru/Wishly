import React from 'react';
import { Link } from 'react-router-dom';
import { OCCASIONS } from '../data/occasions.js';
import OccasionCard from '../components/OccasionCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import TemplateGallery from '../components/TemplateGallery.jsx';
import EmotionalSection from '../components/EmotionalSection.jsx';
import PersonalizationDemo from '../components/PersonalizationDemo.jsx';

export function Home() {
  return (
    <div className="home-page">
      {/* High-End Hero Section with Staggered Entrance */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-eyebrow-tag animate-fade-in" style={{ animationDelay: '150ms' }}>
              ✦ THE INTERNET'S LITTLE WAY OF SAYING I CARE
            </div>

            <h1 className="hero-title animate-fade-in" style={{ animationDelay: '300ms' }}>
              Make something<br />
              special. <em>Just for them.</em>
            </h1>

            <p className="hero-subtitle animate-fade-in" style={{ animationDelay: '450ms' }}>
              Create a beautiful personalized website for someone you love, celebrate, or simply want to make smile.
            </p>

            <div className="hero-cta-group animate-fade-in" style={{ animationDelay: '600ms' }}>
              <Link to="/templates" className="btn btn-primary btn-lg pulse-glow">
                Create Your Wish ✨
              </Link>
              <a href="#occasions" className="btn btn-secondary btn-lg">
                Explore templates ↓
              </a>
            </div>

            {/* Quick feature indicators */}
            <div className="hero-feature-pills animate-fade-in" style={{ animationDelay: '750ms' }}>
              <span className="feature-pill">🎂 7 Occasions</span>
              <span className="feature-pill">🎨 35 Handcrafted Designs</span>
              <span className="feature-pill">⚡ Instant Shareable URL</span>
              <span className="feature-pill">🔒 No Recipient Login Required</span>
            </div>
          </div>

          {/* Hero Visual Composition with Floating Keepsake Cards */}
          <div className="hero-visual-showcase animate-fade-in" style={{ animationDelay: '400ms' }} aria-hidden="true">
            <div className="hero-card-stack">
              {/* Central Feature Card: Ananya Birthday */}
              <div className="hero-floating-card hero-card-main">
                <div className="card-badge">🎂 BIRTHDAY KEEPSAKE</div>
                <div className="card-person-row">
                  <div className="person-avatar-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&auto=format&fit=crop&q=80"
                      alt="Ananya celebration"
                    />
                  </div>
                  <div>
                    <h4>Happy Birthday, Ananya! ✨</h4>
                    <p className="card-subtext">September 12 • Special Day</p>
                  </div>
                </div>
                <p className="card-quote-preview">
                  "May your year be as bright and wonderful as your smile!"
                </p>
                <div className="card-mini-footer">
                  <span className="footer-author">— With love always, Alex</span>
                  <span className="card-pill-tag">wishly.app/w/ananya-21</span>
                </div>
              </div>

              {/* Floating Chip 1: Anniversary */}
              <div className="floating-chip chip-anniversary">
                <span className="chip-icon">💍</span>
                <span className="chip-text">5 Beautiful Years</span>
              </div>

              {/* Floating Chip 2: Valentine's */}
              <div className="floating-chip chip-valentine">
                <span className="chip-icon">❤️</span>
                <span className="chip-text">Forever & Always</span>
              </div>

              {/* Floating Chip 3: Graduation */}
              <div className="floating-chip chip-grad">
                <span className="chip-icon">🎓</span>
                <span className="chip-text">Class of 2026</span>
              </div>

              {/* Floating Chip 4: Just Because */}
              <div className="floating-chip chip-just-because">
                <span className="chip-icon">💌</span>
                <span className="chip-text">Thinking of you</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Occasions Section: "Whatever the reason, make it personal." */}
      <section className="occasions-section" id="occasions">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">OCCASIONS</span>
            <h2 className="section-title">
              Whatever the reason,<br />
              <em>make it personal.</em>
            </h2>
            <p className="section-subtitle">
              Choose an occasion to explore tailored layouts, typography, and storytelling aesthetics.
            </p>
          </div>

          <div className="occasions-grid">
            {OCCASIONS.map((occ) => (
              <OccasionCard key={occ.id} occasion={occ} />
            ))}
          </div>
        </div>
      </section>

      {/* Visual 3-Step Journey */}
      <HowItWorks />

      {/* Emotional Storytelling Section */}
      <EmotionalSection />

      {/* Personalization Transformation Demonstration */}
      <PersonalizationDemo />

      {/* Template Showcase Section: "Made to feel like them." */}
      <section className="featured-templates-section" id="templates">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">CURATED DESIGNS</span>
            <h2 className="section-title">
              Made to feel <em>like them.</em>
            </h2>
            <p className="section-subtitle">
              Browse 35+ handcrafted templates with diverse layouts, mood boards, and keepsake styles.
            </p>
          </div>

          <TemplateGallery initialOccasion="all" />
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-banner-card">
            <span className="cta-banner-badge">✦ START IN SECONDS</span>
            <h2 className="cta-banner-title">
              Ready to make their day?
            </h2>
            <p className="cta-banner-desc">
              Create a Wishly they'll want to open twice. Pick a design, write from the heart, and surprise them today.
            </p>
            <div className="cta-btn-wrap">
              <Link to="/templates" className="btn btn-primary btn-lg pulse-glow">
                Create Your Wish ✨
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
