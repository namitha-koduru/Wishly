import React from "react";
import Envelope from "../components/Envelope.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";

export default function EnvelopePage({ config, onNext, onPrev }) {
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
      <LotusDecoration style={{ bottom: "1.5rem", left: "1.5rem" }} />
      <LotusDecoration style={{ bottom: "1.5rem", right: "1.5rem" }} flip />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "520px", width: "100%" }}>
        <p
          className="anniv-font-kalam"
          style={{
            color: "#9b4a22",
            fontSize: "1.25rem",
            marginBottom: "1.75rem"
          }}
        >
          {isTelugu ? "హృదయం నుండి ఒక ప్రేమలేఖ..." : "A little something from the heart..."}
        </p>

        <Envelope
          to={coupleNames}
          onOpen={onNext}
          isTelugu={isTelugu}
        />

        {onPrev && (
          <div style={{ marginTop: "2rem" }}>
            <button
              type="button"
              onClick={onPrev}
              className="story-nav-btn btn-secondary-nav"
            >
              <span>&larr;</span> {isTelugu ? "వెనుకకు" : "Back"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
