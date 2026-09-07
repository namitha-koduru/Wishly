import CatImage from "./CatImage";
import FloatingHearts from "./FloatingHearts";
import { CHARACTERS, COPY } from "../data/config";

export default function Celebration({
  onReplay,
  copy = COPY,
  characters = CHARACTERS,
  recipientName,
  senderName,
  message,
}) {
  const celebrationTitle = recipientName
    ? `${recipientName}, I knew you'd say yes! 😌❤️`
    : (copy.celebrationTitle || "I knew you'd say yes. 😌");

  const lines = copy.celebrationLines || [
    "Here's to more silly moments,",
    "more memories,",
    "more teasing,",
    "and a whole lot more us. ❤️",
  ];

  return (
    <section className="screen celebration-screen">
      <FloatingHearts count={22} symbols={["💗", "💕", "💖", "✨", "🌷", "🌸"]} />

      <div className="celebration-screen__header">
        <span className="celebration-screen__badge">OFFICIALLY VALENTINES ❤️</span>
        <h2 className="celebration-screen__title">{celebrationTitle}</h2>
      </div>

      {/* Flower Cat celebratory entrance */}
      <div className="celebration-cat-actor celebration-cat-actor--enter-pop">
        <CatImage
          src={characters.flowerCat}
          alt="Flower Cat celebrating Valentine"
          fallbackEmoji="🐱🌸"
          className="celebration-cat-img"
        />
      </div>

      <div className="celebration-screen__lines">
        {lines.map((line, idx) => (
          <p key={idx} className="celebration-screen__line">{line}</p>
        ))}
      </div>

      {/* Personalized message card if provided */}
      {message && (
        <div className="celebration-screen__letter">
          <p className="celebration-screen__message">"{message}"</p>
          {senderName && (
            <p className="celebration-screen__signature">— With love, {senderName}</p>
          )}
        </div>
      )}

      <button className="btn btn--secondary celebration-screen__btn" onClick={onReplay}>
        {copy.replayButton || "Replay our story ↻"}
      </button>
    </section>
  );
}
