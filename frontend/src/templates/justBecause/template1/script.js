(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------------------------------------------------
     1. GENERIC "reveal-up" ON-SCROLL ENTRANCE
     One shared IntersectionObserver drives every fade/rise element
     instead of a scroll listener per element.
  ------------------------------------------------------------- */
  const revealTargets = document.querySelectorAll(".reveal-up");
  if (revealTargets.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* -------------------------------------------------------------
     2. SCENE NAVIGATION — active dot + click-to-jump
  ------------------------------------------------------------- */
  const navDots = document.querySelectorAll(".scene-nav__dot");
  const navSections = Array.from(navDots)
    .map((dot) => document.getElementById(dot.dataset.target))
    .filter(Boolean);

  navDots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const target = document.getElementById(dot.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
      }
    });
  });

  if (navSections.length) {
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            navDots.forEach((dot) => dot.classList.remove("is-active"));
            const active = document.querySelector(
              `.scene-nav__dot[data-target="${entry.target.id}"]`
            );
            if (active) active.classList.add("is-active");
          }
        });
      },
      { threshold: 0.5 }
    );
    navSections.forEach((section) => navObserver.observe(section));
  }

  /* -------------------------------------------------------------
     3. STORY SCROLL (hero -> note) — single rAF-throttled listener
     Reads scroll position once per frame and writes a handful of
     CSS custom properties; all visual motion happens in CSS.
  ------------------------------------------------------------- */
  const story = document.querySelector(".story");
  const heroLayer = story ? story.querySelector('[data-layer="hero"]') : null;
  const noteLayer = story ? story.querySelector('[data-layer="note"]') : null;
  const noteLines = story ? story.querySelectorAll(".note__line") : [];

  function clamp01(n) {
    return Math.min(1, Math.max(0, n));
  }

  function updateStory() {
    if (!story || reduceMotion) return;

    const rect = story.getBoundingClientRect();
    const scrollable = rect.height - window.innerHeight;
    const progress = scrollable > 0 ? clamp01(-rect.top / scrollable) : 0;

    // hero recedes: rises, fades, softly blurs
    const heroY = progress * -32; // vh
    const heroOpacity = clamp01(1 - progress * 1.5);
    const heroBlur = progress * 5; // px

    if (heroLayer) {
      heroLayer.style.transform = `translateY(${heroY}vh)`;
      heroLayer.style.opacity = heroOpacity;
      heroLayer.style.filter = heroBlur > 0.15 ? `blur(${heroBlur}px)` : "none";
    }

    // note arrives from below, gently settles
    const noteRaw = clamp01((progress - 0.28) / 0.55);
    const noteY = (1 - noteRaw) * 42; // vh
    const noteOpacity = clamp01(noteRaw * 1.6);
    const noteRot = -1.4 + noteRaw * 1.4;

    if (noteLayer) {
      noteLayer.style.transform = `translateY(${noteY}vh) rotate(${noteRot}deg)`;
      noteLayer.style.opacity = noteOpacity;
    }

    // progressive line reveal within the note
    const thresholds = [0.42, 0.56, 0.7, 0.86];
    noteLines.forEach((line, i) => {
      if (progress > thresholds[i]) {
        line.classList.add("is-visible");
      } else {
        line.classList.remove("is-visible");
      }
    });
  }

  let ticking = false;
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateStory();
        ticking = false;
      });
      ticking = true;
    }
  }

  if (story && !reduceMotion) {
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateStory();
  } else if (noteLines.length) {
    // reduced motion: just show the finished note state
    noteLines.forEach((line) => line.classList.add("is-visible"));
  }

  /* -------------------------------------------------------------
     4. SCATTERED "REASON" NOTES
  ------------------------------------------------------------- */
  const scrapsWrap = document.getElementById("scraps");
  const scrapsSelected = document.getElementById("scrapsSelected");
  const scrapsQuote = document.getElementById("scrapsSelectedQuote");

  if (scrapsWrap) {
    const scrapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            scrapObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    scrapObserver.observe(scrapsWrap);

    scrapsWrap.querySelectorAll(".scrap").forEach((scrap) => {
      scrap.addEventListener("click", () => {
        scrapsWrap.querySelectorAll(".scrap").forEach((s) => s.classList.remove("is-selected"));
        scrap.classList.add("is-selected");
        scrapsWrap.classList.add("has-selection");

        if (scrapsQuote) scrapsQuote.textContent = scrap.dataset.thought || scrap.textContent;
        if (scrapsSelected) scrapsSelected.classList.add("is-visible");
      });
    });
  }

  /* -------------------------------------------------------------
     5. THE SECRET LETTER / ENVELOPE
  ------------------------------------------------------------- */
  const envelopeButton = document.getElementById("envelopeButton");
  const letterMessage = document.getElementById("letterMessage");

  if (envelopeButton && letterMessage) {
    envelopeButton.addEventListener("click", () => {
      const isOpen = envelopeButton.getAttribute("aria-expanded") === "true";
      envelopeButton.setAttribute("aria-expanded", String(!isOpen));
      letterMessage.classList.toggle("is-open", !isOpen);
    });
  }

  /* -------------------------------------------------------------
     6. THE SMALL SURPRISE — drifting paper, once
  ------------------------------------------------------------- */
  const psst = document.getElementById("psst");
  const drift = document.getElementById("drift");

  if (psst && drift && !reduceMotion) {
    const driftObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => drift.classList.add("is-active"), 350);
            driftObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    driftObserver.observe(psst);
  }

  /* -------------------------------------------------------------
     7. PHOTO REPLACEMENT HOOK
     Swap the placeholder gradient for a real photo, e.g.:
     window.setWishlyPhoto("https://example.com/photo.jpg");
  ------------------------------------------------------------- */
  window.setWishlyPhoto = function setWishlyPhoto(url) {
    const el = document.querySelector("[data-placeholder-photo]");
    if (el && url) {
      el.style.backgroundImage = `url("${url}")`;
      el.style.backgroundSize = "cover";
      el.style.backgroundPosition = "center";
    }
  };
})();
