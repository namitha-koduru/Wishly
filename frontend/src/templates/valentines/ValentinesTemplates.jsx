import React from 'react';

// 1. Love Letter (Romantic wax seal & calligraphy vibe)
export function LoveLetterValTemplate({ data = {} }) {
  const {
    recipientName = 'My Valentine',
    senderName = 'Yours Always',
    message = 'You make every normal moment feel magical. You have my whole heart today, tomorrow, and for all the days to come.',
    date = "Valentine's Day"
  } = data;

  return (
    <div className="tpl-root tpl-val-letter">
      <div className="tpl-val-envelope">
        <div className="tpl-val-heart-seal">💖</div>
        <span className="tpl-val-kicker">{date}</span>
        <h1 className="tpl-val-salutation">My Dearest {recipientName},</h1>
        <p className="tpl-val-body">{message}</p>
        <div className="tpl-val-signoff">
          <p>With all my love,</p>
          <p className="tpl-val-author">{senderName}</p>
        </div>
      </div>
    </div>
  );
}

// 2. Our Moments (Polaroid memories & floating hearts)
export function OurMomentsValTemplate({ data = {} }) {
  const {
    recipientName = 'Sweetheart',
    senderName = 'Me',
    message = 'Every memory we create together is my favorite treasure.',
    photos = [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-val-moments">
      <h1 className="tpl-val-title">Moments With You, {recipientName} 💕</h1>
      <div className="tpl-val-polaroids">
        {photos.map((src, i) => (
          <div key={i} className="tpl-val-polaroid-item">
            <img src={src} alt="Valentine Memory" />
            <span>Forever Us ✨</span>
          </div>
        ))}
      </div>
      <div className="tpl-val-caption-box">
        <p>"{message}"</p>
        {senderName && <small>— {senderName}</small>}
      </div>
    </div>
  );
}

// 3. Forever (Constellation & infinite romance vibe)
export function ForeverValTemplate({ data = {} }) {
  const {
    recipientName = 'Aria',
    senderName = 'Leo',
    message = 'In a universe of billions of stars, meeting and loving you is the greatest wonder of my life.'
  } = data;

  return (
    <div className="tpl-root tpl-val-forever">
      <div className="tpl-cosmic-card">
        <div className="tpl-star-cluster">✨ ✨ ✨</div>
        <span className="tpl-cosmic-label">INFINITE LOVE</span>
        <h1 className="tpl-cosmic-title">{recipientName}</h1>
        <p className="tpl-cosmic-quote">{message}</p>
        {senderName && <span className="tpl-cosmic-tag">— {senderName} 🌌</span>}
      </div>
    </div>
  );
}

// 4. Reasons I Love You (Numbered list cards)
export function ReasonsILoveYouTemplate({ data = {} }) {
  const {
    recipientName = 'Bella',
    senderName = 'Noah',
    message = 'Here are just a few reasons why you are the love of my life...',
    reasons = [
      'Your radiant smile that lights up any room',
      'The kindness and compassion you show everyone',
      'How you make me laugh until my stomach hurts',
      'The warmth and comfort in every single hug'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-val-reasons">
      <span className="tpl-reasons-badge">REASONS WHY I LOVE YOU ❤️</span>
      <h1 className="tpl-reasons-title">For {recipientName}</h1>
      <p className="tpl-reasons-intro">{message}</p>

      <div className="tpl-reasons-list">
        {reasons.map((reason, idx) => (
          <div key={idx} className="tpl-reason-item">
            <span className="tpl-reason-num">#{idx + 1}</span>
            <p>{reason}</p>
          </div>
        ))}
      </div>

      {senderName && <div className="tpl-reasons-footer">Forever yours, <strong>{senderName}</strong></div>}
    </div>
  );
}

// 5. Our Story (Romantic timeline & vows)
export function OurStoryValTemplate({ data = {} }) {
  const {
    recipientName = 'My One & Only',
    senderName = 'Always',
    message = 'From day one, you have been my dream come true. Happy Valentine’s Day, my love.'
  } = data;

  return (
    <div className="tpl-root tpl-val-story">
      <div className="tpl-val-card-romantic">
        <div className="tpl-heart-badge">💌 VALENTINE'S</div>
        <h1 className="tpl-val-head">{recipientName}</h1>
        <div className="tpl-val-divider"></div>
        <p className="tpl-val-text">{message}</p>
        {senderName && <p className="tpl-val-sign">— {senderName}</p>}
      </div>
    </div>
  );
}
