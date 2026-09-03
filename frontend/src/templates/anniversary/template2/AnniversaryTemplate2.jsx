import React from 'react';
import './AnniversaryTemplate2.css';

export function AnniversaryTemplate2({ data = {} }) {
  const {
    recipientName = 'My Dearest Emily',
    senderName = 'Yours Always, Liam',
    message = 'Looking into your eyes still feels like coming home. You are my safe harbor, my greatest confidant, and the love of my life.',
    photos = ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80'],
    date = 'October 24'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-love-letter">
      <div className="wax-seal-crest">💌</div>
      <div className="letter-paper-sheet">
        <div className="letter-header-row">
          <span className="letter-date-stamp">{date || 'A Special Day'}</span>
          <span className="letter-seal-badge">SEALED WITH LOVE</span>
        </div>

        <h2 className="letter-salutation">{recipientName},</h2>

        <div className="letter-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="letter-polaroid-tuck">
            <img src={photoUrls[0]} alt="Tucked memory" />
            <span className="letter-polaroid-caption">"A memory forever tucked in my heart"</span>
          </div>
        )}

        <div className="letter-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

export const LoveLetterAnniversaryTemplate = AnniversaryTemplate2;
export default AnniversaryTemplate2;
