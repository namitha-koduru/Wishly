import React from 'react';
import './BirthdayTemplate5.css';

export function BirthdayTemplate5({ data = {} }) {
  const {
    recipientName = 'Julian',
    senderName = 'Maya',
    message = 'A quiet celebration of everything that makes you remarkable. Happy birthday.',
    photos = ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'],
    date = 'October 14'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-minimal">
      <span className="minimal-tag">OCTOBER CELEBRATION</span>
      <h1 className="minimal-name">{recipientName}</h1>
      {date && <p className="minimal-date">{date}</p>}

      {photoUrls[0] && (
        <div className="minimal-portrait-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="minimal-message-wrap">
        <p className="minimal-text">"{message}"</p>
        {senderName && <p className="minimal-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const MinimalBirthdayTemplate = BirthdayTemplate5;
export default BirthdayTemplate5;
