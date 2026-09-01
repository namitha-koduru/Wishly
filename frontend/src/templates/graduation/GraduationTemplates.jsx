import React from 'react';

// 1. Class of 2026 (Cap toss banner + honors badge)
export function ClassOf2026Template({ data = {} }) {
  const {
    recipientName = 'Marcus Johnson',
    senderName = 'Mom & Dad',
    message = 'You did it! All those late nights, endless study sessions, and sacrifices have paid off. We are beyond proud of you!',
    degree = 'Bachelor of Science',
    classYear = '2026',
    photos = ['https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-class-grad">
      <div className="tpl-grad-banner">🎓 CLASS OF {classYear} 🎓</div>
      <h1 className="tpl-grad-name">{recipientName}</h1>
      {degree && <p className="tpl-grad-degree">{degree}</p>}

      {photos[0] && (
        <div className="tpl-grad-portrait-box">
          <img src={photos[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-grad-card">
        <p className="tpl-grad-quote">"{message}"</p>
        {senderName && <p className="tpl-grad-sign">— With immense pride, {senderName}</p>}
      </div>
    </div>
  );
}

// 2. The Journey (Step by step academic milestone story)
export function TheJourneyGradTemplate({ data = {} }) {
  const {
    recipientName = 'Chloe',
    senderName = 'Family & Mentors',
    message = 'From your very first lecture to the graduation stage, you proved resilience, passion, and brilliance at every step.'
  } = data;

  return (
    <div className="tpl-root tpl-journey-grad">
      <span className="tpl-step-tag">A MILESTONE ACHIEVED</span>
      <h1 className="tpl-title-bold">Honoring {recipientName}</h1>
      <div className="tpl-milestone-boxes">
        <div className="tpl-box">💡 Curious Beginnings</div>
        <div className="tpl-arrow">→</div>
        <div className="tpl-box">📚 Countless Hours</div>
        <div className="tpl-arrow">→</div>
        <div className="tpl-box-gold">🎓 Graduate!</div>
      </div>
      <div className="tpl-card-soft">
        <p>{message}</p>
        {senderName && <small className="tpl-subtle-author">— {senderName}</small>}
      </div>
    </div>
  );
}

// 3. Achievement (Diploma & Laurel celebration)
export function AchievementGradTemplate({ data = {} }) {
  const {
    recipientName = 'Dr. Emily Vance',
    senderName = 'Colleagues & Friends',
    message = 'Congratulations on achieving this remarkable academic pinnacle! The world is waiting for your brilliant contributions.'
  } = data;

  return (
    <div className="tpl-root tpl-achievement-grad">
      <div className="tpl-laurel-frame">
        <div className="tpl-laurel-icon">🏆</div>
        <span className="tpl-laurel-title">DIPLOMA OF EXCELLENCE</span>
        <h1 className="tpl-laurel-name">{recipientName}</h1>
        <p className="tpl-laurel-msg">{message}</p>
        {senderName && <span className="tpl-seal-badge">Presented by {senderName}</span>}
      </div>
    </div>
  );
}

// 4. Photo Memories (Graduation photo album)
export function PhotoMemoriesGradTemplate({ data = {} }) {
  const {
    recipientName = 'Daniel',
    senderName = 'The Squad',
    message = 'We laughed, we stressed, we studied together, and now we graduate as champions!',
    photos = [
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  return (
    <div className="tpl-root tpl-photo-grad">
      <h1 className="tpl-title-modern">{recipientName}'s Grad Album 📸</h1>
      <p className="tpl-sub-modern">Moments that made history</p>

      <div className="tpl-grad-grid">
        {photos.map((src, i) => (
          <div key={i} className="tpl-grad-photo-card">
            <img src={src} alt="Grad memory" />
          </div>
        ))}
      </div>

      <div className="tpl-wishes-banner">
        <p>"{message}"</p>
        {senderName && <span>— {senderName} 🥂</span>}
      </div>
    </div>
  );
}

// 5. Future Begins (Inspirational horizon & ambition)
export function FutureBeginsTemplate({ data = {} }) {
  const {
    recipientName = 'Jessica',
    senderName = 'Uncle Robert',
    message = 'Your graduation is not the end of a book, but the prologue to an extraordinary adventure. Go chase the stars!'
  } = data;

  return (
    <div className="tpl-root tpl-future-begins">
      <div className="tpl-horizon-card">
        <div className="tpl-compass-icon">🧭 🚀</div>
        <h1 className="tpl-hero-text">The Future Awaits, {recipientName}</h1>
        <p className="tpl-inspirational-body">{message}</p>
        <div className="tpl-horizon-footer">
          {senderName && <span>Best wishes for your journey, <strong>{senderName}</strong></span>}
        </div>
      </div>
    </div>
  );
}
