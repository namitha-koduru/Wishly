import React from 'react';
import FloatingHeartsEffect from '../shared/FloatingHeartsEffect.jsx';
import TimelineView from '../shared/TimelineView.jsx';

// 1. Anniversary 01 — Our Story (Milestone timeline: First Meet → First Date → First Adventure → Today)
export function OurStoryTemplate({ data = {} }) {
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

// 2. Anniversary 02 — Love Letter (Paper texture, wax seal, handwritten typography)
export function LoveLetterAnniversaryTemplate({ data = {} }) {
  const {
    recipientName = 'My Dearest Emily',
    senderName = 'Yours Always, Liam',
    message = 'Looking into your eyes still feels like coming home. You are my safe harbor, my greatest confidant, and the love of my life.',
    photos = ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80'],
    date = 'October 24'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-love-letter">
      <div className="wax-seal-crest">💌</div>
      <div className="letter-paper-sheet">
        <div className="letter-header-row">
          <span className="letter-date-stamp">{date || 'A Special Day'}</span>
          <span className="letter-seal-badge">SEALED WITH LOVE</span>
        </div>

        <h2 className="letter-salutation">{recipientName},</h2>

        <div className="letter-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="letter-polaroid-tuck">
            <img src={photoUrls[0]} alt="Tucked memory" />
            <span className="letter-polaroid-caption">"A memory forever tucked in my heart"</span>
          </div>
        )}

        <div className="letter-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

// 3. Anniversary 03 — Forever (Minimal romantic, date prominently displayed, hero portrait)
export function ForeverAlwaysTemplate({ data = {} }) {
  const {
    recipientName = 'Elena & Mark',
    senderName = 'Mark',
    message = 'In a sea of people, my eyes will always search for you. Happy anniversary my love.',
    photos = ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80'],
    date = 'June 18 • Forever & Always'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-forever">
      <div className="forever-crest">∞</div>
      <h1 className="forever-title">{recipientName}</h1>
      {date && <p className="forever-date">{date}</p>}

      {photoUrls[0] && (
        <div className="forever-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="forever-note-box">
        <p className="forever-text">"{message}"</p>
        {senderName && <span className="forever-signature">— {senderName}</span>}
      </div>
    </div>
  );
}

// 4. Anniversary 04 — Memories (Photo-focused scrapbook with stickers and polaroids)
export function MemoryTimelineTemplate({ data = {} }) {
  const {
    recipientName = 'Claire',
    senderName = 'Noah',
    message = 'Every snapshot holds a thousand words and a million feelings. Thank you for making life so wonderful.',
    photos = [
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-memories">
      <div className="scrapbook-pin">📍</div>
      <h1 className="tpl-title">Memories of Us: {recipientName}</h1>
      <p className="scrapbook-sub">Handpicked moments from our story</p>

      <div className="anniversary-polaroid-gallery">
        {photoUrls.map((url, i) => (
          <div key={i} className={`polaroid-pin-card pin-tilt-${(i % 2) + 1}`}>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="polaroid-pin-caption">"My favorite place is next to you"</span>
          </div>
        ))}
      </div>

      <div className="scrapbook-note-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

// 5. Anniversary 05 — Journey (Long-scrolling visual milestone story)
export function OurJourneyTemplate({ data = {} }) {
  const {
    recipientName = 'Maya & Sam',
    senderName = 'Sam',
    message = 'From day one until forever, I would choose you over and over in every lifetime.',
    photos = [
      'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&auto=format&fit=crop&q=80'
    ],
    years = '10 Years of Us'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-anniversary-journey">
      <div className="journey-hero-header">
        <span className="journey-tag">MILESTONE JOURNEY</span>
        <h1 className="journey-title">{recipientName}</h1>
        {years && <span className="journey-badge">{years}</span>}
      </div>

      {photoUrls.map((url, i) => (
        <div key={i} className="journey-section-card">
          <img src={url} alt={`Milestone ${i + 1}`} />
          <div className="journey-card-caption">
            <h4>Milestone 0{i + 1}</h4>
            <p>"Every step of the way has been a blessing with you."</p>
          </div>
        </div>
      ))}

      <div className="journey-closing-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}
