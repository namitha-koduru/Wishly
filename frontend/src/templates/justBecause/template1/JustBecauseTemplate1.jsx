import React, { useState, useEffect, useRef, useMemo } from 'react';
import './JustBecauseTemplate1.css';

const DEFAULT_THOUGHTS = [
  {
    id: 1,
    label: 'thinking of you',
    thought: "I've missed talking to you lately, more than I usually say.",
    className: 'scrap--1'
  },
  {
    id: 2,
    label: 'miss you',
    thought: "It's been a while, and honestly, I miss you.",
    className: 'scrap--2'
  },
  {
    id: 3,
    label: "I'm proud of you",
    thought: 'Watching you figure things out lately has made me quietly proud.',
    className: 'scrap--3'
  },
  {
    id: 4,
    label: 'thank you',
    thought: 'For being exactly who you are, even on the ordinary days.',
    className: 'scrap--4'
  },
  {
    id: 5,
    label: 'you made today better',
    thought: 'I hope something small went right for you today.',
    className: 'scrap--5'
  },
  {
    id: 6,
    label: 'just wanted to say hi',
    thought: 'No big update, no news. Just wanted to say hi.',
    className: 'scrap--6'
  }
];

export function JustBecauseTemplate1({ data = {} }) {
  const incoming = data || {};
  const nested = incoming.config || incoming.customData || {};

  const recipientName = incoming.recipientName || nested.recipientName || 'Avery';
  const senderName = incoming.senderName || nested.senderName || 'Morgan';
  const message = incoming.message || nested.message || 'You make ordinary days feel a little less ordinary.';
  
  const rawPhotos = incoming.photos || nested.photos || [];
  const photoUrls = (Array.isArray(rawPhotos) ? rawPhotos : [])
    .map((p) => (typeof p === 'object' && p ? p.url : p))
    .filter(Boolean);

  const heroPhoto = photoUrls[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80';

  const rawReasons = incoming.reasons || nested.reasons;

  // Build customized scraps list with both Name (label) and Description (thought)
  const scrapsList = useMemo(() => {
    if (Array.isArray(rawReasons) && rawReasons.length > 0) {
      return rawReasons.map((reason, idx) => {
        if (typeof reason === 'string') {
          const defaultLabels = [
            'thinking of you',
            'miss you',
            "I'm proud of you",
            'thank you',
            'you made today better',
            'just wanted to say hi'
          ];
          return {
            id: idx + 1,
            label: defaultLabels[idx % defaultLabels.length] || `thought #${idx + 1}`,
            thought: reason,
            className: `scrap--${(idx % 6) + 1}`
          };
        }
        return {
          id: idx + 1,
          label: reason.label || reason.title || `thought #${idx + 1}`,
          thought: reason.thought || reason.description || reason.desc || reason.text || '',
          className: `scrap--${(idx % 6) + 1}`
        };
      });
    }
    return DEFAULT_THOUGHTS;
  }, [rawReasons]);

  // State: Start with NO thought selected initially
  const [activeDot, setActiveDot] = useState('scene-01');
  const [selectedScrapIndex, setSelectedScrapIndex] = useState(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isDriftActive, setIsDriftActive] = useState(false);
  const [scrapsInView, setScrapsInView] = useState(false);

  // Refs
  const containerRef = useRef(null);
  const psstRef = useRef(null);
  const scrapsRef = useRef(null);

  // Reduced motion preference
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Helper to find scroll parent
  const getScrollParent = (node) => {
    if (!node) return window;
    let current = node.parentElement;
    while (current && current !== document.body && current !== document.documentElement) {
      const style = window.getComputedStyle(current);
      if (style.overflowY === 'auto' || style.overflowY === 'scroll') {
        return current;
      }
      current = current.parentElement;
    }
    return window;
  };

  // 1. Deselect thoughts when tapping anywhere outside the scraps container
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (scrapsRef.current && !scrapsRef.current.contains(e.target)) {
        setSelectedScrapIndex(null);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  // 2. Generic reveal-up on scroll
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollParent = getScrollParent(containerRef.current);
    const observerRoot = scrollParent === window ? null : scrollParent;

    const revealTargets = containerRef.current.querySelectorAll('.reveal-up');
    if (!revealTargets.length) return;

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { root: observerRoot, threshold: 0.1, rootMargin: '0px 0px -5% 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // 3. Navigation Active Dot Observer
  useEffect(() => {
    if (!containerRef.current) return;

    const scrollParent = getScrollParent(containerRef.current);
    const observerRoot = scrollParent === window ? null : scrollParent;

    const sectionIds = ['scene-01', 'scene-03', 'scene-04', 'scene-05', 'scene-06'];
    const sections = sectionIds
      .map((id) => containerRef.current.querySelector(`#${id}`))
      .filter(Boolean);

    if (!sections.length) return;

    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveDot(entry.target.id);
          }
        });
      },
      { root: observerRoot, threshold: 0.3 }
    );

    sections.forEach((sec) => navObserver.observe(sec));

    return () => {
      navObserver.disconnect();
    };
  }, []);

  // 4. Scraps entrance observer
  useEffect(() => {
    if (!scrapsRef.current || !containerRef.current) return;

    const scrollParent = getScrollParent(containerRef.current);
    const observerRoot = scrollParent === window ? null : scrollParent;

    const scrapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrapsInView(true);
            scrapObserver.unobserve(entry.target);
          }
        });
      },
      { root: observerRoot, threshold: 0.15 }
    );

    scrapObserver.observe(scrapsRef.current);

    return () => scrapObserver.disconnect();
  }, []);

  // 5. Small surprise drift observer
  useEffect(() => {
    if (isReducedMotion || !psstRef.current || !containerRef.current) return;

    const scrollParent = getScrollParent(containerRef.current);
    const observerRoot = scrollParent === window ? null : scrollParent;

    const driftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsDriftActive(true), 350);
            driftObserver.unobserve(entry.target);
          }
        });
      },
      { root: observerRoot, threshold: 0.4 }
    );

    driftObserver.observe(psstRef.current);

    return () => driftObserver.disconnect();
  }, [isReducedMotion]);

  // Smooth Navigation Click
  const handleNavClick = (targetId) => {
    if (!containerRef.current) return;
    const el = containerRef.current.querySelector(`#${targetId}`);
    if (el) {
      el.scrollIntoView({
        behavior: isReducedMotion ? 'auto' : 'smooth',
        block: 'start'
      });
    }
  };

  // Replay Page from the Beginning
  const handleReplay = () => {
    if (!containerRef.current) return;
    const scrollParent = getScrollParent(containerRef.current);
    if (scrollParent === window) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scrollParent.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setActiveDot('scene-01');
    setSelectedScrapIndex(null);
  };

  // Scrap click handler allowing selecting any thought or toggling selection
  const handleScrapClick = (e, index) => {
    e.stopPropagation();
    setSelectedScrapIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="wishly-just-because-template-1 just-because-template" ref={containerRef}>
      {/* Decorative grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* ============ SIDE / BOTTOM NAVIGATION ============ */}
      <nav className="scene-nav" aria-label="Page sections">
        <button
          type="button"
          className={`scene-nav__dot ${activeDot === 'scene-01' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('scene-01')}
          aria-label="Go to: hello"
        >
          01
        </button>
        <button
          type="button"
          className={`scene-nav__dot ${activeDot === 'scene-03' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('scene-03')}
          aria-label="Go to: maybe"
        >
          02
        </button>
        <button
          type="button"
          className={`scene-nav__dot ${activeDot === 'scene-04' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('scene-04')}
          aria-label="Go to: remember"
        >
          03
        </button>
        <button
          type="button"
          className={`scene-nav__dot ${activeDot === 'scene-05' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('scene-05')}
          aria-label="Go to: one more thing"
        >
          04
        </button>
        <button
          type="button"
          className={`scene-nav__dot ${activeDot === 'scene-06' ? 'is-active' : ''}`}
          onClick={() => handleNavClick('scene-06')}
          aria-label="Go to: just you"
        >
          05
        </button>
      </nav>

      <main>
        {/* ============================================================
             SCENE 01 — HERO + NOTE CARD (Clean vertical flow below signature)
        ============================================================ */}
        <section className="story" id="scene-01">
          <div className="story__container">
            {/* HERO LAYER */}
            <div className="hero">
              <p className="hero__eyebrow reveal reveal--1">no occasion</p>
              <h1 className="hero__title" aria-label="Just because.">
                <span className="hero__title-line hero__title-line--just reveal reveal--2">Just</span>
                <span className="hero__title-line hero__title-line--because reveal reveal--3">because.</span>
              </h1>
              <p className="hero__sub reveal reveal--4">
                No occasion. No reason.<br />
                I just wanted to make {recipientName ? `${recipientName} smile.` : 'you smile.'}
              </p>
              <p className="hero__signature reveal reveal--5">
                — {senderName ? senderName : 'from someone who thought of you today'}
              </p>
            </div>

            {/* NOTE CARD — Sits cleanly below the signature in the empty space */}
            <div className="note-card-section reveal reveal--6">
              <div className="note__card">
                <span className="note__pin" aria-hidden="true" />
                <p className="note__line" data-note-line="1">
                  No birthday.
                </p>
                <p className="note__line" data-note-line="2">
                  No anniversary.
                </p>
                <p className="note__line" data-note-line="3">
                  No big reason.
                </p>
                <p className="note__line note__line--signature" data-note-line="4">
                  {recipientName ? `For ${recipientName}, I just thought of you.` : 'I just thought of you.'}
                </p>
              </div>
            </div>

            <div className="hero__scroll-cue reveal reveal--6" aria-hidden="true">
              <span className="hero__scroll-line" />
              <span className="hero__scroll-word">scroll</span>
            </div>
          </div>
        </section>

        {/* ============================================================
             SCENE 03 — "Maybe I did have a reason." Scattered notes.
        ============================================================ */}
        <section className="scene scene--reasons" id="scene-03">
          <div className="scene__inner">
            <h2 className="scene__heading reveal-up">Maybe I did have a reason.</h2>

            <div
              className={`scraps ${scrapsInView ? 'in-view' : ''} ${selectedScrapIndex !== null ? 'has-selection' : ''}`}
              id="scraps"
              ref={scrapsRef}
            >
              {scrapsList.map((scrap, index) => (
                <button
                  key={scrap.id}
                  type="button"
                  className={`scrap ${scrap.className} ${selectedScrapIndex === index ? 'is-selected' : ''}`}
                  data-thought={scrap.thought}
                  onClick={(e) => handleScrapClick(e, index)}
                  aria-pressed={selectedScrapIndex === index}
                >
                  {scrap.label}
                </button>
              ))}
            </div>

            <div
              className={`scraps__selected ${selectedScrapIndex !== null ? 'is-visible' : ''}`}
              id="scrapsSelected"
              aria-live="polite"
            >
              <p className="scraps__selected-quote" id="scrapsSelectedQuote">
                {selectedScrapIndex !== null ? scrapsList[selectedScrapIndex]?.thought : ''}
              </p>
              <p className="scraps__selected-follow">So I made you this little corner of the internet.</p>
            </div>
          </div>
        </section>

        {/* ============================================================
             SCENE 04 — the photograph + the secret letter
        ============================================================ */}
        <section className="scene scene--memory" id="scene-04">
          <div className="scene__inner scene__inner--memory">
            <div className="photo reveal-up">
              <div className="photo__frame">
                <div
                  className="photo__image"
                  data-placeholder-photo
                  style={
                    heroPhoto
                      ? {
                          backgroundImage: `url("${heroPhoto}")`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }
                      : undefined
                  }
                >
                  {heroPhoto && (
                    <img
                      src={heroPhoto}
                      alt={recipientName ? `Special moment with ${recipientName}` : 'Special memory'}
                      style={{ opacity: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  )}
                </div>
              </div>
              <span className="photo__tape" aria-hidden="true" />
              <p className="photo__annotation">one of my favourites</p>
            </div>

            <div className="letter">
              <p className="letter__lead reveal-up">There's one more thing.</p>
              <button
                type="button"
                className="letter__open"
                id="envelopeButton"
                aria-expanded={isEnvelopeOpen}
                onClick={() => setIsEnvelopeOpen((prev) => !prev)}
              >
                <span className="envelope" id="envelope">
                  <span className="envelope__flap" aria-hidden="true" />
                  <span className="envelope__body" aria-hidden="true" />
                  <span className="envelope__letter" aria-hidden="true" />
                </span>
                <span className="letter__open-label">
                  {isEnvelopeOpen ? 'close it' : 'open it'}
                </span>
              </button>

              <div
                className={`letter__message ${isEnvelopeOpen ? 'is-open' : ''}`}
                id="letterMessage"
              >
                <p data-editable-message>{message || 'You make ordinary days feel a little less ordinary.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ============================================================
             SCENE 05 — the small surprise ("You're loved.")
        ============================================================ */}
        <section className="scene scene--surprise" id="scene-05">
          <div className="scene__inner scene__inner--center">
            <p className="surprise__psst reveal-up" id="psst" ref={psstRef}>
              psst&hellip;
            </p>

            <div
              className={`surprise__drift ${isDriftActive ? 'is-active' : ''}`}
              id="drift"
              aria-hidden="true"
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <h2 className="surprise__title reveal-up">
              You&rsquo;re loved.<br />
              <span className="surprise__title-sub">Just in case you forgot.</span>
            </h2>
          </div>
        </section>

        {/* ============================================================
             SCENE 06 — final, quiet close with replay action
        ============================================================ */}
        <section className="scene scene--final" id="scene-06">
          <div className="scene__inner scene__inner--center">
            <h2 className="final__title reveal-up">
              No occasion.<br />
              Just {recipientName ? recipientName : 'you'}.
            </h2>
            <p className="final__sub reveal-up">Some things are worth doing simply because you can.</p>
            <button
              type="button"
              className="final__cta final__replay-btn reveal-up"
              onClick={handleReplay}
              title="Replay from the beginning"
            >
              Just because......... ↺
            </button>
            <p className="final__footer">made with Wishly &hearts;</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export const JustForYouTemplate = JustBecauseTemplate1;
export default JustBecauseTemplate1;
