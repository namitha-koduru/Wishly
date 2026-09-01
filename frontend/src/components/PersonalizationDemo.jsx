import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function PersonalizationDemo() {
  const [activeView, setActiveView] = useState('after'); // 'before' | 'after'

  return (
    <section className="personalization-demo-section">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-tag">THE TRANSFORMATION</span>
          <h2 className="section-title">See how a template becomes theirs</h2>
          <p className="section-subtitle">
            Start with any of our 35 handcrafted designs. Add your words and photos to create an unforgettable personal webpage.
          </p>
        </div>

        {/* Before / After Switcher Tabs */}
        <div className="demo-toggle-wrapper">
          <div className="demo-toggle-pills" role="tablist">
            <button
              type="button"
              className={`demo-tab-pill ${activeView === 'before' ? 'active' : ''}`}
              onClick={() => setActiveView('before')}
              role="tab"
              aria-selected={activeView === 'before'}
            >
              1. Blank Template
            </button>
            <span className="demo-toggle-arrow">→</span>
            <button
              type="button"
              className={`demo-tab-pill ${activeView === 'after' ? 'active' : ''}`}
              onClick={() => setActiveView('after')}
              role="tab"
              aria-selected={activeView === 'after'}
            >
              2. Your Personalized Wish ✨
            </button>
          </div>
        </div>

        {/* Visual Mockup Display */}
        <div className="demo-showcase-box">
          {activeView === 'before' ? (
            <div className="demo-card demo-card-before">
              <div className="demo-badge">BLANK TEMPLATE LAYOUT</div>
              <div className="wireframe-avatar">📸 [Your Photo Here]</div>
              <h3 className="wireframe-name">[Recipient's Name]</h3>
              <div className="wireframe-lines">
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
              </div>
              <div className="wireframe-signature">[Your Name / Signature]</div>
            </div>
          ) : (
            <div className="demo-card demo-card-after">
              <div className="demo-badge demo-badge-active">🎂 BIRTHDAY KEEPSAKE</div>
              <div className="demo-avatar-wrap">
                <img
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80"
                  alt="Ananya celebration"
                  className="demo-avatar-img"
                />
                <span className="demo-avatar-sparkle">✨</span>
              </div>
              <h3 className="demo-person-title">Cheers to You, Ananya!</h3>
              <p className="demo-date-tag">Special Day • September 12</p>
              <div className="demo-quote-card">
                <p>
                  "Wishing you the happiest 21st birthday filled with endless laughter, late night conversations, and making your biggest dreams come true!"
                </p>
                <span className="demo-author-tag">With love always, Alex 💖</span>
              </div>
              <div className="demo-share-tag">
                <span>🔗 wishly.app/w/ananya-21</span>
              </div>
            </div>
          )}
        </div>

        <div className="demo-cta-row text-center">
          <Link to="/templates" className="btn btn-primary btn-md">
            Pick a Template & Personalize It ✨
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PersonalizationDemo;
