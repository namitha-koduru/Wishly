// ============================================================
// WISHLY — Anniversary Template Configuration
// ------------------------------------------------------------
// Every value here corresponds to a {{placeholder}} from the
// brief. Wishly's generation system can overwrite this object
// (or map its own data onto this shape) — nothing else in the
// component tree needs to change.
// ============================================================

const defaultConfig = {
  person1: "{{person1}}",
  person2: "{{person2}}",
  anniversaryYears: "{{anniversaryYears}}",
  senderName: "{{senderName}}",

  // Each entry is optional — PhotoAlbum gracefully adapts its
  // layout to however many are actually provided (1–6).
  photos: [
    { src: "{{photo1}}", caption: "That smile." },
    { src: "{{photo2}}", caption: "Another beautiful day." },
    { src: "{{photo3}}", caption: "Together, as always." },
    { src: "{{photo4}}", caption: "One for the album." },
    { src: "{{photo5}}", caption: "Still making memories." },
    { src: "{{photo6}}", caption: "Just as it began." },
  ],

  // Array of paragraphs. A plain string is also accepted —
  // LoveLetter will split it on blank lines.
  letterContent: [
    "Some journeys are measured in years. Some are measured in memories.",
    "Yours is beautifully measured in both.",
    "Through ordinary days, celebrations, laughter, little moments and everything in between, you have created something truly special.",
    "Here's to the memories you've made, the love you've shared, and all the beautiful moments still waiting ahead.",
  ],

  finalWish:
    "May the years ahead bring even more laughter, beautiful memories, peaceful moments, and a lifetime of choosing each other.",
};

export default defaultConfig;
