import { useState } from "react";
import { MEMORIES, COPY } from "../data/config";

function MemoryCard({ memory, index, onSelect }) {
  const [errored, setErrored] = useState(false);
  const src = memory.src || memory.url || (typeof memory === "string" ? memory : "");
  const caption = memory.caption || memory.title || `Memory #${index + 1}`;
  // Subtle alternating rotation for scrapbook feel
  const rotations = [-2.5, 2, -1.8, 2.8, -1.5, 2.2];
  const rot = rotations[index % rotations.length];

  return (
    <figure
      className="polaroid-card"
      style={{ "--card-rot": `${rot}deg` }}
      onClick={() => onSelect(memory)}
      role="button"
      tabIndex={0}
      aria-label={`View memory: ${caption}`}
    >
      <div className="polaroid-card__tape" aria-hidden="true" />
      <div className="polaroid-card__photo-wrap">
        {!errored && src ? (
          <img
            src={src}
            alt={caption}
            className="polaroid-card__image"
            onError={() => setErrored(true)}
            loading="lazy"
          />
        ) : (
          <div className="polaroid-card__placeholder">
            <span className="polaroid-card__icon">📸</span>
            <span className="polaroid-card__placeholder-text">Sweet Memory</span>
          </div>
        )}
      </div>
      <figcaption className="polaroid-card__caption">{caption}</figcaption>
    </figure>
  );
}

export default function MemoryGallery({ onContinue, memories = MEMORIES, copy = COPY }) {
  const [activeMemory, setActiveMemory] = useState(null);

  return (
    <section className="screen gallery-screen">
      <div className="gallery-screen__header">
        {copy.galleryIntro && (
          <span className="gallery-screen__badge">{copy.galleryIntro}</span>
        )}
        <h2 className="gallery-screen__title">{copy.galleryTitle}</h2>
      </div>

      <div className="scrapbook-grid">
        {memories.map((memory, index) => (
          <MemoryCard
            key={memory.id || index}
            memory={memory}
            index={index}
            onSelect={(m) => setActiveMemory(m)}
          />
        ))}
      </div>

      {activeMemory && (
        <div className="memory-lightbox" onClick={() => setActiveMemory(null)}>
          <div className="memory-lightbox__panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="memory-lightbox__close"
              onClick={() => setActiveMemory(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="memory-lightbox__img-wrap">
              {activeMemory.src ? (
                <img src={activeMemory.src} alt={activeMemory.caption} />
              ) : (
                <div className="polaroid-card__placeholder">
                  <span>📸</span>
                </div>
              )}
            </div>
            <p className="memory-lightbox__caption">{activeMemory.caption}</p>
          </div>
        </div>
      )}

      <button className="btn btn--primary gallery-screen__btn" onClick={onContinue}>
        {copy.galleryButton}
      </button>
    </section>
  );
}

