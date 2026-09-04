import React, { useState, useEffect } from 'react';
import Page1Intro from './pages/Page1Intro.jsx';
import Page2Story from './pages/Page2Story.jsx';
import Page3Question from './pages/Page3Question.jsx';
import Page4Proposal from './pages/Page4Proposal.jsx';
import Page5Letter from './pages/Page5Letter.jsx';
import valAudio from './utils/SoundEffects.js';
import './ValentinesTemplate1.css';

const STORY_CHAPTERS = [
  { id: 'intro', title: 'The Beginning', label: '01' },
  { id: 'story', title: 'Our Story', label: '02' },
  { id: 'question', title: 'The Question', label: '03' },
  { id: 'proposal', title: 'The Proposal', label: '04' },
  { id: 'letter', title: 'Forever & Always', label: '05' }
];

export function ValentinesTemplate1({ data = {} }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [celebrationActive, setCelebrationActive] = useState(false);

  // Normalize incoming Wishly customization data
  const normalizedData = {
    recipientName: data.recipientName || 'My Valentine',
    senderName: data.senderName || 'Yours Always',
    message: data.message || "You make every normal moment feel magical. You have my whole heart today, tomorrow, and for all the days to come.",
    photos: Array.isArray(data.photos) ? data.photos : (data.photos ? [data.photos] : []),
    photoObjects: Array.isArray(data.photoObjects) ? data.photoObjects : [],
    date: data.date || "Valentine's Day",
    timeline: data.timeline || data.milestones || [],
    proposalHeadline: data.proposalHeadline || "Will you be my Valentine? ❤️",
    proposalSubtext: data.proposalSubtext || "Today, tomorrow, and all the little moments in between.",
    ...(data.customData || {})
  };

  const toggleSound = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    valAudio.muted = nextMute;
    if (!nextMute) {
      valAudio.playPop();
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, STORY_CHAPTERS.length - 1));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleRestart = () => {
    setCurrentPage(0);
  };

  // Keyboard navigation for previewing ease
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        setCurrentPage((prev) => Math.min(prev + 1, STORY_CHAPTERS.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="val-template-root">
      {/* Subtle Background Organic Gradients & Paper Noise */}
      <div className="val-bg-canvas" aria-hidden="true">
        <div className="val-glow-blob blob-1" />
        <div className="val-glow-blob blob-2" />
        <div className="val-glow-blob blob-3" />
        <div className="val-paper-texture-overlay" />
      </div>

      {/* Floating Gentle Heart/Sparkle Particles */}
      <div className="val-ambient-particles" aria-hidden="true">
        <span className="val-particle p1">♡</span>
        <span className="val-particle p2">✦</span>
        <span className="val-particle p3">♡</span>
        <span className="val-particle p4">✨</span>
        <span className="val-particle p5">♡</span>
      </div>

      {/* Top Experience Header Bar */}
      <header className="val-top-bar">
        {/* Story Progress Pills */}
        <nav className="val-chapter-nav" aria-label="Love story progress">
          {STORY_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              type="button"
              className={`val-chapter-pill ${idx === currentPage ? 'active' : ''} ${idx < currentPage ? 'completed' : ''}`}
              onClick={() => {
                valAudio.playPop();
                setCurrentPage(idx);
              }}
              title={ch.title}
              aria-label={`Go to ${ch.title}`}
            >
              <span className="val-pill-dot" />
              <span className="val-pill-title">{ch.title}</span>
            </button>
          ))}
        </nav>

        {/* Audio Mute/Unmute toggle button */}
        <div className="val-controls">
          <button
            type="button"
            className="val-sound-toggle-btn"
            onClick={toggleSound}
            aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            title={isMuted ? 'Enable sound effects' : 'Mute sound effects'}
          >
            {isMuted ? '🔇' : '🔔'}
          </button>
        </div>
      </header>

      {/* Main Dynamic Stage with Smooth Transitioning */}
      <main className="val-stage">
        {currentPage === 0 && (
          <Page1Intro
            data={normalizedData}
            onNext={handleNextPage}
          />
        )}
        {currentPage === 1 && (
          <Page2Story
            data={normalizedData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {currentPage === 2 && (
          <Page3Question
            data={normalizedData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {currentPage === 3 && (
          <Page4Proposal
            data={normalizedData}
            onNext={handleNextPage}
            onPrev={handlePrevPage}
          />
        )}
        {currentPage === 4 && (
          <Page5Letter
            data={normalizedData}
            onRestart={handleRestart}
          />
        )}
      </main>
    </div>
  );
}

export const LoveLetterValTemplate = ValentinesTemplate1;
export default ValentinesTemplate1;
