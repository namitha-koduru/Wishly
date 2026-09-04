import React from "react";
import temple from "../assets/temple.jpg";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import GarlandDecoration from "../components/GarlandDecoration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";

export default function TemplePage({ config, onNext, onPrev }) {
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
      <MugguluDecoration corner="top-left" opacity={0.4} />
      <GarlandDecoration side="right" delay={200} />
      <LotusDecoration style={{ bottom: "1.5rem", left: "1.5rem" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "520px", width: "100%" }}>
        {/* Framed Temple Photo */}
        <div
          style={{
            margin: "0 auto 1.5rem",
            maxWidth: "340px",
            backgroundColor: "#faf4e6",
            padding: "0.5rem",
            border: "1px solid rgba(179, 135, 47, 0.45)",
            boxShadow: "0 14px 32px rgba(58, 42, 29, 0.22)",
            borderRadius: "3px"
          }}
        >
          <div
            style={{
              overflow: "hidden",
              borderRadius: "2px",
              border: "1px solid rgba(179, 135, 47, 0.25)"
            }}
          >
            <img
              src={temple}
              alt="Sacred Temple Blessings"
              loading="lazy"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "260px",
                objectFit: "cover",
                display: "block"
              }}
            />
          </div>
        </div>

        <p
          className="anniv-font-kalam"
          style={{
            color: "#9b4a22",
            fontSize: "1.1rem",
            marginBottom: "0.4rem"
          }}
        >
          {isTelugu ? "దివ్య ఆశీస్సులు" : "Sacred Blessings & Heritage"}
        </p>

        <h2
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)",
            color: "#4a151c",
            lineHeight: 1.2,
            marginBottom: "0.75rem"
          }}
        >
          {isTelugu ? "సంప్రదాయ బంధం • కలకాలం శుభం" : "Bound by Tradition & Grace"}
        </h2>

        <div
          style={{
            width: "64px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, #b3872f, transparent)",
            margin: "0 auto 1rem"
          }}
        />

        <p
          className="anniv-font-lora"
          style={{
            color: "#3a2a1d",
            fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
            lineHeight: 1.7,
            maxWidth: "400px",
            margin: "0 auto 2rem"
          }}
        >
          {isTelugu
            ? "దేవుని సన్నిధిలో ప్రారంభమైన ఈ ప్రయాణం... ఎల్లప్పుడూ ఆనందాల సిరులు కురిపించాలని కోరుకుంటూ."
            : "A bond blessed with serenity, strength, and unwavering love through every sacred chapter of life."}
        </p>

        {/* Navigation buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              className="story-nav-btn btn-secondary-nav"
            >
              <span>&larr;</span> {isTelugu ? "వెనుకకు" : "Back"}
            </button>
          )}
          <button
            type="button"
            onClick={onNext}
            className="story-nav-btn btn-primary-nav"
          >
            {isTelugu ? "ముందుకు" : "Continue"} <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
