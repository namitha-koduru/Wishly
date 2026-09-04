import React, { useState, useEffect, useRef } from 'react';
import { SparkleIcon, HandDrawnHeart, BotanicalFlourish, StampBadge } from '../components/DoodleAccents.jsx';
import valAudio from '../utils/SoundEffects.js';

export default function Page4Proposal({ data, onNext, onPrev }) {
  const [stage, setStage] = useState(1); // 1 = "So... one more question", 2 = Proposal revealed, 3 = Accepted celebration
  const timerRef = useRef(null);

  const recipientName = data.recipientName || 'My Valentine';
  const proposalHeadline = data.proposalHeadline || "Will you be my Valentine? ❤️";
  const proposalSubtext = data.proposalSubtext || "Today, tomorrow, and all the little moments in between.";

  useEffect(() => {
    // Reveal stage 2 after a gentle suspense pause
    timerRef.current = setTimeout(() => {
      setStage(2);
      valAudio.playSparkle();
    }, 1200);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleAcceptProposal = () => {
    if (stage === 3) return;
    setStage(3);
    valAudio.playCelebration();

    setTimeout(() => {
      onNext();
    }, 2000);
  };

  return (
    <div className="val-page val-page-proposal">
      <div className="val-proposal-wrapper">
        {/* Subtle pulsing background glow */}
        <div className="val-proposal-glow-orb" />

        <div className="val-proposal-card">
          <StampBadge text="A SPECIAL INVITATION" />

          {/* Glowing Romantic Heart Icon */}
          <div className="val-proposal-heart-beacon">
            <HandDrawnHeart className="val-heart-svg-beacon" />
            <span className="val-beacon-pulse" />
          </div>

          {/* STAGE 1: Teaser Whisper */}
          <div className={`val-proposal-step-1 ${stage >= 1 ? 'visible' : ''}`}>
            <span className="val-whisper-lead">So, {recipientName}...</span>
            <h3 className="val-whisper-heading">One more question.</h3>
          </div>

          {/* STAGE 2: Big Reveal */}
          <div className={`val-proposal-step-2 ${stage >= 2 ? 'visible-reveal' : ''}`}>
            <h2 className="val-proposal-main-title">
              {proposalHeadline}
            </h2>
            <p className="val-proposal-poetic-sub">
              "{proposalSubtext}"
            </p>

            <div className="val-proposal-actions">
              <button
                type="button"
                className={`val-btn-proposal-accept ${stage === 3 ? 'accepted' : ''}`}
                onClick={handleAcceptProposal}
              >
                <span className="val-proposal-btn-glow" />
                <span className="val-proposal-btn-text">YES, ALWAYS ❤️</span>
                <SparkleIcon className="val-proposal-btn-sparkle" />
              </button>
            </div>
          </div>

          {/* STAGE 3: Celebration confirmation */}
          {stage === 3 && (
            <div className="val-proposal-confirmed-banner">
              <div className="val-confirmed-badge">
                <span className="val-confirmed-icon">✨</span>
                <h4>Then it’s a date. ❤️</h4>
                <p>Opening our little keepsake...</p>
              </div>
            </div>
          )}

          <BotanicalFlourish className="val-proposal-botanical" />
        </div>

        {/* Back navigation */}
        <div className="val-proposal-nav">
          <button
            type="button"
            className="val-btn-ghost-sm"
            onClick={onPrev}
            disabled={stage === 3}
          >
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
