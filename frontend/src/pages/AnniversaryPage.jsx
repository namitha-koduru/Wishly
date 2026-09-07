import React from 'react';
import { Link } from 'react-router-dom';
import { getTemplatesByOccasion } from '../templates/templateRegistry.js';
import { OCCASIONS } from '../data/occasions.js';
import '../styles/anniversary-page.css';

export function AnniversaryPage() {
  const anniversaryTemplates = getTemplatesByOccasion('anniversary');

  return (
    <div className="anniversary-browse-page">
      <div className="container">
        {/* Breadcrumbs */}
        <nav className="breadcrumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link> &gt; <Link to="/templates">Templates</Link> &gt; <span>Anniversary</span>
        </nav>

        {/* Occasion Hero Header */}
        <header className="page-header text-center anniversary-browse-header">
          <div className="anniversary-header-badge">
            <span className="anniversary-badge-icon">💍</span>
          </div>
          <h1 className="page-title anniversary-browse-title">
            Anniversary Wishes <span className="anniversary-title-heart">♡</span>
          </h1>
          <p className="page-subtitle anniversary-browse-subtitle">
            Make your anniversary a little more unforgettable.
          </p>
        </header>

        {/* Quick Occasion Switcher Navigation */}
        <div className="occasion-nav-pills">
          <Link to="/templates" className="occ-pill">
            ✨ All
          </Link>
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.id}
              to={`/templates/${occ.id}`}
              className={`occ-pill ${occ.id === 'anniversary' ? 'active' : ''}`}
            >
              {occ.icon} {occ.name}
            </Link>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="anniversary-templates-grid">
          {anniversaryTemplates.map((tpl) => (
            <div key={tpl.id} className="anniversary-template-card">
              {/* Visual Mockup Stage */}
              <Link
                to={`/templates/${tpl.id}/preview`}
                className="anniv-card-preview-link"
                aria-label={`Preview ${tpl.name}`}
              >
                <div
                  className={`anniv-card-preview-stage stage-${tpl.id}`}
                  style={{
                    '--tpl-accent': tpl.previewColor || '#FF758F'
                  }}
                >
                  {/* Visual Preview Content for Template 2: Faith & Devotion */}
                  {(tpl.id === 'petals-and-us' || tpl.id === 'love-letter-anniversary' || tpl.id === 'faith-and-devotion') && (
                    <div className="mockup-faith-devotion">
                      <div className="faith-mockup-card">
                        <span className="faith-mockup-cross">✝</span>
                        <h4 className="faith-mockup-title">Happy Anniversary</h4>
                        <p className="faith-mockup-sub">"May God Bless Your Marriage"</p>
                        <div className="faith-mockup-rings">💍💍</div>
                      </div>
                      <span className="faith-mockup-flower fl-1">🕊️</span>
                      <span className="faith-mockup-flower fl-2">🤍</span>
                      <span className="faith-mockup-flower fl-3">🌿</span>
                      <span className="faith-mockup-petal pt-1">✨</span>
                    </div>
                  )}

                  {/* Visual Preview Content for Template 1: Our Story */}
                  {tpl.id === 'our-story' && (
                    <div className="mockup-our-story">
                      <div className="story-mockup-card">
                        <span className="story-mockup-crest">⚜️</span>
                        <h4 className="story-mockup-title">Our Story</h4>
                        <p className="story-mockup-sub">Traditional Keepsake</p>
                        <div className="story-mockup-seal">💌 Wax Seal</div>
                      </div>
                      <span className="story-mockup-garland">🪷</span>
                    </div>
                  )}

                  {/* Visual Preview Content for Template 3: Arranged to Soulmates */}
                  {(tpl.id === 'forever-always' || tpl.id === 'arranged-to-soulmates') && (
                    <div className="mockup-arranged-soulmates">
                      <div className="soulmates-mockup-card">
                        <span className="soulmates-crest">💍✨</span>
                        <h4 className="soulmates-title">Arranged to Soulmates</h4>
                        <p className="soulmates-sub">"From Two Families to One Heart"</p>
                        <div className="soulmates-mockup-rings">Aditi & Vikram</div>
                      </div>
                      <span className="soulmates-petal sp-1">🌸</span>
                      <span className="soulmates-petal sp-2">🤍</span>
                    </div>
                  )}

                  {tpl.id === 'memory-timeline' && (
                    <div className="mockup-generic-anniv scrapbook-style">
                      <div className="scrapbook-mockup-card">
                        <span className="scrapbook-tape">📌</span>
                        <h4 className="scrapbook-title">Memory Scrapbook</h4>
                        <p className="scrapbook-sub">Photo Checkpoints</p>
                      </div>
                    </div>
                  )}

                  {tpl.id === 'our-journey' && (
                    <div className="mockup-generic-anniv journey-style">
                      <div className="journey-mockup-card">
                        <span className="journey-pin">✈️</span>
                        <h4 className="journey-title">Our Journey</h4>
                        <p className="journey-sub">Travel & Milestones</p>
                      </div>
                    </div>
                  )}

                  {/* Badge */}
                  {tpl.badge && (
                    <span
                      className="anniv-badge-pill"
                      style={{ backgroundColor: tpl.previewColor }}
                    >
                      {tpl.badge}
                    </span>
                  )}
                </div>
              </Link>

              {/* Card Meta & Actions */}
              <div className="anniv-card-content">
                <div className="anniv-card-meta">
                  <span className="anniv-tag">Anniversary</span>
                </div>

                <h3 className="anniv-template-name">
                  <Link to={`/templates/${tpl.id}/preview`}>{tpl.name}</Link>
                </h3>
                <p className="anniv-template-desc">{tpl.description}</p>

                <div className="anniv-card-actions">
                  <Link
                    to={`/templates/${tpl.id}/preview`}
                    className="btn btn-outline btn-sm btn-preview"
                  >
                    Preview
                  </Link>
                  <Link
                    to={`/customize/${tpl.id}`}
                    className="btn btn-accent btn-sm btn-use"
                  >
                    Use Design →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AnniversaryPage;
