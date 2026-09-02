import React from 'react';
import FloatingHeartsEffect from '../shared/FloatingHeartsEffect.jsx';
import ReasonsList from '../shared/ReasonsList.jsx';
import TimelineView from '../shared/TimelineView.jsx';

// 1. Valentine's 01 — Love Letter (Romantic wax seal & handwritten note)
export function LoveLetterValTemplate({ data = {} }) {
  const {
    recipientName = 'My Sweetheart',
    senderName = 'With all my heart, Daniel',
    message = 'You are the melody to my thoughts and the peace in my chaos. Happy Valentine’s Day to the one who holds my heart completely.',
    photos = ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-love-letter">
      <FloatingHeartsEffect count={12} />
      <div className="val-wax-seal">💖</div>

      <div className="val-letter-sheet">
        <h2 className="val-salutation">{recipientName},</h2>

        <div className="val-body-text">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="val-polaroid-tuck">
            <img src={photoUrls[0]} alt={recipientName} />
            <span className="val-polaroid-note">"Forever and always"</span>
          </div>
        )}

        <div className="val-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

// 2. Valentine's 02 — Reasons (Display "Reasons you're special" interactive cards)
export function ReasonsILoveYouTemplate({ data = {} }) {
  const {
    recipientName = 'Sneha',
    senderName = 'Yours, Kabir',
    message = 'Words can never fully capture how much you mean to me, but here are just a few reasons why you hold my heart.',
    photos = ['https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  const defaultReasons = [
    'The contagious laugh that instantly brightens my gloomiest day.',
    'Your immense kindness and gentle empathy towards everyone you meet.',
    'The sweet way you squeeze my hand whenever you get excited.',
    'Making even the most ordinary moments feel like magic.'
  ];

  const reasons = customData.reasons || defaultReasons;

  return (
    <div className="tpl-root tpl-val-reasons">
      <FloatingHeartsEffect count={10} />
      <span className="val-badge">VALENTINE'S TRIBUTE</span>
      <h1 className="tpl-title">Reasons I Adore You, {recipientName}</h1>

      {photoUrls[0] && (
        <div className="val-reasons-hero-photo">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="val-reasons-list-wrap">
        <ReasonsList reasons={reasons} title="Why You Mean the World to Me ✨" />
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

// 3. Valentine's 03 — Our Story (Timeline relationship story)
export function OurStoryValTemplate({ data = {} }) {
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

// 4. Valentine's 04 — Photo Memories (Large romantic photo gallery with quotes)
export function OurMomentsValTemplate({ data = {} }) {
  const {
    recipientName = 'Isabella',
    senderName = 'Lucas',
    message = 'Falling in love with you was the easiest thing I have ever done.',
    photos = [
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-moments">
      <FloatingHeartsEffect count={10} />
      <span className="val-badge">CHERISHED MOMENTS</span>
      <h1 className="tpl-title">You & Me, {recipientName}</h1>

      <div className="val-moments-gallery">
        {photoUrls.map((url, i) => (
          <div key={i} className="val-moment-card">
            <img src={url} alt={`Moment ${i + 1}`} />
            <span className="val-moment-caption">"My favorite memory is any with you"</span>
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

// 5. Valentine's 05 — Forever (Minimal elegant romantic design)
export function ForeverValTemplate({ data = {} }) {
  const {
    recipientName = 'Valentina',
    senderName = 'Forever yours',
    message = 'You are my today and all of my tomorrows. Happy Valentine’s Day.',
    photos = ['https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-val-forever">
      <span className="val-forever-heart">❤️</span>
      <h1 className="val-forever-title">To {recipientName}</h1>

      {photoUrls[0] && (
        <div className="val-forever-portrait">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="val-forever-note">
        <p className="val-forever-text">"{message}"</p>
        {senderName && <span className="val-forever-sig">— {senderName}</span>}
      </div>
    </div>
  );
}
