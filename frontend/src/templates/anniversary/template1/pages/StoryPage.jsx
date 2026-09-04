import React from "react";
import MugguluDecoration from "../components/MugguluDecoration.jsx";

const TILTS = ["-4deg", "3deg", "-2.5deg"];

export default function StoryPage({ config, onNext, onPrev }) {
  const moments = (config.photos || []).slice(0, 3).filter((p) => p && p.src && !p.src.startsWith("{{"));
  const isTelugu = config.fontStyle === "telugu";

  const labels = isTelugu
    ? ["అప్పుడు...", "కలిసి...", "ఇప్పుడు..."]
    : ["Then...", "Together...", "Today..."];

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
      <MugguluDecoration corner="bottom-left" opacity={0.4} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "660px", padding: "0 1rem" }}>
        <h2
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
            color: "#4a151c",
            marginBottom: "1.75rem"
          }}
        >
          {isTelugu ? "మన జ్ఞాపకాల కథ" : "Their Story in Moments"}
        </h2>

        {moments.length > 0 ? (
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "1.25rem 1rem",
              marginBottom: "1.5rem"
            }}
          >
            {moments.map((m, i) => (
              <div
                key={i}
                style={{
                  transform: `rotate(${TILTS[i % TILTS.length]})`,
                  width: "min(150px, 28vw)",
                  backgroundColor: "#faf4e6",
                  padding: "0.45rem 0.45rem 1.8rem",
                  boxShadow: "0 10px 20px rgba(58, 42, 29, 0.2)",
                  position: "relative",
                  border: "1px solid rgba(179, 135, 47, 0.25)",
                  borderRadius: "2px"
                }}
              >
                <div style={{ aspectRatio: "1 / 1", backgroundColor: "#e6d3ac", overflow: "hidden" }}>
                  <img
                    src={m.src}
                    alt={labels[i]}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  />
                </div>
                <span
                  className="anniv-font-kalam"
                  style={{
                    position: "absolute",
                    bottom: "0.35rem",
                    left: 0,
                    right: 0,
                    display: "block",
                    textAlign: "center",
                    color: "#5c4a38",
                    fontSize: "0.88rem"
                  }}
                >
                  {labels[i]}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p
            className="anniv-font-lora"
            style={{
              fontStyle: "italic",
              color: "#5c4a38",
              fontSize: "1.1rem",
              marginBottom: "1rem"
            }}
          >
            {labels.join("  ·  ")}
          </p>
        )}

        <p
          className="anniv-font-lora"
          style={{
            color: "#3a2a1d",
            fontSize: "clamp(0.95rem, 2.5vw, 1.05rem)",
            lineHeight: 1.7,
            maxWidth: "420px",
            margin: "1.25rem auto 2rem"
          }}
        >
          {isTelugu
            ? "ప్రతి మధుర క్షణం ఒక అందమైన జ్ఞాపకంగా మారి మన జీవితాన్ని అద్భుతంగా మార్చింది."
            : "An old family album, still being written — one ordinary, beautiful day at a time."}
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
            {isTelugu ? "తరువాతి పేజీ" : "Turn the Page"} <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
