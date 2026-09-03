import React from 'react';
import './JustBecauseTemplate1.css';

export function JustBecauseTemplate1({ data = {} }) {
  const {
    recipientName = 'Grandma',
    senderName = 'With all my love, Maya',
    message = 'No special occasion needed. Just wanted to remind you how much sunshine and warmth you bring into my life every day.',
    photos = ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-minimal">
      <span className="just-tag">JUST A LITTLE THOUGHT</span>
      <h1 className="just-title">For {recipientName} 🌸</h1>

      {photoUrls[0] && (
        <div className="just-photo-circle">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="just-note-box">
        <p className="just-text">"{message}"</p>
        {senderName && <span className="just-author">— {senderName}</span>}
      </div>
    </div>
  );
}

export const JustForYouTemplate = JustBecauseTemplate1;
export default JustBecauseTemplate1;
