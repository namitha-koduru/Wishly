// Template Registry - Centralized configuration for all 35 initial Wishly templates
// Birthday (5)
import { BirthdayTemplate1 as BirthdayMemoriesTemplate } from './birthday/template1/BirthdayTemplate1.jsx';
import { BirthdayTemplate2 as SweetCelebrationTemplate } from './birthday/template2/BirthdayTemplate2.jsx';
import { BirthdayTemplate3 as PhotoStoryTemplate } from './birthday/template3/BirthdayTemplate3.jsx';
import { BirthdayTemplate4 as SurprisePartyTemplate } from './birthday/template4/BirthdayTemplate4.jsx';
import { BirthdayTemplate5 as MinimalBirthdayTemplate } from './birthday/template5/BirthdayTemplate5.jsx';

// Anniversary (5)
import { AnniversaryTemplate1 as OurStoryTemplate } from './anniversary/template1/AnniversaryTemplate1.jsx';
import { AnniversaryTemplate2 as LoveLetterAnniversaryTemplate } from './anniversary/template2/AnniversaryTemplate2.jsx';
import { AnniversaryTemplate3 as ForeverAlwaysTemplate } from './anniversary/template3/AnniversaryTemplate3.jsx';
import { AnniversaryTemplate4 as MemoryTimelineTemplate } from './anniversary/template4/AnniversaryTemplate4.jsx';
import { AnniversaryTemplate5 as OurJourneyTemplate } from './anniversary/template5/AnniversaryTemplate5.jsx';

// Graduation (5)
import { GraduationTemplate1 as ClassOf2026Template } from './graduation/template1/GraduationTemplate1.jsx';
import { GraduationTemplate2 as TheJourneyGradTemplate } from './graduation/template2/GraduationTemplate2.jsx';
import { GraduationTemplate3 as AchievementGradTemplate } from './graduation/template3/GraduationTemplate3.jsx';
import { GraduationTemplate4 as PhotoMemoriesGradTemplate } from './graduation/template4/GraduationTemplate4.jsx';
import { GraduationTemplate5 as FutureBeginsTemplate } from './graduation/template5/GraduationTemplate5.jsx';

// Farewell (5)
import { FarewellTemplate1 as MemoryWallTemplate } from './farewell/template1/FarewellTemplate1.jsx';
import { FarewellTemplate2 as GoodbyeLetterTemplate } from './farewell/template2/FarewellTemplate2.jsx';
import { FarewellTemplate3 as UntilWeMeetAgainTemplate } from './farewell/template3/FarewellTemplate3.jsx';
import { FarewellTemplate4 as TeamMemoriesTemplate } from './farewell/template4/FarewellTemplate4.jsx';
import { FarewellTemplate5 as GoodbyeMemoriesTemplate } from './farewell/template5/FarewellTemplate5.jsx';

// Valentine's (5)
import { ValentinesTemplate1 as LoveLetterValTemplate } from './valentines/template1/ValentinesTemplate1.jsx';
import { ValentinesTemplate2 as ReasonsILoveYouTemplate } from './valentines/template2/ValentinesTemplate2.jsx';
import { ValentinesTemplate3 as OurStoryValTemplate } from './valentines/template3/ValentinesTemplate3.jsx';
import { ValentinesTemplate4 as OurMomentsValTemplate } from './valentines/template4/ValentinesTemplate4.jsx';
import { ValentinesTemplate5 as ForeverValTemplate } from './valentines/template5/ValentinesTemplate5.jsx';

// Congratulations (5)
import { CongratulationsTemplate1 as YouDidItTemplate } from './congratulations/template1/CongratulationsTemplate1.jsx';
import { CongratulationsTemplate2 as AchievementCelebrationTemplate } from './congratulations/template2/CongratulationsTemplate2.jsx';
import { CongratulationsTemplate3 as ProudMomentTemplate } from './congratulations/template3/CongratulationsTemplate3.jsx';
import { CongratulationsTemplate4 as CelebrateCheerTemplate } from './congratulations/template4/CongratulationsTemplate4.jsx';
import { CongratulationsTemplate5 as SuccessStoryTemplate } from './congratulations/template5/CongratulationsTemplate5.jsx';

// Just Because (5)
import { JustBecauseTemplate1 as JustForYouTemplate } from './justBecause/template1/JustBecauseTemplate1.jsx';
import { JustBecauseTemplate2 as ALittleNoteTemplate } from './justBecause/template2/JustBecauseTemplate2.jsx';
import { JustBecauseTemplate3 as ThinkingOfYouTemplate } from './justBecause/template3/JustBecauseTemplate3.jsx';
import { JustBecauseTemplate4 as YouAreSpecialTemplate } from './justBecause/template4/JustBecauseTemplate4.jsx';
import { JustBecauseTemplate5 as FromMyHeartTemplate } from './justBecause/template5/JustBecauseTemplate5.jsx';

export const TEMPLATES = [
  // ================= BIRTHDAY (5) =================
  {
    id: 'birthday-memories',
    occasion: 'birthday',
    name: 'Birthday Memories',
    description: 'Hero photo spotlight with warm wishes and a polaroid memory album.',
    badge: 'Popular',
    previewColor: '#FF6B8B',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date', 'age'],
    defaultData: {
      recipientName: 'Sarah',
      senderName: 'Alex',
      message: 'Wishing you the happiest birthday filled with joy, laughter, and unforgettable moments! May this year bring you closer to all your dreams.',
      date: 'September 12',
      age: '25',
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'surpriseMessage'],
    defaultData: {
      recipientName: 'Lucas',
      senderName: 'The Whole Crew',
      message: 'SURPRISE! Today is all about celebrating the incredible person you are. Grab a slice of cake and let the party begin!',
      surpriseMessage: 'You are getting a weekend getaway trip with everyone! Pack your bags!',
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'Elena',
      senderName: 'Oliver',
      message: 'May your day be peaceful, bright, and surrounded by the things and people you love the most.',
      date: 'October 14',
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: MinimalBirthdayTemplate
  },

  // ================= ANNIVERSARY (5) =================
  {
    id: 'our-story',
    occasion: 'anniversary',
    name: 'Our Story',
    description: 'A multi-screen Indian aesthetic journey with traditional Bapu art, sacred garlands, and envelope keepsakes.',
    badge: 'Featured',
    previewColor: '#9b4a22',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'years'],
    defaultData: {
      recipientName: 'Ravi & Sindhu',
      senderName: 'With all our love, The Family',
      message: "Some journeys are measured in years. Some are measured in memories.\n\nYours is beautifully measured in both.\n\nThrough ordinary days, celebrations, laughter, little moments and everything in between, you have created something truly special.\n\nHere's to the memories you've made, the love you've shared, and all the beautiful moments still waiting ahead.",
      years: '25',
      photos: [
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80'
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'My Beloved',
      senderName: 'Forever Yours',
      message: 'I loved you yesterday, I love you still, I always have, I always will. Happy Anniversary, my heart.',
      date: 'June 18 • Forever & Always',
      photos: [
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: ForeverAlwaysTemplate
  },
  {
    id: 'memory-timeline',
    occasion: 'anniversary',
    name: 'Memory Scrapbook',
    description: 'Photo scrapbook checkpoints commemorating where your journey started.',
    badge: 'Scrapbook',
    previewColor: '#A29BFE',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Alex & Taylor',
      senderName: 'Celebrating Us',
      message: 'Looking back on all our memories and looking forward to thousands more together.',
      photos: [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'Dearest Eleanor',
      senderName: 'Arthur',
      message: 'No words in any language could ever fully express how grateful I am to walk through this life by your side.',
      date: 'Our Anniversary',
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: LoveLetterAnniversaryTemplate
  },
  {
    id: 'our-journey',
    occasion: 'anniversary',
    name: 'Our Journey',
    description: 'Polaroid travel keepsake celebrating every milestone and memory.',
    badge: 'Adventure',
    previewColor: '#0984E3',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'years'],
    defaultData: {
      recipientName: 'Chris & Sam',
      senderName: 'With Love',
      message: 'Every flight, every road trip, and every cozy quiet evening. Life is an amazing adventure with you.',
      years: '10 Years of Us',
      photos: [
        'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=1000&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1000&auto=format&fit=crop&q=80'
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
      classYear: 'Class of 2026',
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
    description: 'Academic timeline tracing steps from first lecture to graduation.',
    badge: 'Inspiring',
    previewColor: '#54A0FF',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'milestones'],
    defaultData: {
      recipientName: 'Chloe',
      senderName: 'Family & Mentors',
      message: 'From your very first lecture to the graduation stage, you proved resilience, passion, and brilliance at every step.',
      photos: [
        'https://images.unsplash.com/photo-1627556704302-624286467c65?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'degree'],
    defaultData: {
      recipientName: 'Dr. Emily Vance',
      senderName: 'Colleagues & Friends',
      message: 'Congratulations on achieving this remarkable academic pinnacle! The world is waiting for your brilliant contributions.',
      degree: 'Doctor of Medicine',
      photos: [
        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1000&auto=format&fit=crop&q=80'
      ]
    },
    component: AchievementGradTemplate
  },
  {
    id: 'photo-memories-grad',
    occasion: 'graduation',
    name: 'Yearbook Tribute',
    description: 'Campus photo album with friends, quotes, and ceremony cheers.',
    badge: 'Album',
    previewColor: '#00D2D3',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'classYear'],
    defaultData: {
      recipientName: 'Daniel',
      senderName: 'The Squad',
      message: 'We laughed, we stressed, we studied together, and now we graduate as champions!',
      classYear: 'Class of 2026',
      photos: [
        'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80',
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'achievement'],
    defaultData: {
      recipientName: 'Jessica',
      senderName: 'Uncle Robert',
      message: 'Your graduation is not the end of a book, but the prologue to an extraordinary adventure. Go chase the stars!',
      achievement: 'The Future is Yours',
      photos: [
        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: FutureBeginsTemplate
  },

  // ================= FAREWELL (5) =================
  {
    id: 'goodbye-memories',
    occasion: 'farewell',
    name: 'Goodbye Memories',
    description: 'Shared chapter milestone timeline with colleagues and friends.',
    badge: 'Warm',
    previewColor: '#F2994A',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'milestones'],
    defaultData: {
      recipientName: 'Samantha',
      senderName: 'Your Friends',
      message: 'Saying goodbye is never easy, but we are so excited for your next great chapter. Thank you for all the laughter and memories!',
      photos: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: GoodbyeMemoriesTemplate
  },
  {
    id: 'memory-wall',
    occasion: 'farewell',
    name: 'Memory Wall',
    description: 'Polaroid wall filled with individual messages and washi tape from teammates.',
    badge: 'Interactive',
    previewColor: '#FF9F43',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'teamName'],
    defaultData: {
      recipientName: 'David',
      senderName: 'The Whole Office',
      teamName: 'Design & Product Crew',
      message: 'You left footprints of kindness everywhere. Keep in touch!',
      photos: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: MemoryWallTemplate
  },
  {
    id: 'until-we-meet-again',
    occasion: 'farewell',
    name: 'Until We Meet Again',
    description: 'Full-bleed imagery reminding friends that distance can never break true bonds.',
    badge: 'Send-off',
    previewColor: '#10AC84',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Hannah',
      senderName: 'Your Best Friends',
      message: 'Distance means so little when people mean so much. No matter where life takes you, you will always have a home here.',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'teamName'],
    defaultData: {
      recipientName: 'Alex Mercer',
      senderName: 'The Engineering Team',
      teamName: 'Product & Tech Crew',
      message: 'Your brilliance, patience, and humor made every sprint a pleasure. Wishing you huge success in your next venture!',
      photos: [
        'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: TeamMemoriesTemplate
  },
  {
    id: 'goodbye-letter',
    occasion: 'farewell',
    name: 'Goodbye Letter',
    description: 'Heartwarming letter in a vintage envelope style with wax seal.',
    badge: 'Classic',
    previewColor: '#6D214F',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'Dear Friend',
      senderName: 'Your Crew',
      date: 'Farewell Gathering',
      message: 'As one journey concludes, another begins. Thank you for making our days brighter with your kindness and positivity.',
      photos: [
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'date'],
    defaultData: {
      recipientName: 'My Valentine',
      senderName: 'Yours Always',
      message: 'You make every normal moment feel magical. You have my whole heart today, tomorrow, and for all the days to come.',
      date: "Valentine's Day",
      photos: [
        'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800&auto=format&fit=crop&q=80'
      ]
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
        'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&auto=format&fit=crop&q=80'
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Aria',
      senderName: 'Leo',
      message: 'In a universe of billions of stars, meeting and loving you is the greatest wonder of my life.',
      photos: [
        'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'reasons'],
    defaultData: {
      recipientName: 'Bella',
      senderName: 'Noah',
      message: 'Here are just a few reasons why you are the love of my life...',
      photos: [
        'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&auto=format&fit=crop&q=80'
      ]
    },
    component: ReasonsILoveYouTemplate
  },
  {
    id: 'our-story-val',
    occasion: 'valentines',
    name: 'Our Story',
    description: 'Classic Valentine card layout with gentle gradients and milestone timeline.',
    badge: 'Classic',
    previewColor: '#B33771',
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'milestones'],
    defaultData: {
      recipientName: 'My One & Only',
      senderName: 'Always',
      message: 'From day one, you have been my dream come true. Happy Valentine’s Day, my love.',
      photos: [
        'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'achievement'],
    defaultData: {
      recipientName: 'Jordan Smith',
      senderName: 'Friends & Family',
      achievement: 'Senior Promotion',
      message: 'Huge congratulations on this tremendous milestone! Your perseverance and talent shine so bright.',
      photos: [
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'achievement'],
    defaultData: {
      recipientName: 'Samantha Ray',
      senderName: 'The Whole Team',
      achievement: 'Marathon Finisher',
      message: 'Here is to all your hard work coming to fruition. You earned every bit of this victory!',
      photos: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80'
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Liam',
      senderName: 'Proud Parents',
      message: 'Seeing how far you have come and the determination you carry fills our hearts with endless pride.',
      photos: [
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos', 'achievement'],
    defaultData: {
      recipientName: 'Maya Lin',
      senderName: 'Mentors & Peers',
      achievement: 'First Big Milestone',
      message: 'Success is the sum of small efforts repeated daily. You made it happen through sheer grit and dedication!',
      photos: [
        'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Ethan',
      senderName: 'Everyone',
      message: 'Raise a glass and let the celebrations begin! Here is to new heights and even greater victories ahead.',
      photos: [
        'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&auto=format&fit=crop&q=80'
      ]
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
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80'
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Taylor',
      senderName: 'Sam',
      message: 'Just a small reminder: you are doing amazing, and having you in my life makes everything brighter.',
      photos: [
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Grandma Rose',
      senderName: 'Lucas & Lily',
      message: 'Sending you a warm hug from afar and keeping you in our warmest thoughts today.',
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Zoe',
      senderName: 'Ben',
      message: 'In case nobody told you today: you are talented, valued, and truly one of a kind.',
      photos: [
        'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80'
      ]
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
    supportedFields: ['recipientName', 'senderName', 'message', 'photos'],
    defaultData: {
      recipientName: 'Dear Friend',
      senderName: 'Forever Grateful',
      message: 'Thank you for being such an extraordinary presence in my life. You make every day better just by being you.',
      photos: [
        'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=800&auto=format&fit=crop&q=80'
      ]
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
