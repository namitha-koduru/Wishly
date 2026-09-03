import React from 'react';
import ConfettiEffect from '../../shared/ConfettiEffect.jsx';
import './GraduationTemplate1.css';

export function GraduationTemplate1({ data = {} }) {
  const {
    recipientName = 'Maya Lin',
    senderName = 'Mom & Dad',
    message = 'All the late night study sessions, coffee runs, and relentless determination led to this proud milestone! The world is waiting for your brilliance.',
    photos = [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80'
    ],
    degree = 'Bachelor of Computer Science',
    classYear = 'Class of 2026'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-achievement">
      <ConfettiEffect count={15} />
      <span className="grad-badge">🎓 GRADUATION DAY</span>
      <h1 className="grad-bold-title">YOU DID IT.</h1>
      <h2 className="grad-name">{recipientName}</h2>
      {degree && <p className="grad-degree">{degree}</p>}
      {classYear && <span className="grad-year-pill">{classYear}</span>}

      {photoUrls[0] && (
        <div className="grad-photo-laurel-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
          <div className="grad-cap-sparkle">🎓</div>
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With boundless pride and love,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

export const ClassOf2026Template = GraduationTemplate1;
export default GraduationTemplate1;
