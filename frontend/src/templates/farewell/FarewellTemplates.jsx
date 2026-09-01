import React from 'react';

// 1. Goodbye Memories (Warm keepsake style)
export function GoodbyeMemoriesTemplate({ data = {} }) {
  const {
    recipientName = 'Samantha',
    senderName = 'Your Friends',
    message = 'Saying goodbye is never easy, but we are so excited for your next great chapter. Thank you for all the laughter and memories!',
    photos = ['https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80']
  } = data;

  return (
    <div className="tpl-root tpl-farewell-memories">
      <div className="tpl-farewell-tag">👋 A FOND FAREWELL</div>
      <h1 className="tpl-farewell-title">We Will Miss You, {recipientName}!</h1>

      {photos[0] && (
        <div className="tpl-farewell-photo-frame">
          <img src={photos[0]} alt={recipientName} />
        </div>
      )}

      <div className="tpl-farewell-card">
        <p className="tpl-farewell-text">"{message}"</p>
        {senderName && <p className="tpl-farewell-sign">— {senderName} ❤️</p>}
      </div>
    </div>
  );
}

// 2. Memory Wall (Sticky notes & sticky messages)
export function MemoryWallTemplate({ data = {} }) {
  const {
    recipientName = 'David',
    senderName = 'The Whole Office',
    message = 'You left footprints of kindness everywhere. Keep in touch!',
    notes = [
      { author: 'Lisa', text: 'Thank you for always helping me out! 🌟' },
      { author: 'Tom', text: 'Best coffee break buddy ever! ☕' },
      { author: 'Rachel', text: 'Good luck with the new adventure! 🚀' }
    ]
  } = data;

  return (
    <div className="tpl-root tpl-memory-wall">
      <h1 className="tpl-wall-title">{recipientName}'s Memory Wall 📌</h1>
      <p className="tpl-wall-sub">Warm wishes from everyone</p>

      <div className="tpl-sticky-grid">
        {notes.map((note, idx) => (
          <div key={idx} className={`tpl-sticky-note tpl-sticky-color-${(idx % 3) + 1}`}>
            <p className="tpl-sticky-text">"{note.text}"</p>
            <span className="tpl-sticky-author">— {note.author}</span>
          </div>
        ))}
      </div>

      <div className="tpl-wall-footer-note">
        <p>{message}</p>
        {senderName && <small>From: {senderName}</small>}
      </div>
    </div>
  );
}

// 3. Until We Meet Again (Distance & wanderlust farewell)
export function UntilWeMeetAgainTemplate({ data = {} }) {
  const {
    recipientName = 'Hannah',
    senderName = 'Your Best Friends',
    message = 'Distance means so little when people mean so much. No matter where life takes you, you will always have a home here.'
  } = data;

  return (
    <div className="tpl-root tpl-until-we-meet">
      <div className="tpl-globe-frame">
        <div className="tpl-globe-icon">✈️ 🌍 💫</div>
        <h1 className="tpl-globe-heading">Until We Meet Again, {recipientName}</h1>
        <p className="tpl-globe-msg">{message}</p>
        {senderName && <div className="tpl-globe-sign">Safe travels and endless love,<br /><strong>{senderName}</strong></div>}
      </div>
    </div>
  );
}

// 4. Team Memories (Professional & warm team send-off)
export function TeamMemoriesTemplate({ data = {} }) {
  const {
    recipientName = 'Alex Mercer',
    senderName = 'The Engineering Team',
    message = 'Your brilliance, patience, and humor made every sprint a pleasure. Wishing you huge success in your next venture!',
    teamName = 'Product & Tech Crew'
  } = data;

  return (
    <div className="tpl-root tpl-team-farewell">
      <div className="tpl-team-badge">{teamName}</div>
      <h1 className="tpl-team-title">Thank You, {recipientName}!</h1>
      <div className="tpl-team-box">
        <p className="tpl-team-quote">"{message}"</p>
        <div className="tpl-team-signatures">
          <span>Signed with gratitude by <strong>{senderName}</strong></span>
        </div>
      </div>
    </div>
  );
}

// 5. Goodbye Letter (Warm nostalgic letter)
export function GoodbyeLetterTemplate({ data = {} }) {
  const {
    recipientName = 'Dear Friend',
    senderName = 'Your Crew',
    message = 'As one journey concludes, another begins. Thank you for making our days brighter with your kindness and positivity.'
  } = data;

  return (
    <div className="tpl-root tpl-goodbye-letter">
      <div className="tpl-envelope-card">
        <div className="tpl-stamp-corner">💌 FAREWELL</div>
        <h2 className="tpl-letter-to">To {recipientName},</h2>
        <p className="tpl-letter-main">{message}</p>
        <div className="tpl-letter-from">
          <span>Best wishes always,</span>
          <strong>{senderName}</strong>
        </div>
      </div>
    </div>
  );
}
