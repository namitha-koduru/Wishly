import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SparkleIcon, HandDrawnHeart, StampBadge } from '../components/DoodleAccents.jsx';
import valAudio from '../utils/SoundEffects.js';

const ESCAPE_MESSAGES = [
  "Are you sure? 👀",
  "Think again 😭",
  "You really want to do this? 🥺",
  "Nice try 😌",
  "That button seems shy... 🙈",
  "Nope. The universe says yes! ♥"
];

export default function Page3Question({ data, onNext, onPrev }) {
  const [escapeCount, setEscapeCount] = useState(0);
  const [noPos, setNoPos] = useState({ x: 0, y: 0, rot: 0 });
  const [isYesCelebrated, setIsYesCelebrated] = useState(false);
  const [yesHovered, setYesHovered] = useState(false);

  const arenaRef = useRef(null);
  const noBtnRef = useRef(null);
  const celebrationTimerRef = useRef(null);

  const recipientName = data.recipientName || 'Babe';

  // Handle NO button playful escape
  const handleNoEscape = useCallback(() => {
    if (isYesCelebrated) return;

    valAudio.playDodge();
    setEscapeCount((prev) => prev + 1);

    if (arenaRef.current && noBtnRef.current) {
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();

      // Safe bounds inside the arena box
      const maxX = (arenaRect.width - btnRect.width) / 2 - 16;
      const maxY = (arenaRect.height - btnRect.height) / 2 - 16;

      const randomX = (Math.random() * 2 - 1) * Math.max(maxX, 40);
      const randomY = (Math.random() * 2 - 1) * Math.max(maxY, 30);
      const randomRot = (Math.random() * 20 - 10); // -10 to +10 deg

      setNoPos({
        x: Math.round(randomX),
        y: Math.round(randomY),
        rot: Math.round(randomRot)
      });
    } else {
      // Fallback
      setNoPos((prev) => ({
        x: (Math.random() - 0.5) * 140,
        y: (Math.random() - 0.5) * 80,
        rot: (Math.random() - 0.5) * 16
      }));
    }
  }, [isYesCelebrated]);

  // Proximity detection for desktop mouse
  const handleMouseMove = useCallback((e) => {
    if (isYesCelebrated || !noBtnRef.current) return;
    const btnRect = noBtnRef.current.getBoundingClientRect();
    const btnCenterX = btnRect.left + btnRect.width / 2;
    const btnCenterY = btnRect.top + btnRect.height / 2;

    const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

    // If mouse gets closer than 65px to the center of the NO button, dodge!
    if (dist < 65) {
      handleNoEscape();
    }
  }, [isYesCelebrated, handleNoEscape]);

  useEffect(() => {
    return () => {
      if (celebrationTimerRef.current) clearTimeout(celebrationTimerRef.current);
    };
  }, []);

  // Handle YES button click
  const handleYesClick = () => {
    if (isYesCelebrated) return;
    setIsYesCelebrated(true);
    valAudio.playCelebration();

    celebrationTimerRef.current = setTimeout(() => {
      onNext();
    }, 1800);
  };

  // YES button scale factor increases slightly with each NO attempt (up to 1.35x)
  const yesScale = Math.min(1 + escapeCount * 0.06, 1.35);
  const currentMessage = escapeCount > 0
    ? ESCAPE_MESSAGES[Math.min(escapeCount - 1, ESCAPE_MESSAGES.length - 1)]
    : null;

  return (
    <div
      className="val-page val-page-question"
      onMouseMove={handleMouseMove}
    >
      <div className="val-question-card">
        {/* Top Playful Badge */}
        <div className="val-question-badge-wrap">
          <StampBadge text="THE MOST IMPORTANT QUESTION" />
        </div>

        {/* Question Header */}
        <div className="val-question-header">
          <h2 className="val-question-title">
            Do you love me? <span className="val-question-emojis">👀❤️</span>
          </h2>
          <p className="val-question-sub">
            Be totally honest, {recipientName}... (there's only one right answer though)
          </p>
        </div>

        {/* Micro-copy teasing banner */}
        <div className={`val-tease-banner ${currentMessage ? 'show' : ''}`}>
          <span className="val-tease-text">{currentMessage || 'Choose wisely... ✨'}</span>
        </div>

        {/* Interactive Arena for YES and NO buttons */}
        <div className="val-buttons-arena" ref={arenaRef}>
          {/* YES BUTTON */}
          <button
            type="button"
            className={`val-btn-yes ${yesHovered ? 'hovered' : ''} ${isYesCelebrated ? 'celebrating' : ''}`}
            style={{
              transform: `scale(${yesScale})`
            }}
            onMouseEnter={() => {
              setYesHovered(true);
              valAudio.playSparkle();
            }}
            onMouseLeave={() => setYesHovered(false)}
            onClick={handleYesClick}
          >
            <span className="val-btn-yes-glow" />
            <span className="val-btn-yes-content">
              <span>YES</span>
              <span className="val-btn-heart-pulse">❤️</span>
            </span>
            {yesHovered && (
              <span className="val-btn-sparkle-halo">
                <SparkleIcon className="halo-sp1" />
                <SparkleIcon className="halo-sp2" />
              </span>
            )}
          </button>

          {/* NO BUTTON (Dodging Evasive) */}
          <button
            type="button"
            ref={noBtnRef}
            className="val-btn-no"
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px) rotate(${noPos.rot}deg)`
            }}
            onMouseEnter={handleNoEscape}
            onTouchStart={(e) => {
              e.preventDefault();
              handleNoEscape();
            }}
            onClick={(e) => {
              e.preventDefault();
              handleNoEscape();
            }}
            aria-label="No button"
          >
            <span>NO</span>
            <span className="val-btn-no-emoji">🙄</span>
          </button>
        </div>

        {/* Celebration Overlay on YES click */}
        {isYesCelebrated && (
          <div className="val-question-celebration-overlay">
            <div className="val-celebration-box">
              <div className="val-celebration-heart-icon">💖</div>
              <h3 className="val-celebration-title">I KNEW IT. ❤️</h3>
              <p className="val-celebration-desc">
                My heart just did a happy backflip! Hold on, one more thing...
              </p>
              <div className="val-celebration-sparkles">
                <SparkleIcon className="sp-burst-1" />
                <SparkleIcon className="sp-burst-2" />
                <SparkleIcon className="sp-burst-3" />
              </div>
            </div>
          </div>
        )}

        {/* Back navigation */}
        <div className="val-question-nav">
          <button
            type="button"
            className="val-btn-ghost-sm"
            onClick={onPrev}
            disabled={isYesCelebrated}
          >
            ← Back to story
          </button>
        </div>
      </div>
    </div>
  );
}
