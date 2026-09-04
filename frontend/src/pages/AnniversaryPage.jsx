import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getTemplatesByOccasion } from '../templates/templateRegistry.js';
import bapuImg from '../templates/anniversary/template1/assets/bapu.jpg';
import '../styles/anniversary-page.css';

const FEATURED_CHAPTERS = [
  {
    id: 'intro',
    number: 'Chapter 01',
    title: 'The Sacred Welcome',
    desc: 'Adorned with traditional hand-drawn Muggulu artwork and fragrant lotus garlands, setting a reverent and intimate tone.',
    tag: 'TRADITIONAL ELEGANCE'
  },
  {
    id: 'journey',
    number: 'Chapter 02',
    title: 'The Milestone Journey',
    desc: 'A poetic celebration of years spent side-by-side, turning ordinary days into enduring chapters of togetherness.',
    tag: 'YEARS TOGETHER'
  },
  {
    id: 'story',
    number: 'Chapter 03',
    title: 'Their Story in Moments',
    desc: 'Scrapbook memories captured as "Then, Together, Today" — commemorating the evolution of your bond.',
    tag: 'POLAROID CHAPTERS'
  },
  {
    id: 'art',
    number: 'Chapter 04',
    title: 'Bapu Artwork Tribute',
    desc: 'Framed traditional illustration honoring Indian devotion, culture, and timeless love.',
    tag: 'HERITAGE ARTWORK'
  },
  {
    id: 'letter',
    number: 'Chapter 05',
    title: 'The 3D Wax-Sealed Letter',
    desc: 'An interactive handmade envelope that unseals on touch to reveal your personal handwritten stationery letter.',
    tag: 'INTERACTIVE UNBOXING'
  },
  {
    id: 'gallery',
    number: 'Chapter 06',
    title: 'Scrapbook Memory Album',
    desc: 'A vintage photo keepsake adapting gracefully to your photos with interactive lightbox zoom.',
    tag: 'CHERISHED PHOTOS'
  }
];

export function AnniversaryPage() {
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const activeChapter = FEATURED_CHAPTERS[activeChapterIndex];

  const anniversaryTemplates = getTemplatesByOccasion('anniversary');
  const featuredTemplate = anniversaryTemplates.find(t => t.id === 'our-story') || anniversaryTemplates[0];
  const supportingTemplates = anniversaryTemplates.filter(t => t.id !== 'our-story');

  return (
    <div className="anniversary-destination-page">
      {/* ════════════════ 1. EDITORIAL HERO SECTION ════════════════ */}
      <section className="anniversary-hero-section">
        <div className="container anniversary-hero-container">
          {/* Left Column: Narrative & CTA */}
          <div className="anniversary-hero-content">
            <div className="anniversary-breadcrumbs">
              <Link to="/">Home</Link>
              <span>&gt;</span>
              <Link to="/templates">Templates</Link>
              <span>&gt;</span>
              <span>Anniversary</span>
            </div>

            <span className="anniversary-eyebrow">
              💍 Curated Anniversary Keepsakes
            </span>

            <h1 className="anniversary-hero-title">
              Celebrate the story<br />
              you've written<br />
              <em>together.</em>
            </h1>

            <p className="anniversary-hero-narrative">
              An anniversary is more than another date on the calendar. Wishly transforms your shared memories, intimate photographs, and heartfelt words into a bespoke digital keepsake that lasts a lifetime.
            </p>

            <div className="anniversary-hero-actions">
              <Link
                to={`/customize/${featuredTemplate.id}`}
                className="btn btn-anniversary-primary btn-lg"
              >
                Create an Anniversary Wish ✨
              </Link>
              <a href="#anniversary-templates" className="btn btn-secondary btn-lg">
                Explore All 5 Keepsakes
              </a>
            </div>

            {/* Editorial Metric Strip */}
            <div className="anniversary-quality-strip">
              <div className="anniv-metric-item">
                <span className="anniv-metric-num">5</span>
                <span className="anniv-metric-label">Bespoke Keepsakes</span>
              </div>
              <div className="anniv-metric-divider" />
              <div className="anniv-metric-item">
                <span className="anniv-metric-num">100%</span>
                <span className="anniv-metric-label">Private Link</span>
              </div>
              <div className="anniv-metric-divider" />
              <div className="anniv-metric-item">
                <span className="anniv-metric-num">0</span>
                <span className="anniv-metric-label">Recipient Login</span>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Keepsake Mockup Stage */}
          <div className="anniversary-hero-stage-card">
            <div className="anniv-card-top-bar">
              <span className="anniv-brand-pill">✦ Wishly Anniversary Edition</span>
              <span className="anniv-status-tag">FEATURED STORY</span>
            </div>

            <div className="anniv-stage-inner-preview">
              <h3 className="anniv-preview-headline">Happy Anniversary</h3>
              <p className="anniv-preview-couple">Ravi &amp; Sindhu</p>
              <p className="anniv-preview-quote">
                "Some journeys are measured in years. The best are measured in memories."
              </p>

              <div className="anniv-preview-photo-stack">
                <img
                  src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=300&auto=format&fit=crop&q=80"
                  alt="Couple memory"
                  className="anniv-stack-img"
                />
                <img
                  src={bapuImg}
                  alt="Bapu artwork"
                  className="anniv-stack-img"
                />
                <img
                  src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=300&auto=format&fit=crop&q=80"
                  alt="Couple moments"
                  className="anniv-stack-img"
                />
              </div>

              <Link
                to={`/templates/${featuredTemplate.id}/preview`}
                className="anniv-stage-cta-btn"
              >
                Experience Live Keepsake <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 2. FEATURED SPOTLIGHT (OUR STORY) ════════════════ */}
      <section className="anniversary-featured-section">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">HERITAGE STORYTELLING</span>
            <h2 className="section-title">
              Featured Experience: <em>Our Story</em>
            </h2>
            <p className="section-subtitle">
              A multi-screen Indian aesthetic journey featuring authentic Muggulu art, fragrant lotus garlands, Bapu couple illustration, and a 3D wax-sealed letter.
            </p>
          </div>

          <div className="featured-spotlight-card">
            {/* Left Visual Interactive Canvas */}
            <div className="featured-visual-stage">
              <div className="spotlight-interactive-frame">
                <span className="spotlight-chapter-badge">
                  {activeChapter.number} • {activeChapter.tag}
                </span>
                <h3 className="spotlight-chapter-title">
                  {activeChapter.title}
                </h3>
                <p className="spotlight-chapter-desc">
                  {activeChapter.desc}
                </p>

                <Link
                  to={`/templates/${featuredTemplate.id}/preview`}
                  className="btn btn-anniversary-primary btn-sm"
                >
                  Step Through Live Preview →
                </Link>
              </div>

              {/* Chapter Navigation Tabs */}
              <div className="spotlight-chapter-tabs" role="tablist">
                {FEATURED_CHAPTERS.map((ch, idx) => (
                  <button
                    key={ch.id}
                    type="button"
                    className={`chapter-tab-btn ${activeChapterIndex === idx ? 'active' : ''}`}
                    onClick={() => setActiveChapterIndex(idx)}
                  >
                    0{idx + 1}. {ch.title.split(' ')[1] || ch.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Content & Key Highlights */}
            <div className="featured-content-body">
              <div className="featured-tag-row">
                <span className="featured-pill">Featured Design</span>
                <span className="featured-meta-tag">Multi-Screen Keepsake</span>
              </div>

              <h3 className="featured-title">
                An Intimate Heritage Keepsake
              </h3>

              <p className="featured-desc">
                Designed specifically for couples who appreciate timeless Indian artistry, poetic prose, and gentle interactive surprises. Every page transitions seamlessly like turning the parchment of a treasured family album.
              </p>

              <div className="featured-features-list">
                <div className="featured-feature-item">
                  <span className="feat-icon">✦</span>
                  <span>Hand-drawn Muggulu multiply blending</span>
                </div>
                <div className="featured-feature-item">
                  <span className="feat-icon">✦</span>
                  <span>Interactive 3D wax seal unboxing</span>
                </div>
                <div className="featured-feature-item">
                  <span className="feat-icon">✦</span>
                  <span>Scrapbook Polaroid photo gallery</span>
                </div>
                <div className="featured-feature-item">
                  <span className="feat-icon">✦</span>
                  <span>Authentic Bapu illustration tribute</span>
                </div>
              </div>

              <div className="featured-actions-row">
                <Link
                  to={`/customize/${featuredTemplate.id}`}
                  className="btn btn-anniversary-primary btn-md"
                >
                  Personalize "Our Story" →
                </Link>
                <Link
                  to={`/templates/${featuredTemplate.id}/preview`}
                  className="btn btn-secondary btn-md"
                >
                  Live Preview
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 3. ALL 5 ANNIVERSARY EXPERIENCES ════════════════ */}
      <section className="anniversary-collection-section" id="anniversary-templates">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">COMPLETE CURATION</span>
            <h2 className="section-title">
              More Anniversary <em>Experiences</em>
            </h2>
            <p className="section-subtitle">
              Every couple has their own cadence. Choose the aesthetic that mirrors your love story.
            </p>
          </div>

          <div className="editorial-collection-grid">
            {supportingTemplates.map((tpl) => (
              <div key={tpl.id} className="anniv-editorial-card">
                <div
                  className="anniv-card-visual-top"
                  style={{
                    background: `linear-gradient(135deg, ${tpl.previewColor}18 0%, ${tpl.previewColor}32 100%)`,
                    borderBottom: `1px solid ${tpl.previewColor}25`
                  }}
                >
                  <span
                    className="anniv-card-badge-tag"
                    style={{ backgroundColor: tpl.previewColor }}
                  >
                    {tpl.badge || 'Keepsake'}
                  </span>

                  <div className="anniv-card-visual-inner">
                    <h4 className="anniv-card-visual-title" style={{ color: tpl.previewColor }}>
                      {tpl.name}
                    </h4>
                    <p className="anniv-card-visual-sub">
                      Interactive Digital Keepsake
                    </p>
                  </div>
                </div>

                <div className="anniv-card-info-body">
                  <h4 className="anniv-card-info-title">{tpl.name}</h4>
                  <p className="anniv-card-info-desc">{tpl.description}</p>

                  <div className="anniv-card-actions">
                    <Link
                      to={`/templates/${tpl.id}/preview`}
                      className="btn btn-outline btn-sm"
                    >
                      Preview
                    </Link>
                    <Link
                      to={`/customize/${tpl.id}`}
                      className="btn btn-secondary btn-sm"
                    >
                      Personalize →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════ 4. WHY WISHLY FOR ANNIVERSARIES ════════════════ */}
      <section className="anniversary-reasons-section">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">WHY WISHLY</span>
            <h2 className="section-title">
              Designed for <em>Intimate Moments</em>
            </h2>
            <p className="section-subtitle">
              Why thousands of couples choose Wishly over paper cards or social media posts.
            </p>
          </div>

          <div className="reasons-trio-grid">
            <div className="reason-card">
              <div className="reason-crest-icon">💌</div>
              <h3 className="reason-card-title">Private &amp; Purely Yours</h3>
              <p className="reason-card-desc">
                No public feeds, algorithms, or casual comments. Just an intimate private sanctuary accessible only through your special link.
              </p>
            </div>

            <div className="reason-card">
              <div className="reason-crest-icon">⏳</div>
              <h3 className="reason-card-title">A Living Digital Keepsake</h3>
              <p className="reason-card-desc">
                Paper cards get misplaced. Wishly websites are hosted permanently in full resolution, ready to be reopened on any anniversary.
              </p>
            </div>

            <div className="reason-card">
              <div className="reason-crest-icon">✨</div>
              <h3 className="reason-card-title">The Unboxing Ceremony</h3>
              <p className="reason-card-desc">
                From the gentle ambient particles to the interactive wax seal, opening a Wishly feels like receiving a hand-wrapped gift.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 5. HOW IT WORKS ════════════════ */}
      <section className="anniversary-how-section">
        <div className="container">
          <div className="section-heading text-center">
            <span className="section-tag">SIMPLE CEREMONY</span>
            <h2 className="section-title">
              Three Steps to <em>Forever</em>
            </h2>
            <p className="section-subtitle">
              Creating a masterpiece takes just minutes in our customization studio.
            </p>
          </div>

          <div className="how-steps-grid">
            <div className="how-step-item">
              <span className="step-num-pill">1</span>
              <h3 className="step-item-title">Choose Your Keepsake</h3>
              <p className="step-item-desc">
                Select from our 5 curated anniversary templates matching your aesthetic.
              </p>
            </div>

            <div className="how-step-item">
              <span className="step-num-pill">2</span>
              <h3 className="step-item-title">Weave Your Memories</h3>
              <p className="step-item-desc">
                Add your names, heartfelt love letter, milestone timeline, and cherished photographs.
              </p>
            </div>

            <div className="how-step-item">
              <span className="step-num-pill">3</span>
              <h3 className="step-item-title">Share the Surprise</h3>
              <p className="step-item-desc">
                Receive your unique private Wishly URL to send over WhatsApp, message, or reveal over dinner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 6. FINAL ROMANTIC INVITATION CTA ════════════════ */}
      <section className="anniversary-final-cta-section">
        <div className="container">
          <div className="romantic-banner-card">
            <p className="romantic-banner-eyebrow">
              ✦ A Celebration of Your Journey
            </p>
            <h2 className="romantic-banner-title">
              Every love story deserves<br />
              <em>to be remembered.</em>
            </h2>
            <p className="romantic-banner-subtitle">
              Surprise your partner with a personalized anniversary website that captures the magic of your story together.
            </p>
            <Link
              to={`/customize/${featuredTemplate.id}`}
              className="btn btn-romantic-cta"
            >
              Begin Your Anniversary Wish ✨
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnniversaryPage;
