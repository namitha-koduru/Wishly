import React from 'react';
import TimelineView from '../../shared/TimelineView.jsx';
import './GraduationTemplate2.css';

export function GraduationTemplate2({ data = {} }) {
  const {
    recipientName = 'Jordan Lee',
    senderName = 'The Smith Family',
    message = 'Watching you grow from day one into the accomplished graduate you are today has been the joy of our lives.',
    photos = ['https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultMilestones = [
    { date: 'Freshman Year', title: 'The Beginning', description: 'Arriving on campus full of big dreams and curious eyes.' },
    { date: 'Junior Year', title: 'The Breakthrough', description: 'Overcoming the toughest exams, late nights, and finding your passion.' },
    { date: 'Senior Year', title: 'The Triumph', description: 'Cap in the air, diploma in hand, ready to conquer the world.' }
  ];

  const milestones = customData.milestones || defaultMilestones;

  return (
    <div className="tpl-root tpl-grad-journey">
      <span className="grad-journey-badge">THE ACADEMIC JOURNEY</span>
      <h1 className="tpl-title">From Dreamer to Graduate: {recipientName}</h1>

      {photoUrls[0] && (
        <div className="grad-journey-photo-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="grad-journey-timeline">
        <h3 className="tpl-section-subtitle">How You Got Here 🎓</h3>
        <TimelineView items={milestones} />
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

export const TheJourneyGradTemplate = GraduationTemplate2;
export default GraduationTemplate2;
