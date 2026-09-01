import React from 'react';

// 1. Our Story (Romantic storybook layout)
export function OurStoryTemplate({ data = {} }) {
  const {
    recipientName = 'Sophia & David',
    senderName = 'With Love',
    message = 'From our very first conversation to all the adventures we have shared, every single second with you is a blessing.',
    years = '5 Beautiful Years',
    photos = ['https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-our-story">
      <div className="tpl-story-tag">💍 HAPPY ANNIVERSARY</div>
      <h1 className="tpl-serif-title">{recipientName}</h1>
      <p className="tpl-years-badge">✨ {years} ✨</p>

      {photos[0] && (
        <div className="tpl-romantic-frame">
          <img src={photos[0]} alt="Our Story" />
        </div>
      )}

      <div className="tpl-storybook-card">
        <p className="tpl-story-text">"{message}"</p>
        {senderName && <p className="tpl-signature-script">{senderName}</p>}
      </div>
    </div>
  );
}

// 2. Forever & Always (Gold & champagne elegance)
export function ForeverAlwaysTemplate({ data = {} }) {
  const {
    recipientName = 'My Beloved',
    senderName = 'Forever Yours',
    message = 'I loved you yesterday, I love you still, I always have, I always will. Happy Anniversary, my heart.',
    date = 'October 14'
  } = data;

  return (
    <div className="tpl-root tpl-forever-always">
      <div className="tpl-gold-border-box">
        <span className="tpl-gold-ribbon">FOREVER & ALWAYS</span>
        <h1 className="tpl-elegant-name">{recipientName}</h1>
        {date && <p className="tpl-sub-date">{date}</p>}
        <div className="tpl-golden-ornament">❦</div>
        <p className="tpl-vow-text">{message}</p>
        {senderName && <p className="tpl-vow-author">— {senderName}</p>}
      </div>
    </div>
  );
}

// 3. Memory Timeline (Milestone checkpoints layout)
export function MemoryTimelineTemplate({ data = {} }) {
  const {
    recipientName = 'Alex & Taylor',
    senderName = 'Celebrating Us',
    message = 'Looking back on all our memories and looking forward to thousands more.',
    milestones = [
      { label: 'First Date', text: 'Where the magic sparked' },
      { label: 'Moving In', text: 'Building our cozy haven' },
      { label: 'Today & Beyond', text: 'Stronger and more in love than ever' }
    ]
  } = data;

  return (
    <div className="tpl-root tpl-memory-timeline">
      <h1 className="tpl-timeline-title">Our Milestone Journey</h1>
      <p className="tpl-timeline-sub">Celebrating {recipientName}</p>

      <div className="tpl-timeline-list">
        {milestones.map((item, idx) => (
          <div key={idx} className="tpl-timeline-node">
            <div className="tpl-node-dot">{idx + 1}</div>
            <div className="tpl-node-content">
              <h4>{item.label}</h4>
              <p>{item.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="tpl-timeline-footer-card">
        <p className="tpl-timeline-msg">{message}</p>
        {senderName && <span className="tpl-tag-soft">{senderName}</span>}
      </div>
    </div>
  );
}

// 4. Love Letter (Vintage parchment aesthetic)
export function LoveLetterAnniversaryTemplate({ data = {} }) {
  const {
    recipientName = 'Dearest Eleanor',
    senderName = 'Arthur',
    message = 'No words in any language could ever fully express how grateful I am to walk through this life by your side.',
    date = 'Our Anniversary'
  } = data;

  return (
    <div className="tpl-root tpl-love-letter">
      <div className="tpl-parchment-sheet">
        <div className="tpl-wax-seal">❤️</div>
        <p className="tpl-letter-salutation">{recipientName},</p>
        <p className="tpl-letter-content">{message}</p>
        <div className="tpl-letter-signoff">
          <p>Forever & faithfully,</p>
          <p className="tpl-handwritten">{senderName}</p>
          {date && <span className="tpl-letter-date">{date}</span>}
        </div>
      </div>
    </div>
  );
}

// 5. Our Journey (Polaroid & Travel Keepsake layout)
export function OurJourneyTemplate({ data = {} }) {
  const {
    recipientName = 'Chris & Sam',
    senderName = 'Love',
    message = 'Every flight, every road trip, and every cozy quiet evening. Life is an amazing adventure with you.',
    photos = [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-our-journey">
      <div className="tpl-journey-header">
        <span className="tpl-stamp">PASSPORT TO LOVE ✈️</span>
        <h1 className="tpl-journey-title">{recipientName}'s Journey</h1>
      </div>

      <div className="tpl-polaroid-stack">
        {photos.map((url, i) => (
          <div key={i} className={`tpl-polaroid-tilt tpl-tilt-${(i % 2) + 1}`}>
            <img src={url} alt="Journey moment" />
            <div className="tpl-polaroid-caption">Chapter {i + 1}</div>
          </div>
        ))}
      </div>

      <div className="tpl-journey-message">
        <p>{message}</p>
        {senderName && <span className="tpl-badge-pill">— {senderName}</span>}
      </div>
    </div>
  );
}
