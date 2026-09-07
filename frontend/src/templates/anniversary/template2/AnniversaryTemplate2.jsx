import React, { useState } from 'react';
import DEFAULT_DATA from './data/defaultData.js';
import PetalDrift from './components/PetalDrift.jsx';
import AlbumNavigation from './components/AlbumNavigation.jsx';
import HeroStage from './components/HeroStage.jsx';
import MarriageJourneyStage from './components/MarriageJourneyStage.jsx';
import RingsPromiseStage from './components/RingsPromiseStage.jsx';
import PrayerBlessingStage from './components/PrayerBlessingStage.jsx';
import FloralDevotionStage from './components/FloralDevotionStage.jsx';
import WeddingAlbumStage from './components/WeddingAlbumStage.jsx';
import FinalBlessingStage from './components/FinalBlessingStage.jsx';
import './AnniversaryTemplate2.css';

const STAGES = ['hero', 'journey', 'rings', 'prayer', 'devotion', 'album', 'final'];

/**
 * Normalizes incoming data for Christian Wedding Anniversary template (Faith & Devotion)
 */
function normalizeData(data = {}) {
  const customData = data.customData || {};

  const recipientName = data.recipientName || customData.recipientName || DEFAULT_DATA.recipientName;
  const senderName = data.senderName || customData.senderName || DEFAULT_DATA.senderName;
  const date = data.date || customData.date || DEFAULT_DATA.date;
  const years = data.years || customData.years || DEFAULT_DATA.years;

  // Process photos for Journey and Album
  const rawPhotos = data.photos || data.photoObjects || customData.photos || customData.memories;
  let photos = DEFAULT_DATA.photos;

  if (Array.isArray(rawPhotos) && rawPhotos.length > 0) {
    const defaultCaptions = [
      "The day it all began.",
      "A lifetime of beautiful memories.",
      "Growing together in grace.",
      "Love through every season.",
      "Blessed in every moment.",
      "Walk in faith and love."
    ];

    photos = rawPhotos
      .map((p, idx) => {
        if (!p) return null;
        if (typeof p === 'string') {
          if (p.startsWith('{{')) return null;
          return {
            id: `p-${idx}`,
            src: p,
            caption: defaultCaptions[idx % defaultCaptions.length],
            date: `Chapter #${idx + 1}`
          };
        }
        const src = p.src || p.url || '';
        if (!src || src.startsWith('{{')) return null;
        return {
          id: p.id || `p-${idx}`,
          src,
          caption: p.caption || defaultCaptions[idx % defaultCaptions.length],
          date: p.date || `Chapter #${idx + 1}`
        };
      })
      .filter(Boolean);

    if (photos.length === 0) {
      photos = DEFAULT_DATA.photos;
    }
  }

  const heroTitle = customData.heroTitle || DEFAULT_DATA.heroTitle;
  const heroSubtitle = data.subtitle || customData.subtitle || DEFAULT_DATA.heroSubtitle;
  const heroBlessing = customData.heroBlessing || DEFAULT_DATA.heroBlessing;

  const journeyHeading = customData.journeyHeading || DEFAULT_DATA.journeyHeading;
  const journeyQuote1 = customData.journeyQuote1 || DEFAULT_DATA.journeyQuote1;
  const journeyQuote2 = customData.journeyQuote2 || DEFAULT_DATA.journeyQuote2;

  const ringsHeading = customData.ringsHeading || DEFAULT_DATA.ringsHeading;
  const ringsPromise = customData.ringsPromise || DEFAULT_DATA.ringsPromise;

  const prayerHeading = customData.prayerHeading || DEFAULT_DATA.prayerHeading;
  const prayerBody = customData.prayerBody || DEFAULT_DATA.prayerBody;
  const scriptureVerse = customData.scriptureVerse || DEFAULT_DATA.scriptureVerse;
  const scriptureRef = customData.scriptureRef || DEFAULT_DATA.scriptureRef;

  const devotionLines = customData.devotionLines || DEFAULT_DATA.devotionLines;

  const finalHeading = customData.finalHeading || DEFAULT_DATA.finalHeading;
  const finalMessage = data.message || customData.message || DEFAULT_DATA.finalMessage;
  const finalSub = customData.finalSub || DEFAULT_DATA.finalSub;
  const finalSignoff = customData.finalSignoff || DEFAULT_DATA.finalSignoff;

  return {
    recipientName,
    senderName,
    date,
    years,
    heroTitle,
    heroSubtitle,
    heroBlessing,
    journeyHeading,
    journeyQuote1,
    journeyQuote2,
    ringsHeading,
    ringsPromise,
    prayerHeading,
    prayerBody,
    scriptureVerse,
    scriptureRef,
    devotionLines,
    photos,
    finalHeading,
    finalMessage,
    finalSub,
    finalSignoff
  };
}

/**
 * AnniversaryTemplate2 — "Faith & Devotion"
 * Peaceful, Elegant Christian Wedding Anniversary Experience
 */
export function AnniversaryTemplate2({ data = {} }) {
  const normalizedData = normalizeData(data);
  const [currentStage, setCurrentStage] = useState('hero');
  const [stageKey, setStageKey] = useState(0);

  const transitionTo = (nextStage) => {
    setCurrentStage(nextStage);
    setStageKey((k) => k + 1);
  };

  const density = (currentStage === 'final' || currentStage === 'prayer') ? 'blessing' : 'gentle';

  return (
    <div className="tpl-root tpl-grace-and-devotion">
      {/* Background Soft Linen Paper Texture Overlay */}
      <div className="grace-linen-texture" />

      {/* Gentle Floating Petals */}
      <PetalDrift density={density} key={density + stageKey} />

      {/* Main Peaceful Stage Container */}
      <main className="grace-stage-container" key={stageKey}>
        {currentStage === 'hero' && (
          <HeroStage
            data={normalizedData}
            onStart={() => transitionTo('journey')}
          />
        )}

        {currentStage === 'journey' && (
          <MarriageJourneyStage
            data={normalizedData}
            onContinue={() => transitionTo('rings')}
          />
        )}

        {currentStage === 'rings' && (
          <RingsPromiseStage
            data={normalizedData}
            onContinue={() => transitionTo('prayer')}
          />
        )}

        {currentStage === 'prayer' && (
          <PrayerBlessingStage
            data={normalizedData}
            onContinue={() => transitionTo('devotion')}
          />
        )}

        {currentStage === 'devotion' && (
          <FloralDevotionStage
            data={normalizedData}
            onContinue={() => transitionTo('album')}
          />
        )}

        {currentStage === 'album' && (
          <WeddingAlbumStage
            photos={normalizedData.photos}
            onContinue={() => transitionTo('final')}
          />
        )}

        {currentStage === 'final' && (
          <FinalBlessingStage
            data={normalizedData}
            onReplay={() => transitionTo('hero')}
          />
        )}
      </main>

      {/* Calm Chapter Navigation Thread at Bottom */}
      <AlbumNavigation
        currentStage={currentStage}
        onStageSelect={(stage) => transitionTo(stage)}
        stages={STAGES}
      />
    </div>
  );
}

export const FaithAndDevotionTemplate = AnniversaryTemplate2;
export const PetalsAndUsTemplate = AnniversaryTemplate2;
export const LoveLetterAnniversaryTemplate = AnniversaryTemplate2;
export default AnniversaryTemplate2;
