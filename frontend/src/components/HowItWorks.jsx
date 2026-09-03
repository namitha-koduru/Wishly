import React from 'react';

export function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Select the mood',
      desc: 'Choose from 7 occasions and 35 distinct designs — ranging from intimate wax-seal love letters to vibrant photo albums and milestones.'
    },
    {
      num: '02',
      title: 'Compose from memory',
      desc: 'Add their name, write your personal message, and upload up to six cherished photos. Customize special timeline moments in real-time.'
    },
    {
      num: '03',
      title: 'Deliver the keepsake',
      desc: 'Wishly instantly generates a unique link. When your recipient opens it on mobile or desktop, it unfolds like a bespoke digital gift.'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="container">
        <div className="section-heading text-center">
          <span className="section-tag">THE PROCESS</span>
          <h2 className="section-title">
            Crafted in minutes.<br />
            <em>Remembered for years.</em>
          </h2>
          <p className="section-subtitle">
            A simple three-step journey to create an unforgettable personal webpage for someone who matters.
          </p>
        </div>

        <div className="process-grid">
          {steps.map((item, index) => (
            <div key={index} className="process-col">
              <div className="process-num-row">
                <span className="process-num">{item.num}</span>
                <span className="process-line"></span>
              </div>
              <h3 className="process-title">{item.title}</h3>
              <p className="process-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
