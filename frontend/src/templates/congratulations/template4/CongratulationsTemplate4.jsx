import React from 'react';
import ConfettiEffect from '../../shared/ConfettiEffect.jsx';
import './CongratulationsTemplate4.css';

export function CongratulationsTemplate4({ data = {} }) {
  const {
    recipientName = 'Tanya Green',
    senderName = 'Your Cheerleaders',
    message = 'Pop the champagne and throw the confetti! Today is all about celebrating your victory.',
    photos = ['https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-cheer">
      <ConfettiEffect count={18} />
      <span className="cheer-badge">🎉 TIME TO CELEBRATE</span>
      <h1 className="tpl-title">Cheers to {recipientName}! 🥂</h1>

      {photoUrls[0] && (
        <div className="cheer-photo-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const CelebrateCheerTemplate = CongratulationsTemplate4;
export default CongratulationsTemplate4;
