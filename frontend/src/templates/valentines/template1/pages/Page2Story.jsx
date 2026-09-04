import React, { useState } from 'react';
import { SparkleIcon, HandDrawnHeart, WashiTape, StampBadge, DoodleArrow } from '../components/DoodleAccents.jsx';
import valAudio from '../utils/SoundEffects.js';

export default function Page2Story({ data, onNext, onPrev }) {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const recipientName = data.recipientName || 'My Love';
  const photos = Array.isArray(data.photos) ? data.photos : [];
  const photoObjects = Array.isArray(data.photoObjects) ? data.photoObjects : [];

  // Get photo URLs and captions
  const photoItems = photos.map((p, idx) => {
    if (typeof p === 'string') {
      const obj = photoObjects[idx] || {};
      return { url: p, caption: obj.caption || (idx === 0 ? "Our favorite smile" : "Unforgettable moments") };
    }
    return { url: p.url, caption: p.caption || "A sweet memory" };
  }).filter(item => Boolean(item.url));

  // Fallback if no photos provided
  const displayPhotos = photoItems.length > 0 ? photoItems : [
    {
      url: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
      caption: 'The day my world became brighter'
    },
    {
      url: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
      caption: 'Little moments that mean everything'
    }
  ];

  // Story milestones or dates
  const defaultMilestones = [
    { date: 'Day One', title: 'The Spark', desc: 'When you smiled, and everything changed.' },
    { date: 'All Along', title: 'The Laughter', desc: 'From silly inside jokes to comfortable silences.' },
    { date: 'Right Now', title: 'Every Day', desc: 'Falling for you a little more with every heartbeat.' }
  ];

  const milestones = Array.isArray(data.timeline) && data.timeline.length > 0
    ? data.timeline
    : (Array.isArray(data.milestones) && data.milestones.length > 0 ? data.milestones : defaultMilestones);

  const handleNext = () => {
    valAudio.playPop();
    onNext();
  };

  return (
    <div className="val-page val-page-story">
      <div className="val-story-container">
        {/* Header story badge & title */}
        <div className="val-story-header">
          <StampBadge text="CHAPTER 01 • OUR JOURNEY" />
          <h2 className="val-story-heading">
            It all started with <span className="val-highlight-script">{recipientName}</span>
          </h2>
          <p className="val-story-sub">
            Every chapter with you is my favorite one yet.
          </p>
        </div>

        <div className="val-story-grid">
          {/* LEFT: Polaroid Stack Showcase */}
          <div className="val-polaroid-showcase">
            <div className="val-polaroid-frame-wrapper">
              <WashiTape className="val-tape-top-left" color="#fcd5dc" />
              <div className="val-polaroid-card">
                <div className="val-polaroid-img-box">
                  <img
                    src={displayPhotos[activePhotoIdx]?.url}
                    alt={recipientName}
                    className="val-polaroid-img"
                    loading="lazy"
                  />
                  <div className="val-polaroid-glare" />
                </div>
                <p className="val-polaroid-caption">
                  {displayPhotos[activePhotoIdx]?.caption || 'Together, always ❤️'}
                </p>
                <div className="val-polaroid-pin">
                  <HandDrawnHeart className="val-pin-heart" />
                </div>
              </div>
            </div>

            {/* Thumbnail selector if multiple photos */}
            {displayPhotos.length > 1 && (
              <div className="val-polaroid-thumbs">
                {displayPhotos.map((photo, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`val-thumb-btn ${i === activePhotoIdx ? 'active' : ''}`}
                    onClick={() => {
                      valAudio.playPop();
                      setActivePhotoIdx(i);
                    }}
                    title={`View photo ${i + 1}`}
                  >
                    <img src={photo.url} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Visual Story Milestones & Note */}
          <div className="val-story-narrative">
            <div className="val-milestone-list">
              {milestones.map((m, idx) => (
                <div key={idx} className="val-milestone-item">
                  <div className="val-milestone-bullet">
                    <span className="val-bullet-dot" />
                    {idx < milestones.length - 1 && <span className="val-bullet-line" />}
                  </div>
                  <div className="val-milestone-content">
                    <span className="val-milestone-date">{m.date || `Moment ${idx + 1}`}</span>
                    <h4 className="val-milestone-title">{m.title || 'Special Memory'}</h4>
                    <p className="val-milestone-desc">{m.description || m.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Handwritten thought */}
            <div className="val-handwritten-note">
              <span className="val-note-tape" />
              <p className="val-note-text">
                "Out of 8 billion people, it’s you. Always was, always will be."
              </p>
              <DoodleArrow className="val-note-arrow" />
            </div>
          </div>
        </div>

        {/* Footer Navigation to the Question */}
        <div className="val-story-footer">
          <button
            type="button"
            className="val-btn-ghost"
            onClick={onPrev}
          >
            ← Back
          </button>

          <button
            type="button"
            className="val-btn-primary val-btn-tease"
            onClick={handleNext}
          >
            <span>There's something I need to ask you... 👀</span>
            <span className="val-btn-arrow">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}
