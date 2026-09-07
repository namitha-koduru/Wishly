import { useState } from "react";
import WrongAnswer from "./WrongAnswer";
import { WRONG_ANSWER_LINES, CHARACTERS } from "../data/config";

const OPTION_LABELS = ["A", "B", "C", "D"];

export default function Question({
  question,
  index,
  total,
  onCorrect,
  wrongLines = WRONG_ANSWER_LINES,
  characters = CHARACTERS,
}) {
  const [selectedId, setSelectedId] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | correct | wrong
  const [shakeKey, setShakeKey] = useState(0);
  const [wrongLine, setWrongLine] = useState("");

  const handleAnswer = (answerId) => {
    if (status === "correct") return;

    setSelectedId(answerId);

    if (answerId === question.correctAnswerId) {
      setStatus("correct");
      window.setTimeout(() => {
        onCorrect();
      }, 700);
    } else {
      const line = wrongLines[Math.floor(Math.random() * wrongLines.length)];
      setWrongLine(line);
      setStatus("wrong");
      setShakeKey((k) => k + 1);
    }
  };

  const handleTryAgain = () => {
    setStatus("idle");
    setSelectedId(null);
  };

  const currentNum = (index + 1).toString().padStart(2, "0");
  const totalNum = total.toString().padStart(2, "0");

  return (
    <section className="screen question-screen">
      {/* Minimal, elegant progress badge */}
      <div className="question-screen__progress-header">
        <span className="question-screen__progress-text">
          ♡ {currentNum} / {totalNum}
        </span>
        <div className="question-screen__steps" aria-hidden="true">
          {Array.from({ length: total }).map((_, i) => (
            <span
              key={i}
              className={`question-screen__step-dot ${
                i === index
                  ? "question-screen__step-dot--active"
                  : i < index
                  ? "question-screen__step-dot--done"
                  : ""
              }`}
            />
          ))}
        </div>
      </div>

      {/* Decorative accent icon */}
      <div className="question-screen__accent-icon" aria-hidden="true">
        <span>💌</span>
      </div>

      {/* Prominent Question prompt */}
      <h2 className="question-screen__prompt">{question.prompt}</h2>

      {/* Answer buttons */}
      <div
        key={shakeKey}
        className={`answers ${status === "wrong" ? "answers--shake" : ""}`}
      >
        {question.answers.map((answer, i) => {
          const isSelected = selectedId === answer.id;
          const isCorrectSelected = isSelected && status === "correct";
          const isWrongSelected = isSelected && status === "wrong";
          return (
            <button
              key={answer.id}
              className={`answer-btn ${
                isCorrectSelected ? "answer-btn--correct" : ""
              } ${isWrongSelected ? "answer-btn--wrong" : ""}`}
              onClick={() => handleAnswer(answer.id)}
              disabled={status === "correct"}
            >
              <span className="answer-btn__badge">{OPTION_LABELS[i] || "♡"}</span>
              <span className="answer-btn__text">{answer.text}</span>
              {isCorrectSelected && (
                <span className="answer-btn__feedback">✓</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Gun Cat enters dynamically from the side on wrong answers */}
      {status === "wrong" && (
        <WrongAnswer
          line={wrongLine}
          onTryAgain={handleTryAgain}
          characters={characters}
        />
      )}
    </section>
  );
}
