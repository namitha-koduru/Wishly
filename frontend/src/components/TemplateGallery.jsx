import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TEMPLATES, getTemplatesByOccasion } from '../templates/templateRegistry.js';
import { OCCASIONS } from '../data/occasions.js';
import TemplateCard from './TemplateCard.jsx';

export function TemplateGallery({ initialOccasion = 'all' }) {
  const [selectedOccasion, setSelectedOccasion] = useState(initialOccasion);
  const [searchQuery, setSearchQuery] = useState('');
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesOccasion = selectedOccasion === 'all' || tpl.occasion === selectedOccasion;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.occasion.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOccasion && matchesSearch;
  });

  return (
    <div className="template-gallery-wrapper">
      {/* Category Filter Tabs & Search */}
      <div className="gallery-toolbar">
        <div className="gallery-filter-tabs" role="tablist">
          <button
            type="button"
            className={`filter-tab ${selectedOccasion === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedOccasion('all')}
            role="tab"
            aria-selected={selectedOccasion === 'all'}
          >
            All Designs ({TEMPLATES.length})
          </button>
          {OCCASIONS.map((occ) => {
            const count = getTemplatesByOccasion(occ.id).length;
            return (
              <button
                key={occ.id}
                type="button"
                className={`filter-tab ${selectedOccasion === occ.id ? 'active' : ''}`}
                onClick={() => setSelectedOccasion(occ.id)}
                role="tab"
                aria-selected={selectedOccasion === occ.id}
              >
                {occ.name} ({count})
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="gallery-search-box">
          <input
            type="text"
            placeholder="Search 35 designs (e.g. Polaroid, Letter, Timeline)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            aria-label="Search templates"
          />
        </div>
      </div>

      {/* Grid of Templates */}
      {filteredTemplates.length > 0 ? (
        <div className="templates-grid">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={(tpl) => setPreviewTemplate(tpl)}
            />
          ))}
        </div>
      ) : (
        <div className="empty-gallery">
          <p className="empty-icon">🔍</p>
          <h3 className="empty-title">No matching designs found</h3>
          <p className="empty-desc">Try resetting your search query or selecting a different occasion tab.</p>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setSelectedOccasion('all');
              setSearchQuery('');
            }}
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick Preview Modal */}
      {previewTemplate && (
        <div className="preview-modal-backdrop" onClick={() => setPreviewTemplate(null)}>
          <div className="preview-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="preview-modal-header">
              <div className="preview-modal-title">
                <h3>{previewTemplate.name}</h3>
                <span className="preview-modal-tag">{previewTemplate.occasion}</span>
              </div>
              <div className="preview-modal-actions">
                <Link
                  to={`/customize/${previewTemplate.id}`}
                  className="btn btn-accent btn-sm"
                  onClick={() => setPreviewTemplate(null)}
                >
                  Use This Design →
                </Link>
                <button
                  type="button"
                  className="modal-close-btn"
                  onClick={() => setPreviewTemplate(null)}
                  aria-label="Close Preview"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="preview-modal-body">
              {React.createElement(previewTemplate.component, {
                data: previewTemplate.defaultData
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TemplateGallery;
