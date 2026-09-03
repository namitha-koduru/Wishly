import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OCCASIONS } from '../data/occasions.js';
import OccasionCard from '../components/OccasionCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';
import TemplateGallery from '../components/TemplateGallery.jsx';
import EmotionalSection from '../components/EmotionalSection.jsx';
import PersonalizationDemo from '../components/PersonalizationDemo.jsx';

const HERO_SHOWCASE_PREVIEWS = {
  birthday: {
    tag: 'BIRTHDAY KEEPSAKE',
    recipient: 'Ananya',
    date: 'September 12 • Special Day',
    message: '"Wishing you a year filled with loud laughs, quiet moments of peace, and everything your heart dreams of."',
    author: '— With all my love, Alex',
    url: 'wishly.app/w/ananya-21',
    photo: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    accent: '#C23B4E',
    icon: '🎂'
  },
  anniversary: {
    tag: 'ANNIVERSARY STORY',
    recipient: 'Rohan & Maya',
    date: 'June 18 • 5 Beautiful Years',
    message: '"Five years of coffee mornings, quiet Sunday walks, and choosing each other every single day."',
    author: '— Forever & Always, Rohan',
    url: 'wishly.app/w/rohan-maya',
    photo: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80',
    accent: '#8E44AD',
    icon: '💍'
  },
  graduation: {
    tag: 'ACADEMIC MILESTONE',
    recipient: 'Marcus Reed',
    date: 'Class of 2026 • Honors',
    message: '"All the late nights, library runs, and dedication led to this proud day. The future is yours."',
    author: '— Proudly celebrating you, Mom & Dad',
    url: 'wishly.app/w/marcus-grad',
    photo: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80',
    accent: '#2980B9',
    icon: '🎓'
  }
};

export function Home() {
  const [activeHeroTab, setActiveHeroTab] = useState('birthday');
  const activePreview = HERO_SHOWCASE_PREVIEWS[activeHeroTab];

  return (
    <div className="home-page">
      {/* ══════════ 1. EDITORIAL HERO SECTION ══════════ */}
      <section className="hero-section">
        <div className="container hero-container">
          {/* Left Column: Typography & Narrative */}
          <div className="hero-content">
            <div className="hero-eyebrow animate-fade-in" style={{ animationDelay: '100ms' }}>
              <span className="eyebrow-line"></span>
              <span className="eyebrow-text">AN EMOTIONAL PUBLISHING PLATFORM</span>
            </div>

            <h1 className="hero-headline animate-fade-in" style={{ animationDelay: '200ms' }}>
              Some moments<br />
              deserve more<br />
              <em>than a message.</em>
            </h1>

            <p className="hero-narrative animate-fade-in" style={{ animationDelay: '300ms' }}>
              Wishly transforms heartfelt words, photographs, and memories into a bespoke digital keepsake that someone you love can open, cherish, and keep forever.
            </p>

            <div className="hero-actions animate-fade-in" style={{ animationDelay: '400ms' }}>
              <Link to="/templates" className="btn btn-primary btn-lg">
                Begin a Story →
              </Link>
              <a href="#templates" className="btn btn-secondary btn-lg">
                Explore Gallery (35)
              </a>
            </div>

            {/* Quality Indicators */}
            <div className="hero-quality-bar animate-fade-in" style={{ animationDelay: '500ms' }}>
              <div className="quality-item">
                <span className="quality-num">35</span>
                <span className="quality-label">Handcrafted Designs</span>
              </div>
              <div className="quality-divider"></div>
              <div className="quality-item">
                <span className="quality-num">7</span>
                <span className="quality-label">Occasions</span>
              </div>
              <div className="quality-divider"></div>
              <div className="quality-item">
                <span className="quality-num">0</span>
                <span className="quality-label">Login for Recipient</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Keepsake Showcase */}
          <div className="hero-showcase-column animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="showcase-frame">
              {/* Tab Selector */}
              <div className="showcase-tab-bar" role="tablist">
                <button
                  type="button"
                  className={`showcase-tab ${activeHeroTab === 'birthday' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('birthday')}
                  role="tab"
                  aria-selected={activeHeroTab === 'birthday'}
                >
                  🎂 Birthday
                </button>
                <button
                  type="button"
                  className={`showcase-tab ${activeHeroTab === 'anniversary' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('anniversary')}
                  role="tab"
                  aria-selected={activeHeroTab === 'anniversary'}
                >
                  💍 Anniversary
                </button>
                <button
                  type="button"
                  className={`showcase-tab ${activeHeroTab === 'graduation' ? 'active' : ''}`}
                  onClick={() => setActiveHeroTab('graduation')}
                  role="tab"
                  aria-selected={activeHeroTab === 'graduation'}
                >
                  🎓 Graduation
                </button>
              </div>

              {/* Keepsake Visual Card */}
              <div className="showcase-card">
                <div className="showcase-card-header">
                  <span className="showcase-badge" style={{ color: activePreview.accent }}>
                    {activePreview.tag}
                  </span>
                  <span className="showcase-url-pill">{activePreview.url}</span>
                </div>

                <div className="showcase-photo-box">
                  <img
                    src={activePreview.photo}
                    alt={activePreview.recipient}
                    className="showcase-photo"
                  />
                  <div className="showcase-wax-seal">{activePreview.icon}</div>
                </div>

                <div className="showcase-body">
                  <h3 className="showcase-recipient">For {activePreview.recipient}</h3>
                  <p className="showcase-date">{activePreview.date}</p>
                  <p className="showcase-quote">{activePreview.message}</p>
                  <span className="showcase-author">{activePreview.author}</span>
                </div>

                <div className="showcase-card-footer">
                  <span className="showcase-hint">✦ Interactive Digital Keepsake</span>
                  <Link to="/templates" className="showcase-action-link">
                    Create One Like This →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ 2. OCCASIONS DISCOVERY ══════════ */}
      <section className="occasions-section" id="occasions">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">OCCASIONS</span>
            <h2 className="section-title">
              Whatever the moment,<br />
              <em>there is a Wishly for it.</em>
            </h2>
            <p className="section-subtitle">
              Every milestone carries its own emotion. Choose an occasion to explore layouts tailored to that specific feeling.
            </p>
          </div>

          <div className="occasions-grid">
            {OCCASIONS.map((occ) => (
              <OccasionCard key={occ.id} occasion={occ} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ 3. HOW IT WORKS ══════════ */}
      <HowItWorks />

      {/* ══════════ 4. PHILOSOPHY / EMOTIONAL SECTION ══════════ */}
      <div id="philosophy">
        <EmotionalSection />
      </div>

      {/* ══════════ 5. PERSONALIZATION TRANSFORMATION ══════════ */}
      <PersonalizationDemo />

      {/* ══════════ 6. CURATED TEMPLATE GALLERY ══════════ */}
      <section className="featured-templates-section" id="templates">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">CURATED COLLECTION</span>
            <h2 className="section-title">
              Thirty-five ways to say<br />
              <em>you matter to me.</em>
            </h2>
            <p className="section-subtitle">
              From quiet minimalist letterforms to celebratory polaroid albums and interactive scrapbooks.
            </p>
          </div>

          <TemplateGallery initialOccasion="all" />
        </div>
      </section>

      {/* ══════════ 7. MINIMAL NOIR CALL TO ACTION ══════════ */}
      <section className="final-cta-section">
        <div className="container">
          <div className="cta-banner-card">
            <span className="cta-banner-badge">BEGIN IN MINUTES</span>
            <h2 className="cta-banner-title">
              Make someone feel truly seen today.
            </h2>
            <p className="cta-banner-desc">
              Choose a design, add your memories, and give them a digital keepsake they will bookmark and revisit for years.
            </p>
            <div className="cta-btn-wrap">
              <Link to="/templates" className="btn btn-accent btn-lg">
                Create a Wish ✨
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
