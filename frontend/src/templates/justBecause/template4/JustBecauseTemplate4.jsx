import React from 'react';
import './JustBecauseTemplate4.css';

export function JustBecauseTemplate4({ data = {} }) {
  const {
    recipientName = 'Aiden',
    senderName = 'Someone who cares deeply',
    message = 'Never doubt the gentle, positive difference your presence makes in this world.',
    photos = ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-special">
      <h1 className="special-big-text">You Are Special, {recipientName}.</h1>

      {photoUrls[0] && (
        <div className="special-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="special-card-box">
        <p className="special-quote-text">"{message}"</p>
        {senderName && <span className="special-author">— {senderName}</span>}
      </div>
    </div>
  );
}

export const YouAreSpecialTemplate = JustBecauseTemplate4;
export default JustBecauseTemplate4;
