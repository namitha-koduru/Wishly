import React, { useState, useEffect, useRef } from 'react';
import './JustBecauseTemplate1.css';

const DEFAULT_SCRAPS = [
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
  const normalizedData = data.config || data.customData || data;

  const {
    recipientName = 'Avery',
    senderName = 'Morgan',
    message = 'You make ordinary days feel a little less ordinary.',
    photos = ['https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'],
    reasons = null
  } = normalizedData;

  const photoUrls = (Array.isArray(photos) ? photos : [])
    .map((p) => (typeof p === 'object' && p ? p.url : p))
    .filter(Boolean);

  const heroPhoto = photoUrls[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80';

  // State
  const [activeDot, setActiveDot] = useState('scene-01');
  const [selectedScrapIndex, setSelectedScrapIndex] = useState(null);
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [isDriftActive, setIsDriftActive] = useState(false);
  const [scrapsInView, setScrapsInView] = useState(false);
  const [visibleNoteLines, setVisibleNoteLines] = useState([false, false, false, false]);

  // Refs
  const containerRef = useRef(null);
  const storyRef = useRef(null);
  const heroRef = useRef(null);
  const noteRef = useRef(null);
  const psstRef = useRef(null);
  const scrapsRef = useRef(null);

  // Scraps items
  const scrapsList = Array.isArray(reasons) && reasons.length >= 3
    ? reasons.slice(0, 6).map((reason, idx) => ({
        id: idx + 1,
        label: typeof reason === 'object' ? reason.title || reason.label || `reason ${idx + 1}` : `thought ${idx + 1}`,
        thought: typeof reason === 'object' ? reason.description || reason.desc || reason.text || reason.thought : reason,
        className: `scrap--${(idx % 6) + 1}`
      }))
    : DEFAULT_SCRAPS;

  // Reduced motion preference
  const isReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Generic reveal-up on scroll
  useEffect(() => {
    if (!containerRef.current) return;

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
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  // 2. Navigation Active Dot Observer
  useEffect(() => {
    if (!containerRef.current) return;

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
      { threshold: 0.4 }
    );

    sections.forEach((sec) => navObserver.observe(sec));

    return () => {
      navObserver.disconnect();
    };
  }, []);

  // 3. Story Scroll (Hero -> Note sticky transition)
  useEffect(() => {
    if (isReducedMotion) {
      setVisibleNoteLines([true, true, true, true]);
      return;
    }

    const clamp01 = (n) => Math.min(1, Math.max(0, n));

    const updateStory = () => {
      const story = storyRef.current;
      const hero = heroRef.current;
      const note = noteRef.current;

      if (!story) return;

      const rect = story.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;

      // Hero recedes
      const heroY = progress * -32;
      const heroOpacity = clamp01(1 - progress * 1.5);
      const heroBlur = progress * 5;

      if (hero) {
        hero.style.transform = `translateY(${heroY}vh)`;
        hero.style.opacity = heroOpacity;
        hero.style.filter = heroBlur > 0.15 ? `blur(${heroBlur}px)` : 'none';
      }

      // Note arrives
      const noteRaw = clamp01((progress - 0.28) / 0.55);
      const noteY = (1 - noteRaw) * 42;
      const noteOpacity = clamp01(noteRaw * 1.6);
      const noteRot = -1.4 + noteRaw * 1.4;

      if (note) {
        note.style.transform = `translateY(${noteY}vh) rotate(${noteRot}deg)`;
        note.style.opacity = noteOpacity;
      }

      // Progressive line reveal
      const thresholds = [0.42, 0.56, 0.7, 0.86];
      setVisibleNoteLines(thresholds.map((t) => progress > t));
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateStory();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateStory();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isReducedMotion]);

  // 4. Scraps entrance observer
  useEffect(() => {
    if (!scrapsRef.current) return;

    const scrapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setScrapsInView(true);
            scrapObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    scrapObserver.observe(scrapsRef.current);

    return () => scrapObserver.disconnect();
  }, []);

  // 5. Small surprise drift observer
  useEffect(() => {
    if (isReducedMotion || !psstRef.current) return;

    const driftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setIsDriftActive(true), 350);
            driftObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
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
             SCENE 01 + 02 — HERO ("Just because.") that yields to
             a hand-placed note as the user scrolls.
        ============================================================ */}
        <section className="story" id="scene-01" ref={storyRef} style={{ '--story-height': '240vh' }}>
          <div className="story__stage">
            {/* HERO LAYER */}
            <div className="hero" ref={heroRef} data-layer="hero">
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
              <div className="hero__scroll-cue reveal reveal--6" aria-hidden="true">
                <span className="hero__scroll-line" />
                <span className="hero__scroll-word">scroll</span>
              </div>
            </div>

            {/* NOTE LAYER */}
            <div className="note" ref={noteRef} data-layer="note">
              <div className="note__card">
                <span className="note__pin" aria-hidden="true" />
                <p className={`note__line ${visibleNoteLines[0] ? 'is-visible' : ''}`} data-note-line="1">
                  No birthday.
                </p>
                <p className={`note__line ${visibleNoteLines[1] ? 'is-visible' : ''}`} data-note-line="2">
                  No anniversary.
                </p>
                <p className={`note__line ${visibleNoteLines[2] ? 'is-visible' : ''}`} data-note-line="3">
                  No big reason.
                </p>
                <p
                  className={`note__line note__line--signature ${visibleNoteLines[3] ? 'is-visible' : ''}`}
                  data-note-line="4"
                >
                  {recipientName ? `For ${recipientName}, I just thought of you.` : 'I just thought of you.'}
                </p>
              </div>
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
                  onClick={() => setSelectedScrapIndex(index)}
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
             SCENE 06 — final, quiet close
        ============================================================ */}
        <section className="scene scene--final" id="scene-06">
          <div className="scene__inner scene__inner--center">
            <h2 className="final__title reveal-up">
              No occasion.<br />
              Just {recipientName ? recipientName : 'you'}.
            </h2>
            <p className="final__sub reveal-up">Some things are worth doing simply because you can.</p>
            <a href="/templates" className="final__cta reveal-up">
              make another little something →
            </a>
            <p className="final__footer">made with Wishly &hearts;</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export const JustForYouTemplate = JustBecauseTemplate1;
export default JustBecauseTemplate1;
