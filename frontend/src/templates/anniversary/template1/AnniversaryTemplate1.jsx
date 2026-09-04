import React, { useState } from "react";
import PageTransition from "./components/PageTransition.jsx";
import AnniversaryIntro from "./pages/AnniversaryIntro.jsx";
import BapuArtPage from "./pages/BapuArtPage.jsx";
import LetterPage from "./pages/LetterPage.jsx";
import GalleryPage from "./pages/GalleryPage.jsx";
import FinalWishPage from "./pages/FinalWishPage.jsx";
import defaultConfig from "./config.js";
import "./AnniversaryTemplate1.css";

const PAGES = [
  AnniversaryIntro,
  BapuArtPage,
  LetterPage,
  GalleryPage,
  FinalWishPage,
];

/**
 * Normalizes incoming Wishly data or config override
 */
function normalizeWishlyData(data = {}) {
  const base = { ...defaultConfig, ...(data.config || data) };

  let person1 = data.person1 || data.customData?.person1 || '';
  let person2 = data.person2 || data.customData?.person2 || '';

  if (!person1 && data.recipientName) {
    const raw = String(data.recipientName).trim();
    if (raw.includes('&')) {
      const parts = raw.split('&');
      person1 = parts[0]?.trim() || '';
      person2 = parts[1]?.trim() || '';
    } else if (raw.toLowerCase().includes(' and ')) {
      const parts = raw.split(/\s+and\s+/i);
      person1 = parts[0]?.trim() || '';
      person2 = parts[1]?.trim() || '';
    } else {
      person1 = raw;
      person2 = '';
    }
  }

  if (!person1 || person1 === '{{person1}}') {
    person1 = base.person1 !== '{{person1}}' ? base.person1 : 'Ravi';
  }
  if (!person2 && base.person2 && base.person2 !== '{{person2}}' && !data.recipientName) {
    person2 = base.person2;
  }

  // Extract years of togetherness
  let anniversaryYears = data.years || data.customData?.years || data.anniversaryYears || base.anniversaryYears || '25';
  if (typeof anniversaryYears === 'string' && anniversaryYears.toLowerCase().includes('year')) {
    const match = anniversaryYears.match(/\d+/);
    if (match) anniversaryYears = match[0];
  }
  if (anniversaryYears === '{{anniversaryYears}}') anniversaryYears = '25';

  // Sender name
  let senderName = data.senderName || data.customData?.senderName || base.senderName || 'With love always';
  if (senderName === '{{senderName}}') senderName = 'With love always';

  // Font style / Language preference
  const fontStyle = data.fontStyle || data.customData?.fontStyle || base.fontStyle || 'english';

  // Photos handling
  const rawPhotos = Array.isArray(data.photos) ? data.photos : (Array.isArray(base.photos) ? base.photos : []);
  const defaultCaptions = [
    "That smile.",
    "Another beautiful day.",
    "Together, as always.",
    "One for the album.",
    "Still making memories.",
    "Just as it began."
  ];

  const photos = rawPhotos
    .map((p, idx) => {
      if (!p) return null;
      if (typeof p === 'string') {
        if (p.startsWith('{{')) return null;
        return { src: p, caption: defaultCaptions[idx % defaultCaptions.length] };
      }
      const src = p.src || p.url || '';
      if (!src || src.startsWith('{{')) return null;
      return {
        src,
        caption: p.caption || defaultCaptions[idx % defaultCaptions.length]
      };
    })
    .filter(Boolean);

  // Letter content paragraphs
  let letterContent = data.customData?.letterContent || data.letterContent;
  if (!letterContent && data.message) {
    letterContent = String(data.message).split(/\n\s*\n/).map(s => s.trim()).filter(Boolean);
  }
  if (!letterContent || letterContent.length === 0) {
    letterContent = base.letterContent || [
      "Some journeys are measured in years. Some are measured in memories.",
      "Yours is beautifully measured in both.",
      "Through ordinary days, celebrations, laughter, little moments and everything in between, you have created something truly special.",
      "Here's to the memories you've made, the love you've shared, and all the beautiful moments still waiting ahead."
    ];
  }

  // Final wish
  const finalWish = data.finalWish || data.customData?.finalWish || base.finalWish ||
    "May the years ahead bring even more laughter, beautiful memories, peaceful moments, and a lifetime of choosing each other.";

  return {
    person1,
    person2,
    anniversaryYears,
    senderName,
    photos,
    letterContent,
    finalWish,
    fontStyle
  };
}

export function AnniversaryTemplate1({ data = {}, config: configOverride }) {
  const normalized = normalizeWishlyData(configOverride || data);
  const [index, setIndex] = useState(0);
  const [activeFont, setActiveFont] = useState(normalized.fontStyle || "english");

  const config = { ...normalized, fontStyle: activeFont };

  const goNext = () => setIndex((i) => Math.min(i + 1, PAGES.length - 1));
  const goPrev = () => setIndex((i) => Math.max(i - 1, 0));
  const goRestart = () => setIndex(0);

  return (
    <div className={`wishly-anniversary-template-1 ${activeFont === 'telugu' ? 'font-telugu-lakki' : ''}`}>
      {/* Background paper texture */}
      <div className="tpl-paper-texture" />

      {/* Top Font / Language Switcher Pill */}
      <div className="anniv-font-toggle-bar">
        <button
          type="button"
          className={`font-toggle-btn ${activeFont === 'english' ? 'active' : ''}`}
          onClick={() => setActiveFont('english')}
          title="English Typography"
        >
          English
        </button>
        <button
          type="button"
          className={`font-toggle-btn ${activeFont === 'telugu' ? 'active' : ''}`}
          onClick={() => setActiveFont('telugu')}
          title="Telugu Lakki Reddy Font"
        >
          తెలుగు (Lakki Reddy)
        </button>
      </div>

      {/* Multi-page Narrative Stage */}
      {PAGES.map((PageComponent, i) => (
        <PageTransition active={i === index} key={i}>
          <PageComponent
            config={config}
            onNext={goNext}
            onPrev={i > 0 ? goPrev : null}
            onRestart={goRestart}
          />
        </PageTransition>
      ))}

      {/* Interactive Progress Bar & Dots */}
      <div className="progress-thread" role="tablist" aria-label="Story page navigation">
        {PAGES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`progress-dot ${i === index ? 'active' : ''}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to page ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const OurStoryTemplate = AnniversaryTemplate1;
export const AnniversaryTemplate = AnniversaryTemplate1;
export default AnniversaryTemplate1;
