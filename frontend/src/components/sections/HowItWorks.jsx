import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: 'fa-comments',
      title: 'Tell Us What You Want',
      description: 'Complete our quick travel quiz and share your trek preferences, interests, and travel dates.'
    },
    {
      number: 2,
      icon: 'fa-users',
      title: 'Chat With Local Guides',
      description: 'Work out the details with our experienced local guides who know Nepal inside and out.'
    },
    {
      number: 3,
      icon: 'fa-check-circle',
      title: 'Securely Book Your Trek',
      description: 'Finalize your plans and book through our secure payment platform with 100% satisfaction guaranteed.'
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Our simple three-step process makes planning your perfect trek easy and hassle-free
          </p>
        </div>

        <div className="steps-container">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="step-card">
                <div className="step-number">{step.number}</div>
                <div className="step-icon">
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="step-connector">
                  <div className="connector-line"></div>
                  <div className="connector-arrow">
                    <i className="fas fa-arrow-right"></i>
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="how-it-works-cta">
          <h3>Ready to Start Your Trek?</h3>
          <p>Join hundreds of travelers who have already experienced authentic Nepal with JUMA TREK</p>
          <button className="btn btn--primary btn--lg">
            Get Started Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
