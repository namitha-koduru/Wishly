import React from "react";
import BapuIllustration from "../components/BapuIllustration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import TempleSticker from "../components/TempleSticker.jsx";

export default function BapuArtPage({ config, onNext, onPrev }) {
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
      <MugguluDecoration corner="top-left" opacity={0.35} />
      <LotusDecoration style={{ bottom: "1.5rem", right: "1.5rem" }} flip />

      {/* Auspicious Temple Stamp Badge */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "1.5rem",
          zIndex: 15
        }}
      >
        <TempleSticker size="small" isTelugu={isTelugu} rotation="-3deg" />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "480px", padding: "0 1rem" }}>
        <BapuIllustration />
        
        <h2
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)",
            color: "#4a151c",
            lineHeight: 1.25,
            marginTop: "1.5rem",
            marginBottom: "0.5rem"
          }}
        >
          {isTelugu ? (
            <>ఇద్దరు మనుషులు.<br />ఒక అపురూపమైన కథ.</>
          ) : (
            <>Two people.<br />One beautiful story.</>
          )}
        </h2>

        <p
          className="anniv-font-lora"
          style={{
            color: "#3a2a1d",
            fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
            lineHeight: 1.7,
            maxWidth: "380px",
            margin: "0 auto 2rem"
          }}
        >
          {isTelugu
            ? "ఎన్నేళ్లు గడిచినా మీ ప్రేమానురాగాలు రోజురోజుకూ మరింత పరిమళించాలి."
            : "And somehow, through all the years, the story only gets better."}
        </p>

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
            {isTelugu ? "ప్రేమలేఖను తెరవండి" : "Read the Love Letter"} <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
