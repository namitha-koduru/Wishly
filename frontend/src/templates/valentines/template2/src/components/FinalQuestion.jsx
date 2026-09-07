import CatImage from "./CatImage";
import FloatingHearts from "./FloatingHearts";
import { CHARACTERS, COPY } from "../data/config";

export default function FinalQuestion({
  onYes,
  copy = COPY,
  characters = CHARACTERS,
  recipientName,
}) {
  const note = recipientName
    ? `There's still one thing I want to ask you, ${recipientName}. 🌷`
    : (copy.finalNote || "There's still one thing I want to ask you. 🌷");

  return (
    <section className="screen final-question-screen">
      <FloatingHearts count={18} symbols={["💗", "💖", "🌷", "✨", "💕"]} />

      <div className="final-screen__header">
        <span className="final-screen__badge">FINAL QUESTION 💌</span>
        <div className="final-screen__buildup">
          {copy.finalLead && <p className="final-screen__lead">{copy.finalLead}</p>}
          {copy.finalSubLead && <p className="final-screen__sublead">{copy.finalSubLead}</p>}
          <p className="final-screen__note">{note}</p>
        </div>
      </div>

      {/* Flower Cat enters with romantic side-slide */}
      <div className="final-cat-actor final-cat-actor--enter-left">
        <CatImage
          src={characters.flowerCat}
          alt="Flower Cat holding flowers"
          fallbackEmoji="🐱🌸"
          className="final-cat-img"
        />
      </div>

      <h2 className="final-question-screen__title">{copy.finalQuestion}</h2>

      <div className="final-question-screen__actions">
        <button className="btn btn--primary final-btn final-btn--yes1" onClick={onYes}>
          {copy.finalYes1 || "YES 🥰"}
        </button>
        <button className="btn btn--primary final-btn final-btn--yes2" onClick={onYes}>
          {copy.finalYes2 || "OF COURSE 😭❤️"}
        </button>
      </div>
    </section>
  );
}
