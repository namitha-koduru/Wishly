import React from 'react';
import './JustBecauseTemplate5.css';

export function JustBecauseTemplate5({ data = {} }) {
  const {
    recipientName = 'Kavya',
    senderName = 'With love, Tara',
    message = 'Sometimes you don’t need an excuse to tell someone you are grateful they exist. Thank you for being you.',
    photos = [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-heart">
      <div className="heart-header">
        <span className="heart-badge">💖 FROM MY HEART</span>
        <h1 className="tpl-title">For {recipientName}</h1>
      </div>

      <div className="heart-scrapbook-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="heart-photo-item">
            <img src={url} alt={`Memory ${i + 1}`} />
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

export const FromMyHeartTemplate = JustBecauseTemplate5;
export default JustBecauseTemplate5;
