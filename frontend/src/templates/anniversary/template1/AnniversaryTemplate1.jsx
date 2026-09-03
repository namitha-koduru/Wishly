import React from 'react';
import FloatingHeartsEffect from '../../shared/FloatingHeartsEffect.jsx';
import TimelineView from '../../shared/TimelineView.jsx';
import './AnniversaryTemplate1.css';

export function AnniversaryTemplate1({ data = {} }) {
  const {
    recipientName = 'Rohan & Priya',
    senderName = 'Rohan',
    message = 'Every single day with you is my favorite adventure. Five years of love, laughter, and building our forever home together.',
    photos = [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80'
    ],
    years = '5 Beautiful Years',
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultTimeline = [
    { date: 'Year 1', title: 'The First Spark', description: 'When a simple coffee date turned into a 5-hour conversation.' },
    { date: 'Year 3', title: 'The Big Adventure', description: 'Our first unforgettable trip to Paris together.' },
    { date: 'Today', title: 'Still Choosing You', description: 'Stronger, happier, and more in love than ever.' }
  ];

  const timelineItems = customData.timeline || defaultTimeline;

  return (
    <div className="tpl-root tpl-anniversary-our-story">
      <FloatingHeartsEffect count={10} />
      <span className="tpl-anniversary-tag">OUR LOVE STORY</span>
      <h1 className="tpl-title">{recipientName}</h1>
      {years && <span className="tpl-years-badge">💍 {years}</span>}

      {photoUrls[0] && (
        <div className="our-story-hero-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With all my love,<br /><strong>{senderName}</strong></p>}
      </div>

      <div className="anniversary-timeline-section">
        <h3 className="tpl-section-subtitle">How Our Story Unfolded ⏳</h3>
        <TimelineView items={timelineItems} />
      </div>
    </div>
  );
}

export const OurStoryTemplate = AnniversaryTemplate1;
export default AnniversaryTemplate1;
