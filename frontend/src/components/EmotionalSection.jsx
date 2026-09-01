import React from 'react';
import { Link } from 'react-router-dom';

export function EmotionalSection() {
  return (
    <section className="emotional-section">
      <div className="container emotional-container">
        <div className="emotional-content">
          <span className="section-tag">WISHES WITH MEANING</span>
          <h2 className="emotional-title">
            Because sometimes,<br />
            <em>a message isn't enough.</em>
          </h2>
          <p className="emotional-desc">
            Text messages get lost in the scroll. Social posts disappear. Wishly turns your memories, photos, and heartfelt words into a dedicated personal webpage they can open, smile at, and treasure forever.
          </p>
          <div className="emotional-quote-box">
            <p className="quote-text">
              "When I opened the link, I cried happy tears. It wasn't just a birthday wish — it felt like someone bottled up all our best memories."
            </p>
            <span className="quote-author">— Ananya, Recipient</span>
          </div>
          <Link to="/templates" className="btn btn-primary btn-md">
            Start Your Wishly ✨
          </Link>
        </div>

        {/* Editorial Scrapbook Composition */}
        <div className="emotional-visual-stack" aria-hidden="true">
          <div className="scrapbook-card card-top">
            <div className="scrapbook-tape"></div>
            <img
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&auto=format&fit=crop&q=80"
              alt="Romantic memories"
            />
            <span className="scrapbook-caption">"5 years & thousands of laughs ✨"</span>
          </div>

          <div className="scrapbook-card card-bottom">
            <div className="scrapbook-tape"></div>
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80"
              alt="Graduation smiles"
            />
            <span className="scrapbook-caption">"Class of 2026 • Proud of you! 🎓"</span>
          </div>

          <div className="floating-love-pill">
            <span>💌 Made just for you</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EmotionalSection;
