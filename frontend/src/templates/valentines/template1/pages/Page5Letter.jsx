import React from 'react';
import { SparkleIcon, HandDrawnHeart, WashiTape, BotanicalFlourish, StampBadge } from '../components/DoodleAccents.jsx';
import valAudio from '../utils/SoundEffects.js';

export default function Page5Letter({ data, onRestart }) {
  const recipientName = data.recipientName || 'My Favorite Person';
  const senderName = data.senderName || 'Yours Always, Daniel';
  const message = data.message || "You are the melody to my thoughts and the warmth in every cold day. Thank you for making every ordinary day feel like an adventure. I love you endlessly, today and for all the tomorrows to come.";
  const date = data.date || "Valentine's Day 2026";
  
  const photos = Array.isArray(data.photos) ? data.photos : [];
  const primaryPhoto = photos.length > 0
    ? (typeof photos[0] === 'string' ? photos[0] : photos[0]?.url)
    : 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80';

  const handleReplay = () => {
    valAudio.playSparkle();
    onRestart();
  };

  return (
    <div className="val-page val-page-letter">
      <div className="val-letter-container">
        {/* Top Header Badge */}
        <div className="val-letter-header-meta">
          <StampBadge text="FOREVER & ALWAYS • SEALED WITH LOVE" />
        </div>

        {/* Parchment Love Letter Sheet */}
        <div className="val-parchment-sheet">
          <WashiTape className="val-parchment-tape" color="#fce2e6" />

          {/* Salutation */}
          <div className="val-parchment-top">
            <span className="val-letter-kicker">For you, with all my heart</span>
            <h2 className="val-letter-salutation">
              Dearest {recipientName},
            </h2>
          </div>

          {/* Letter Body & Optional Keepsake Polaroid */}
          <div className="val-parchment-body">
            <div className="val-letter-text-content">
              {message.split('\n').filter(Boolean).map((paragraph, idx) => (
                <p key={idx} className="val-letter-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            {primaryPhoto && (
              <div className="val-letter-keepsake-polaroid">
                <div className="val-letter-polaroid-frame">
                  <img src={primaryPhoto} alt={recipientName} className="val-letter-polaroid-img" />
                  <span className="val-letter-polaroid-note">Forever Us ❤️</span>
                </div>
              </div>
            )}
          </div>

          {/* Signoff & Date */}
          <div className="val-parchment-footer">
            <div className="val-letter-date-stamp">
              <span className="val-date-label">Date:</span>
              <span className="val-date-value">{date}</span>
            </div>

            <div className="val-letter-signature-block">
              <span className="val-sig-lead">With all my love,</span>
              <h3 className="val-signature-text">{senderName}</h3>
            </div>
          </div>

          {/* Wax seal watermark icon */}
          <div className="val-letter-wax-seal">
            <span className="val-wax-emblem">❤️</span>
          </div>

          <BotanicalFlourish className="val-parchment-flourish" />
        </div>

        {/* Bottom Replay Action */}
        <div className="val-letter-actions">
          <button
            type="button"
            className="val-btn-replay"
            onClick={handleReplay}
          >
            <span className="val-replay-icon">↺</span>
            <span>Experience Our Story Again</span>
          </button>
        </div>
      </div>
    </div>
  );
}
