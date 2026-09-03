import React from 'react';
import ConfettiEffect from '../../shared/ConfettiEffect.jsx';
import './CongratulationsTemplate1.css';

export function CongratulationsTemplate1({ data = {} }) {
  const {
    recipientName = 'Rahul Sharma',
    senderName = 'Mom & Dad',
    message = 'Huge congratulations on this tremendous milestone! Your persistence and dedication inspire everyone around you.',
    photos = ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'],
    achievement = 'Senior Promotion'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-youdidit">
      <ConfettiEffect count={16} />
      <span className="congrat-trophy">🏆</span>
      <h1 className="congrat-bold-title">YOU DID IT!</h1>
      <h2 className="congrat-name">{recipientName}</h2>
      {achievement && <span className="congrat-badge-pill">{achievement}</span>}

      {photoUrls[0] && (
        <div className="congrat-hero-photo-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">Proudly celebrating you,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

export const YouDidItTemplate = CongratulationsTemplate1;
export default CongratulationsTemplate1;
