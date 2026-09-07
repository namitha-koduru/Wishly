import { COPY } from "../data/config";

export default function Intro({ onStart, copy = COPY, recipientName }) {
  const mainTitle = recipientName
    ? `Okay ${recipientName}... let's see how well you really know me. 👀`
    : (copy.introEyebrow || "Okay... let's see how well you really know me. 👀");

  const lines = copy.introLines || [
    "I've prepared a few questions.",
    "And choose carefully...",
    "There are consequences. 😌",
  ];

  return (
    <section className="screen intro-screen">
      <div className="intro-screen__seal" aria-hidden="true">💌</div>
      <h1 className="intro-screen__title">{mainTitle}</h1>
      <div className="intro-screen__lines">
        {lines.map((line, idx) => (
          <p key={idx} className="intro-screen__line">{line}</p>
        ))}
      </div>
      <button className="btn btn--primary intro-screen__btn" onClick={onStart}>
        {copy.introButton || "I'm ready 💗"}
      </button>
    </section>
  );
}
