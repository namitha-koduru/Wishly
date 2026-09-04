import React from "react";
import garland from "../assets/garland.png";

/**
 * GarlandDecoration
 * Hangs the real garland photo from the top edge of a page.
 * A single, subtle sway animation. Respects prefers-reduced-motion.
 */
export default function GarlandDecoration({
  side = "left",
  delay = 0,
  className = "",
}) {
  const sideStyles = {
    left: { left: "1rem", top: "0" },
    right: { right: "1rem", top: "0", transform: "scaleX(-1)" },
    center: { left: "50%", top: "0", transform: "translateX(-50%)" },
  };

  return (
    <div
      aria-hidden="true"
      className={`garland-decoration ${className}`}
      style={{
        pointerEvents: "none",
        userSelect: "none",
        position: "absolute",
        width: "min(120px, 26vw)",
        zIndex: 2,
        ...sideStyles[side]
      }}
    >
      <img
        src={garland}
        alt=""
        loading="lazy"
        draggable="false"
        style={{
          width: "100%",
          display: "block",
          animationDelay: `${delay}ms`,
          transformOrigin: "top center"
        }}
        className="wishly-garland-sway"
      />
    </div>
  );
}
