import React from 'react';
import { Link } from 'react-router-dom';

export function TemplateCard({ template, onPreview }) {
  const { id, name, occasion, description, badge, previewColor } = template;

  const occasionLabels = {
    birthday: 'Birthday',
    anniversary: 'Anniversary',
    graduation: 'Graduation',
    farewell: 'Farewell',
    valentines: "Valentine's",
    congratulations: 'Congratulations',
    'just-because': 'Just Because'
  };

  return (
    <div className="template-card">
      {/* Visual Mockup Stage */}
      <Link to={`/templates/${id}/preview`} className="template-card-preview-link" aria-label={`Preview ${name}`}>
        <div
          className="template-card-preview"
          style={{
            background: `linear-gradient(145deg, ${previewColor}10 0%, ${previewColor}25 100%)`,
            borderBottom: `1px solid ${previewColor}25`
          }}
        >
          <div className="template-mockup-frame">
            <div className="mockup-frame-bar">
              <span className="frame-dot dot-1"></span>
              <span className="frame-dot dot-2"></span>
              <span className="frame-dot dot-3"></span>
              <span className="frame-url-label">wishly.app/preview</span>
            </div>
            <div className="mockup-frame-content">
              <span className="mockup-title">{name}</span>
              <span className="mockup-tagline">Interactive Digital Keepsake</span>
            </div>
          </div>

          {badge && (
            <span className="template-badge-pill" style={{ backgroundColor: previewColor }}>
              {badge}
            </span>
          )}
        </div>
      </Link>

      {/* Card Body */}
      <div className="template-card-content">
        <div className="template-meta-row">
          <span className="template-occasion-tag">
            {occasionLabels[occasion] || occasion}
          </span>
        </div>

        <h3 className="template-name">
          <Link to={`/templates/${id}/preview`}>{name}</Link>
        </h3>
        <p className="template-desc">{description}</p>

        {/* Dual Actions */}
        <div className="template-card-actions">
          <Link
            to={`/templates/${id}/preview`}
            className="btn btn-outline btn-sm btn-preview"
          >
            Preview
          </Link>
          <Link
            to={`/customize/${id}`}
            className="btn btn-accent btn-sm btn-use"
          >
            Use Design →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
