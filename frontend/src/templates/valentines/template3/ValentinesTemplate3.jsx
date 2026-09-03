import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import TimelineView from '../../shared/TimelineView.jsx';
import './ValentinesTemplate3.css';

export function ValentinesTemplate3({ data = {} }) {
  const {
    recipientName = 'Aarav & Meera',
    senderName = 'Meera',
    message = 'Every chapter of our story has been sweeter than the last. Happy Valentine’s Day my love.',
    photos = ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultTimeline = [
    { date: 'The First Spark', title: 'When Eyes Met', description: 'One look across the room, and everything else faded away.' },
    { date: 'First Anniversary', title: 'Growing Closer', description: 'Realizing that home is wherever I am with you.' },
    { date: 'Forever', title: 'Every Day With You', description: 'Loving you more today than yesterday.' }
  ];

  const milestones = customData.milestones || defaultTimeline;

  return (
    <div className="tpl-root tpl-val-story">
      <FloatingHeartsEffect count={8} />
      <span className="val-tag">A LOVE STORY</span>
      <h1 className="tpl-title">{recipientName}</h1>

      {photoUrls[0] && (
        <div className="val-story-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="val-timeline-section">
        <h3 className="tpl-section-subtitle">Our Journey Together ❤️</h3>
        <TimelineView items={milestones} />
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const OurStoryValTemplate = ValentinesTemplate3;
export default ValentinesTemplate3;
