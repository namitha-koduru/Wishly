import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import './ValentinesTemplate1.css';

export function ValentinesTemplate1({ data = {} }) {
  const {
    recipientName = 'My Sweetheart',
    senderName = 'With all my heart, Daniel',
    message = 'You are the melody to my thoughts and the peace in my chaos. Happy Valentine’s Day to the one who holds my heart completely.',
    photos = ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-love-letter">
      <FloatingHeartsEffect count={12} />
      <div className="val-wax-seal">💖</div>

      <div className="val-letter-sheet">
        <h2 className="val-salutation">{recipientName},</h2>

        <div className="val-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="val-polaroid-tuck">
            <img src={photoUrls[0]} alt={recipientName} />
            <span className="val-polaroid-note">"Forever and always"</span>
          </div>
        )}

        <div className="val-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

export const LoveLetterValTemplate = ValentinesTemplate1;
export default ValentinesTemplate1;
