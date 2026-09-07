import CatImage from "./CatImage";
import { CHARACTERS } from "../data/config";

export default function WrongAnswer({ line, onTryAgain, characters = CHARACTERS }) {
  const headline = typeof line === "object" ? line.headline : (line || "WRONG. 😾");
  const sub = typeof line === "object" ? line.sub : "Try again.";
  const buttonText = typeof line === "object" ? line.button : "Okay okay 😭 Try Again";

  return (
    <div className="wrong-overlay" role="alertdialog" aria-live="assertive">
      <div className="wrong-backdrop" onClick={onTryAgain} aria-hidden="true" />
      <div className="wrong-stage-wrap">
        {/* Gun Cat enters dynamically from outside the screen */}
        <div className="wrong-cat-actor">
          <CatImage
            src={characters.gunCat}
            alt="Gun Cat, unimpressed with your answer"
            fallbackEmoji="😾"
            className="wrong-cat-img"
          />
        </div>

        <div className="wrong-dialog-card">
          <span className="wrong-badge">BUSTED! 😾</span>
          <h3 className="wrong-headline">{headline}</h3>
          {sub && <p className="wrong-sub">{sub}</p>}
          <button className="btn btn--secondary wrong-btn" onClick={onTryAgain} autoFocus>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
