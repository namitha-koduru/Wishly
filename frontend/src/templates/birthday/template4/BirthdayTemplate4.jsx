import React from 'react';
import ConfettiEffect from '../../shared/ConfettiEffect.jsx';
import InteractiveSurpriseBox from '../../shared/InteractiveSurpriseBox.jsx';
import './BirthdayTemplate4.css';

export function BirthdayTemplate4({ data = {} }) {
  const {
    recipientName = 'Lucas',
    senderName = 'The Whole Crew',
    message = 'Get ready for the biggest celebration ever! We have so much love for you.',
    photos = ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-surprise">
      <ConfettiEffect count={16} />
      <div className="surprise-header-badge">🎈 SURPRISE CELEBRATION</div>
      <h1 className="tpl-title">Happy Birthday, {recipientName}! 🎉</h1>

      {photoUrls[0] && (
        <div className="surprise-photo-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="surprise-main-msg">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>

      <InteractiveSurpriseBox
        buttonLabel="Click to reveal your birthday surprise 🎁"
        surpriseTitle="A Little Surprise Just For You!"
        surpriseMessage={customData.surpriseMessage || 'You are getting a weekend getaway trip with everyone! Pack your bags!'}
      />
    </div>
  );
}

export const SurprisePartyTemplate = BirthdayTemplate4;
export default BirthdayTemplate4;
