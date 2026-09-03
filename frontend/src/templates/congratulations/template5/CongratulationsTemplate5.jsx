import React from 'react';
import './CongratulationsTemplate5.css';

export function CongratulationsTemplate5({ data = {} }) {
  const {
    recipientName = 'Zack Taylor',
    senderName = 'With utmost admiration, The Board',
    message = 'Success is where preparation meets opportunity. Here is to the milestone you have built with grit and vision.',
    photos = [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
    ],
    achievement = 'First Big Milestone'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-story">
      <div className="story-header">
        <span className="story-tag">A SUCCESS STORY</span>
        <h1 className="tpl-title">The Rise of {recipientName}</h1>
        {achievement && <p className="story-sub">{achievement}</p>}
      </div>

      <div className="story-photos-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="story-card-item">
            <img src={url} alt={`Success Chapter ${i + 1}`} />
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

export const SuccessStoryTemplate = CongratulationsTemplate5;
export default CongratulationsTemplate5;
