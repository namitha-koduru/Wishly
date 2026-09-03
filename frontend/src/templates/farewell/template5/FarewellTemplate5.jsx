import React from 'react';
import TimelineView from '../../shared/TimelineView.jsx';
import './FarewellTemplate5.css';

export function FarewellTemplate5({ data = {} }) {
  const {
    recipientName = 'Alex Mercer',
    senderName = 'Your Office Family',
    message = 'Thank you for every shared milestone and every helping hand along the way.',
    photos = ['https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultTimeline = [
    { date: 'First Day', title: 'Welcome to the Team', description: 'When you first walked in and instantly lit up the room.' },
    { date: 'Major Launch', title: 'The Big Victory', description: 'Pulling through together and celebrating our success.' },
    { date: 'Today', title: 'On to Bigger Horizons', description: 'Wishing you the very best in your next adventure!' }
  ];

  const milestones = customData.milestones || defaultTimeline;

  return (
    <div className="tpl-root tpl-farewell-timeline">
      <span className="farewell-tag">SHARED CHAPTERS</span>
      <h1 className="tpl-title">The Journey with {recipientName}</h1>

      {photoUrls[0] && (
        <div className="farewell-timeline-portrait">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="farewell-timeline-wrap">
        <h3 className="tpl-section-subtitle">Moments on Our Journey 👋</h3>
        <TimelineView items={milestones} />
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const GoodbyeMemoriesTemplate = FarewellTemplate5;
export default FarewellTemplate5;
