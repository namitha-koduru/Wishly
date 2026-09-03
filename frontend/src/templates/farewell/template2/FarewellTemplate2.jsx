import React from 'react';
import './FarewellTemplate2.css';

export function FarewellTemplate2({ data = {} }) {
  const {
    recipientName = 'Dear Rachel',
    senderName = 'Your Colleagues & Friends',
    message = 'Goodbyes are not forever, they are simply our way of saying we will miss you until we meet again. Wishing you immense success in your next chapter.',
    photos = ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'],
    date = 'Farewell Gathering'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-letter">
      <div className="letter-paper-sheet">
        <div className="farewell-letter-header">
          <span className="farewell-date-tag">{date || 'A Fond Farewell'}</span>
          <span className="farewell-stamp">UNTIL NEXT TIME</span>
        </div>

        <h2 className="letter-salutation">{recipientName},</h2>

        <div className="letter-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="farewell-photo-tuck">
            <img src={photoUrls[0]} alt="Farewell memory" />
          </div>
        )}

        <div className="letter-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

export const GoodbyeLetterTemplate = FarewellTemplate2;
export default FarewellTemplate2;
