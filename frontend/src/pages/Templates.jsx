import React from 'react';
import TemplateGallery from '../components/TemplateGallery.jsx';

export function Templates() {
  return (
    <div className="templates-page">
      <div className="container">
        <div className="page-header text-center">
          <span className="section-tag">TEMPLATE CATALOG</span>
          <h1 className="page-title">Find the perfect way to say it.</h1>
          <p className="page-subtitle">
            Choose a design, make it yours, and send it with love. Browse all 35+ templates across 7 occasions.
          </p>
        </div>

        <TemplateGallery initialOccasion="all" />
      </div>
    </div>
  );
}

export default Templates;
