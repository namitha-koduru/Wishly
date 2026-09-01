import React from 'react';

// 1. You Did It (Gold medal & confetti banner)
export function YouDidItTemplate({ data = {} }) {
  const {
    recipientName = 'Jordan Smith',
    senderName = 'Friends & Family',
    message = 'Huge congratulations on this tremendous milestone! Your perseverance and talent shine so bright.',
    achievement = 'Promotion & New Leadership Role'
  } = data;

  return (
    <div className="tpl-root tpl-congrat-you-did-it">
      <div className="tpl-trophy-badge">🏆 YOU DID IT! 🏆</div>
      <h1 className="tpl-congrat-title">Congratulations, {recipientName}!</h1>
      {achievement && <p className="tpl-achievement-banner">🎯 {achievement}</p>}

      <div className="tpl-congrat-card">
        <p className="tpl-congrat-msg">"{message}"</p>
        {senderName && <p className="tpl-congrat-from">— Cheering for you always, {senderName}</p>}
      </div>
    </div>
  );
}

// 2. Achievement Celebration (Accolades & stat counter vibe)
export function AchievementCelebrationTemplate({ data = {} }) {
  const {
    recipientName = 'Samantha Ray',
    senderName = 'The Whole Team',
    message = 'Here is to all your hard work coming to fruition. You earned every bit of this victory!',
    photos = ['https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-achievement-celeb">
      <div className="tpl-celeb-sparkles">✨ 🌟 ✨</div>
      <h1 className="tpl-celeb-title">Celebrating {recipientName}</h1>

      {photos[0] && (
        <div className="tpl-celeb-photo">
          <img src={photos[0]} alt="Celebration" />
        </div>
      )}

      <div className="tpl-celeb-box">
        <p>{message}</p>
        {senderName && <span className="tpl-celeb-author">Presented with pride by <strong>{senderName}</strong></span>}
      </div>
    </div>
  );
}

// 3. Proud Moment (Tribute & accolade certificate style)
export function ProudMomentTemplate({ data = {} }) {
  const {
    recipientName = 'Liam',
    senderName = 'Proud Parents',
    message = 'Seeing how far you have come and the determination you carry fills our hearts with endless pride.'
  } = data;

  return (
    <div className="tpl-root tpl-proud-moment">
      <div className="tpl-tribute-frame">
        <span className="tpl-tribute-label">SO PROUD OF YOU</span>
        <h1 className="tpl-tribute-name">{recipientName}</h1>
        <div className="tpl-tribute-line"></div>
        <p className="tpl-tribute-msg">{message}</p>
        {senderName && <p className="tpl-tribute-sign">— With love & pride, {senderName}</p>}
      </div>
    </div>
  );
}

// 4. Success Story (Modern clean milestone layout)
export function SuccessStoryTemplate({ data = {} }) {
  const {
    recipientName = 'Maya Lin',
    senderName = 'Mentors & Peers',
    message = 'Success is the sum of small efforts repeated daily. You made it happen through sheer grit and dedication!'
  } = data;

  return (
    <div className="tpl-root tpl-success-story">
      <div className="tpl-story-badge">SUCCESS HIGHLIGHT 🚀</div>
      <h1 className="tpl-success-heading">Bravo, {recipientName}!</h1>
      <div className="tpl-success-content">
        <p>"{message}"</p>
        {senderName && <small>From: {senderName}</small>}
      </div>
    </div>
  );
}

// 5. Celebrate (Vibrant cheer party style)
export function CelebrateCheerTemplate({ data = {} }) {
  const {
    recipientName = 'Ethan',
    senderName = 'Everyone',
    message = 'Raise a glass and let the celebrations begin! Here is to new heights and even greater victories ahead.'
  } = data;

  return (
    <div className="tpl-root tpl-celebrate-cheer">
      <div className="tpl-party-banner">🥂 TIME TO CELEBRATE 🥂</div>
      <h1 className="tpl-party-name">Cheers to {recipientName}!</h1>
      <div className="tpl-party-card">
        <p>{message}</p>
        {senderName && <div className="tpl-party-tag">From: {senderName} 🎉</div>}
      </div>
    </div>
  );
}
