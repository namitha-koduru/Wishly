import React from 'react';
import './FarewellTemplate3.css';

export function FarewellTemplate3({ data = {} }) {
  const {
    recipientName = 'Marcus',
    senderName = 'With fondest regards, The Crew',
    message = 'No matter where your journey takes you next, you will always have a home with us.',
    photos = ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-cinematic">
      <div className="farewell-cinematic-hero">
        <span className="farewell-pill">BON VOYAGE</span>
        <h1 className="cinematic-title">Until We Meet Again, {recipientName}</h1>
      </div>

      {photoUrls[0] && (
        <div className="farewell-full-photo">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="farewell-closing-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <span className="farewell-signature">— {senderName}</span>}
      </div>
    </div>
  );
}

export const UntilWeMeetAgainTemplate = FarewellTemplate3;
export default FarewellTemplate3;
