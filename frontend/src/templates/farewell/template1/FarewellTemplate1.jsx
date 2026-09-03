import React from 'react';
import './FarewellTemplate1.css';

export function FarewellTemplate1({ data = {} }) {
  const {
    recipientName = 'David Kim',
    senderName = 'The Whole Design Team',
    message = 'Your creativity, kindness, and morning coffee jokes made every work day brighter. You will be sorely missed!',
    photos = [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80'
    ],
    teamName = 'Design & Product Crew'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-memory-wall">
      <div className="farewell-tag">FAREWELL & GOOD LUCK</div>
      <h1 className="tpl-title">We Will Miss You, {recipientName}!</h1>
      {teamName && <span className="team-badge">Tribute from: {teamName}</span>}

      <div className="farewell-polaroid-wall">
        {photoUrls.map((url, i) => (
          <div key={i} className={`polaroid-wall-item wall-tilt-${(i % 3) + 1}`}>
            <div className="washi-tape"></div>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="wall-caption">"Thanks for the memories!"</span>
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

export const MemoryWallTemplate = FarewellTemplate1;
export default FarewellTemplate1;
