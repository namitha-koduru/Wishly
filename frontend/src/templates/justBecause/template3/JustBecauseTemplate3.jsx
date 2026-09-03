import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import './JustBecauseTemplate3.css';

export function JustBecauseTemplate3({ data = {} }) {
  const {
    recipientName = 'Sophie',
    senderName = 'Your Childhood Pal, Leo',
    message = 'Crossed a bakery that smelled like our favorite cinnamon rolls and immediately thought of you! Hope your week is wonderful.',
    photos = [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-thinking">
      <FloatingHeartsEffect count={8} />
      <span className="thinking-tag">💌 THINKING OF YOU</span>
      <h1 className="tpl-title">A Little Hello to {recipientName}</h1>

      <div className="thinking-polaroids-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="thinking-polaroid">
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="thinking-caption">"Thinking of fond moments"</span>
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

export const ThinkingOfYouTemplate = JustBecauseTemplate3;
export default JustBecauseTemplate3;
