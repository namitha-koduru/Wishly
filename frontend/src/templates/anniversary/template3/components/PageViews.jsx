import React, { useState } from 'react';

/**
 * PAGE 1 — HAPPY ANNIVERSARY
 */
export function Page1Hero({ page = {}, onNext }) {
  const {
    title = "Happy Anniversary",
    overheadTag = "A Celebration of Real Love",
    coupleName = "Aditi & Vikram",
    datePill = "November 24 • 7 Years Together",
    storyLead = [
      "Some stories begin with love.",
      "Ours began with two people meeting…",
      "and slowly became a love story of its own."
    ],
    ctaText = "Our Story ♡",
    scrollHint = "Click or scroll to begin our story",
    showRings = true,
    image
  } = page;

  return (
    <section className="tpl3-section tpl3-page-hero">
      <div className="sunlight-flare" />
      <div className="sunlight-glow" />

      {/* Decorative Rings / Header Emblem */}
      <div className="hero-emblem-wrapper">
        {showRings && (
          <div className="rings-intertwined-svg">
            <svg viewBox="0 0 120 70" className="hero-rings-graphic">
              <defs>
                <linearGradient id="goldRing1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F9E8B2" />
                  <stop offset="50%" stopColor="#D4AF37" />
                  <stop offset="100%" stopColor="#997A15" />
                </linearGradient>
                <linearGradient id="goldRing2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="50%" stopColor="#E5C378" />
                  <stop offset="100%" stopColor="#AA8222" />
                </linearGradient>
              </defs>
              <circle cx="45" cy="35" r="24" fill="none" stroke="url(#goldRing1)" strokeWidth="4.5" />
              <circle cx="45" cy="35" r="21" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
              <polygon points="45,7 48,12 45,17 42,12" fill="#FFFFFF" className="diamond-sparkle" />
              <circle cx="75" cy="35" r="24" fill="none" stroke="url(#goldRing2)" strokeWidth="4.5" />
              <circle cx="75" cy="35" r="21" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1" />
            </svg>
          </div>
        )}
        {datePill && <span className="hero-date-pill">{datePill}</span>}
      </div>

      <div className="hero-content-box">
        {overheadTag && <span className="hero-overhead-tag">{overheadTag}</span>}
        {title && <h1 className="hero-title">{title}</h1>}
        {coupleName && <h2 className="hero-couple-name">{coupleName}</h2>}

        {image && (
          <div className="hero-photo-frame">
            <img src={image} alt={coupleName} className="hero-img-custom" />
          </div>
        )}

        {Array.isArray(storyLead) && storyLead.length > 0 && (
          <div className="hero-story-lead">
            {storyLead.map((line, idx) => (
              <p key={idx} className={`lead-line line-${idx + 1}`}>
                {line}
              </p>
            ))}
          </div>
        )}

        {ctaText && (
          <div className="hero-cta-wrap">
            <button
              type="button"
              className="hero-story-cta-btn"
              onClick={onNext}
              aria-label="Begin our story"
            >
              <span className="btn-text">{ctaText}</span>
              <span className="btn-glow-ring" />
            </button>
            {scrollHint && <p className="hero-scroll-hint">{scrollHint}</p>}
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * PAGE 2 — HOW IT BEGAN
 */
export function Page2Began({ page = {}, onNext }) {
  const {
    badge = "Chapter I • The Beginning",
    heading = "It started with an arranged marriage…",
    messages = [
      "Two families brought two people together.",
      "Neither of us knew that this simple beginning would become something so beautiful."
    ],
    image = "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80",
    imageCaption = "Where two worlds gently converged",
    nextButtonText = "Next: Getting to Know You →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-began">
      <div className="section-ambient-glow" />
      {badge && <span className="section-step-badge">{badge}</span>}
      {heading && <h2 className="arranged-heading">{heading}</h2>}

      <div className={`arranged-story-grid ${!image ? 'no-image-layout' : ''}`}>
        {image && (
          <div className="arranged-visual-col">
            <div className="arranged-portrait-card">
              <div className="portrait-garland-arch">
                <span>🌸</span><span>🌿</span><span>🪷</span><span>🌿</span><span>🌸</span>
              </div>
              <div className="portrait-image-container">
                <img src={image} alt={imageCaption || "How it began"} className="arranged-wedding-img" />
                <div className="portrait-overlay-tint" />
              </div>
              {imageCaption && (
                <div className="portrait-caption">
                  <span className="caption-icon">💍</span>
                  <span className="caption-text">{imageCaption}</span>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="arranged-narrative-col">
          <div className="narrative-steps-list">
            {Array.isArray(messages) && messages.map((msg, idx) => (
              <div key={idx} className="narrative-step-card revealed">
                <div className="step-indicator">
                  <span className="step-number">0{idx + 1}</span>
                  <span className="step-line" />
                </div>
                <p className="step-content-text">{msg}</p>
              </div>
            ))}
          </div>

          {onNext && nextButtonText && (
            <div className="arranged-actions">
              <button type="button" className="btn-story-primary" onClick={onNext}>
                {nextButtonText}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/**
 * PAGE 3 — GETTING TO KNOW YOU
 */
export function Page3GettingToKnow({ page = {}, onNext }) {
  const {
    badge = "Chapter II • The Spark",
    heading = "Then we started getting to know each other…",
    subheading = "Somewhere between all those ordinary days…",
    messages = [
      "The conversations became longer.",
      "The smiles became easier.",
      "The awkwardness slowly disappeared.",
      "And somewhere between all those little moments… we became friends."
    ],
    revealText = "We became us.",
    image = "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80",
    imageCaption = "Where friendship turned into home ♡",
    nextButtonText = "Next: Falling in Love →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-gettingtoknow">
      <div className="cute-ambient-glow" />
      {badge && <span className="section-step-badge">{badge}</span>}
      {heading && <h2 className="gettingtoknow-title">{heading}</h2>}
      {subheading && <p className="gettingtoknow-subheading">{subheading}</p>}

      {revealText && (
        <div className="reveal-banner-cute">
          <span className="heart-accent">🤍</span>
          <h3 className="reveal-banner-text">{revealText}</h3>
        </div>
      )}

      <div className={`gettingtoknow-grid ${!image ? 'no-image-layout' : ''}`}>
        <div className="moments-tabs-container">
          <div className="gettingtoknow-messages-list">
            {Array.isArray(messages) && messages.map((msg, idx) => (
              <div key={idx} className="discrete-message-pill">
                <span className="pill-dot">✦</span>
                <p className="pill-text">{msg}</p>
              </div>
            ))}
          </div>
        </div>

        {image && (
          <div className="candid-polaroid-wrapper">
            <div className="cute-polaroid-frame">
              <div className="polaroid-pin">📌</div>
              <div className="polaroid-photo-box">
                <img src={image} alt="Getting to know each other" className="polaroid-img" />
              </div>
              {imageCaption && (
                <div className="polaroid-handwritten-note">
                  <p className="note-handwriting">"{imageCaption}"</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {onNext && nextButtonText && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * PAGE 4 — FALLING IN LOVE
 */
export function Page4FallingInLove({ page = {}, onNext }) {
  const [pulseActive, setPulseActive] = useState(false);
  const {
    badge = "Chapter III • The Turning Point",
    heading = "Somewhere along the way, I fell for you.",
    message = "You slowly became my favorite person, my safest place, and the person I wanted beside me through everything.",
    subtext = "The moment love stopped being a decision and became as natural as breathing.",
    image = "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1000&auto=format&fit=crop&q=80",
    heartPrompt = "Touch our heartbeat",
    nextButtonText = "Next: Our Love →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-fallinginlove">
      <div className="romantic-evening-glow" />
      <div className="heart-light-reflections" />

      {badge && <span className="section-step-badge romantic-badge">{badge}</span>}
      {heading && <h2 className="falling-heading">{heading}</h2>}

      <div className="falling-main-card">
        {image && (
          <div className="falling-visual-hero">
            <div className="hands-silhouette-frame">
              <img src={image} alt="Falling in love" className="falling-photo-img" />
              <div className="visual-vignette-overlay" />

              <div
                className={`romantic-heart-centerpiece ${pulseActive ? 'active' : ''}`}
                onClick={() => setPulseActive(!pulseActive)}
                title="Click to feel warmth"
              >
                <svg viewBox="0 0 40 40" className="elegant-heart-svg">
                  <defs>
                    <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFD1DC" stopOpacity="0.9" />
                      <stop offset="60%" stopColor="#D9A5B3" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#8B263E" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  <path
                    d="M20,35.5 C19.5,35.5 8,24.5 4,16.5 C0.5,9.5 4.5,2.5 12,2.5 C16,2.5 18.5,5.5 20,7.5 C21.5,5.5 24,2.5 28,2.5 C35.5,2.5 39.5,9.5 36,16.5 C32,24.5 20.5,35.5 20,35.5 Z"
                    fill="url(#heartGlow)"
                    stroke="#E5C378"
                    strokeWidth="1.2"
                  />
                </svg>
                {heartPrompt && <span className="heart-click-prompt">{heartPrompt}</span>}
              </div>
            </div>
          </div>
        )}

        <div className="falling-text-revelation">
          {message && <h3 className="falling-lead-quote">"{message}"</h3>}
          {subtext && <p className="falling-subtext">{subtext}</p>}
        </div>
      </div>

      {onNext && nextButtonText && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * PAGE 5 — OUR LOVE
 */
export function Page5OurLove({ page = {}, onNext }) {
  const {
    badge = "Chapter IV • The Bond",
    heading = "This isn't just love anymore.",
    messages = [
      { id: "ol-1", text: "It's understanding.", icon: "🕊️" },
      { id: "ol-2", text: "It's trust.", icon: "🤍" },
      { id: "ol-3", text: "It's chemistry.", icon: "✨" },
      { id: "ol-4", text: "It's choosing each other every day.", icon: "🌅" }
    ],
    highlightClimax = "It's the kind of love that feels like home.",
    subtext = "Built with devotion, laughter, and unspoken warmth.",
    nextButtonText = "Next: Our Little Life →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-ourlove">
      <div className="burgundy-warm-backdrop" />
      <div className="candlelight-flicker-overlay" />

      {badge && <span className="section-step-badge wine-badge">{badge}</span>}
      {heading && <h2 className="lovewebuilt-main-title">{heading}</h2>}

      {Array.isArray(messages) && messages.length > 0 && (
        <div className="pillars-grid">
          {messages.map((item, idx) => (
            <div key={item.id || idx} className="pillar-glass-card">
              <div className="pillar-flame-icon">
                <span className="candle-flame">{item.icon || "🕯️"}</span>
              </div>
              <h4 className="pillar-title">{item.text || item.title}</h4>
              {item.desc && <p className="pillar-desc">{item.desc}</p>}
            </div>
          ))}
        </div>
      )}

      {(highlightClimax || subtext) && (
        <div className="lovewebuilt-climax-box">
          <div className="climax-ornament">
            <span className="ornament-line" />
            <span className="ornament-gem">⚜️</span>
            <span className="ornament-line" />
          </div>
          {highlightClimax && <h3 className="climax-highlight-text">“{highlightClimax}”</h3>}
          {subtext && <p className="climax-sub">{subtext}</p>}
        </div>
      )}

      {onNext && nextButtonText && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-luxury" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * PAGE 6 — OUR LITTLE LIFE
 */
export function Page6OurLittleLife({ page = {}, onNext }) {
  const [activeMomentIdx, setActiveMomentIdx] = useState(null);
  const {
    badge = "Chapter V • Married Life",
    heading = "Our little life together…",
    subtitle = "All the ordinary moments that became extraordinary because we shared them.",
    messages = [],
    warmthQuote = "Finding someone who makes ordinary days feel like poetry.",
    nextButtonText = "Next: What You Mean to Me →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-ourlittlelife">
      <div className="settled-warm-ambient" />
      {badge && <span className="section-step-badge">{badge}</span>}
      {heading && <h2 className="ourlittlelife-heading">{heading}</h2>}
      {subtitle && <p className="ourlittlelife-subtitle">{subtitle}</p>}

      {Array.isArray(messages) && messages.length > 0 && (
        <div className="married-moments-grid">
          {messages.map((item, idx) => (
            <div
              key={item.id || idx}
              className={`married-moment-tile ${activeMomentIdx === idx ? 'expanded' : ''}`}
              onClick={() => setActiveMomentIdx(activeMomentIdx === idx ? null : idx)}
              onMouseEnter={() => setActiveMomentIdx(idx)}
            >
              <div className="tile-icon-bubble">
                <span className="tile-emoji">{item.icon || "🤍"}</span>
              </div>
              <div className="tile-text-wrap">
                {item.title && <h4 className="tile-title">{item.title}</h4>}
                {(item.desc || item.text) && <p className="tile-desc">{item.desc || item.text}</p>}
              </div>
              <div className="tile-hover-glow" />
            </div>
          ))}
        </div>
      )}

      {warmthQuote && (
        <div className="marriage-warmth-quote">
          <span className="quote-heart-ico">🏡</span>
          <p className="warmth-quote-text">"{warmthQuote}"</p>
        </div>
      )}

      {onNext && nextButtonText && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * PAGE 7 — WHAT YOU MEAN TO ME
 */
export function Page7WhatYouMean({ page = {}, onNext }) {
  const [selectedWord, setSelectedWord] = useState(0);
  const {
    badge = "Chapter VI • Appreciation",
    heading = "You are so much more than my partner.",
    subtitle = "Tap each card to unveil what you mean to my heart:",
    cards = [],
    nextButtonText = "Next: Our Forever →"
  } = page;

  return (
    <section className="tpl3-section tpl3-page-whatyoumean">
      <div className="us-aura-glow" />
      {badge && <span className="section-step-badge">{badge}</span>}
      {heading && <h2 className="interactiveus-title">{heading}</h2>}
      {subtitle && <p className="interactiveus-sub">{subtitle}</p>}

      {Array.isArray(cards) && cards.length > 0 && (
        <div className="us-cards-flex">
          {cards.map((item, idx) => {
            const isSelected = selectedWord === idx;
            return (
              <div
                key={item.id || idx}
                className={`us-floating-card ${isSelected ? 'active' : ''}`}
                onClick={() => setSelectedWord(idx)}
                onMouseEnter={() => setSelectedWord(idx)}
              >
                <div className="card-top-indicator">
                  <span className="card-dot" />
                  <span className="card-label">0{idx + 1}</span>
                </div>
                {item.title && <h3 className="us-word-heading">{item.title}</h3>}
                {item.desc && <p className="us-word-meaning">{item.desc}</p>}
                <div className="card-halo-effect" />
              </div>
            );
          })}
        </div>
      )}

      {cards[selectedWord] && (
        <div className="us-spotlight-display">
          <span className="spotlight-quote-mark">“</span>
          <p className="spotlight-quote-text">{cards[selectedWord].desc}</p>
          <span className="spotlight-tag">— {cards[selectedWord].title}</span>
        </div>
      )}

      {onNext && nextButtonText && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

/**
 * PAGE 8 — OUR FOREVER
 */
export function Page8OurForever({ page = {}, onCelebrationToggle, onNext }) {
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const {
    badge = "Chapter VII • The Promise",
    heading = "And this is only the beginning…",
    message = "Here's to more mornings together, more adventures, more laughter, more memories, and a lifetime of choosing each other.",
    emphasis = "Today. Tomorrow. Always.",
    buttonText = "Forever ♡",
    celebratedText = "Forever & Always With You ✨",
    revealNote = "Every day with you is my favorite chapter.",
    nextButtonText = "Next: Final Anniversary Message →"
  } = page;

  const handleForeverClick = () => {
    setHasCelebrated(true);
    if (onCelebrationToggle) {
      onCelebrationToggle(true);
    }
  };

  return (
    <section className="tpl3-section tpl3-page-ourforever">
      <div className="celebration-champagne-light" />
      <div className="celebration-golden-rays" />

      <div className="celebration-content-wrapper">
        <div className="celebration-crest-box">
          <div className="crest-rings-icon">
            <svg viewBox="0 0 100 60" width="80" height="48">
              <circle cx="38" cy="30" r="20" fill="none" stroke="#D4AF37" strokeWidth="3.5" />
              <circle cx="62" cy="30" r="20" fill="none" stroke="#E5C378" strokeWidth="3.5" />
              <polygon points="38,8 41,12 38,16 35,12" fill="#FFFFFF" />
            </svg>
          </div>
          {badge && <span className="celebration-subhead">{badge}</span>}
        </div>

        {heading && <h2 className="celebration-main-title">{heading}</h2>}
        {message && <p className="celebration-toast-text">{message}</p>}
        {emphasis && <h3 className="forever-emphasis-text">{emphasis}</h3>}

        {buttonText && (
          <div className="celebration-action-area">
            <button
              type="button"
              className={`btn-forever-interactive ${hasCelebrated ? 'celebrated' : ''}`}
              onClick={handleForeverClick}
            >
              <span className="forever-heart-icon">♡</span>
              <span className="forever-btn-text">
                {hasCelebrated ? celebratedText : buttonText}
              </span>
              <span className="forever-glow-aura" />
            </button>

            {hasCelebrated && revealNote && (
              <div className="forever-faded-note">
                <p className="forever-note-text">"{revealNote}"</p>
              </div>
            )}
          </div>
        )}

        {onNext && nextButtonText && (
          <div className="stage-forward-action celebration-nav">
            <button type="button" className="btn-story-primary" onClick={onNext}>
              {nextButtonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * PAGE 9 — FINAL ANNIVERSARY MESSAGE
 */
export function Page9Final({ page = {}, recipientName = "Aditi & Vikram", onReplay }) {
  const [copied, setCopied] = useState(false);
  const {
    heading = "Happy Anniversary, My Love",
    stanzas = [
      "We didn't just get married.",
      "We built a life.",
      "We found a love.",
      "And somehow… we found home in each other."
    ],
    finalSignoff = "Forever with you. ❤️",
    monogramDate = "November 24",
    replayButtonText = "↺ Replay Our Story",
    shareButtonText = "Share Love Story 💌"
  } = page;

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="tpl3-section tpl3-page-final">
      <div className="pure-ivory-ambient" />

      <div className="finalhome-inner-container">
        <div className="final-crest-monogram">
          <span className="monogram-initials">A & V</span>
          <span className="monogram-divider">✦</span>
          {monogramDate && <span className="monogram-date">{monogramDate}</span>}
        </div>

        {Array.isArray(stanzas) && stanzas.length > 0 && (
          <div className="final-stanzas">
            {stanzas.map((line, idx) => (
              <p key={idx} className={`final-line stanza-${idx + 1}`}>
                {line}
              </p>
            ))}
          </div>
        )}

        <div className="final-grand-reveal">
          {heading && <h1 className="final-climax-text">“{heading}”</h1>}
          {finalSignoff && <h2 className="final-happy-anniv">{finalSignoff}</h2>}
          {recipientName && (
            <p className="final-forever-names">
              Forever in love, <span className="gold-name">{recipientName}</span>
            </p>
          )}
        </div>

        <div className="final-action-buttons">
          {replayButtonText && (
            <button type="button" className="btn-replay-story" onClick={onReplay}>
              {replayButtonText}
            </button>
          )}
          {shareButtonText && (
            <button type="button" className="btn-share-story" onClick={handleShare}>
              {copied ? "Link Copied to Clipboard ✨" : shareButtonText}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
