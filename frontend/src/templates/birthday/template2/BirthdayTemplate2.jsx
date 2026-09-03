import React from 'react';
import './BirthdayTemplate2.css';

export function BirthdayTemplate2({ data = {} }) {
  const {
    recipientName = 'Emma',
    senderName = 'Your Besties',
    message = 'Another year bolder, brighter, and more fabulous! Keep shining like the superstar you are.',
    photos = [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    ],
    age = '21'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-memory-lane">
      <div className="scrapbook-tape-top"></div>
      <span className="scrapbook-badge">📸 WALKING DOWN MEMORY LANE</span>
      <h1 className="tpl-title">Another Year, Another Chapter: {recipientName}</h1>
      {age && <p className="scrapbook-subtitle">Level {age} Unlocked ✨</p>}

      <div className="scrapbook-photo-stack">
        {photoUrls.map((url, i) => (
          <div key={i} className={`scrapbook-item item-tilt-${(i % 3) + 1}`}>
            <div className="scrapbook-tape-corner"></div>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="scrapbook-item-caption">"A memory forever etched in time"</span>
          </div>
        ))}
      </div>

      <div className="scrapbook-note-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">From your favorite humans,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

export const SweetCelebrationTemplate = BirthdayTemplate2;
export default BirthdayTemplate2;
