export const OCCASIONS = [
  {
    id: 'birthday',
    name: 'Birthday',
    icon: '🎂',
    tagline: 'Make their day unforgettable.',
    description: 'Balloons, cakes, joyful memories, and heartfelt birthday wishes crafted for someone special.',
    hoverPreview: 'Happy Birthday, Ananya! 🎂✨',
    color: '#E05368',
    bgLight: '#FFF5F6',
    featuredBadge: 'Most Popular',
    heroTag: 'BIRTHDAY CELEBRATION'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    icon: '💍',
    tagline: 'Celebrate your story.',
    description: 'Romantic timelines, love notes, and cherished photo memories celebrating your journey together.',
    hoverPreview: 'Our story continues... 💍',
    color: '#8E44AD',
    bgLight: '#F9F5FC',
    featuredBadge: 'Romantic',
    heroTag: 'ANNIVERSARY KEEPSAKE'
  },
  {
    id: 'graduation',
    name: 'Graduation',
    icon: '🎓',
    tagline: "Celebrate how far they've come.",
    description: 'Class celebrations, achievement highlights, cap-toss memories, and future aspirations.',
    hoverPreview: 'Class of 2026 🎓 Future Begins',
    color: '#2980B9',
    bgLight: '#F2F8FC',
    featuredBadge: 'Milestone',
    heroTag: 'ACADEMIC ACHIEVEMENT'
  },
  {
    id: 'farewell',
    name: 'Farewell',
    icon: '👋',
    tagline: 'Goodbyes deserve memories.',
    description: 'Warm send-offs, memory walls, team wishes, and heartfelt notes for a bittersweet parting.',
    hoverPreview: 'Until we meet again 👋 With love',
    color: '#D35400',
    bgLight: '#FDF6F0',
    featuredBadge: 'Memorable',
    heroTag: 'FOND FAREWELL'
  },
  {
    id: 'valentines',
    name: "Valentine's",
    icon: '❤️',
    tagline: 'Say what your heart feels.',
    description: 'Passionate letters, romantic countdowns, photo keepsakes, and reasons why they mean the world.',
    hoverPreview: 'Forever yours, my heart ❤️',
    color: '#C0392B',
    bgLight: '#FDF3F2',
    featuredBadge: 'Love',
    heroTag: "VALENTINE'S ROMANCE"
  },
  {
    id: 'congratulations',
    name: 'Congratulations',
    icon: '🎉',
    tagline: 'Celebrate their moment.',
    description: 'Golden badges, confetti banners, proud moments, and cheering celebrations for victories won.',
    hoverPreview: 'You did it! Cheers to success 🎉',
    color: '#27AE60',
    bgLight: '#F2FAF5',
    featuredBadge: 'Joyful',
    heroTag: 'BIG CELEBRATION'
  },
  {
    id: 'just-because',
    name: 'Just Because',
    icon: '💌',
    tagline: 'No reason needed.',
    description: 'Gentle reminders, thinking-of-you notes, encouragement cards, and sweet spontaneous love.',
    hoverPreview: 'Thinking of you today 💌 Just because',
    color: '#9B59B6',
    bgLight: '#FAF4FC',
    featuredBadge: 'Thoughtful',
    heroTag: 'SPONTANEOUS LOVE'
  }
];

export const getOccasionById = (id) => OCCASIONS.find((occ) => occ.id === id);
