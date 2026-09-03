import React from 'react';
import './CongratulationsTemplate3.css';

export function CongratulationsTemplate3({ data = {} }) {
  const {
    recipientName = 'Devon',
    senderName = 'Aunt Carol & Uncle John',
    message = 'We always knew you had greatness in you. Seeing you achieve this brings immense tears of joy to our eyes.',
    photos = ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-proud">
      <div className="proud-star-crest">⭐</div>
      <h1 className="proud-name">So Proud of You, {recipientName}!</h1>

      {photoUrls[0] && (
        <div className="proud-photo-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="proud-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <span className="proud-author">— {senderName}</span>}
      </div>
    </div>
  );
}

export const ProudMomentTemplate = CongratulationsTemplate3;
export default CongratulationsTemplate3;
