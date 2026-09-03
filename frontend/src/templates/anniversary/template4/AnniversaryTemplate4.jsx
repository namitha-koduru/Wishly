import React from 'react';
import './AnniversaryTemplate4.css';

export function AnniversaryTemplate4({ data = {} }) {
  const {
    recipientName = 'Claire',
    senderName = 'Noah',
    message = 'Every snapshot holds a thousand words and a million feelings. Thank you for making life so wonderful.',
    photos = [
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-memories">
      <div className="scrapbook-pin">📍</div>
      <h1 className="tpl-title">Memories of Us: {recipientName}</h1>
      <p className="scrapbook-sub">Handpicked moments from our story</p>

      <div className="anniversary-polaroid-gallery">
        {photoUrls.map((url, i) => (
          <div key={i} className={`polaroid-pin-card pin-tilt-${(i % 2) + 1}`}>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="polaroid-pin-caption">"My favorite place is next to you"</span>
          </div>
        ))}
      </div>

      <div className="scrapbook-note-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const MemoryTimelineTemplate = AnniversaryTemplate4;
export default AnniversaryTemplate4;
