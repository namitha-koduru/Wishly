import React from "react";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";

export default function JourneyPage({ config, onNext, onPrev }) {
  const featured = (config.photos || []).find((p) => p && p.src && !p.src.startsWith("{{"));
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
      <MugguluDecoration corner="top-right" opacity={0.4} />
      <LotusDecoration style={{ bottom: "1.5rem", left: "1.5rem" }} />

      <div style={{ position: "relative", zIndex: 10, maxWidth: "500px", padding: "0 1rem" }}>
        {featured && (
          <div
            style={{
              width: "min(200px, 45vw)",
              margin: "0 auto 1.5rem",
              backgroundColor: "#faf4e6",
              padding: "0.5rem 0.5rem 1.6rem",
              boxShadow: "0 10px 24px rgba(58, 42, 29, 0.22)",
              transform: "rotate(-2.5deg)",
              border: "1px solid rgba(179, 135, 47, 0.25)"
            }}
          >
            <div style={{ aspectRatio: "1 / 1", overflow: "hidden", backgroundColor: "#e6d3ac" }}>
              <img
                src={featured.src}
                alt={featured.caption || "Special memory"}
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {featured.caption && (
              <span
                className="anniv-font-kalam"
                style={{
                  display: "block",
                  textAlign: "center",
                  color: "#5c4a38",
                  fontSize: "0.88rem",
                  marginTop: "0.4rem"
                }}
              >
                {featured.caption}
              </span>
            )}
          </div>
        )}

        <h2
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)",
            color: "#4a151c",
            lineHeight: 1.25,
            marginBottom: "1rem"
          }}
        >
          {isTelugu ? (
            <>కొన్ని కథలు మాటల్లో రాస్తారు.<br />మధురమైనవి జ్ఞాపకాల్లో నిలుస్తాయి.</>
          ) : (
            <>Some stories are written in words.<br />The best ones are written in memories.</>
          )}
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
            ? `${config.anniversaryYears} సంవత్సరాలుగా సాగుతున్న ఈ అనుబంధం ఎప్పటికీ కలకాలం నిలవాలి.`
            : `${config.anniversaryYears} years, and every page still feels worth turning slowly.`}
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
            {isTelugu ? "ముందుకు" : "Continue"} <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
}
