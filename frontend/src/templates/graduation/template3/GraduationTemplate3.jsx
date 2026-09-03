import React from 'react';
import './GraduationTemplate3.css';

export function GraduationTemplate3({ data = {} }) {
  const {
    recipientName = 'Marcus Reed',
    senderName = 'Professor Vance & Dept',
    message = 'Excellence is not an act, but a habit. You have proven yourself among the finest scholars.',
    photos = ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80'],
    degree = 'Doctor of Medicine'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-cinematic">
      <div className="grad-cinematic-hero">
        <span className="cinematic-tag">DISTINGUISHED HONORS</span>
        <h1 className="cinematic-name">{recipientName}</h1>
        {degree && <p className="cinematic-degree">{degree}</p>}
      </div>

      {photoUrls[0] && (
        <div className="grad-cinematic-img-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="cinematic-msg-card">
        <p className="cinematic-text">"{message}"</p>
        {senderName && <span className="cinematic-signoff">— {senderName}</span>}
      </div>
    </div>
  );
}

export const AchievementGradTemplate = GraduationTemplate3;
export default GraduationTemplate3;
