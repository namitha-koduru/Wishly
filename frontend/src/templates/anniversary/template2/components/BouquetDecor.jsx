import React, { useState } from 'react';

/**
 * BouquetDecor component
 * Cute, playful animated vector floral bouquets, peeking flower characters, and ribbon bows.
 */
export function BouquetDecor({ variant = 'corner-slide', className = '', onClick }) {
  const [isWiggling, setIsWiggling] = useState(false);
  const [speechText, setSpeechText] = useState(null);

  const handleCuteClick = (e) => {
    e.stopPropagation();
    setIsWiggling(true);
    const cuteReactions = ['hehe ♡', 'peek! 🌸', 'you are cute 🥹', 'love you! ✨', '🌸 ♡ 🌸'];
    setSpeechText(cuteReactions[Math.floor(Math.random() * cuteReactions.length)]);

    setTimeout(() => {
      setIsWiggling(false);
    }, 800);

    setTimeout(() => {
      setSpeechText(null);
    }, 2000);

    if (onClick) onClick(e);
  };

  if (variant === 'ribbon-bow') {
    return (
      <div className={`anniv2-bow-wrapper ${className}`}>
        <svg viewBox="0 0 110 55" className="anniv2-bow-svg" aria-hidden="true">
          <defs>
            <linearGradient id="cuteBowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2F4" />
              <stop offset="50%" stopColor="#FFCCD5" />
              <stop offset="100%" stopColor="#FFA6B6" />
            </linearGradient>
          </defs>
          {/* Bow left loop */}
          <path d="M55 24 C40 8, 16 12, 24 28 C30 38, 50 29, 55 26 Z" fill="url(#cuteBowGrad)" stroke="#FFA0B2" strokeWidth="1" />
          {/* Bow right loop */}
          <path d="M55 24 C70 8, 94 12, 86 28 C80 38, 60 29, 55 26 Z" fill="url(#cuteBowGrad)" stroke="#FFA0B2" strokeWidth="1" />
          {/* Center Knot */}
          <ellipse cx="55" cy="26" rx="6.5" ry="5.5" fill="#FF8FA3" stroke="#FF758F" strokeWidth="1" />
          {/* Ribbon Tails */}
          <path d="M53 30 C47 40, 36 46, 28 52 C33 50, 42 48, 51 35 Z" fill="url(#cuteBowGrad)" />
          <path d="M57 30 C63 40, 74 46, 82 52 C77 50, 68 48, 59 35 Z" fill="url(#cuteBowGrad)" />
        </svg>
      </div>
    );
  }

  if (variant === 'peeking-flower') {
    return (
      <div
        className={`anniv2-peeking-flower ${isWiggling ? 'wiggling' : ''} ${className}`}
        onClick={handleCuteClick}
        title="Tap me! ♡"
      >
        {speechText && (
          <div className="anniv2-flower-speech-bubble" role="status">
            {speechText}
          </div>
        )}
        <svg viewBox="0 0 90 90" className="anniv2-peeking-svg" aria-hidden="true">
          <defs>
            <linearGradient id="peekBlush" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#FFDDE2" />
              <stop offset="100%" stopColor="#FFA6B6" />
            </linearGradient>
          </defs>
          {/* Cute green stem & leaves */}
          <path d="M45 45 C30 55, 18 68, 22 80 C32 76, 42 62, 45 45 Z" fill="#88B884" />
          <path d="M45 45 C60 55, 72 68, 68 80 C58 76, 48 62, 45 45 Z" fill="#75A671" />
          {/* Cute Rose Bloom */}
          <circle cx="45" cy="38" r="22" fill="url(#peekBlush)" stroke="#FF8FA3" strokeWidth="1.2" />
          <path d="M35 34 C32 24, 58 24, 55 34 C52 42, 38 42, 35 34 Z" fill="#FFCCD5" stroke="#FF758F" strokeWidth="1" />
          <path d="M39 37 C37 30, 53 30, 51 37 C49 42, 41 42, 39 37 Z" fill="#FFA6B6" stroke="#E86E82" strokeWidth="1" />
          <circle cx="45" cy="37" r="4" fill="#D94E66" />
          {/* Cute blushing smile details */}
          <circle cx="36" cy="42" r="3" fill="#FFAEC0" opacity="0.8" />
          <circle cx="54" cy="42" r="3" fill="#FFAEC0" opacity="0.8" />
        </svg>
      </div>
    );
  }

  // Full Bouquet Composition with roses, baby's breath, wrapping paper and ribbon
  return (
    <div
      className={`anniv2-bouquet-box variant-${variant} ${isWiggling ? 'wiggling' : ''} ${className}`}
      onClick={handleCuteClick}
    >
      {speechText && (
        <div className="anniv2-flower-speech-bubble" role="status">
          {speechText}
        </div>
      )}
      <svg
        viewBox="0 0 260 260"
        className="anniv2-bouquet-svg"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="bqBlushGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="45%" stopColor="#FFDDE2" />
            <stop offset="100%" stopColor="#FFA6B6" />
          </linearGradient>

          <linearGradient id="bqWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFF7F8" />
            <stop offset="100%" stopColor="#EFE0E3" />
          </linearGradient>

          <linearGradient id="bqLeaf" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#CBE2C8" />
            <stop offset="60%" stopColor="#96C291" />
            <stop offset="100%" stopColor="#6C9E67" />
          </linearGradient>

          <linearGradient id="bqConeWrap" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF8F9" />
            <stop offset="50%" stopColor="#FFEAF0" />
            <stop offset="100%" stopColor="#FFD4DF" />
          </linearGradient>

          <filter id="cuteShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="2" dy="5" stdDeviation="5" floodColor="#FFA6B6" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Soft Pink Bouquet Paper Wrap */}
        <g filter="url(#cuteShadow)">
          <path
            d="M75 165 L130 245 L185 165 C165 148, 95 148, 75 165 Z"
            fill="url(#bqConeWrap)"
            stroke="#FFA6B6"
            strokeWidth="1.2"
          />
        </g>

        {/* Green Foliage Layer */}
        <g id="foliage">
          <path d="M110 140 C80 110, 45 100, 35 70 C60 65, 88 95, 110 140 Z" fill="url(#bqLeaf)" />
          <path d="M150 140 C180 110, 215 100, 225 70 C200 65, 172 95, 150 140 Z" fill="url(#bqLeaf)" />
          <path d="M130 120 C120 70, 125 30, 130 15 C135 30, 140 70, 130 120 Z" fill="url(#bqLeaf)" />
        </g>

        {/* Baby's Breath White Dots */}
        <g id="fillers">
          <circle cx="50" cy="60" r="3.5" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
          <circle cx="65" cy="50" r="3" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
          <circle cx="210" cy="60" r="3.5" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
          <circle cx="195" cy="50" r="3" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
          <circle cx="120" cy="30" r="3" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
          <circle cx="140" cy="30" r="3" fill="#FFFFFF" stroke="#FFA6B6" strokeWidth="0.8" />
        </g>

        {/* Beautiful Layered Roses */}
        <g id="roses">
          {/* Left White Rose */}
          <g transform="translate(68, 95)">
            <circle cx="20" cy="20" r="22" fill="url(#bqWhiteGrad)" stroke="#FFB8C6" strokeWidth="1" />
            <path d="M10 16 C8 8, 30 8, 28 16 C26 24, 14 24, 10 16 Z" fill="#FFF2F4" stroke="#FFA6B6" strokeWidth="0.8" />
            <circle cx="19" cy="19" r="4" fill="#FFA6B6" />
          </g>

          {/* Right Baby Pink Rose */}
          <g transform="translate(132, 95)">
            <circle cx="20" cy="20" r="22" fill="url(#bqBlushGrad)" stroke="#FF8FA3" strokeWidth="1" />
            <path d="M10 16 C8 8, 30 8, 28 16 C26 24, 14 24, 10 16 Z" fill="#FFE5EA" stroke="#FF758F" strokeWidth="0.8" />
            <circle cx="19" cy="19" r="4" fill="#E86E82" />
          </g>

          {/* Center Large Rose */}
          <g transform="translate(95, 68)">
            <circle cx="35" cy="35" r="32" fill="url(#bqBlushGrad)" stroke="#FF758F" strokeWidth="1.2" />
            <path d="M18 30 C15 14, 52 14, 49 30 C47 46, 22 46, 18 30 Z" fill="#FFE0E6" stroke="#FF8FA3" strokeWidth="1" />
            <path d="M25 34 C22 22, 46 22, 43 34 C41 42, 27 42, 25 34 Z" fill="#FFCCD5" stroke="#FF758F" strokeWidth="1" />
            <circle cx="34" cy="34" r="5.5" fill="#D94E66" />
          </g>
        </g>

        {/* Cute Bow on wrap */}
        <g transform="translate(75, 215)">
          <path d="M55 12 C44 0, 24 4, 32 16 C38 24, 52 16, 55 14 Z" fill="#FFE5EA" stroke="#FF8FA3" strokeWidth="1" />
          <path d="M55 12 C66 0, 86 4, 78 16 C72 24, 58 16, 55 14 Z" fill="#FFE5EA" stroke="#FF8FA3" strokeWidth="1" />
          <circle cx="55" cy="14" r="4.5" fill="#FF758F" />
        </g>
      </svg>
    </div>
  );
}

export default BouquetDecor;
