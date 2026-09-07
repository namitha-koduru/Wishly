import CatImage from "./CatImage";
import FloatingHearts from "./FloatingHearts";
import { CHARACTERS, COPY } from "../data/config";

export default function Success({ onContinue, copy = COPY, characters = CHARACTERS }) {
  const title = copy.successTitle || "YAYYY! 🥹💗";
  const lines = copy.successLines || [
    "You got them all right.",
    "Maybe you really do love me. 👀",
  ];

  return (
    <section className="screen success-screen">
      <FloatingHearts count={16} symbols={["🌸", "💗", "✨", "🌷", "💕"]} />

      <div className="success-screen__header">
        <span className="success-screen__badge">100% CORRECT 💯</span>
        <h2 className="success-screen__title">{title}</h2>
      </div>

      {/* Flower Cat enters gracefully from the right side */}
      <div className="success-cat-actor success-cat-actor--enter-right">
        <CatImage
          src={characters.flowerCat}
          alt="Flower Cat celebrating"
          fallbackEmoji="🐱🌸"
          className="success-cat-img"
        />
      </div>

      <div className="success-screen__content-box">
        {lines.map((line, idx) => (
          <p key={idx} className="success-screen__line">{line}</p>
        ))}
      </div>

      <button className="btn btn--primary success-screen__btn" onClick={onContinue}>
        {copy.successButton || "There's more? →"}
      </button>
    </section>
  );
}
