import React from 'react';
import './AnniversaryTemplate5.css';

export function AnniversaryTemplate5({ data = {} }) {
  const {
    recipientName = 'Maya & Sam',
    senderName = 'Sam',
    message = 'From day one until forever, I would choose you over and over in every lifetime.',
    photos = [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&auto=format&fit=crop&q=80'
    ],
    years = '10 Years of Us'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-journey">
      <div className="journey-hero-header">
        <span className="journey-tag">MILESTONE JOURNEY</span>
        <h1 className="journey-title">{recipientName}</h1>
        {years && <span className="journey-badge">{years}</span>}
      </div>

      {photoUrls.map((url, i) => (
        <div key={i} className="journey-section-card">
          <img src={url} alt={`Milestone ${i + 1}`} />
          <div className="journey-card-caption">
            <h4>Milestone 0{i + 1}</h4>
            <p>"Every step of the way has been a blessing with you."</p>
          </div>
        </div>
      ))}

      <div className="journey-closing-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const OurJourneyTemplate = AnniversaryTemplate5;
export default AnniversaryTemplate5;
