import React from 'react';

/**
 * Custom Section Types for Anniversary Template 3
 */

export function LoveLetterSection({ data, onNext }) {
  const {
    badge = "From My Heart",
    heading = "A Letter to My Beloved",
    salutation = "My Dearest,",
    paragraphs = [
      "When I look back on everything we've built, my heart overflows with gratitude. You have brought so much warmth, laughter, and calm into my life.",
      "Every ordinary day with you is a blessing, and I promise to cherish and love you more with every passing sunrise."
    ],
    signoff = "Forever Yours,",
    signature = "Vikram",
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-loveletter-stage">
      <div className="loveletter-parchment-card">
        <div className="letter-wax-seal">💌</div>
        {badge && <span className="section-step-badge">{badge}</span>}
        <h2 className="letter-main-title">{heading}</h2>

        <div className="letter-body-content">
          <p className="letter-salutation">{salutation}</p>
          {Array.isArray(paragraphs) ? (
            paragraphs.map((p, idx) => (
              <p key={idx} className="letter-paragraph">{p}</p>
            ))
          ) : (
            <p className="letter-paragraph">{paragraphs}</p>
          )}
          <div className="letter-closing">
            <p className="letter-signoff">{signoff}</p>
            <p className="letter-signature-script">{signature}</p>
          </div>
        </div>
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export function PhotoGallerySection({ data, onNext }) {
  const {
    badge = "Our Captured Memories",
    heading = "Moments We Cherish",
    subtitle = "A glimpse into our happiest days together",
    photos = [],
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-gallery-stage">
      {badge && <span className="section-step-badge">{badge}</span>}
      <h2 className="gallery-main-title">{heading}</h2>
      {subtitle && <p className="gallery-subtitle">{subtitle}</p>}

      <div className="gallery-photos-grid">
        {photos.map((photo, idx) => (
          <div key={idx} className="gallery-photo-card">
            <div className="gallery-img-box">
              <img src={photo.src || photo.url} alt={photo.caption || `Memory ${idx + 1}`} />
            </div>
            {(photo.caption || photo.date) && (
              <div className="gallery-caption-box">
                {photo.caption && <p className="gallery-caption-title">{photo.caption}</p>}
                {photo.date && <span className="gallery-caption-date">{photo.date}</span>}
              </div>
            )}
          </div>
        ))}
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export function TimelineSection({ data, onNext }) {
  const {
    badge = "Our Journey",
    heading = "Milestones of Our Love",
    subtitle = "How every chapter brought us closer together",
    events = [],
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-timeline-stage">
      {badge && <span className="section-step-badge">{badge}</span>}
      <h2 className="timeline-main-title">{heading}</h2>
      {subtitle && <p className="timeline-subtitle">{subtitle}</p>}

      <div className="timeline-trail-container">
        {events.map((event, idx) => (
          <div key={idx} className="timeline-event-card">
            <div className="timeline-node">
              <span className="node-dot" />
              <span className="node-line" />
            </div>
            <div className="timeline-event-body">
              <span className="event-date-pill">{event.date}</span>
              <h4 className="event-title">{event.title}</h4>
              <p className="event-desc">{event.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export function ReasonsLoveSection({ data, onNext }) {
  const {
    badge = "Why You're My World",
    heading = "Reasons Why I Love You",
    subtitle = "A few out of a million reasons…",
    reasons = [],
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-reasons-stage">
      {badge && <span className="section-step-badge">{badge}</span>}
      <h2 className="reasons-main-title">{heading}</h2>
      {subtitle && <p className="reasons-subtitle">{subtitle}</p>}

      <div className="reasons-cards-grid">
        {reasons.map((item, idx) => (
          <div key={item.id || idx} className="reason-glass-card">
            <div className="reason-num-badge">{item.number || `0${idx + 1}`}</div>
            <h4 className="reason-card-title">{item.title}</h4>
            <p className="reason-card-desc">{item.desc}</p>
          </div>
        ))}
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export function QuoteSection({ data, onNext }) {
  const {
    badge = "A Promise",
    quote = "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
    author = "Forever & Always With You",
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-quote-stage">
      <div className="featured-quote-card">
        {badge && <span className="section-step-badge">{badge}</span>}
        <span className="quote-big-glyph">“</span>
        <blockquote className="featured-quote-body">
          {quote}
        </blockquote>
        {author && <cite className="featured-quote-author">— {author}</cite>}
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}

export function CustomSection({ data, onNext }) {
  const {
    badge = "Special Message",
    heading = "To My Everything",
    bodyText = "Write your own romantic message, special memory, inside joke, or blessing here.",
    image,
    imageCaption,
    nextButtonText = "Continue Our Journey →"
  } = data;

  return (
    <section className="tpl3-section tpl3-custom-stage">
      {badge && <span className="section-step-badge">{badge}</span>}
      <h2 className="custom-section-heading">{heading}</h2>

      <div className="custom-section-content-box">
        {image && (
          <div className="custom-image-wrapper">
            <img src={image} alt={heading} className="custom-sec-img" />
            {imageCaption && <p className="custom-sec-caption">{imageCaption}</p>}
          </div>
        )}
        <div className="custom-body-text">
          {bodyText.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {onNext && (
        <div className="stage-forward-action">
          <button type="button" className="btn-story-primary" onClick={onNext}>
            {nextButtonText}
          </button>
        </div>
      )}
    </section>
  );
}
