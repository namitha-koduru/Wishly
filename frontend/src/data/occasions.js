export const OCCASIONS = [
  {
    id: 'birthday',
    name: 'Birthday',
    icon: '🎂',
    tagline: 'Make their birthday unforgettable.',
    description: 'Make their birthday unforgettable with joyful memories, photos, and heartfelt wishes.',
    color: '#FF6B8B',
    bgLight: '#FFF0F3',
    featuredBadge: 'Most Popular',
    heroTag: 'BIRTHDAY CELEBRATION'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    icon: '💍',
    tagline: 'Celebrate your journey together.',
    description: 'Celebrate your journey together with romantic timelines, love notes, and cherished memories.',
    color: '#9B51E0',
    bgLight: '#F7F0FF',
    featuredBadge: 'Romantic',
    heroTag: 'ANNIVERSARY KEEPSAKE'
  },
  {
    id: 'graduation',
    name: 'Graduation',
    icon: '🎓',
    tagline: 'Celebrate a milestone worth remembering.',
    description: 'Celebrate a milestone worth remembering with cap-toss highlights and bright aspirations.',
    color: '#2F80ED',
    bgLight: '#EFF6FF',
    featuredBadge: 'Milestone',
    heroTag: 'ACADEMIC ACHIEVEMENT'
  },
  {
    id: 'farewell',
    name: 'Farewell',
    icon: '👋',
    tagline: 'Turn goodbye into a beautiful memory.',
    description: 'Turn goodbye into a beautiful memory with warm send-offs, team notes, and lasting gratitude.',
    color: '#F2994A',
    bgLight: '#FFF6EE',
    featuredBadge: 'Memorable',
    heroTag: 'FOND FAREWELL'
  },
  {
    id: 'valentines',
    name: "Valentine's",
    icon: '❤️',
    tagline: 'Say what your heart feels.',
    description: 'Say what your heart feels with passionate love letters, photo moments, and deep affection.',
    color: '#EB5757',
    bgLight: '#FFF0F0',
    featuredBadge: 'Love',
    heroTag: "VALENTINE'S ROMANCE"
  },
  {
    id: 'congratulations',
    name: 'Congratulations',
    icon: '🎉',
    tagline: 'Celebrate their big moment.',
    description: 'Celebrate their big moment with cheering accolades, gold trophies, and proud celebrations.',
    color: '#27AE60',
    bgLight: '#F0FFF4',
    featuredBadge: 'Joyful',
    heroTag: 'BIG CELEBRATION'
  },
  {
    id: 'just-because',
    name: 'Just Because',
    icon: '💌',
    tagline: "Sometimes you don't need a reason.",
    description: "Sometimes you don't need a reason — brighten their day with an unexpected thoughtful wish.",
    color: '#E056FD',
    bgLight: '#FAF0FF',
    featuredBadge: 'Thoughtful',
    heroTag: 'SPONTANEOUS LOVE'
  }
];

export const getOccasionById = (id) => OCCASIONS.find((occ) => occ.id === id);
