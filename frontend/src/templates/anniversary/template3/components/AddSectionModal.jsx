import React from 'react';

/**
 * Modal to add new sections to the anniversary experience
 */
export function AddSectionModal({ isOpen, onClose, onAddSection }) {
  if (!isOpen) return null;

  const SECTION_TEMPLATES = [
    {
      type: "loveLetter",
      title: "Love Letter",
      desc: "A heartfelt personal letter with romantic wax seal, intimate parchment & signature.",
      icon: "💌",
      defaultData: {
        badge: "From My Heart",
        heading: "A Letter to My Beloved",
        salutation: "My Dearest,",
        paragraphs: [
          "When I look back on everything we've built, my heart overflows with gratitude. You have brought so much warmth, laughter, and calm into my life.",
          "Every ordinary day with you is a blessing, and I promise to cherish and love you more with every passing sunrise."
        ],
        signoff: "Forever Yours,",
        signature: "Vikram"
      }
    },
    {
      type: "photoGallery",
      title: "Photo Gallery",
      desc: "A visual showcase of your favorite captured memories, dates, and milestones.",
      icon: "🖼️",
      defaultData: {
        badge: "Our Captured Memories",
        heading: "Moments We Cherish",
        subtitle: "A glimpse into our happiest days together",
        photos: [
          {
            src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80",
            caption: "Under the warm evening lights",
            date: "Cherished Day"
          },
          {
            src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=800&auto=format&fit=crop&q=80",
            caption: "Laughing like nobody is watching",
            date: "Summer Holiday"
          },
          {
            src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&auto=format&fit=crop&q=80",
            caption: "Our quiet Sunday sanctuary",
            date: "Home With You"
          }
        ]
      }
    },
    {
      type: "timeline",
      title: "Milestone Timeline",
      desc: "Chronicle key dates in your journey from the first meeting to today and beyond.",
      icon: "⏳",
      defaultData: {
        badge: "Our Journey",
        heading: "Milestones of Our Love",
        subtitle: "How every chapter brought us closer together",
        events: [
          { date: "Chapter 01", title: "When We First Met", desc: "Two shy smiles across the room that started a lifetime." },
          { date: "Chapter 02", title: "The Wedding Day", desc: "Vows spoken in front of families, sealed in our hearts." },
          { date: "Chapter 03", title: "Our First Home", desc: "Unpacking boxes, dreaming dreams, and filling walls with laughter." },
          { date: "Today", title: "Happy Anniversary", desc: "Celebrating every step and looking forward to thousands more." }
        ]
      }
    },
    {
      type: "reasonsLove",
      title: "Reasons I Love You",
      desc: "A collection of cute and deeply meaningful reasons why they are your favorite person.",
      icon: "💖",
      defaultData: {
        badge: "Why You're My World",
        heading: "Reasons Why I Love You",
        subtitle: "A few out of a million reasons…",
        reasons: [
          { id: "r-1", number: "01", title: "Your Gentle Kindness", desc: "The way you treat everyone around you with genuine grace." },
          { id: "r-2", number: "02", title: "Your Laughter", desc: "The brightest sound that can turn any cloudy day into pure sunshine." },
          { id: "r-3", number: "03", title: "How You Make Me Feel Safe", desc: "In your arms, I have found the safest haven on earth." },
          { id: "r-4", number: "04", title: "Our Spontaneous Adventures", desc: "Even a grocery run feels like a fun date when you're by my side." }
        ]
      }
    },
    {
      type: "quote",
      title: "Featured Romantic Vow",
      desc: "An elegant full-bleed quote card highlighting a special vow or heartfelt thought.",
      icon: "✨",
      defaultData: {
        badge: "A Promise",
        quote: "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you.",
        author: "Forever & Always With You"
      }
    },
    {
      type: "customSection",
      title: "Custom Section",
      desc: "A versatile section with custom heading, body text, optional image, and button.",
      icon: "📝",
      defaultData: {
        badge: "Special Message",
        heading: "To My Everything",
        bodyText: "Write your own romantic message, special memory, inside joke, or blessing here. You can customize every single word.",
        image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80",
        imageCaption: "A beautiful memory of us"
      }
    }
  ];

  const handleSelectTemplate = (template) => {
    const newSection = {
      id: `sec-${Date.now()}`,
      type: template.type,
      enabled: true,
      title: template.title,
      ...template.defaultData
    };
    onAddSection(newSection);
    onClose();
  };

  return (
    <div className="tpl3-modal-overlay" onClick={onClose}>
      <div
        className="tpl3-modal-content add-section-modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header-row">
          <div>
            <h3 className="modal-title">+ Add a New Section</h3>
            <p className="modal-sub">Choose a section type to enrich your anniversary story:</p>
          </div>
          <button type="button" className="btn-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="section-template-grid">
          {SECTION_TEMPLATES.map((tpl, i) => (
            <div
              key={i}
              className="section-template-card"
              onClick={() => handleSelectTemplate(tpl)}
            >
              <div className="tpl-card-icon">{tpl.icon}</div>
              <div className="tpl-card-info">
                <h4 className="tpl-card-title">{tpl.title}</h4>
                <p className="tpl-card-desc">{tpl.desc}</p>
              </div>
              <span className="tpl-card-plus">+</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddSectionModal;
