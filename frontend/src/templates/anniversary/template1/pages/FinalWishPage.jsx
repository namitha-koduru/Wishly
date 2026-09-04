import React from "react";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import GarlandDecoration from "../components/GarlandDecoration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";
import BapuIllustration from "../components/BapuIllustration.jsx";
import TempleSticker from "../components/TempleSticker.jsx";

export default function FinalWishPage({ config, onPrev, onRestart }) {
  const coupleNames = config.person2 ? `${config.person1} & ${config.person2}` : config.person1;
  const isTelugu = config.fontStyle === "telugu";

  return (
    <div
      className="anniv-multipage-stage"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2.5rem 1rem 4rem"
      }}
    >
      <GarlandDecoration side="left" />
      <GarlandDecoration side="right" delay={250} />
      <MugguluDecoration corner="bottom-left" opacity={0.35} />
      <MugguluDecoration corner="bottom-right" opacity={0.35} />
      <LotusDecoration style={{ top: "1.25rem", left: "50%", transform: "translateX(-50%)" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "540px", padding: "0 1rem" }}>
        <div style={{ width: "min(120px, 28vw)", margin: "0 auto 1rem" }}>
          <BapuIllustration />
        </div>

        <h1
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(2rem, 5.5vw, 3.2rem)",
            color: "#4a151c",
            lineHeight: 1.15,
            marginBottom: "0.35rem"
          }}
        >
          {isTelugu ? "హృదయపూర్వక శుభాకాంక్షలు" : "Happy Anniversary"}
        </h1>

        <p
          className="anniv-font-cormorant"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(1.4rem, 3.5vw, 1.9rem)",
            color: "#9b4a22",
            marginBottom: "1.25rem"
          }}
        >
          {coupleNames}
        </p>

        <div
          style={{
            width: "64px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #b3872f, transparent)",
            margin: "0 auto 1.25rem"
          }}
        />

        <p
          className="anniv-font-lora"
          style={{
            color: "#3a2a1d",
            fontSize: "clamp(0.98rem, 2.5vw, 1.12rem)",
            lineHeight: 1.75,
            maxWidth: "440px",
            margin: "0 auto 1.5rem"
          }}
        >
          {config.finalWish}
        </p>

        {/* Sacred Temple Blessing Emblem */}
        <div style={{ margin: "1rem auto 1.5rem", display: "flex", justifyContent: "center" }}>
          <TempleSticker size="medium" isTelugu={isTelugu} rotation="0deg" />
        </div>

        <p
          className="anniv-font-cormorant"
          style={{
            fontStyle: "italic",
            fontSize: "1.3rem",
            color: "#9b4a22",
            marginBottom: "2rem"
          }}
        >
          {isTelugu ? "మీ దాంపత్యం కలకాలం వర్ధిల్లాలి. ♥" : "To many more beautiful chapters together. ♥"}
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="story-nav-btn btn-secondary-nav"
            >
              <span>&larr;</span> {isTelugu ? "వెనుకకు" : "Back"}
            </button>
          )}
          {onRestart && (
            <button
              type="button"
              onClick={onRestart}
              className="story-nav-btn btn-primary-nav"
            >
              ↻ {isTelugu ? "మొదటినుండి చూడండి" : "Replay Journey"}
            </button>
          )}
        </div>

        <div
          style={{
            paddingTop: "1.25rem",
            borderTop: "1px solid rgba(179, 135, 47, 0.3)"
          }}
        >
          <p
            className="anniv-font-kalam"
            style={{
              color: "#5c4a38",
              fontSize: "0.95rem",
              margin: 0
            }}
          >
            ✦ Made with love on Wishly ✦
          </p>
        </div>
      </div>
    </div>
  );
}
