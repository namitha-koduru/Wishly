// ─────────────────────────────────────────────────────────────
// "Prove Your Love" — content config
// Everything content-related lives here so it can be edited
// without touching any component code.
// ─────────────────────────────────────────────────────────────

import gunCatImg from "../assets/cats/gun-cat.png";
import flowerCatImg from "../assets/cats/flower-cat.png";

// Character assets (Exact uploaded assets)
export const CHARACTERS = {
  gunCat: gunCatImg,
  flowerCat: flowerCatImg,
};

// The 5 love questions (no videos)
export const QUESTIONS = [
  {
    id: "q1",
    prompt: "When did you first realize you kinda liked me? 👀",
    answers: [
      { id: "a", text: "The first time we talked" },
      { id: "b", text: "When you saw me laugh" },
      { id: "c", text: "I don't remember, it just happened" },
      { id: "d", text: "I still haven't 😏" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "q2",
    prompt: "Who fell first?",
    answers: [
      { id: "a", text: "Me, obviously" },
      { id: "b", text: "You, obviously" },
      { id: "c", text: "We fell at the same time" },
      { id: "d", text: "Nobody fell, we tripped into it" },
    ],
    correctAnswerId: "b",
  },
  {
    id: "q3",
    prompt: "Which one is more 'us'?",
    answers: [
      { id: "a", text: "Late night talks about nothing" },
      { id: "b", text: "Dressing up for a fancy date" },
      { id: "c", text: "Comfortable silence together" },
      { id: "d", text: "Arguing about what to eat" },
    ],
    correctAnswerId: "a",
  },
  {
    id: "q4",
    prompt: "If I say 'I'm fine'... what does that actually mean?",
    answers: [
      { id: "a", text: "You are, in fact, fine" },
      { id: "b", text: "You are NOT fine at all" },
      { id: "c", text: "You need a hug, immediately" },
      { id: "d", text: "Run" },
    ],
    correctAnswerId: "b",
  },
  {
    id: "q5",
    prompt: "What's my favorite thing about us?",
    answers: [
      { id: "a", text: "How easy it feels" },
      { id: "b", text: "How much we laugh together" },
      { id: "c", text: "That we're a little bit ridiculous" },
      { id: "d", text: "All of the above, honestly" },
    ],
    correctAnswerId: "d",
  },
];

// Playful "wrong answer" configurations — picked on mistake
export const WRONG_ANSWER_LINES = [
  {
    headline: "WRONG. 😾",
    sub: "You really thought THAT was the answer??",
    button: "Okay okay 😭 Try Again",
  },
  {
    headline: "HOW DID YOU GET THAT WRONG 😭",
    sub: "Access denied. Try harder.",
    button: "Let me try again 😾",
  },
  {
    headline: "Nice try. 😭",
    sub: "You clearly need another chance. 😾",
    button: "One more chance please 🥺",
  },
  {
    headline: "Interesting choice...",
    sub: "Are you sure about that? 👀",
    button: "Try Again 😭",
  },
  {
    headline: "Nope. Not even close 😼",
    sub: "I'm watching you...",
    button: "My bad 😭 Try Again",
  },
];

// Memory gallery default sample memories
export const MEMORIES = [
  { id: "m1", src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80", caption: "That one unforgettable afternoon" },
  { id: "m2", src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80", caption: "Us, being completely ridiculous" },
  { id: "m3", src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80", caption: "The trip we still talk about" },
  { id: "m4", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80", caption: "A completely normal, perfect day" },
  { id: "m5", src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80", caption: "My favorite kind of quiet moments" },
];

// Copy used across the experience
export const COPY = {
  introEyebrow: "Okay... let's see how well you really know me. 👀",
  introTitle: "Prove Your Love",
  introLines: [
    "I've prepared a few questions.",
    "And choose carefully...",
    "There are consequences. 😌",
  ],
  introButton: "I'm ready 💗",

  successTitle: "YAYYY! 🥹💗",
  successSubtitle: "You got them all right!",
  successLines: [
    "I knew you were paying attention...",
    "Maybe you really do love me. 👀",
  ],
  successButton: "There's more? →",

  galleryIntro: "Okay... you passed the test. 🫶",
  galleryTitle: "Now let's look at some of my favorite memories with you.",
  galleryButton: "One more question... 💌",

  finalLead: "After all those questions...",
  finalSubLead: "After all those memories...",
  finalNote: "There's still one thing I want to ask you. 🌷",
  finalQuestion: "Will you be my Valentine? 💗",
  finalYes1: "YES 🥰",
  finalYes2: "OF COURSE 😭❤️",

  celebrationTitle: "I knew you'd say yes. 😌",
  celebrationLines: [
    "Here's to more silly moments,",
    "more memories,",
    "more teasing,",
    "and a whole lot more us. ❤️",
  ],
  replayButton: "Replay our story ↻",
};
