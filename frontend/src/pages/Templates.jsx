import React from 'react';
import { Link } from 'react-router-dom';
import TemplateGallery from '../components/TemplateGallery.jsx';

export function Templates() {
  return (
    <div className="templates-page">
      <section className="page-header text-center">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / <span>Templates</span>
          </div>
          <span className="section-tag">CATALOG & DESIGNS</span>
          <h1 className="page-title">Find the perfect way to say it.</h1>
          <p className="page-subtitle">
            Start with a design. Finish with something completely yours.
          </p>
        </div>
      </section>

      <section className="container pb-5">
        <TemplateGallery />
      </section>
    </div>
  );
}

export default Templates;
