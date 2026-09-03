import React from 'react';
import ConfettiEffect from '../../shared/ConfettiEffect.jsx';
import './BirthdayTemplate1.css';

export function BirthdayTemplate1({ data = {} }) {
  const {
    recipientName = 'Sarah',
    senderName = 'Alex',
    message = 'Wishing you the happiest birthday filled with joy, laughter, and unforgettable moments! May this year bring you closer to all your dreams.',
    photos = [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80'
    ],
    date = 'September 12',
    age = ''
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-celebration">
      <ConfettiEffect count={14} />

      <div className="tpl-hero-badge">🎂 HAPPY BIRTHDAY</div>
      <h1 className="tpl-title">Cheers to You, {recipientName}!</h1>
      {age && <span className="tpl-age-pill">✨ Celebrating {age} Years of Awesome</span>}
      {date && <p className="tpl-date">Special Day • {date}</p>}

      {photoUrls[0] && (
        <div className="tpl-photo-hero-wrapper">
          <div className="tpl-featured-photo-frame">
            <img src={photoUrls[0]} alt={recipientName} className="tpl-featured-photo" />
            <div className="tpl-photo-sparkle">✨</div>
          </div>
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With love always,<br /><strong>{senderName}</strong></p>}
      </div>

      {photoUrls.length > 1 && (
        <div className="tpl-mini-gallery">
          <h3 className="tpl-section-subtitle">Moments We Cherish 📸</h3>
          <div className="tpl-gallery-grid">
            {photoUrls.slice(1).map((url, i) => (
              <div key={i} className="tpl-polaroid">
                <img src={url} alt={`Memory ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const BirthdayMemoriesTemplate = BirthdayTemplate1;
export default BirthdayTemplate1;
