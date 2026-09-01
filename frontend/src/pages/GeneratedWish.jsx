import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getTemplateById, TEMPLATES } from '../templates/templateRegistry.js';

export function GeneratedWish() {
  const { projectId } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [template, setTemplate] = useState(null);

  useEffect(() => {
    // Attempt to load from localStorage
    const saved = localStorage.getItem(`wishly_project_${projectId}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setProjectData(parsed);
        const tpl = getTemplateById(parsed.templateId);
        setTemplate(tpl);
        return;
      } catch (err) {
        console.error('Failed to parse project data', err);
      }
    }

    // Fallback if opened with random id or direct demo route
    const fallbackTemplate = TEMPLATES[0];
    setTemplate(fallbackTemplate);
    setProjectData({
      recipientName: 'Someone Special',
      senderName: 'A Dear Friend',
      message: 'Wishing you all the joy, love, and happiness in the world today and always!',
      ...fallbackTemplate.defaultData
    });
  }, [projectId]);

  if (!template || !projectData) {
    return (
      <div className="generated-wish-loading">
        <div className="loading-spinner">✨</div>
        <p>Opening your Wishly keepsake...</p>
      </div>
    );
  }

  return (
    <div className="generated-wish-page">
      {/* Full screen celebration container */}
      <div className="generated-wish-container">
        {React.createElement(template.component, {
          data: projectData
        })}
      </div>

      {/* Subtle footer watermark */}
      <div className="generated-wish-watermark">
        <p>Made with love using <Link to="/" className="watermark-brand">✨ Wishly</Link></p>
        <Link to="/templates" className="btn btn-primary btn-sm watermark-btn">
          Create Your Own Wish ✨
        </Link>
      </div>
    </div>
  );
}

export default GeneratedWish;
