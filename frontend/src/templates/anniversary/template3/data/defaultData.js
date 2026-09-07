/**
 * Default 9-Page Data Configuration for Anniversary Template 3 — "Arranged to Soulmates"
 * EXACTLY 9 PAGES • FULLY DATA-DRIVEN • EVERY MESSAGE & PAGE EDITABLE & REMOVABLE
 */
export const DEFAULT_PAGES = [
  // ================= PAGE 1 — HAPPY ANNIVERSARY =================
  {
    id: "page-1",
    pageNumber: 1,
    type: "page1_hero",
    enabled: true,
    pageLabel: "Happy Anniversary",
    title: "Happy Anniversary",
    coupleName: "Aditi & Vikram",
    overheadTag: "A Celebration of Real Love",
    datePill: "November 24 • 7 Years Together",
    storyLead: [
      "Some stories begin with love.",
      "Ours began with two people meeting…",
      "and slowly became a love story of its own."
    ],
    ctaText: "Our Story ♡",
    scrollHint: "Click or scroll to begin our story",
    showRings: true,
    image: ""
  },

  // ================= PAGE 2 — HOW IT BEGAN =================
  {
    id: "page-2",
    pageNumber: 2,
    type: "page2_began",
    enabled: true,
    pageLabel: "How It Began",
    badge: "Chapter I • The Beginning",
    heading: "It started with an arranged marriage…",
    messages: [
      "Two families brought two people together.",
      "Neither of us knew that this simple beginning would become something so beautiful."
    ],
    image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "Where two worlds gently converged",
    nextButtonText: "Next: Getting to Know You →"
  },

  // ================= PAGE 3 — GETTING TO KNOW YOU =================
  {
    id: "page-3",
    pageNumber: 3,
    type: "page3_getting_to_know",
    enabled: true,
    pageLabel: "Getting to Know You",
    badge: "Chapter II • The Spark",
    heading: "Then we started getting to know each other…",
    subheading: "Somewhere between all those ordinary days…",
    messages: [
      "The conversations became longer.",
      "The smiles became easier.",
      "The awkwardness slowly disappeared.",
      "And somewhere between all those little moments… we became friends."
    ],
    revealText: "We became us.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000&auto=format&fit=crop&q=80",
    imageCaption: "Where friendship turned into home ♡",
    nextButtonText: "Next: Falling in Love →"
  },

  // ================= PAGE 4 — FALLING IN LOVE =================
  {
    id: "page-4",
    pageNumber: 4,
    type: "page4_falling_in_love",
    enabled: true,
    pageLabel: "Falling in Love",
    badge: "Chapter III • The Turning Point",
    heading: "Somewhere along the way, I fell for you.",
    message: "You slowly became my favorite person, my safest place, and the person I wanted beside me through everything.",
    subtext: "The moment love stopped being a decision and became as natural as breathing.",
    image: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=1000&auto=format&fit=crop&q=80",
    heartPrompt: "Touch our heartbeat",
    nextButtonText: "Next: Our Love →"
  },

  // ================= PAGE 5 — OUR LOVE =================
  {
    id: "page-5",
    pageNumber: 5,
    type: "page5_our_love",
    enabled: true,
    pageLabel: "Our Love",
    badge: "Chapter IV • The Bond",
    heading: "This isn't just love anymore.",
    messages: [
      { id: "ol-1", text: "It's understanding.", icon: "🕊️" },
      { id: "ol-2", text: "It's trust.", icon: "🤍" },
      { id: "ol-3", text: "It's chemistry.", icon: "✨" },
      { id: "ol-4", text: "It's choosing each other every day.", icon: "🌅" }
    ],
    highlightClimax: "It's the kind of love that feels like home.",
    subtext: "Built with devotion, laughter, and unspoken warmth.",
    nextButtonText: "Next: Our Little Life →"
  },

  // ================= PAGE 6 — OUR LITTLE LIFE =================
  {
    id: "page-6",
    pageNumber: 6,
    type: "page6_our_little_life",
    enabled: true,
    pageLabel: "Our Little Life",
    badge: "Chapter V • Married Life",
    heading: "Our little life together…",
    subtitle: "All the ordinary moments that became extraordinary because we shared them.",
    messages: [
      { id: "oll-1", icon: "☕", title: "The Morning Conversations", desc: "Quiet sips together before the busy world wakes up." },
      { id: "oll-2", icon: "😂", title: "The Silly Arguments", desc: "Playful debates that always end with laughter." },
      { id: "oll-3", icon: "✨", title: "The Laughter Over Nothing", desc: "Helpless giggles over the smallest inside jokes." },
      { id: "oll-4", icon: "🛋️", title: "The Quiet Evenings", desc: "Curled up together in peaceful, comfortable silence." },
      { id: "oll-5", icon: "💐", title: "The Countless Little Memories", desc: "Every shared meal, walk, and spontaneous adventure." }
    ],
    warmthQuote: "Finding someone who makes ordinary days feel like poetry.",
    nextButtonText: "Next: What You Mean to Me →"
  },

  // ================= PAGE 7 — WHAT YOU MEAN TO ME =================
  {
    id: "page-7",
    pageNumber: 7,
    type: "page7_what_you_mean",
    enabled: true,
    pageLabel: "What You Mean to Me",
    badge: "Chapter VI • Appreciation",
    heading: "You are so much more than my partner.",
    subtitle: "Tap each card to unveil what you mean to my heart:",
    cards: [
      {
        id: "c-1",
        title: "My Best Friend",
        desc: "Because you're the first person I want to tell everything to, good or bad."
      },
      {
        id: "c-2",
        title: "My Safe Place",
        desc: "Because in your arms, every worry and anxiety quietly fades away."
      },
      {
        id: "c-3",
        title: "My Favorite Person",
        desc: "Because no matter where we are, having you there makes it my favorite place."
      },
      {
        id: "c-4",
        title: "My Home",
        desc: "Because wherever you are in this world, that is where I belong."
      },
      {
        id: "c-5",
        title: "My Forever",
        desc: "Because I choose you today, tomorrow, and through all eternity."
      }
    ],
    nextButtonText: "Next: Our Forever →"
  },

  // ================= PAGE 8 — OUR FOREVER =================
  {
    id: "page-8",
    pageNumber: 8,
    type: "page8_our_forever",
    enabled: true,
    pageLabel: "Our Forever",
    badge: "Chapter VII • The Promise",
    heading: "And this is only the beginning…",
    message: "Here's to more mornings together, more adventures, more laughter, more memories, and a lifetime of choosing each other.",
    emphasis: "Today. Tomorrow. Always.",
    buttonText: "Forever ♡",
    celebratedText: "Forever & Always With You ✨",
    revealNote: "Every day with you is my favorite chapter.",
    nextButtonText: "Next: Final Anniversary Message →"
  },

  // ================= PAGE 9 — FINAL ANNIVERSARY MESSAGE =================
  {
    id: "page-9",
    pageNumber: 9,
    type: "page9_final",
    enabled: true,
    pageLabel: "Final Message",
    heading: "Happy Anniversary, My Love",
    stanzas: [
      "We didn't just get married.",
      "We built a life.",
      "We found a love.",
      "And somehow… we found home in each other."
    ],
    finalSignoff: "Forever with you. ❤️",
    monogramDate: "November 24",
    replayButtonText: "↺ Replay Our Story",
    shareButtonText: "Share Love Story 💌"
  }
];

export const DEFAULT_DATA = {
  recipientName: "Aditi & Vikram",
  senderName: "Vikram",
  anniversaryDate: "November 24",
  yearsTogether: "7 Years of Us",
  pages: DEFAULT_PAGES
};

export default DEFAULT_DATA;
