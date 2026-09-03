import React from 'react';
import './ValentinesTemplate5.css';

export function ValentinesTemplate5({ data = {} }) {
  const {
    recipientName = 'Valentina',
    senderName = 'Forever yours',
    message = 'You are my today and all of my tomorrows. Happy Valentine’s Day.',
    photos = ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-forever">
      <span className="val-forever-heart">❤️</span>
      <h1 className="val-forever-title">To {recipientName}</h1>

      {photoUrls[0] && (
        <div className="val-forever-portrait">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="val-forever-note">
        <p className="val-forever-text">"{message}"</p>
        {senderName && <span className="val-forever-sig">— {senderName}</span>}
      </div>
    </div>
  );
}

export const ForeverValTemplate = ValentinesTemplate5;
export default ValentinesTemplate5;
