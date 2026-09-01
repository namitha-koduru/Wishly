// Template Registry - Centralized configuration for all 35 initial Wishly templates
import {
  BirthdayMemoriesTemplate,
  SweetCelebrationTemplate,
  PhotoStoryTemplate,
  SurprisePartyTemplate,
  MinimalBirthdayTemplate
} from './birthday/BirthdayTemplates.jsx';

import {
  OurStoryTemplate,
  ForeverAlwaysTemplate,
  MemoryTimelineTemplate,
  LoveLetterAnniversaryTemplate,
  OurJourneyTemplate
} from './anniversary/AnniversaryTemplates.jsx';

import {
  ClassOf2026Template,
  TheJourneyGradTemplate,
  AchievementGradTemplate,
  PhotoMemoriesGradTemplate,
  FutureBeginsTemplate
} from './graduation/GraduationTemplates.jsx';

import {
  GoodbyeMemoriesTemplate,
  MemoryWallTemplate,
  UntilWeMeetAgainTemplate,
  TeamMemoriesTemplate,
  GoodbyeLetterTemplate
} from './farewell/FarewellTemplates.jsx';

import {
  LoveLetterValTemplate,
  OurMomentsValTemplate,
  ForeverValTemplate,
  ReasonsILoveYouTemplate,
  OurStoryValTemplate
} from './valentines/ValentinesTemplates.jsx';

import {
  YouDidItTemplate,
  AchievementCelebrationTemplate,
  ProudMomentTemplate,
  SuccessStoryTemplate,
  CelebrateCheerTemplate
} from './congratulations/CongratulationsTemplates.jsx';

import {
  JustForYouTemplate,
  ALittleNoteTemplate,
  ThinkingOfYouTemplate,
  YouAreSpecialTemplate,
  FromMyHeartTemplate
} from './justBecause/JustBecauseTemplates.jsx';

export const TEMPLATES = [
  // ================= BIRTHDAY (5) =================
  {
    id: 'birthday-memories',
    occasion: 'birthday',
    name: 'Birthday Memories',
    description: 'Hero photo spotlight with warm wishes and a polaroid memory album.',
    badge: 'Popular',
    previewColor: '#FF6B8B',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'Sarah',
      senderName: 'Alex',
      message: 'Wishing you the happiest birthday filled with joy, laughter, and unforgettable moments! May this year bring you closer to all your dreams.',
      date: 'September 12',
      photos: [
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: BirthdayMemoriesTemplate
  },
  {
    id: 'sweet-celebration',
    occasion: 'birthday',
    name: 'Sweet Celebration',
    description: 'Playful confetti card with balloons, birthday cake, and lively party vibes.',
    badge: 'Playful',
    previewColor: '#FF8ED4',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'age'],
    defaultData: {
      recipientName: 'Emma',
      senderName: 'Your Besties',
      message: 'Another year bolder, brighter, and more fabulous! Keep shining like the superstar you are.',
      age: '21',
      photos: [
        'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: SweetCelebrationTemplate
  },
  {
    id: 'photo-story',
    occasion: 'birthday',
    name: 'Photo Story',
    description: 'Editorial magazine layout highlighting life chapters and adventures.',
    badge: 'Editorial',
    previewColor: '#E17055',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Jordan',
      senderName: 'Maya',
      message: 'Every chapter with you is full of adventure, warmth, and laughter. Here is to making this year the best chapter yet!',
      photos: [
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: PhotoStoryTemplate
  },
  {
    id: 'surprise-party',
    occasion: 'birthday',
    name: 'Surprise Party',
    description: 'Vibrant party popper style with interactive celebration banners.',
    badge: 'Festive',
    previewColor: '#FD79A8',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Lucas',
      senderName: 'The Whole Crew',
      message: 'SURPRISE! Today is all about celebrating the incredible person you are. Grab a slice of cake and let the party begin!',
      photos: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: SurprisePartyTemplate
  },
  {
    id: 'minimal-birthday',
    occasion: 'birthday',
    name: 'Minimal Birthday',
    description: 'Clean aesthetic typography with delicate accents and heartfelt simplicity.',
    badge: 'Minimal',
    previewColor: '#6C5CE7',
    supportedFields: ['recipientName', 'senderName', 'message', 'date'],
    defaultData: {
      recipientName: 'Elena',
      senderName: 'Oliver',
      message: 'May your day be peaceful, bright, and surrounded by the things and people you love the most.',
      date: 'Today'
    },
    component: MinimalBirthdayTemplate
  },

  // ================= ANNIVERSARY (5) =================
  {
    id: 'our-story',
    occasion: 'anniversary',
    name: 'Our Story',
    description: 'Romantic storybook tribute celebrating years together and heartfelt vows.',
    badge: 'Romantic',
    previewColor: '#9B51E0',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'years'],
    defaultData: {
      recipientName: 'Sophia & David',
      senderName: 'With Love Always',
      message: 'From our very first conversation to all the adventures we have shared, every single second with you is a blessing.',
      years: '5 Beautiful Years',
      photos: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: OurStoryTemplate
  },
  {
    id: 'forever-always',
    occasion: 'anniversary',
    name: 'Forever & Always',
    description: 'Timeless gold and champagne elegance for cherished milestones.',
    badge: 'Elegant',
    previewColor: '#D4AF37',
    supportedFields: ['recipientName', 'senderName', 'message', 'date'],
    defaultData: {
      recipientName: 'My Beloved',
      senderName: 'Forever Yours',
      message: 'I loved you yesterday, I love you still, I always have, I always will. Happy Anniversary, my heart.',
      date: 'October 14'
    },
    component: ForeverAlwaysTemplate
  },
  {
    id: 'memory-timeline',
    occasion: 'anniversary',
    name: 'Memory Timeline',
    description: 'Milestone checkpoints commemorating where your journey started and where it is headed.',
    badge: 'Timeline',
    previewColor: '#A29BFE',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Alex & Taylor',
      senderName: 'Celebrating Us',
      message: 'Looking back on all our memories and looking forward to thousands more together.'
    },
    component: MemoryTimelineTemplate
  },
  {
    id: 'love-letter-anniversary',
    occasion: 'anniversary',
    name: 'Love Letter',
    description: 'Vintage wax seal parchment paper letter handwritten with devotion.',
    badge: 'Keepsake',
    previewColor: '#E84393',
    supportedFields: ['recipientName', 'senderName', 'message', 'date'],
    defaultData: {
      recipientName: 'Dearest Eleanor',
      senderName: 'Arthur',
      message: 'No words in any language could ever fully express how grateful I am to walk through this life by your side.',
      date: 'Our Anniversary'
    },
    component: LoveLetterAnniversaryTemplate
  },
  {
    id: 'our-journey',
    occasion: 'anniversary',
    name: 'Our Journey',
    description: 'Polaroid travel keepsake celebrating every flight, road trip, and memory.',
    badge: 'Adventure',
    previewColor: '#0984E3',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Chris & Sam',
      senderName: 'With Love',
      message: 'Every flight, every road trip, and every cozy quiet evening. Life is an amazing adventure with you.',
      photos: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: OurJourneyTemplate
  },

  // ================= GRADUATION (5) =================
  {
    id: 'class-of-2026',
    occasion: 'graduation',
    name: 'Class of 2026',
    description: 'Honors banner, cap toss spotlight, and degree celebration.',
    badge: 'Milestone',
    previewColor: '#2F80ED',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'degree', 'classYear'],
    defaultData: {
      recipientName: 'Marcus Johnson',
      senderName: 'Mom & Dad',
      message: 'You did it! All those late nights, endless study sessions, and sacrifices have paid off. We are beyond proud of you!',
      degree: 'Bachelor of Science',
      classYear: '2026',
      photos: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: ClassOf2026Template
  },
  {
    id: 'the-journey-grad',
    occasion: 'graduation',
    name: 'The Journey',
    description: 'Academic timeline tracing steps from first lecture to the graduation stage.',
    badge: 'Inspiring',
    previewColor: '#54A0FF',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Chloe',
      senderName: 'Family & Mentors',
      message: 'From your very first lecture to the graduation stage, you proved resilience, passion, and brilliance at every step.'
    },
    component: TheJourneyGradTemplate
  },
  {
    id: 'achievement-grad',
    occasion: 'graduation',
    name: 'Achievement',
    description: 'Diploma laurel certificate layout commemorating academic excellence.',
    badge: 'Honors',
    previewColor: '#F39C12',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Dr. Emily Vance',
      senderName: 'Colleagues & Friends',
      message: 'Congratulations on achieving this remarkable academic pinnacle! The world is waiting for your brilliant contributions.'
    },
    component: AchievementGradTemplate
  },
  {
    id: 'photo-memories-grad',
    occasion: 'graduation',
    name: 'Photo Memories',
    description: 'Campus photo album with friends, study sessions, and ceremony cheers.',
    badge: 'Album',
    previewColor: '#00D2D3',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Daniel',
      senderName: 'The Squad',
      message: 'We laughed, we stressed, we studied together, and now we graduate as champions!',
      photos: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: PhotoMemoriesGradTemplate
  },
  {
    id: 'future-begins',
    occasion: 'graduation',
    name: 'Future Begins',
    description: 'Compass and starry horizon celebrating ambitious dreams and future paths.',
    badge: 'Future',
    previewColor: '#5F27CD',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Jessica',
      senderName: 'Uncle Robert',
      message: 'Your graduation is not the end of a book, but the prologue to an extraordinary adventure. Go chase the stars!'
    },
    component: FutureBeginsTemplate
  },

  // ================= FAREWELL (5) =================
  {
    id: 'goodbye-memories',
    occasion: 'farewell',
    name: 'Goodbye Memories',
    description: 'Warm keepsake with personal memories and encouragement for what is ahead.',
    badge: 'Warm',
    previewColor: '#F2994A',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Samantha',
      senderName: 'Your Friends',
      message: 'Saying goodbye is never easy, but we are so excited for your next great chapter. Thank you for all the laughter and memories!',
      photos: [
        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: GoodbyeMemoriesTemplate
  },
  {
    id: 'memory-wall',
    occasion: 'farewell',
    name: 'Memory Wall',
    description: 'Sticky notes wall filled with individual messages from colleagues or friends.',
    badge: 'Interactive',
    previewColor: '#FF9F43',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'David',
      senderName: 'The Whole Office',
      message: 'You left footprints of kindness everywhere. Keep in touch!'
    },
    component: MemoryWallTemplate
  },
  {
    id: 'until-we-meet-again',
    occasion: 'farewell',
    name: 'Until We Meet Again',
    description: 'Wanderlust send-off reminding friends that distance can never break true bonds.',
    badge: 'Send-off',
    previewColor: '#10AC84',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Hannah',
      senderName: 'Your Best Friends',
      message: 'Distance means so little when people mean so much. No matter where life takes you, you will always have a home here.'
    },
    component: UntilWeMeetAgainTemplate
  },
  {
    id: 'team-memories',
    occasion: 'farewell',
    name: 'Team Memories',
    description: 'Professional and warm team tribute celebrating colleagues moving to new roles.',
    badge: 'Team',
    previewColor: '#EE5253',
    supportedFields: ['recipientName', 'senderName', 'message', 'teamName'],
    defaultData: {
      recipientName: 'Alex Mercer',
      senderName: 'The Engineering Team',
      teamName: 'Product & Tech Crew',
      message: 'Your brilliance, patience, and humor made every sprint a pleasure. Wishing you huge success in your next venture!'
    },
    component: TeamMemoriesTemplate
  },
  {
    id: 'goodbye-letter',
    occasion: 'farewell',
    name: 'Goodbye Letter',
    description: 'Heartwarming letter in a vintage envelope style.',
    badge: 'Classic',
    previewColor: '#6D214F',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Dear Friend',
      senderName: 'Your Crew',
      message: 'As one journey concludes, another begins. Thank you for making our days brighter with your kindness and positivity.'
    },
    component: GoodbyeLetterTemplate
  },

  // ================= VALENTINE'S (5) =================
  {
    id: 'love-letter-val',
    occasion: 'valentines',
    name: 'Love Letter',
    description: 'Passionate digital love letter sealed with hearts and sweet devotion.',
    badge: 'Sweet',
    previewColor: '#EB5757',
    supportedFields: ['recipientName', 'senderName', 'message', 'date'],
    defaultData: {
      recipientName: 'My Valentine',
      senderName: 'Yours Always',
      message: 'You make every normal moment feel magical. You have my whole heart today, tomorrow, and for all the days to come.',
      date: "Valentine's Day"
    },
    component: LoveLetterValTemplate
  },
  {
    id: 'our-moments-val',
    occasion: 'valentines',
    name: 'Our Moments',
    description: 'Romantic polaroid keepsake with captions and floating love sparkles.',
    badge: 'Polaroids',
    previewColor: '#FF7675',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Sweetheart',
      senderName: 'Me',
      message: 'Every memory we create together is my favorite treasure.',
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: OurMomentsValTemplate
  },
  {
    id: 'forever-val',
    occasion: 'valentines',
    name: 'Forever',
    description: 'Cosmic romance layout celebrating one love in a universe of billions.',
    badge: 'Cosmic',
    previewColor: '#D63031',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Aria',
      senderName: 'Leo',
      message: 'In a universe of billions of stars, meeting and loving you is the greatest wonder of my life.'
    },
    component: ForeverValTemplate
  },
  {
    id: 'reasons-i-love-you',
    occasion: 'valentines',
    name: 'Reasons I Love You',
    description: 'Numbered card deck highlighting all the reasons why they are adored.',
    badge: 'Thoughtful',
    previewColor: '#E84393',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Bella',
      senderName: 'Noah',
      message: 'Here are just a few reasons why you are the love of my life...'
    },
    component: ReasonsILoveYouTemplate
  },
  {
    id: 'our-story-val',
    occasion: 'valentines',
    name: 'Our Story',
    description: 'Classic Valentine card layout with gentle gradients and romantic framing.',
    badge: 'Classic',
    previewColor: '#B33771',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'My One & Only',
      senderName: 'Always',
      message: 'From day one, you have been my dream come true. Happy Valentine’s Day, my love.'
    },
    component: OurStoryValTemplate
  },

  // ================= CONGRATULATIONS (5) =================
  {
    id: 'you-did-it',
    occasion: 'congratulations',
    name: 'You Did It',
    description: 'Gold trophy banner celebrating promotions, victories, and hard-earned wins.',
    badge: 'Victory',
    previewColor: '#27AE60',
    supportedFields: ['recipientName', 'senderName', 'message', 'achievement'],
    defaultData: {
      recipientName: 'Jordan Smith',
      senderName: 'Friends & Family',
      achievement: 'Promotion & New Leadership Role',
      message: 'Huge congratulations on this tremendous milestone! Your perseverance and talent shine so bright.'
    },
    component: YouDidItTemplate
  },
  {
    id: 'achievement-celebration',
    occasion: 'congratulations',
    name: 'Achievement Celebration',
    description: 'Sparkling celebration banner with spotlight photo and proud tributes.',
    badge: 'Cheer',
    previewColor: '#2ECC71',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Samantha Ray',
      senderName: 'The Whole Team',
      message: 'Here is to all your hard work coming to fruition. You earned every bit of this victory!',
      photos: [
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: AchievementCelebrationTemplate
  },
  {
    id: 'proud-moment',
    occasion: 'congratulations',
    name: 'Proud Moment',
    description: 'Refined tribute honoring dedication, character, and exceptional milestones.',
    badge: 'Pride',
    previewColor: '#F1C40F',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Liam',
      senderName: 'Proud Parents',
      message: 'Seeing how far you have come and the determination you carry fills our hearts with endless pride.'
    },
    component: ProudMomentTemplate
  },
  {
    id: 'success-story',
    occasion: 'congratulations',
    name: 'Success Story',
    description: 'Modern rocket badge highlighting big breakthroughs and goals smashed.',
    badge: 'Success',
    previewColor: '#16A085',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Maya Lin',
      senderName: 'Mentors & Peers',
      message: 'Success is the sum of small efforts repeated daily. You made it happen through sheer grit and dedication!'
    },
    component: SuccessStoryTemplate
  },
  {
    id: 'celebrate-cheer',
    occasion: 'congratulations',
    name: 'Celebrate',
    description: 'Champagne toast and confetti party cheer for any victorious occasion.',
    badge: 'Party',
    previewColor: '#E67E22',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Ethan',
      senderName: 'Everyone',
      message: 'Raise a glass and let the celebrations begin! Here is to new heights and even greater victories ahead.'
    },
    component: CelebrateCheerTemplate
  },

  // ================= JUST BECAUSE (5) =================
  {
    id: 'just-for-you',
    occasion: 'just-because',
    name: 'Just For You',
    description: 'Warm sunshine digital hug brightening someone special’s regular day.',
    badge: 'Warm Hug',
    previewColor: '#E056FD',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Avery',
      senderName: 'Morgan',
      message: 'No special occasion needed — just wanted to remind you that you are deeply appreciated and loved today!',
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: JustForYouTemplate
  },
  {
    id: 'a-little-note',
    occasion: 'just-because',
    name: 'A Little Note',
    description: 'Minimalist aesthetic postcard note with a gentle reminder of care.',
    badge: 'Postcard',
    previewColor: '#BE2EDD',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Taylor',
      senderName: 'Sam',
      message: 'Just a small reminder: you are doing amazing, and having you in my life makes everything brighter.'
    },
    component: ALittleNoteTemplate
  },
  {
    id: 'thinking-of-you',
    occasion: 'just-because',
    name: 'Thinking Of You',
    description: 'Serene botanical blossom frame offering comfort and warmth from afar.',
    badge: 'Serene',
    previewColor: '#686DE0',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Grandma Rose',
      senderName: 'Lucas & Lily',
      message: 'Sending you a warm hug from afar and keeping you in our warmest thoughts today.'
    },
    component: ThinkingOfYouTemplate
  },
  {
    id: 'you-are-special',
    occasion: 'just-because',
    name: 'You Are Special',
    description: 'Positive affirmation deck celebrating how unique and valued they are.',
    badge: 'Affirmation',
    previewColor: '#30336B',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Zoe',
      senderName: 'Ben',
      message: 'In case nobody told you today: you are talented, valued, and truly one of a kind.'
    },
    component: YouAreSpecialTemplate
  },
  {
    id: 'from-my-heart',
    occasion: 'just-because',
    name: 'From My Heart',
    description: 'Heartfelt gratitude keepsake with soft ambient glow and pure appreciation.',
    badge: 'Heartfelt',
    previewColor: '#FF7979',
    supportedFields: ['recipientName', 'senderName', 'message'],
    defaultData: {
      recipientName: 'Dear Friend',
      senderName: 'Forever Grateful',
      message: 'Thank you for being such an extraordinary presence in my life. You make every day better just by being you.'
    },
    component: FromMyHeartTemplate
  }
];

// Helper functions for template querying
export const getTemplateById = (templateId) => {
  return TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
};

export const getTemplatesByOccasion = (occasionId) => {
  if (!occasionId || occasionId === 'all') return TEMPLATES;
  return TEMPLATES.filter((t) => t.occasion === occasionId);
};
