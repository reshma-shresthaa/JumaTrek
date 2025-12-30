import React from 'react';

const Training = () => {
  return (
    <section id="training" className="section">
      <div className="section-header">
        <h2 className="section-title">Trek Preparation</h2>
        <p className="section-subtitle">Get ready for your Himalayan adventure with our comprehensive training guide</p>
      </div>
      
      <div className="training-steps">
        <div className="training-step">
          <div className="step-number">1</div>
          <h3 className="trained">Physical Conditioning</h3>
          <p className="muted">Build your endurance with a 2-3 month training plan including cardio, strength training, and hiking with a loaded backpack.</p>
          <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
            <li>Cardio: 3-4 times per week (running, cycling, swimming)</li>
            <li>Strength: Focus on legs, core, and back</li>
            <li>Practice hikes: Gradually increase distance and elevation</li>
          </ul>
        </div>
        
        <div className="training-step">
          <div className="step-number">2</div>
          <h3 className="trained">Altitude Preparation</h3>
          <p className="muted">Understand and prepare for high-altitude trekking with proper acclimatization techniques.</p>
          <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
            <li>Climb high, sleep low principle</li>
            <li>Stay hydrated (3-4 liters daily)</li>
            <li>Recognize symptoms of altitude sickness</li>
            <li>Consider medication like Diamox (consult doctor)</li>
          </ul>
        </div>
        
        <div className="training-step">
          <div className="step-number">3</div>
          <h3 className="trained">Mental Preparation</h3>
          <p className="muted">Trekking in the Himalayas requires mental resilience as much as physical strength.</p>
          <ul style={{ marginTop: '16px', paddingLeft: '20px' }}>
            <li>Set realistic expectations</li>
            <li>Practice mindfulness and breathing techniques</li>
            <li>Prepare for variable weather and basic accommodations</li>
            <li>Focus on the journey, not just the destination</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Training;