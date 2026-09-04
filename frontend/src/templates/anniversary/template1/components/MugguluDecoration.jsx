import React from "react";
import muggulu from "../assets/muggulu.jpg";

/**
 * MugguluDecoration
 * Renders the hand-drawn muggulu blended into the paper background.
 */
export default function MugguluDecoration({
  corner = "top-left",
  className = "",
  opacity = 0.5,
  style = {}
}) {
  const cornerStyles = {
    "top-left": { top: 0, left: 0 },
    "top-right": { top: 0, right: 0, transform: "scaleX(-1)" },
    "bottom-left": { bottom: 0, left: 0, transform: "scaleY(-1)" },
    "bottom-right": { bottom: 0, right: 0, transform: "scaleX(-1) scaleY(-1)" },
  };

  return (
    <img
      src={muggulu}
      alt=""
      aria-hidden="true"
      loading="lazy"
      draggable="false"
      className={`muggulu-decoration ${className}`}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        position: "absolute",
        width: "min(180px, 36vw)",
        opacity,
        mixBlendMode: "multiply",
        zIndex: 1,
        ...cornerStyles[corner],
        ...style
      }}
    />
  );
}
