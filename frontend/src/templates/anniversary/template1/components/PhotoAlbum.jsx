import React, { useState, useEffect } from "react";

// Small fixed set of tilt angles for deterministic scrapbook aesthetic
const TILTS = ["-4deg", "3deg", "-2.5deg", "2deg", "-3.5deg", "4deg"];

/**
 * PhotoAlbum
 * Vintage scrapbook grid adapting to 1–6+ photos with lightbox zoom.
 */
export default function PhotoAlbum({ photos = [] }) {
  const usable = (photos || []).filter((p) => p && p.src && !p.src.startsWith("{{"));
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
      }
    };
    if (openIndex !== null) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openIndex]);

  if (usable.length === 0) return null;

  const getGridStyle = () => {
    if (usable.length === 1) return { gridTemplateColumns: "1fr", maxWidth: "280px" };
    if (usable.length === 2) return { gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "420px" };
    if (usable.length <= 4) return { gridTemplateColumns: "repeat(2, 1fr)", maxWidth: "520px" };
    return { gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", maxWidth: "720px" };
  };

  return (
    <>
      <div
        className="scrapbook-album-grid"
        style={{
          display: "grid",
          gap: "1.25rem 1rem",
          margin: "0 auto",
          width: "100%",
          ...getGridStyle()
        }}
      >
        {usable.map((p, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setOpenIndex(i)}
            style={{ transform: `rotate(${TILTS[i % TILTS.length]})` }}
            className="scrapbook-polaroid-btn"
          >
            <div className="scrapbook-img-frame">
              <img
                src={p.src}
                alt={p.caption || `Memory ${i + 1}`}
                loading="lazy"
              />
            </div>
            {p.caption && (
              <span className="scrapbook-caption-text">
                {p.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpenIndex(null)}
          className="tpl-lightbox-backdrop"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="tpl-lightbox-card"
            style={{ position: "relative" }}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(null)}
              aria-label="Close photo"
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.75rem",
                fontSize: "1.75rem",
                lineHeight: 1,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                color: "#4a151c",
                background: "rgba(243, 234, 216, 0.9)",
                border: "1px solid rgba(179, 135, 47, 0.3)",
                borderRadius: "50%",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                zIndex: 10
              }}
            >
              &times;
            </button>
            <img
              src={usable[openIndex].src}
              alt={usable[openIndex].caption || ""}
              style={{ width: "100%", height: "auto", maxHeight: "65vh", objectFit: "contain" }}
            />
            {usable[openIndex].caption && (
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "'Kalam', cursive, sans-serif",
                  fontSize: "1.15rem",
                  color: "#4a151c",
                  margin: "0.75rem 0 0"
                }}
              >
                {usable[openIndex].caption}
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
