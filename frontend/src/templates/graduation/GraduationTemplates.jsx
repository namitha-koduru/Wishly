import React from 'react';
import ConfettiEffect from '../shared/ConfettiEffect.jsx';
import TimelineView from '../shared/TimelineView.jsx';

// 1. Graduation 01 — Achievement (Bold "YOU DID IT", class/year, achievement section)
export function ClassOf2026Template({ data = {} }) {
  const {
    recipientName = 'Maya Lin',
    senderName = 'Mom & Dad',
    message = 'All the late night study sessions, coffee runs, and relentless determination led to this proud milestone! The world is waiting for your brilliance.',
    photos = [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80'
    ],
    degree = 'Bachelor of Computer Science',
    classYear = 'Class of 2026'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-achievement">
      <ConfettiEffect count={15} />
      <span className="grad-badge">🎓 GRADUATION DAY</span>
      <h1 className="grad-bold-title">YOU DID IT.</h1>
      <h2 className="grad-name">{recipientName}</h2>
      {degree && <p className="grad-degree">{degree}</p>}
      {classYear && <span className="grad-year-pill">{classYear}</span>}

      {photoUrls[0] && (
        <div className="grad-photo-laurel-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
          <div className="grad-cap-sparkle">🎓</div>
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With boundless pride and love,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

// 2. Graduation 02 — Journey (Beginning → Challenges → Growth → Graduation)
export function TheJourneyGradTemplate({ data = {} }) {
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

// 3. Graduation 03 — Yearbook (Yearbook-inspired grid, quotes, class badge)
export function PhotoMemoriesGradTemplate({ data = {} }) {
  const {
    recipientName = 'Chloe Bennett',
    senderName = 'Classmates of 2026',
    message = 'Most likely to change the world! Thank you for the laughs, study group snacks, and memories.',
    photos = [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
    ],
    classYear = 'Class of 2026'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-yearbook">
      <div className="yearbook-header">
        <span className="yearbook-tag">OFFICIAL YEARBOOK TRIBUTE</span>
        <h1 className="yearbook-title">{recipientName}</h1>
        {classYear && <span className="yearbook-class-badge">{classYear}</span>}
      </div>

      <div className="yearbook-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="yearbook-card">
            <img src={url} alt={`Yearbook ${i + 1}`} />
            <span className="yearbook-quote">"Class Superlative • Future Leader"</span>
          </div>
        ))}
      </div>

      <div className="yearbook-quote-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <span className="yearbook-author">— {senderName}</span>}
      </div>
    </div>
  );
}

// 4. Graduation 04 — Cinematic (Large imagery, inspiring typography, clean sections)
export function AchievementGradTemplate({ data = {} }) {
  const {
    recipientName = 'Marcus Reed',
    senderName = 'Professor Vance & Dept',
    message = 'Excellence is not an act, but a habit. You have proven yourself among the finest scholars.',
    photos = ['https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80'],
    degree = 'Doctor of Medicine'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-cinematic">
      <div className="grad-cinematic-hero">
        <span className="cinematic-tag">DISTINGUISHED HONORS</span>
        <h1 className="cinematic-name">{recipientName}</h1>
        {degree && <p className="cinematic-degree">{degree}</p>}
      </div>

      {photoUrls[0] && (
        <div className="grad-cinematic-img-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="cinematic-msg-card">
        <p className="cinematic-text">"{message}"</p>
        {senderName && <span className="cinematic-signoff">— {senderName}</span>}
      </div>
    </div>
  );
}

// 5. Graduation 05 — Future ("The best is yet to come", future aspirations)
export function FutureBeginsTemplate({ data = {} }) {
  const {
    recipientName = 'Aria Patel',
    senderName = 'With love from all of us',
    message = 'As one chapter closes, a thousand new doors swing wide open. Go boldly in the direction of your dreams.',
    photos = ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'],
    achievement = 'The Future is Yours'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-grad-future">
      <div className="future-crest">🚀</div>
      <h1 className="future-title">The Best is Yet to Come, {recipientName}</h1>
      {achievement && <span className="future-tagline">{achievement}</span>}

      {photoUrls[0] && (
        <div className="future-portrait-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="future-card-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}
