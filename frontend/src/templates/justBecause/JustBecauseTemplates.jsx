import React from 'react';
import FloatingHeartsEffect from '../shared/FloatingHeartsEffect.jsx';

// 1. Just Because 01 — Just For You (Minimal personal message)
export function JustForYouTemplate({ data = {} }) {
  const {
    recipientName = 'Grandma',
    senderName = 'With all my love, Maya',
    message = 'No special occasion needed. Just wanted to remind you how much sunshine and warmth you bring into my life every day.',
    photos = ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-minimal">
      <span className="just-tag">JUST A LITTLE THOUGHT</span>
      <h1 className="just-title">For {recipientName} 🌸</h1>

      {photoUrls[0] && (
        <div className="just-photo-circle">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="just-note-box">
        <p className="just-text">"{message}"</p>
        {senderName && <span className="just-author">— {senderName}</span>}
      </div>
    </div>
  );
}

// 2. Just Because 02 — A Little Note (Handwritten note style with washi tape)
export function ALittleNoteTemplate({ data = {} }) {
  const {
    recipientName = 'Dear Friend',
    senderName = 'Always cheering for you, Alex',
    message = 'Just a small reminder in the middle of a busy week: you are doing great, your efforts matter, and you are loved.',
    photos = ['https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-note">
      <div className="note-card-paper">
        <div className="note-washi-tape"></div>
        <h2 className="note-salutation">{recipientName},</h2>

        <div className="note-body">
          <p>"{message}"</p>
        </div>

        {photoUrls[0] && (
          <div className="note-photo-tuck">
            <img src={photoUrls[0]} alt={recipientName} />
          </div>
        )}

        <div className="note-signoff">
          <p>{senderName}</p>
        </div>
      </div>
    </div>
  );
}

// 3. Just Because 03 — Thinking Of You (Photo + message)
export function ThinkingOfYouTemplate({ data = {} }) {
  const {
    recipientName = 'Sophie',
    senderName = 'Your Childhood Pal, Leo',
    message = 'Crossed a bakery that smelled like our favorite cinnamon rolls and immediately thought of you! Hope your week is wonderful.',
    photos = [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-thinking">
      <FloatingHeartsEffect count={8} />
      <span className="thinking-tag">💌 THINKING OF YOU</span>
      <h1 className="tpl-title">A Little Hello to {recipientName}</h1>

      <div className="thinking-polaroids-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="thinking-polaroid">
            <img src={url} alt={`Memory ${i + 1}`} />
            <span className="thinking-caption">"Thinking of fond moments"</span>
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

// 4. Just Because 04 — You Are Special (Large emotional typography)
export function YouAreSpecialTemplate({ data = {} }) {
  const {
    recipientName = 'Aiden',
    senderName = 'Someone who cares deeply',
    message = 'Never doubt the gentle, positive difference your presence makes in this world.',
    photos = ['https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80']
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-special">
      <h1 className="special-big-text">You Are Special, {recipientName}.</h1>

      {photoUrls[0] && (
        <div className="special-portrait-frame">
          <img src={photoUrls[0]} alt={recipientName} />
        </div>
      )}

      <div className="special-card-box">
        <p className="special-quote-text">"{message}"</p>
        {senderName && <span className="special-author">— {senderName}</span>}
      </div>
    </div>
  );
}

// 5. Just Because 05 — From My Heart (Letter/scrapbook combination)
export function FromMyHeartTemplate({ data = {} }) {
  const {
    recipientName = 'Kavya',
    senderName = 'With love, Tara',
    message = 'Sometimes you don’t need an excuse to tell someone you are grateful they exist. Thank you for being you.',
    photos = [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80'
    ]
  } = data;

  const photoUrls = photos.map(p => typeof p === 'object' ? p.url : p).filter(Boolean);

  return (
    <div className="tpl-root tpl-just-heart">
      <div className="heart-header">
        <span className="heart-badge">💖 FROM MY HEART</span>
        <h1 className="tpl-title">For {recipientName}</h1>
      </div>

      <div className="heart-scrapbook-grid">
        {photoUrls.map((url, i) => (
          <div key={i} className="heart-photo-item">
            <img src={url} alt={`Memory ${i + 1}`} />
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
