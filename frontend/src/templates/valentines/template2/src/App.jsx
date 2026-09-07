import { useState } from "react";
import Intro from "./components/Intro";
import Question from "./components/Question";
import Success from "./components/Success";
import MemoryGallery from "./components/MemoryGallery";
import FinalQuestion from "./components/FinalQuestion";
import Celebration from "./components/Celebration";
import { QUESTIONS, MEMORIES, COPY, CHARACTERS, WRONG_ANSWER_LINES } from "./data/config";
import "./index.css";
import "./App.css";

// Stages of the experience, in order.
const STAGES = {
  INTRO: "intro",
  QUESTION: "question",
  SUCCESS: "success",
  GALLERY: "gallery",
  FINAL_QUESTION: "finalQuestion",
  CELEBRATION: "celebration",
};

export default function App({ data = {} }) {
  const [stage, setStage] = useState(STAGES.INTRO);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [transitionKey, setTransitionKey] = useState(0);

  // Extract personalized fields
  const customData = data.customData || data;
  const recipientName = data.recipientName || customData.recipientName || "";
  const senderName = data.senderName || customData.senderName || "";
  const message = data.message || customData.message || "";

  // Merge customizable questions (or default 5-question love quiz)
  const questions = customData.questions || QUESTIONS;

  // Merge user-uploaded photos & captions into memories
  const rawPhotos = data.photoObjects || data.photos || customData.photoObjects || customData.photos;
  const rawMemories = customData.memories || data.memories;
  const memories = (Array.isArray(rawMemories) && rawMemories.length > 0 && rawMemories.some((m) => m && (m.src || m.image || m.url)))
    ? rawMemories.map((m, i) => ({
        id: m?.id || `m${i + 1}`,
        src: m?.src || m?.image || m?.url,
        caption: m?.caption ? m.caption : (MEMORIES[i]?.caption || `Our Memory #${i + 1}`),
      }))
    : (Array.isArray(rawPhotos) && rawPhotos.length > 0
      ? rawPhotos.map((p, i) => ({
          id: `m${i + 1}`,
          src: typeof p === "object" ? (p?.url || p?.src || p?.image) : p,
          caption: typeof p === "object" && p?.caption ? p.caption : (MEMORIES[i]?.caption || `Our Memory #${i + 1}`),
        }))
      : MEMORIES);

  const copy = { ...COPY, ...(customData.copy || {}) };
  const characters = { ...CHARACTERS, ...(customData.characters || {}) };
  const wrongLines = customData.wrongAnswerLines || WRONG_ANSWER_LINES;

  const currentQuestion = questions[questionIndex] || questions[0];

  const goTo = (nextStage) => {
    setStage(nextStage);
    setTransitionKey((k) => k + 1);
  };

  const handleStart = () => {
    setQuestionIndex(0);
    goTo(STAGES.QUESTION);
  };

  const handleCorrectAnswer = () => {
    const isLastQuestion = questionIndex >= questions.length - 1;
    if (isLastQuestion) {
      goTo(STAGES.SUCCESS);
    } else {
      setQuestionIndex((i) => i + 1);
      setTransitionKey((k) => k + 1);
    }
  };

  const handleReplay = () => {
    setQuestionIndex(0);
    goTo(STAGES.INTRO);
  };

  return (
    <div className="val2-app">
      <div className="val2-app__decor" aria-hidden="true" />
      <main className="val2-app__stage" key={transitionKey}>
        {stage === STAGES.INTRO && (
          <Intro
            onStart={handleStart}
            copy={copy}
            recipientName={recipientName}
          />
        )}

        {stage === STAGES.QUESTION && (
          <Question
            question={currentQuestion}
            index={questionIndex}
            total={questions.length}
            onCorrect={handleCorrectAnswer}
            wrongLines={wrongLines}
            characters={characters}
          />
        )}

        {stage === STAGES.SUCCESS && (
          <Success
            onContinue={() => goTo(STAGES.GALLERY)}
            copy={copy}
            characters={characters}
          />
        )}

        {stage === STAGES.GALLERY && (
          <MemoryGallery
            onContinue={() => goTo(STAGES.FINAL_QUESTION)}
            memories={memories}
            copy={copy}
          />
        )}

        {stage === STAGES.FINAL_QUESTION && (
          <FinalQuestion
            onYes={() => goTo(STAGES.CELEBRATION)}
            copy={copy}
            characters={characters}
            recipientName={recipientName}
          />
        )}

        {stage === STAGES.CELEBRATION && (
          <Celebration
            onReplay={handleReplay}
            copy={copy}
            characters={characters}
            recipientName={recipientName}
            senderName={senderName}
            message={message}
          />
        )}
      </main>
    </div>
  );
}
