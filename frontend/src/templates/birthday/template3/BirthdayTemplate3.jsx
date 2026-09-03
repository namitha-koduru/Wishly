import React from 'react';
import './BirthdayTemplate3.css';

export function BirthdayTemplate3({ data = {} }) {
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

export const PhotoStoryTemplate = BirthdayTemplate3;
export default BirthdayTemplate3;
