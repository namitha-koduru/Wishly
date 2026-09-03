import React from 'react';
import './GraduationTemplate4.css';

export function GraduationTemplate4({ data = {} }) {
  const {
    recipientName = 'Chloe Bennett',
    senderName = 'Classmates of 2026',
    message = 'Most likely to change the world! Thank you for the laughs, study group snacks, and memories.',
    photos = [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
    ],
    classYear = 'Class of 2026'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-yearbook">
      <div className="yearbook-header">
        <span className="yearbook-tag">OFFICIAL YEARBOOK TRIBUTE</span>
        <h1 className="yearbook-title">{recipientName}</h1>
        {classYear && <span className="yearbook-class-badge">{classYear}</span>}
      </div>

      <div className="yearbook-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="yearbook-card">
            <img src={url} alt={`Yearbook ${i + 1}`} />
            <span className="yearbook-quote">"Class Superlative • Future Leader"</span>
          </div>
        ))}
      </div>

      <div className="yearbook-quote-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <span className="yearbook-author">— {senderName}</span>}
      </div>
    </div>
  );
}

export const PhotoMemoriesGradTemplate = GraduationTemplate4;
export default GraduationTemplate4;
