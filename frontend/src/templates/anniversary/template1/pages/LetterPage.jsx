import React, { useState } from "react";
import MugguluDecoration from "../components/MugguluDecoration.jsx";
import LotusDecoration from "../components/LotusDecoration.jsx";
import TempleSticker from "../components/TempleSticker.jsx";

export default function LetterPage({ config, onNext, onPrev }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const coupleNames = config.person2 ? `${config.person1} & ${config.person2}` : config.person1;
  const isTelugu = config.fontStyle === "telugu";

  const paragraphs = Array.isArray(config.letterContent)
    ? config.letterContent
    : String(config.letterContent || "")
        .split(/\n\s*\n/)
        .map((s) => s.trim())
        .filter(Boolean);

  function handleOpen() {
    if (isOpen || isAnimating) return;
    setIsAnimating(true);
    setTimeout(() => {
      setIsOpen(true);
      setIsAnimating(false);
    }, 450);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div
      className="anniv-multipage-stage anniv-letter-stage"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem 4rem"
      }}
    >
      <MugguluDecoration corner="top-right" opacity={0.35} />
      <LotusDecoration style={{ bottom: "1.5rem", left: "1.5rem" }} />

      {!isOpen ? (
        /* ================= 3D CLOSED ENVELOPE STAGE ================= */
        <div
          className="anniv-envelope-wrapper animate-fade-in"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            maxWidth: "460px",
            zIndex: 10
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span
              className="anniv-badge-pill"
              style={{
                display: "inline-block",
                padding: "0.25rem 1rem",
                borderRadius: "9999px",
                background: "rgba(185, 98, 47, 0.12)",
                color: "#9b4a22",
                fontSize: "0.85rem",
                fontWeight: 600,
                border: "1px solid rgba(179, 135, 47, 0.3)",
                marginBottom: "0.5rem"
              }}
            >
              💌 {isTelugu ? "ప్రత్యేక లేఖ" : "A Handwritten Keepsake"}
            </span>
            <p
              className="anniv-font-kalam"
              style={{
                color: "#9b4a22",
                fontSize: "1.2rem",
                margin: 0
              }}
            >
              {isTelugu ? "హృదయం నుండి మీకోసం ఒక ప్రేమలేఖ..." : "A little something sealed with love..."}
            </p>
          </div>

          {/* Envelope Card */}
          <div
            className={`anniv-env-stage ${isAnimating ? "env-opening" : ""}`}
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
              width: "min(350px, 86vw)",
              aspectRatio: "3 / 2",
              perspective: "1200px",
              cursor: "pointer",
              transition: "transform 0.3s ease"
            }}
          >
            {/* Stamp on Envelope */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "12px",
                zIndex: 5
              }}
            >
              <TempleSticker size="small" isTelugu={isTelugu} rotation="3deg" />
            </div>

            {/* Envelope Body */}
            <div
              className="anniv-env-body"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(135deg, #f6ecd6 0%, #ecdcb8 100%)",
                border: "1.5px solid rgba(179, 135, 47, 0.45)",
                boxShadow: "0 18px 40px rgba(58, 42, 29, 0.22)",
                borderRadius: "6px"
              }}
            />

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
                transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                transform: isAnimating ? "rotateX(180deg)" : "rotateX(0deg)"
              }}
            />

            {/* Wax Seal */}
            <div
              className="anniv-env-wax-seal"
              style={{
                position: "absolute",
                left: "50%",
                top: "38%",
                transform: "translate(-50%, -50%)",
                zIndex: 4,
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at 35% 30%, #b9622f, #4a151c)",
                boxShadow: "0 4px 14px rgba(0, 0, 0, 0.35)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                opacity: isAnimating ? 0 : 1,
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
                zIndex: 2,
                color: "#4a151c",
                fontSize: "1.15rem",
                padding: "0 1rem"
              }}
            >
              <span className="anniv-font-kalam">
                {isTelugu ? `శ్రీ & శ్రీమతి ${coupleNames} గారికి ♥` : `To ${coupleNames} ♥`}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleOpen}
            className="story-nav-btn btn-primary-nav"
            style={{ marginTop: "1.75rem" }}
          >
            <span>✉️ {isTelugu ? "లేఖను తెరవండి" : "Open the Letter"} &rarr;</span>
          </button>

          {onPrev && (
            <div style={{ marginTop: "1.25rem" }}>
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
      ) : (
        /* ================= UNFOLDED STATIONERY LETTER SHEET ================= */
        <div
          className="anniv-unfolded-letter-container animate-fade-in"
          style={{ width: "100%", maxWidth: "620px", zIndex: 10 }}
        >
          <div className="anniv-unfolded-letter-sheet">
            <div className="anniv-letter-inner-border" />

            {/* Top Header Row with Temple Stamp & Date */}
            <div className="anniv-letter-header-row">
              <span className="anniv-letter-stamp">
                💌 {isTelugu ? "మనస్ఫూర్తిగా..." : "Written with Love"}
              </span>
              <TempleSticker
                size="small"
                isTelugu={isTelugu}
                rotation="2deg"
                style={{ marginLeft: "auto" }}
              />
            </div>

            {/* Salutation */}
            <h3 className="anniv-letter-salutation">
              {isTelugu ? `ప్రియమైన ${coupleNames},` : `Dearest ${coupleNames},`}
            </h3>

            {/* Letter Body Text */}
            <div className="anniv-letter-body-text">
              {paragraphs.map((p, i) => (
                <p key={i} className="anniv-letter-paragraph">
                  {p}
                </p>
              ))}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.75rem",
                  margin: "1.5rem 0 1rem",
                  opacity: 0.8
                }}
              >
                <div style={{ height: "1px", width: "40px", background: "#b3872f" }} />
                <span style={{ color: "#9b4a22", fontSize: "0.9rem" }}>❦</span>
                <div style={{ height: "1px", width: "40px", background: "#b3872f" }} />
              </div>

              <p className="anniv-letter-blessing">
                {isTelugu
                  ? "మీ దాంపత్య బంధం కలకాలం ఆయురారోగ్యాలతో, ఆనందోత్సాహాలతో వర్ధిల్లాలి!"
                  : "Wishing you both endless happiness, beautiful adventures, and a lifetime of love."}
              </p>
            </div>

            {/* Sender Signature */}
            {config.senderName && (
              <div className="anniv-letter-signature-block">
                <span className="anniv-sig-lead">
                  {isTelugu ? "ఎల్లప్పుడూ మీ ప్రేమతో," : "With lots of love,"}
                </span>
                <span className="anniv-sig-name">{config.senderName}</span>
              </div>
            )}
          </div>

          {/* Action Navigation Buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.85rem",
              flexWrap: "wrap",
              marginTop: "1.75rem"
            }}
          >
            <button
              type="button"
              onClick={handleClose}
              className="story-nav-btn btn-secondary-nav"
              title="Close Letter"
            >
              <span>✉️</span> {isTelugu ? "కవరును మడవండి" : "Fold Back"}
            </button>

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
              {isTelugu ? "జ్ఞాపకాల ఆల్బమ్" : "Photo Memories"} <span>&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
