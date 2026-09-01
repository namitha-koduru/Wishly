import React from 'react';
import { Link } from 'react-router-dom';

export function TemplateCard({ template, onQuickModal }) {
  const { id, name, occasion, description, badge, previewColor } = template;

  const occasionIcons = {
    birthday: '🎂',
    anniversary: '💍',
    graduation: '🎓',
    farewell: '👋',
    valentines: '❤️',
    congratulations: '🎉',
    'just-because': '💌'
  };

  return (
    <div className="template-card">
      {/* Visual Preview Header */}
      <Link to={`/templates/${id}/preview`} className="template-card-preview-link">
        <div
          className="template-card-preview"
          style={{
            background: `linear-gradient(135deg, ${previewColor}18 0%, ${previewColor}35 100%)`,
            borderBottom: `1px solid ${previewColor}30`
          }}
        >
          <div className="template-preview-mockup">
            <div className="mockup-header">
              <span className="mockup-dot dot-1"></span>
              <span className="mockup-dot dot-2"></span>
              <span className="mockup-dot dot-3"></span>
            </div>
            <div className="mockup-body">
              <span className="mockup-emoji">{occasionIcons[occasion] || '✨'}</span>
              <p className="mockup-title">{name}</p>
              <span className="mockup-pill-text">Live Preview Available ↗</span>
            </div>
          </div>

          {badge && (
            <span className="template-badge" style={{ backgroundColor: previewColor }}>
              {badge}
            </span>
          )}
        </div>
      </Link>

      {/* Content Body */}
      <div className="template-card-content">
        <div className="template-card-meta">
          <span className="template-occasion-tag">
            {occasionIcons[occasion]} {occasion.charAt(0).toUpperCase() + occasion.slice(1).replace('-', ' ')}
          </span>
        </div>
        <h3 className="template-name">
          <Link to={`/templates/${id}/preview`}>{name}</Link>
        </h3>
        <p className="template-desc">{description}</p>

        {/* Action Buttons */}
        <div className="template-card-actions">
          <Link
            to={`/templates/${id}/preview`}
            className="btn btn-outline btn-sm btn-preview"
          >
            👁️ Preview
          </Link>
          <Link
            to={`/customize/${id}`}
            className="btn btn-primary btn-sm btn-use"
          >
            Use Template ✨
          </Link>
        </div>
      </div>
    </div>
  );
}

export default TemplateCard;
