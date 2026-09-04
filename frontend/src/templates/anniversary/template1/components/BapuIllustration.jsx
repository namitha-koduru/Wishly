import React from "react";
import bapu from "../assets/bapu.jpg";

/**
 * BapuIllustration
 * Presents the traditional couple illustration inside a simple
 * hairline frame — a photograph/artwork treatment rather than a
 * decorative sticker. Static image, no animation.
 */
export default function BapuIllustration({ className = "" }) {
  return (
    <div
      className={`bapu-illustration-frame ${className}`}
      style={{
        margin: "0 auto",
        width: "100%",
        maxWidth: "300px",
        border: "1px solid rgba(179, 135, 47, 0.5)",
        padding: "0.5rem",
        backgroundColor: "#faf4e6",
        boxShadow: "0 10px 26px rgba(58, 42, 29, 0.18)",
        borderRadius: "2px"
      }}
    >
      <div
        style={{
          border: "1px solid rgba(179, 135, 47, 0.3)",
          padding: "0.25rem",
          backgroundColor: "#fdfbf7"
        }}
      >
        <img
          src={bapu}
          alt="Traditional illustration of a couple, hand in hand"
          loading="lazy"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>
    </div>
  );
}
