import React from 'react';
import ConfettiEffect from '../shared/ConfettiEffect.jsx';

// 1. Congratulations 01 — You Did It (Large celebration hero, trophy badge)
export function YouDidItTemplate({ data = {} }) {
  const {
    recipientName = 'Rahul Sharma',
    senderName = 'Mom & Dad',
    message = 'Huge congratulations on this tremendous milestone! Your persistence and dedication inspire everyone around you.',
    photos = ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'],
    achievement = 'Senior Promotion'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-youdidit">
      <ConfettiEffect count={16} />
      <span className="congrat-trophy">🏆</span>
      <h1 className="congrat-bold-title">YOU DID IT!</h1>
      <h2 className="congrat-name">{recipientName}</h2>
      {achievement && <span className="congrat-badge-pill">{achievement}</span>}

      {photoUrls[0] && (
        <div className="congrat-hero-photo-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">Proudly celebrating you,<br /><strong>{senderName}</strong></p>}
      </div>
    </div>
  );
}

// 2. Congratulations 02 — Achievement (Achievement-focused layout with metrics)
export function AchievementCelebrationTemplate({ data = {} }) {
  const {
    recipientName = 'Samantha Miller',
    senderName = 'The Leadership Team',
    message = 'Hard work pays off, and your achievements speak louder than words. We could not be prouder of your stellar accomplishment.',
    photos = ['https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'],
    achievement = 'Marathon Finisher'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-achievement">
      <span className="congrat-tag">OUTSTANDING FEAT</span>
      <h1 className="tpl-title">Congratulations, {recipientName}!</h1>
      {achievement && <p className="achievement-title-sub">🌟 {achievement}</p>}

      {photoUrls[0] && (
        <div className="achievement-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="achievement-card-box">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

// 3. Congratulations 03 — Proud Moment (Emotional message-focused design)
export function ProudMomentTemplate({ data = {} }) {
  const {
    recipientName = 'Devon',
    senderName = 'Aunt Carol & Uncle John',
    message = 'We always knew you had greatness in you. Seeing you achieve this brings immense tears of joy to our eyes.',
    photos = ['https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-proud">
      <div className="proud-star-crest">⭐</div>
      <h1 className="proud-name">So Proud of You, {recipientName}!</h1>

      {photoUrls[0] && (
        <div className="proud-photo-wrap">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="proud-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <span className="proud-author">— {senderName}</span>}
      </div>
    </div>
  );
}

// 4. Congratulations 04 — Celebration (Energetic visual experience)
export function CelebrateCheerTemplate({ data = {} }) {
  const {
    recipientName = 'Tanya Green',
    senderName = 'Your Cheerleaders',
    message = 'Pop the champagne and throw the confetti! Today is all about celebrating your victory.',
    photos = ['https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-cheer">
      <ConfettiEffect count={18} />
      <span className="cheer-badge">🎉 TIME TO CELEBRATE</span>
      <h1 className="tpl-title">Cheers to {recipientName}! 🥂</h1>

      {photoUrls[0] && (
        <div className="cheer-photo-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-message-card">
        <p className="tpl-message-text">"{message}"</p>
        {senderName && <p className="tpl-signature">— {senderName}</p>}
      </div>
    </div>
  );
}

// 5. Congratulations 05 — Success Story (Storytelling layout)
export function SuccessStoryTemplate({ data = {} }) {
  const {
    recipientName = 'Zack Taylor',
    senderName = 'With utmost admiration, The Board',
    message = 'Success is where preparation meets opportunity. Here is to the milestone you have built with grit and vision.',
    photos = [
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
    ],
    achievement = 'First Big Milestone'
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-congrat-story">
      <div className="story-header">
        <span className="story-tag">A SUCCESS STORY</span>
        <h1 className="tpl-title">The Rise of {recipientName}</h1>
        {achievement && <p className="story-sub">{achievement}</p>}
      </div>

      <div className="story-photos-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="story-card-item">
            <img src={url} alt={`Success Chapter ${i + 1}`} />
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
