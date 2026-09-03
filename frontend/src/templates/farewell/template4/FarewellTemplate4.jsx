import React from 'react';
import './FarewellTemplate4.css';

export function FarewellTemplate4({ data = {} }) {
  const {
    recipientName = 'Jessica Tan',
    senderName = 'All of Us at Wishly Corp',
    message = 'You led with empathy, inspired with passion, and solved every puzzle with grace. The team will not be the same without you.',
    photos = [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    ],
    teamName = 'Engineering & Product Team'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-team">
      <div className="team-header-row">
        <span className="team-icon">🤝</span>
        <h1 className="tpl-title">Cheers to {recipientName}!</h1>
        {teamName && <p className="team-sub">{teamName}</p>}
      </div>

      <div className="team-photos-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="team-photo-card">
            <img src={url} alt={`Team Memory ${i + 1}`} />
          </div>
        ))}
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const TeamMemoriesTemplate = FarewellTemplate4;
export default FarewellTemplate4;
