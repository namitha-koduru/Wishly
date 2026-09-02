import React from 'react';
import ConfettiEffect from '../shared/ConfettiEffect.jsx';
import InteractiveSurpriseBox from '../shared/InteractiveSurpriseBox.jsx';

// 1. Birthday 01 — Celebration (Joyful, energetic, confetti, hero photo, message, celebration badges)
export function BirthdayMemoriesTemplate({ data = {} }) {
  const {
    recipientName = 'Sarah',
    senderName = 'Alex',
    message = 'Wishing you the happiest birthday filled with joy, laughter, and unforgettable moments! May this year bring you closer to all your dreams.',
    photos = [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80'
    ],
    date = 'September 12',
    age = ''
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-celebration">
      <ConfettiEffect count={14} />

      <div className="tpl-hero-badge">🎂 HAPPY BIRTHDAY</div>
      <h1 className="tpl-title">Cheers to You, {recipientName}!</h1>
      {age && <span className="tpl-age-pill">✨ Celebrating {age} Years of Awesome</span>}
      {date && <p className="tpl-date">Special Day • {date}</p>}

      {photoUrls[0] && (
        <div className="tpl-photo-hero-wrapper">
          <div className="tpl-featured-photo-frame">
            <img src={photoUrls[0]} alt={recipientName} className="tpl-featured-photo" />
            <div className="tpl-photo-sparkle">✨</div>
          </div>
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With love always,<br /><strong>{senderName}</strong></p>}
      </div>

      {photoUrls.length > 1 && (
        <div className="tpl-mini-gallery">
          <h3 className="tpl-section-subtitle">Moments We Cherish 📸</h3>
          <div className="tpl-gallery-grid">
            {photoUrls.slice(1).map((url, i) => (
              <div key={i} className="tpl-polaroid">
                <img src={url} alt={`Memory ${i + 1}`} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// 2. Birthday 02 — Memory Lane (Nostalgic scrapbook / photo album timeline, memory captions, polaroids)
export function SweetCelebrationTemplate({ data = {} }) {
  const {
    recipientName = 'Emma',
    senderName = 'Your Besties',
    message = 'Another year bolder, brighter, and more fabulous! Keep shining like the superstar you are.',
    photos = [
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    ],
    age = '21'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-memory-lane">
      <div className="scrapbook-tape-top"></div>
      <span className="scrapbook-badge">📸 WALKING DOWN MEMORY LANE</span>
      <h1 className="tpl-title">Another Year, Another Chapter: {recipientName}</h1>
      {age && <p className="scrapbook-subtitle">Level {age} Unlocked ✨</p>}

      <div className="scrapbook-photo-stack">
        {photoUrls.map((url, i) => (
          <div key={i} className={`scrapbook-item item-tilt-${(i % 3) + 1}`}>
            <div className="scrapbook-tape-corner"></div>
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="scrapbook-item-caption">"A memory forever etched in time"</span>
          </div>
        ))}
      </div>

      <div className="scrapbook-note-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">From your favorite humans,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

// 3. Birthday 03 — Minimal (Editorial typography, elegant whitespace, single strong hero photo)
export function MinimalBirthdayTemplate({ data = {} }) {
  const {
    recipientName = 'Julian',
    senderName = 'Maya',
    message = 'A quiet celebration of everything that makes you remarkable. Happy birthday.',
    photos = ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'],
    date = 'October 14'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-minimal">
      <span className="minimal-tag">OCTOBER CELEBRATION</span>
      <h1 className="minimal-name">{recipientName}</h1>
      {date && <p className="minimal-date">{date}</p>}

      {photoUrls[0] && (
        <div className="minimal-portrait-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="minimal-message-wrap">
        <p className="minimal-text">"{message}"</p>
        {senderName && <p className="minimal-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

// 4. Birthday 04 — Surprise (Playful interactive reveal: "Click to reveal 🎁")
export function SurprisePartyTemplate({ data = {} }) {
  const {
    recipientName = 'Lucas',
    senderName = 'The Whole Crew',
    message = 'Get ready for the biggest celebration ever! We have so much love for you.',
    photos = ['https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80'],
    customData = {}
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-surprise">
      <ConfettiEffect count={16} />
      <div className="surprise-header-badge">🎈 SURPRISE CELEBRATION</div>
      <h1 className="tpl-title">Happy Birthday, {recipientName}! 🎉</h1>

      {photoUrls[0] && (
        <div className="surprise-photo-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="surprise-main-msg">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>

      <InteractiveSurpriseBox
        buttonLabel="Click to reveal your birthday surprise 🎁"
        surpriseTitle="A Little Surprise Just For You!"
        surpriseMessage={customData.surpriseMessage || 'You are getting a weekend getaway trip with everyone! Pack your bags!'}
      />
    </div>
  );
}

// 5. Birthday 05 — Photo Story (Cinematic, full-width immersive photo sections, emotional quotes)
export function PhotoStoryTemplate({ data = {} }) {
  const {
    recipientName = 'David',
    senderName = 'Elena',
    message = 'Looking back through all these moments reminds me how lucky I am to have you in my life. Here is to making a million more memories.',
    photos = [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1000&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1000&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-birthday-photo-story">
      <div className="photo-story-hero">
        <span className="photo-story-badge">CINEMATIC STORY</span>
        <h1 className="photo-story-title">Moments of {recipientName}</h1>
        <p className="photo-story-sub">A photographic tribute to another magnificent year</p>
      </div>

      {photoUrls.map((url, i) => (
        <div key={i} className="story-image-section">
          <img src={url} alt={`Story chapter ${i + 1}`} className="story-full-img" />
          <div className="story-text-overlay">
            <span className="story-chapter-tag">Chapter 0{i + 1}</span>
          </div>
        </div>
      ))}

      <div className="photo-story-closing">
        <p className="photo-story-quote">"{message}"</p>
        {senderName && <span className="photo-story-author">— Forever grateful, {senderName}</span>}
      </div>
    </div>
  );
}
