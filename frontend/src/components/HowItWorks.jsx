import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose an occasion',
      desc: 'Pick from 7 occasions: Birthday, Anniversary, Graduation, Farewell, Valentine’s, Congratulations, or Just Because.',
      icon: '🎉',
      color: '#FF6B8B'
    },
    {
      step: '02',
      title: 'Pick your favorite design',
      desc: 'Browse through 35+ handcrafted templates with diverse layouts, typography, and storytelling styles.',
      icon: '🎨',
      color: '#9B51E0'
    },
    {
      step: '03',
      title: 'Personalize it',
      desc: 'Add their name, upload photos, and write your heartfelt message. Watch the live preview update in real time.',
      icon: '✍️',
      color: '#2F80ED'
    },
    {
      step: '04',
      title: 'Share your Wishly',
      desc: 'Generate a clean, unique link and send it. The recipient opens their personalized keepsake instantly without logging in.',
      icon: '🚀',
      color: '#27AE60'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-tag">EASY AS 1-2-3-4</span>
          <h2 className="section-title">How Wishly works</h2>
          <p className="section-subtitle">
            Create a meaningful personalized digital keepsake in just a few minutes.
          </p>
        </div>

        <div className="steps-grid steps-grid-4">
          {steps.map((item, index) => (
            <div key={index} className="step-card" style={{ '--step-color': item.color }}>
              <div className="step-number">{item.step}</div>
              <div className="step-icon-wrapper" style={{ backgroundColor: `${item.color}15` }}>
                <span className="step-icon">{item.icon}</span>
              </div>
              <h3 className="step-title">{item.title}</h3>
              <p className="step-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
