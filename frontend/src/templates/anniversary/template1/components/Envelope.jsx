import React, { useState } from "react";

/**
 * Envelope
 * A tactile vintage handmade-paper envelope with smooth 3D opening animation.
 */
export default function Envelope({ to, onOpen, isTelugu = false }) {
  const [opening, setOpening] = useState(false);

  function handleOpen() {
    if (opening) return;
    setOpening(true);
    // Smooth transition to the opened letter page
    window.setTimeout(() => {
      if (onOpen) onOpen();
    }, 700);
  }

  return (
    <div className="anniv-envelope-container" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div
        className="anniv-env-stage"
        onClick={handleOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleOpen();
          }
        }}
        style={{
          position: "relative",
          width: "min(340px, 80vw)",
          aspectRatio: "3 / 2",
          perspective: "1200px",
          cursor: "pointer"
        }}
      >
        {/* Envelope Body */}
        <div
          className="anniv-env-body"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, #f6ecd6 0%, #ecdcb8 100%)",
            border: "1px solid rgba(179, 135, 47, 0.45)",
            boxShadow: "0 16px 36px rgba(58, 42, 29, 0.22)",
            borderRadius: "4px"
          }}
        />

        {/* Letter Peek Inside */}
        <div
          className="anniv-env-peek"
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: "6%",
            right: "6%",
            top: "10%",
            height: "80%",
            backgroundColor: "#faf4e6",
            boxShadow: "0 -4px 12px rgba(58, 42, 29, 0.15)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            paddingTop: "14%",
            borderRadius: "3px",
            border: "1px solid rgba(179, 135, 47, 0.2)",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: opening ? "translateY(24%)" : "translateY(94%)"
          }}
        >
          <span
            className="anniv-font-kalam"
            style={{
              color: "#4a151c",
              fontSize: "1.05rem",
              padding: "0 0.5rem",
              textAlign: "center"
            }}
          >
            {isTelugu ? `ప్రియమైన ${to},` : `Dear ${to},`}
          </span>
        </div>

        {/* Flap */}
        <div
          className="anniv-env-top-flap"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "58%",
            zIndex: 3,
            background: "linear-gradient(135deg, #f3e6c8 0%, #e6d0a0 100%)",
            borderBottom: "1px solid rgba(179, 135, 47, 0.35)",
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            transformOrigin: "top center",
            transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            transform: opening ? "rotateX(180deg)" : "rotateX(0deg)"
          }}
        />

        {/* Wax Seal */}
        <div
          className="anniv-env-wax-seal"
          style={{
            position: "absolute",
            left: "50%",
            top: "36%",
            transform: "translate(-50%, -50%)",
            zIndex: 4,
            width: "48px",
            height: "48px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "radial-gradient(circle at 35% 30%, #b9622f, #4a151c)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.35)",
            transition: "opacity 0.3s ease, transform 0.3s ease",
            opacity: opening ? 0 : 1,
            pointerEvents: "none"
          }}
        >
          <svg viewBox="0 0 20 20" style={{ width: "22px", height: "22px" }}>
            {[0, 72, 144, 216, 288].map((a) => (
              <ellipse
                key={a}
                cx="10"
                cy="6"
                rx="3.2"
                ry="2"
                fill="#f3e6c8"
                opacity="0.9"
                transform={`rotate(${a} 10 10)`}
              />
            ))}
            <circle cx="10" cy="10" r="1.6" fill="#fff" />
          </svg>
        </div>

        {/* Name Inscription */}
        <div
          className="anniv-env-front-label"
          style={{
            position: "absolute",
            bottom: "12%",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 1,
            color: "#4a151c",
            fontSize: "1.15rem"
          }}
        >
          <span className="anniv-font-kalam">
            {isTelugu ? `శ్రీ & శ్రీమతి ${to} గారికి ♥` : `To ${to} ♥`}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleOpen}
        disabled={opening}
        className="story-nav-btn btn-primary-nav"
        style={{
          marginTop: "2rem",
          opacity: opening ? 0.6 : 1
        }}
      >
        <span>✉️ {isTelugu ? "లేఖను తెరవండి" : "Open the Letter"} &rarr;</span>
      </button>
    </div>
  );
}
