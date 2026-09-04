import React from "react";
import lotus from "../assets/lotus.png";

/**
 * LotusDecoration
 * The lotus blossom lifted from the garland reference photo.
 * Fully static — used to frame content quietly.
 */
export default function LotusDecoration({ className = "", flip = false, style = {} }) {
  return (
    <img
      src={lotus}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable="false"
      className={`lotus-decoration ${className}`}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        position: "absolute",
        width: "min(80px, 18vw)",
        transform: flip ? "scaleX(-1)" : undefined,
        zIndex: 2,
        ...style
      }}
    />
  );
}
