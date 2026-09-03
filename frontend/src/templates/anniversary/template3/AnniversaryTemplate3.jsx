import React from 'react';
import './AnniversaryTemplate3.css';

export function AnniversaryTemplate3({ data = {} }) {
  const {
    recipientName = 'Elena & Mark',
    senderName = 'Mark',
    message = 'In a sea of people, my eyes will always search for you. Happy anniversary my love.',
    photos = ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80'],
    date = 'June 18 • Forever & Always'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-forever">
      <div className="forever-crest">∞</div>
      <h1 className="forever-title">{recipientName}</h1>
      {date && <p className="forever-date">{date}</p>}

      {photoUrls[0] && (
        <div className="forever-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="forever-note-box">
        <p className="forever-text">"{message}"</p>
        {senderName && <span className="forever-signature">— {senderName}</span>}
      </div>
    </div>
  );
}

export const ForeverAlwaysTemplate = AnniversaryTemplate3;
export default AnniversaryTemplate3;
