import React, { useState } from 'react';
import BouquetDecor from './BouquetDecor.jsx';

/**
 * QuestionStage component (Section 3: "CUTE INTERACTION")
 * "One important question… Would you choose me again?"
 * Bouncy buttons, playful wrong answer wobble & "Good answer. 😌♡" burst.
 */
export function QuestionStage({ data = {}, onCorrect }) {
  const questionData = data.question || {
    title: "One important question…",
    prompt: "Would you choose me again?",
    options: [
      { text: "Obviously ♡", correct: true },
      { text: "Every single time.", correct: true },
      { text: "Let me think about it... 🤭", correct: false, playfulResponse: "Ummm… excuse me? 😭 Try again ♡" }
    ],
    goodAnswer: "Good answer. 😌♡"
  };

  const [selectedIdx, setSelectedIdx] = useState(null);
  const [wrongToast, setWrongToast] = useState(null);
  const [isWobbling, setIsWobbling] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleOptionClick = (opt, idx) => {
    setSelectedIdx(idx);

    if (opt.correct) {
      setWrongToast(null);
      setIsSuccess(true);

      setTimeout(() => {
        onCorrect();
        setSelectedIdx(null);
        setIsSuccess(false);
      }, 700);
    } else {
      setIsWobbling(true);
      setWrongToast(opt.playfulResponse || "Ummm… excuse me? 😭 Try again ♡");

      setTimeout(() => {
        setIsWobbling(false);
      }, 600);
    }
  };

  return (
    <div className={`petals-stage-wrapper petals-question-stage ${isSuccess ? 'petals-screen-burst-out' : ''}`}>
      {/* Peeking Flower & Bouquet */}
      <BouquetDecor variant="peeking-flower" className="petals-q-peek-tr" />
      <BouquetDecor variant="corner-slide" className="petals-q-bq-bl" />

      {/* Main Question Card */}
      <div className={`petals-card-paper petals-question-card ${isWobbling ? 'shake-wiggle-animation' : 'pop-bounce-in'}`}>
        <div className="petals-tag-pill">
          <span>🌸 Chapter 03 🌸</span>
        </div>

        <h3 className="petals-q-subtitle">
          {questionData.title}
        </h3>

        <h2 className="petals-q-prompt">
          "{questionData.prompt}"
        </h2>

        {/* Options List */}
        <div className="petals-options-list" role="group" aria-label="Question choices">
          {questionData.options.map((opt, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                className={`petals-btn-option ${isSelected ? 'selected' : ''}`}
                onClick={() => handleOptionClick(opt, idx)}
              >
                <span className="petals-option-heart">♡</span>
                <span className="petals-option-text">{opt.text}</span>
                <span className="petals-option-sparkle">✨</span>
              </button>
            );
          })}
        </div>

        {/* Playful Wrong Answer Toast */}
        {wrongToast && (
          <div className="petals-wrong-toast pop-bounce-in" role="alert">
            <span className="petals-toast-flower">🌸</span>
            <p className="petals-toast-msg">{wrongToast}</p>
          </div>
        )}

        {/* Success Feedback */}
        {isSuccess && (
          <div className="petals-success-toast pop-bounce-in" role="status">
            <span className="petals-toast-flower">💖</span>
            <p className="petals-toast-msg">{questionData.goodAnswer}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionStage;
