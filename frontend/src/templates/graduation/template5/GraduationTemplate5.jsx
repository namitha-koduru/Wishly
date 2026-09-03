import React from 'react';
import './GraduationTemplate5.css';

export function GraduationTemplate5({ data = {} }) {
  const {
    recipientName = 'Aria Patel',
    senderName = 'With love from all of us',
    message = 'As one chapter closes, a thousand new doors swing wide open. Go boldly in the direction of your dreams.',
    photos = ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'],
    achievement = 'The Future is Yours'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-future">
      <div className="future-crest">🚀</div>
      <h1 className="future-title">The Best is Yet to Come, {recipientName}</h1>
      {achievement && <span className="future-tagline">{achievement}</span>}

      {photoUrls[0] && (
        <div className="future-portrait-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="future-card-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const FutureBeginsTemplate = GraduationTemplate5;
export default GraduationTemplate5;
