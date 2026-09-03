import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export function PersonalizationDemo() {
  const [activeView, setActiveView] = useState('after'); // 'before' | 'after'

  return (
    <section className="personalization-demo-section">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-tag">THE TRANSFORMATION</span>
          <h2 className="section-title">
            From a curated canvas to<br />
            <em>their personal story.</em>
          </h2>
          <p className="section-subtitle">
            Every template is designed as a starting point. Your memories, notes, and photos bring it to life.
          </p>
        </div>

        {/* Minimalist Switcher */}
        <div className="demo-switch-bar" role="tablist">
          <button
            type="button"
            className={`demo-switch-btn ${activeView === 'before' ? 'active' : ''}`}
            onClick={() => setActiveView('before')}
            role="tab"
            aria-selected={activeView === 'before'}
          >
            01. Clean Canvas
          </button>
          <span className="demo-switch-arrow">→</span>
          <button
            type="button"
            className={`demo-switch-btn ${activeView === 'after' ? 'active' : ''}`}
            onClick={() => setActiveView('after')}
            role="tab"
            aria-selected={activeView === 'after'}
          >
            02. Your Living Keepsake
          </button>
        </div>

        {/* Showcase Frame */}
        <div className="demo-canvas-display">
          {activeView === 'before' ? (
            <div className="demo-card demo-card-before">
              <div className="demo-badge-wire">CURATED DESIGN SKELETON</div>
              <div className="wireframe-avatar">📸 [Your Uploaded Photos]</div>
              <h3 className="wireframe-name">[Recipient Name]</h3>
              <div className="wireframe-lines">
                <span className="line line-1"></span>
                <span className="line line-2"></span>
                <span className="line line-3"></span>
              </div>
              <div className="wireframe-signature">[Your Personal Signature]</div>
            </div>
          ) : (
            <div className="demo-card demo-card-after">
              <div className="demo-badge-active">🎂 LIVE BIRTHDAY KEEPSAKE</div>
              <div className="demo-avatar-wrap">
                <img
                  src="https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80"
                  alt="Ananya celebration"
                  className="demo-avatar-img"
                />
              </div>
              <h3 className="demo-person-title">Cheers to You, Ananya!</h3>
              <p className="demo-date-tag">Special Day • September 12</p>
              <div className="demo-quote-card">
                <p>
                  "Wishing you the happiest 21st birthday filled with endless laughter, quiet moments of clarity, and making your biggest dreams come true!"
                </p>
                <span className="demo-author-tag">With all my love, Alex</span>
              </div>
              <div className="demo-share-tag">
                <span>🔗 wishly.app/w/ananya-21</span>
              </div>
            </div>
          )}
        </div>

        <div className="demo-cta-row text-center">
          <Link to="/templates" className="btn btn-primary btn-md">
            Pick a Template & Personalize It →
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PersonalizationDemo;
