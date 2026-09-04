import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getTemplateById } from '../templates/templateRegistry.js';
import { getOccasionById } from '../data/occasions.js';
import TemplateNotFound from '../components/TemplateNotFound.jsx';

export function TemplatePreview() {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const template = getTemplateById(templateId);
  const [deviceMode, setDeviceMode] = useState('desktop'); // 'desktop' | 'mobile'

  if (!template) {
    return (
      <TemplateNotFound
        title="We couldn't find this template to preview."
        description={`The template "${templateId || 'unknown'}" does not exist or may have been updated.`}
        suggestedAction={{ to: "/templates", label: "Explore All 35 Templates ✨" }}
      />
    );
  }

  const occasion = getOccasionById(template.occasion);

  return (
    <div className="template-preview-page">
      {/* Top Preview Bar */}
      <header className="preview-topbar">
        <div className="container preview-topbar-inner">
          <div className="preview-topbar-left">
            <Link to={template.occasion ? `/templates/${template.occasion}` : '/templates'} className="back-link">
              ← Back to {occasion ? occasion.name : 'Templates'}
            </Link>
            <div className="preview-title-wrap">
              <span className="preview-occasion-pill" style={{ backgroundColor: `${template.previewColor}15`, color: template.previewColor }}>
                {occasion ? occasion.icon : '✨'} {template.name}
              </span>
              <span className="preview-tagline-text">{template.description}</span>
            </div>
          </div>

          <div className="preview-topbar-center">
            {/* Device Frame Viewport Switcher */}
            <div className="device-switcher" role="group" aria-label="Device viewport preview">
              <button
                type="button"
                className={`device-btn ${deviceMode === 'desktop' ? 'active' : ''}`}
                onClick={() => setDeviceMode('desktop')}
                title="Desktop View (Wide)"
              >
                🖥️ Desktop
              </button>
              <button
                type="button"
                className={`device-btn ${deviceMode === 'mobile' ? 'active' : ''}`}
                onClick={() => setDeviceMode('mobile')}
                title="Mobile View (Phone)"
              >
                📱 Mobile
              </button>
            </div>
          </div>

          <div className="preview-topbar-right">
            <button
              type="button"
              className="btn btn-primary pulse-glow"
              onClick={() => navigate(`/customize/${template.id}`)}
            >
              Use This Template ✨
            </button>
          </div>
        </div>
      </header>

      {/* Main Preview Stage */}
      <main className="preview-stage-container">
        <div className={`preview-browser-frame frame-${deviceMode}`}>
          <div className="browser-chrome">
            <div className="browser-dots">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
            </div>
            <div className="browser-address-bar">
              <span className="lock-icon">🔒</span>
              <span className="url-text">wishly.app/preview/{template.id}</span>
            </div>
            <div className="browser-status">
              <span className="live-dot"></span> LIVE PREVIEW
            </div>
          </div>

          <div className="browser-canvas">
            {/* Render the actual template component with its default realistic data */}
            {React.createElement(template.component, {
              data: template.defaultData
            })}
          </div>
        </div>

        {/* Floating Quick Action CTA on Bottom of screen */}
        <div className="preview-bottom-cta">
          <span>Love this layout? Personalize it in seconds!</span>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate(`/customize/${template.id}`)}
          >
            Customize This Template ✨
          </button>
        </div>
      </main>
    </div>
  );
}

export default TemplatePreview;
