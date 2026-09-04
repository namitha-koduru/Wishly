import React from "react";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import GarlandDecoration from "../components/GarlandDecoration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";
import TempleSticker from "../components/TempleSticker.jsx";

export default function AnniversaryIntro({ config, onNext }) {
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
        padding: "2rem 1rem 4rem"
      }}
    >
      <MugguluDecoration corner="top-left" opacity={0.45} />
      <MugguluDecoration corner="bottom-right" opacity={0.4} />
      <GarlandDecoration side="left" />
      <GarlandDecoration side="right" delay={300} />
      <LotusDecoration style={{ bottom: "1.5rem", left: "1.5rem" }} />
      <LotusDecoration style={{ bottom: "1.5rem", right: "1.5rem" }} flip />

      {/* Auspicious Temple Blessing Stamp Accent */}
      <div
        style={{
          position: "absolute",
          top: "1.25rem",
          right: "1.25rem",
          zIndex: 15
        }}
      >
        <TempleSticker size="small" isTelugu={isTelugu} rotation="4deg" />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "540px", padding: "0 1rem" }}>
        <p
          className="anniv-font-kalam"
          style={{
            color: "#9b4a22",
            fontSize: "1.15rem",
            marginBottom: "0.5rem"
          }}
        >
          {isTelugu ? "అందమైన ప్రయాణపు వేడుక..." : "Once upon a beautiful journey..."}
        </p>

        <h1
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(2.5rem, 6.5vw, 3.8rem)",
            color: "#4a151c",
            lineHeight: 1.15,
            marginBottom: "0.4rem"
          }}
        >
          {isTelugu ? "పెళ్లిరోజు శుభాకాంక్షలు" : "Happy Anniversary"}
        </h1>

        <p
          className="anniv-font-cormorant"
          style={{
            fontStyle: "italic",
            fontSize: "clamp(1.6rem, 4.5vw, 2.3rem)",
            color: "#9b4a22",
            marginBottom: "1rem"
          }}
        >
          {coupleNames}
        </p>

        {config.anniversaryYears && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.45rem",
              background: "rgba(185, 98, 47, 0.12)",
              border: "1px solid rgba(179, 135, 47, 0.35)",
              padding: "0.35rem 1.1rem",
              borderRadius: "9999px",
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontStyle: "italic",
              fontWeight: 600,
              fontSize: "1.1rem",
              color: "#4a151c",
              marginBottom: "1.25rem"
            }}
          >
            <span>💍 {isTelugu ? `${config.anniversaryYears} వసంతాల బంధం` : `${config.anniversaryYears} Beautiful Years`}</span>
          </div>
        )}

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
            fontStyle: "italic",
            color: "#5c4a38",
            fontSize: "clamp(0.95rem, 2.5vw, 1.1rem)",
            maxWidth: "400px",
            margin: "0 auto 2rem",
            lineHeight: 1.65
          }}
        >
          {isTelugu
            ? "ప్రేమ, నమ్మకం, ఆనందాలతో నిండిన మరో అందమైన అధ్యాయం."
            : "Celebrating another beautiful chapter of togetherness."}
        </p>

        <button
          type="button"
          onClick={onNext}
          className="story-nav-btn btn-primary-nav"
        >
          {isTelugu ? "ప్రయాణం మొదలుపెట్టండి" : "Begin the Journey"} <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
