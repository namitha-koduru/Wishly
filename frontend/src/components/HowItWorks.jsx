import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      step: '01',
      title: 'Choose your occasion',
      desc: 'Pick from 7 occasions — Birthday, Anniversary, Graduation, Farewell, Valentine’s, Congratulations, or Just Because.',
      icon: '✨',
      color: '#E05368'
    },
    {
      step: '02',
      title: 'Make it yours',
      desc: 'Add their name, upload memorable photos, and craft your heartfelt note. Watch the live preview update in real time.',
      icon: '✍️',
      color: '#8E44AD'
    },
    {
      step: '03',
      title: 'Send the link',
      desc: 'Generate your unique Wishly link and send it. The recipient opens an emotional digital keepsake instantly without logging in.',
      icon: '💌',
      color: '#27AE60'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-tag">HOW IT WORKS</span>
          <h2 className="section-title">Three little steps.<br />One unforgettable surprise.</h2>
          <p className="section-subtitle">
            Crafting a meaningful personalized digital keepsake takes less than two minutes.
          </p>
        </div>

        {/* Visual 3-step connected journey */}
        <div className="steps-journey-container">
          <div className="steps-connector-line" aria-hidden="true"></div>
          <div className="steps-grid steps-grid-3">
            {steps.map((item, index) => (
              <div key={index} className="step-card" style={{ '--step-color': item.color }}>
                <div className="step-number-badge">{item.step}</div>
                <div className="step-icon-wrapper" style={{ backgroundColor: `${item.color}14` }}>
                  <span className="step-icon">{item.icon}</span>
                </div>
                <h3 className="step-title">{item.title}</h3>
                <p className="step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
