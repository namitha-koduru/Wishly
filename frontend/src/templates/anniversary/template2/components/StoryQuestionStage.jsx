import React, { useState } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * StoryQuestionStage component
 * Playful, romantic interactive questions with button wiggles,
 * cute flower reactions, speech bubbles, and dramatic card slide transitions.
 */
export function StoryQuestionStage({
  question,
  questionIndex,
  totalQuestions,
  onCorrectAnswer,
  wrongAnswerNotes = []
}) {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [wrongToast, setWrongToast] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSuccessing, setIsSuccessing] = useState(false);

  if (!question) return null;

  const {
    title = `Question #${questionIndex + 1} ♡`,
    question: questionText = 'A cute question for you',
    options = []
  } = question;

  const handleOptionClick = (opt, idx) => {
    setSelectedIdx(idx);

    if (opt.correct) {
      setWrongToast(null);
      setIsSuccessing(true);

      // Dramatic pause with cute animation before transitioning
      setTimeout(() => {
        onCorrectAnswer();
        setSelectedIdx(null);
        setIsSuccessing(false);
      }, 550);
    } else {
      // Wrong / Playful tease option
      setIsShaking(true);
      const fallback = wrongAnswerNotes[questionIndex % wrongAnswerNotes.length] || "ummm… try again 😭";
      setWrongToast(opt.playfulResponse || fallback);

      setTimeout(() => {
        setIsShaking(false);
      }, 600);
    }
  };

  return (
    <div className={`anniv2-stage-wrapper anniv2-question-stage ${isSuccessing ? 'card-success-fly-out' : ''}`}>
      {/* Peeking Flower Characters */}
      <BouquetDecor variant="peeking-flower" className="anniv2-q-peek-tr" />
      <BouquetDecor variant="corner-slide" className="anniv2-q-bouquet-bl" />

      {/* Cute Floating Scrapbook Tape Sticker */}
      <div className="anniv2-cute-floating-sticker sticker-question">
        <span>hehe ♡</span>
      </div>

      {/* Main Playful Question Paper Card */}
      <div className={`anniv2-card-paper anniv2-question-card ${isShaking ? 'shake-wiggle-animation' : 'pop-card-enter'}`}>
        {/* Card Header Tape */}
        <div className="anniv2-washi-tape-strip" />

        {/* Question Counter Tag */}
        <div className="anniv2-cute-tag-pill">
          <span>🌸 {title} ({questionIndex + 1}/{totalQuestions}) 🌸</span>
        </div>

        {/* Main Question Text */}
        <h2 className="anniv2-question-cute-title">
          "{questionText}"
        </h2>

        {/* Options Grid */}
        <div className="anniv2-cute-options-list" role="group" aria-label="Question choices">
          {options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`anniv2-btn-cute-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(opt, idx)}
              >
                <span className="anniv2-option-heart-bullet">♡</span>
                <span className="anniv2-option-text-label">{opt.text}</span>
                <span className="anniv2-option-sparkle-hover">✨</span>
              </button>
            );
          })}
        </div>

        {/* Playful Wrong Answer Flower Toast */}
        {wrongToast && (
          <div className="anniv2-wrong-cute-toast" role="alert">
            <span className="anniv2-wrong-toast-icon">🌸</span>
            <p className="anniv2-wrong-toast-text">{wrongToast}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StoryQuestionStage;
