import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOccasionById, OCCASIONS } from '../data/occasions.js';
import TemplateGallery from '../components/TemplateGallery.jsx';

export function OccasionTemplates() {
  const { occasion: occasionId } = useParams();
  const occasion = getOccasionById(occasionId);

  return (
    <div className="occasion-templates-page">
      <div className="container">
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <Link to="/">Home</Link> &gt; <Link to="/templates">Templates</Link> &gt; <span>{occasion ? occasion.name : occasionId}</span>
        </div>

        {/* Occasion Hero Header */}
        <div className="page-header text-center occasion-page-hero">
          <div className="occasion-hero-icon-wrap" style={{ backgroundColor: `${occasion?.color || '#ff5e7e'}15` }}>
            <span className="occasion-hero-icon">{occasion?.icon || '✨'}</span>
          </div>
          <h1 className="page-title">
            {occasion ? `${occasion.name} Wishes` : 'Explore Templates'}
          </h1>
          <p className="page-subtitle">
            Choose a design that feels like them. Personalize with photos, memories, and your heartfelt message.
          </p>
        </div>

        {/* Quick Occasion Switcher Navigation */}
        <div className="occasion-nav-pills">
          <Link to="/templates" className={`occ-pill ${!occasionId ? 'active' : ''}`}>
            ✨ All
          </Link>
          {OCCASIONS.map((occ) => (
            <Link
              key={occ.id}
              to={`/templates/${occ.id}`}
              className={`occ-pill ${occasionId === occ.id ? 'active' : ''}`}
            >
              {occ.icon} {occ.name}
            </Link>
          ))}
        </div>

        {/* Template Gallery with pre-filtered occasion */}
        <TemplateGallery initialOccasion={occasionId || 'all'} />
      </div>
    </div>
  );
}

export default OccasionTemplates;
