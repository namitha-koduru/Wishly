import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import ReasonsList from '../../shared/ReasonsList.jsx';
import './ValentinesTemplate2.css';

export function ValentinesTemplate2({ data = {} }) {
  const {
    recipientName = 'Sneha',
    senderName = 'Yours, Kabir',
    message = 'Words can never fully capture how much you mean to me, but here are just a few reasons why you hold my heart.',
    photos = ['https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultReasons = [
    'The contagious laugh that instantly brightens my gloomiest day.',
    'Your immense kindness and gentle empathy towards everyone you meet.',
    'The sweet way you squeeze my hand whenever you get excited.',
    'Making even the most ordinary moments feel like magic.'
  ];

  const reasons = customData.reasons || defaultReasons;

  return (
    <div className="tpl-root tpl-val-reasons">
      <FloatingHeartsEffect count={10} />
      <span className="val-badge">VALENTINE'S TRIBUTE</span>
      <h1 className="tpl-title">Reasons I Adore You, {recipientName}</h1>

      {photoUrls[0] && (
        <div className="val-reasons-hero-photo">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="val-reasons-list-wrap">
        <ReasonsList reasons={reasons} title="Why You Mean the World to Me ✨" />
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const ReasonsILoveYouTemplate = ValentinesTemplate2;
export default ValentinesTemplate2;
