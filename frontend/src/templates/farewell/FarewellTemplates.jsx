import React from 'react';
import TimelineView from '../shared/TimelineView.jsx';

// 1. Farewell 01 — Memory Wall (Many photos, polaroid-style layout with washi tape)
export function MemoryWallTemplate({ data = {} }) {
  const {
    recipientName = 'David Kim',
    senderName = 'The Whole Design Team',
    message = 'Your creativity, kindness, and morning coffee jokes made every work day brighter. You will be sorely missed!',
    photos = [
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80'
    ],
    teamName = 'Design & Product Crew'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-memory-wall">
      <div className="farewell-tag">FAREWELL & GOOD LUCK</div>
      <h1 className="tpl-title">We Will Miss You, {recipientName}!</h1>
      {teamName && <span className="team-badge">Tribute from: {teamName}</span>}

      <div className="farewell-polaroid-wall">
        {photoUrls.map((url, i) => (
          <div key={i} className={`polaroid-wall-item wall-tilt-${(i % 3) + 1}`}>
            <div className="washi-tape"></div>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="wall-caption">"Thanks for the memories!"</span>
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

// 2. Farewell 02 — Goodbye Letter (Letter-style experience with paper texture)
export function GoodbyeLetterTemplate({ data = {} }) {
  const {
    recipientName = 'Dear Rachel',
    senderName = 'Your Colleagues & Friends',
    message = 'Goodbyes are not forever, they are simply our way of saying we will miss you until we meet again. Wishing you immense success in your next chapter.',
    photos = ['https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'],
    date = 'Farewell Gathering'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-letter">
      <div className="letter-paper-sheet">
        <div className="farewell-letter-header">
          <span className="farewell-date-tag">{date || 'A Fond Farewell'}</span>
          <span className="farewell-stamp">UNTIL NEXT TIME</span>
        </div>

        <h2 className="letter-salutation">{recipientName},</h2>

        <div className="letter-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="farewell-photo-tuck">
            <img src={photoUrls[0]} alt="Farewell memory" />
          </div>
        )}

        <div className="letter-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

// 3. Farewell 03 — Until We Meet Again (Emotional cinematic experience)
export function UntilWeMeetAgainTemplate({ data = {} }) {
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

// 4. Farewell 04 — Team Memories (Group-focused tribute layout)
export function TeamMemoriesTemplate({ data = {} }) {
  const {
    recipientName = 'Jessica Tan',
    senderName = 'All of Us at Wishly Corp',
    message = 'You led with empathy, inspired with passion, and solved every puzzle with grace. The team will not be the same without you.',
    photos = [
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80'
    ],
    teamName = 'Engineering & Product Team'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-farewell-team">
      <div className="team-header-row">
        <span className="team-icon">🤝</span>
        <h1 className="tpl-title">Cheers to {recipientName}!</h1>
        {teamName && <p className="team-sub">{teamName}</p>}
      </div>

      <div className="team-photos-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="team-photo-card">
            <img src={url} alt={`Team Memory ${i + 1}`} />
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

// 5. Farewell 05 — Timeline (Journey through shared memories)
export function GoodbyeMemoriesTemplate({ data = {} }) {
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
