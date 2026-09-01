import React from 'react';

// 1. Birthday Memories (Hero spotlight + heartfelt note + photo gallery)
export function BirthdayMemoriesTemplate({ data = {} }) {
  const {
    recipientName = 'Sarah',
    senderName = 'Alex',
    message = 'Wishing you the happiest birthday filled with joy, laughter, and unforgettable moments! May this year bring you closer to all your dreams.',
    photos = [
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80'
    ],
    date = 'September 12'
  } = data;

  return (
    <div className="tpl-root tpl-birthday-memories">
      <div className="tpl-hero-badge">🎂 HAPPY BIRTHDAY</div>
      <h1 className="tpl-title">Cheers to You, {recipientName}!</h1>
      {date && <p className="tpl-date">Special Day • {date}</p>}

      <div className="tpl-photo-hero-wrapper">
        {photos[0] && (
          <div className="tpl-featured-photo-frame">
            <img src={photos[0]} alt={recipientName} className="tpl-featured-photo" />
            <div className="tpl-photo-sparkle">✨</div>
          </div>
        )}
      </div>

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">With love always,<br /><strong>{senderName}</strong></p>}
      </div>

      {photos.length > 1 && (
        <div className="tpl-mini-gallery">
          <h3 className="tpl-section-subtitle">Moments We Cherish 📸</h3>
          <div className="tpl-gallery-grid">
            {photos.slice(1).map((url, i) => (
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

// 2. Sweet Celebration (Vibrant pastel confetti card style)
export function SweetCelebrationTemplate({ data = {} }) {
  const {
    recipientName = 'Emma',
    senderName = 'Your Besties',
    message = 'Another year bolder, brighter, and more fabulous! Keep shining like the superstar you are.',
    photos = ['https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80'],
    age = '21'
  } = data;

  return (
    <div className="tpl-root tpl-sweet-celebration">
      <div className="tpl-confetti-banner">🎈 LEVEL {age || 'UP'} UNLOCKED 🎈</div>
      <h1 className="tpl-title-playful">Happy Birthday, {recipientName}!</h1>
      
      {photos[0] && (
        <div className="tpl-rounded-avatar-wrap">
          <img src={photos[0]} alt={recipientName} className="tpl-rounded-avatar" />
        </div>
      )}

      <div className="tpl-bubbly-card">
        <div className="tpl-cake-icon">🎂 🍰 🧁</div>
        <p className="tpl-message-text">{message}</p>
        {senderName && <div className="tpl-tag">From: {senderName} 💖</div>}
      </div>
    </div>
  );
}

// 3. Photo Story (Magazine editorial visual style)
export function PhotoStoryTemplate({ data = {} }) {
  const {
    recipientName = 'Jordan',
    senderName = 'Maya',
    message = 'Every chapter with you is full of adventure, warmth, and laughter. Here is to making this year the best chapter yet!',
    photos = [
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-photo-story">
      <div className="tpl-editorial-header">
        <span className="tpl-kicker">EDITION • SPECIAL CELEBRATION</span>
        <h1 className="tpl-editorial-title">Celebrating {recipientName}</h1>
        <p className="tpl-editorial-sub">The Extraordinary Journey So Far</p>
      </div>

      <div className="tpl-editorial-grid">
        {photos[0] && (
          <div className="tpl-editorial-main-img">
            <img src={photos[0]} alt={recipientName} />
          </div>
        )}
        <div className="tpl-editorial-quote-box">
          <div className="tpl-quote-mark">“</div>
          <p className="tpl-editorial-body">{message}</p>
          {senderName && <p className="tpl-editorial-byline">— Dedicated by {senderName}</p>}
        </div>
      </div>
    </div>
  );
}

// 4. Surprise Party (Interactive celebration reveal card)
export function SurprisePartyTemplate({ data = {} }) {
  const {
    recipientName = 'Lucas',
    senderName = 'The Whole Crew',
    message = 'SURPRISE! Today is all about celebrating the incredible person you are. Grab a slice of cake and let the party begin!',
    photos = ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-surprise-party">
      <div className="tpl-party-popper">🎉 🥳 🎊</div>
      <h1 className="tpl-party-headline">IT'S {recipientName.toUpperCase()}'S BIRTHDAY!</h1>
      
      <div className="tpl-party-box">
        {photos[0] && (
          <img src={photos[0]} alt="Party time" className="tpl-party-img" />
        )}
        <div className="tpl-party-content">
          <p className="tpl-party-text">{message}</p>
          {senderName && <span className="tpl-party-badge">Made with love by {senderName} 🥂</span>}
        </div>
      </div>
    </div>
  );
}

// 5. Minimal Birthday (Clean aesthetic typography & warm accents)
export function MinimalBirthdayTemplate({ data = {} }) {
  const {
    recipientName = 'Elena',
    senderName = 'Oliver',
    message = 'May your day be peaceful, bright, and surrounded by the things and people you love the most.',
    date = 'Today'
  } = data;

  return (
    <div className="tpl-root tpl-minimal-birthday">
      <div className="tpl-minimal-container">
        <span className="tpl-minimal-label">Wishing you joy</span>
        <h1 className="tpl-minimal-name">{recipientName}</h1>
        <div className="tpl-minimal-divider"></div>
        <p className="tpl-minimal-message">{message}</p>
        <div className="tpl-minimal-footer">
          {senderName && <span>— {senderName}</span>}
          {date && <span>• {date}</span>}
        </div>
      </div>
    </div>
  );
}
