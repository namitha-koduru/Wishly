import React from 'react';

// 1. Just For You (Warm hug digital card)
export function JustForYouTemplate({ data = {} }) {
  const {
    recipientName = 'Avery',
    senderName = 'Morgan',
    message = 'No special occasion needed — just wanted to remind you that you are deeply appreciated and loved today!',
    photos = ['https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-just-for-you">
      <div className="tpl-heart-pill">💌 JUST FOR YOU</div>
      <h1 className="tpl-warm-title">A Little Sunshine for {recipientName} ☀️</h1>

      {photos[0] && (
        <div className="tpl-warm-photo">
          <img src={photos[0]} alt="Sunshine" />
        </div>
      )}

      <div className="tpl-warm-card">
        <p className="tpl-warm-msg">"{message}"</p>
        {senderName && <p className="tpl-warm-sign">— Thinking of you, {senderName}</p>}
      </div>
    </div>
  );
}

// 2. A Little Note (Minimalist aesthetic postcard)
export function ALittleNoteTemplate({ data = {} }) {
  const {
    recipientName = 'Taylor',
    senderName = 'Sam',
    message = 'Just a small reminder: you are doing amazing, and having you in my life makes everything brighter.'
  } = data;

  return (
    <div className="tpl-root tpl-a-little-note">
      <div className="tpl-minimal-postcard">
        <div className="tpl-postage-stamp">✨</div>
        <span className="tpl-note-label">A LITTLE NOTE</span>
        <h2 className="tpl-note-for">Hey {recipientName},</h2>
        <p className="tpl-note-body">{message}</p>
        <div className="tpl-note-footer">
          <span>Warmly,</span>
          <strong>{senderName}</strong>
        </div>
      </div>
    </div>
  );
}

// 3. Thinking Of You (Gentle blossom / serene mood)
export function ThinkingOfYouTemplate({ data = {} }) {
  const {
    recipientName = 'Grandma Rose',
    senderName = 'Lucas & Lily',
    message = 'Sending you a warm hug from afar and keeping you in our warmest thoughts today.'
  } = data;

  return (
    <div className="tpl-root tpl-thinking-of-you">
      <div className="tpl-blossom-frame">
        <div className="tpl-tea-icon">🌸 ☕ 🌿</div>
        <h1 className="tpl-serene-title">Thinking of You, {recipientName}</h1>
        <p className="tpl-serene-body">{message}</p>
        {senderName && <div className="tpl-serene-signature">— Sent with all our warmth, <strong>{senderName}</strong></div>}
      </div>
    </div>
  );
}

// 4. You Are Special (Positive affirmation cards)
export function YouAreSpecialTemplate({ data = {} }) {
  const {
    recipientName = 'Zoe',
    senderName = 'Ben',
    message = 'In case nobody told you today: you are talented, valued, and truly one of a kind.',
    affirmations = [
      'Your kindness makes the world better',
      'Your creativity inspires everyone around you',
      'You bring genuine joy wherever you go'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-you-are-special">
      <span className="tpl-special-pill">✨ REMINDER</span>
      <h1 className="tpl-special-heading">{recipientName}, You Are Special!</h1>
      <p className="tpl-special-sub">{message}</p>

      <div className="tpl-affirmation-grid">
        {affirmations.map((text, i) => (
          <div key={i} className="tpl-affirmation-card">
            <span>⭐️</span>
            <p>{text}</p>
          </div>
        ))}
      </div>

      {senderName && <p className="tpl-special-sign">— Proud of you always, {senderName}</p>}
    </div>
  );
}

// 5. From My Heart (Heartfelt gratitude keepsake)
export function FromMyHeartTemplate({ data = {} }) {
  const {
    recipientName = 'Dear Friend',
    senderName = 'Forever Grateful',
    message = 'Thank you for being such an extraordinary presence in my life. You make every day better just by being you.'
  } = data;

  return (
    <div className="tpl-root tpl-from-my-heart">
      <div className="tpl-heartfelt-card">
        <div className="tpl-heart-glow">💖</div>
        <h1 className="tpl-heart-title">From My Heart to Yours</h1>
        <p className="tpl-heart-to">For {recipientName}</p>
        <div className="tpl-heart-line"></div>
        <p className="tpl-heart-body">"{message}"</p>
        {senderName && <div className="tpl-heart-author">— {senderName}</div>}
      </div>
    </div>
  );
}
