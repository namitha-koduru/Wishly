import React from "react";
import PhotoAlbum from "../components/PhotoAlbum.jsx";
import GarlandDecoration from "../components/GarlandDecoration.jsx";
import TempleSticker from "../components/TempleSticker.jsx";

export default function GalleryPage({ config, onNext, onPrev }) {
  const hasPhotos = (config.photos || []).some((p) => p && p.src && !p.src.startsWith("{{"));
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
      <GarlandDecoration side="center" />

      {/* Auspicious Scrapbook Temple Stamp */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          zIndex: 15
        }}
      >
        <TempleSticker size="small" isTelugu={isTelugu} rotation="-4deg" />
      </div>

      <div style={{ position: "relative", zIndex: 10, maxWidth: "780px", width: "100%", marginBottom: "2rem" }}>
        <p
          className="anniv-font-kalam"
          style={{
            color: "#9b4a22",
            fontSize: "1.15rem",
            marginBottom: "0.4rem"
          }}
        >
          {isTelugu ? "మన ఆల్బమ్ నుండి..." : "A page from the scrapbook of us"}
        </p>

        <h2
          className="anniv-font-cormorant"
          style={{
            fontWeight: 600,
            fontSize: "clamp(1.9rem, 5vw, 2.6rem)",
            color: "#4a151c",
            marginBottom: "2rem"
          }}
        >
          {isTelugu ? "చిన్న క్షణాలు • మధుర జ్ఞాపకాలు" : "Little Moments, Big Memories"}
        </h2>

        {hasPhotos ? (
          <PhotoAlbum photos={config.photos} />
        ) : (
          <div
            style={{
              padding: "2.5rem 1.5rem",
              backgroundColor: "#faf4e6",
              border: "1px dashed rgba(179, 135, 47, 0.4)",
              maxWidth: "440px",
              margin: "0 auto",
              borderRadius: "4px"
            }}
          >
            <p
              className="anniv-font-lora"
              style={{
                fontStyle: "italic",
                color: "#5c4a38",
                fontSize: "1.05rem",
                margin: 0
              }}
            >
              {isTelugu
                ? "ప్రతి జ్ఞాపకం ఒక నిధి... కలకాలం గుండెల్లో దాచుకునే అమూల్యమైన క్షణాలు."
                : "Every photograph is a love letter to a moment that took our breath away."}
            </p>
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap", zIndex: 10 }}>
        {onPrev && (
          <button
            type="button"
            onClick={onPrev}
            className="story-nav-btn btn-secondary-nav"
          >
            <span>&larr;</span> {isTelugu ? "లేఖకు వెళ్లండి" : "Back to Letter"}
          </button>
        )}
        <button
          type="button"
          onClick={onNext}
          className="story-nav-btn btn-primary-nav"
        >
          {isTelugu ? "ముగింపు ఆశీస్సులు" : "Final Blessing"} <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
