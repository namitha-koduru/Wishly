import React from 'react';
import './CongratulationsTemplate2.css';

export function CongratulationsTemplate2({ data = {} }) {
  const {
    recipientName = 'Samantha Miller',
    senderName = 'The Leadership Team',
    message = 'Hard work pays off, and your achievements speak louder than words. We could not be prouder of your stellar accomplishment.',
    photos = ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'],
    achievement = 'Marathon Finisher'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-achievement">
      <span className="congrat-tag">OUTSTANDING FEAT</span>
      <h1 className="tpl-title">Congratulations, {recipientName}!</h1>
      {achievement && <p className="achievement-title-sub">🌟 {achievement}</p>}

      {photoUrls[0] && (
        <div className="achievement-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="achievement-card-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const AchievementCelebrationTemplate = CongratulationsTemplate2;
export default CongratulationsTemplate2;
