import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import './ValentinesTemplate4.css';

export function ValentinesTemplate4({ data = {} }) {
  const {
    recipientName = 'Isabella',
    senderName = 'Lucas',
    message = 'Falling in love with you was the easiest thing I have ever done.',
    photos = [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-moments">
      <FloatingHeartsEffect count={10} />
      <span className="val-badge">CHERISHED MOMENTS</span>
      <h1 className="tpl-title">You & Me, {recipientName}</h1>

      <div className="val-moments-gallery">
        {photoUrls.map((url, i) => (
          <div key={i} className="val-moment-card">
            <img src={url} alt={`Moment ${i + 1}`} />
            <span className="val-moment-caption">"My favorite memory is any with you"</span>
          </div>
        ))}
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const OurMomentsValTemplate = ValentinesTemplate4;
export default ValentinesTemplate4;
