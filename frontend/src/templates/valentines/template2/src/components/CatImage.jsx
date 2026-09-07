import { useState } from "react";

// Renders a character image (Gun Cat / Flower Cat) and falls back to an
// emoji badge if the real asset hasn't been dropped into /public yet.
export default function CatImage({ src, alt, fallbackEmoji = "🐱", className = "" }) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div className={`cat-fallback ${className}`} role="img" aria-label={alt}>
        <span>{fallbackEmoji}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`cat-image ${className}`}
      onError={() => setErrored(true)}
      draggable={false}
    />
  );
}
