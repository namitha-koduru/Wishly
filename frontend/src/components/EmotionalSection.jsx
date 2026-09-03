import React from 'react';
import { Link } from 'react-router-dom';

export function EmotionalSection() {
  return (
    <section className="emotional-section">
      <div className="container emotional-container">
        {/* Left Editorial Narrative */}
        <div className="emotional-content">
          <span className="section-tag">THE EMOTIONAL DIFFERENCE</span>
          <h2 className="emotional-title">
            Because a disposable text message<br />
            <em>was never meant for your biggest feelings.</em>
          </h2>
          <p className="emotional-desc">
            Chat messages get buried in notification feeds. Social media posts fade in hours. Wishly creates a permanent, dedicated space on the web — crafted with your words, your photos, and your shared history.
          </p>
          
          <div className="emotional-quote-card">
            <p className="quote-text">
              "Opening the link felt like receiving a physical handwritten letter from across the world. It was the most thoughtful surprise anyone had ever made for me."
            </p>
            <div className="quote-author-row">
              <span className="quote-author-name">Ananya K.</span>
              <span className="quote-author-role">Recipient • 21st Birthday Keepsake</span>
            </div>
          </div>

          <div className="emotional-cta-wrap">
            <Link to="/templates" className="btn btn-primary btn-md">
              Create a Keepsake →
            </Link>
          </div>
        </div>

        {/* Right Photographic Monograph Composition */}
        <div className="emotional-monograph" aria-hidden="true">
          <div className="monograph-card card-primary">
            <div className="monograph-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80"
                alt="Romantic memory keepsake"
              />
            </div>
            <div className="monograph-caption">
              <span className="monograph-tag">ANNIVERSARY CHAPTER</span>
              <p className="monograph-note">"Five years of laughing at the same silly jokes."</p>
            </div>
          </div>

          <div className="monograph-card card-secondary">
            <div className="monograph-photo-wrap">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80"
                alt="Graduation celebration"
              />
            </div>
            <div className="monograph-caption">
              <span className="monograph-tag">HONORS & MILESTONES</span>
              <p className="monograph-note">"Class of 2026 • Proud of everything you built."</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmotionalSection;
