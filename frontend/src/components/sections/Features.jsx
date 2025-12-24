import React from 'react';

const Features = () => {
  return (
    <section className="section" id="features" style={{ textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <div className="section-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>Why Choose Us</h2>
          <p className="section-subtitle" style={{ maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            Experience the Juma Trek difference with our unique approach to adventure travel
          </p>
        </div>
        
        <div className="seasonal-calendar" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexWrap: 'wrap',
          gap: '2rem',
          marginTop: '2rem' 
        }}>
          {[
            {
              name: 'Small Groups',
              icon: 'fa-users',
              color: '#10b981',
              description: 'Max 12 participants for authentic local connections and personalized attention from our expert guides.'
            },
            {
              name: 'Flexible Booking',
              icon: 'fa-calendar-check',
              color: '#3b82f6',
              description: 'Easy changes and cancellations with our flexible booking policy for worry-free travel planning.'
            },
            {
              name: 'Community Positive',
              icon: 'fa-hands-helping',
              color: '#8b5cf6',
              description: 'Supporting local communities and empowering Nepali guides through responsible tourism practices.'
            }
          ].map((feature, index) => (
            <div className="season" key={index} style={{ 
              cursor: 'default',
              flex: '1 1 300px',
              maxWidth: '350px',
              margin: '0 auto'
            }}>
              <div className="season-icon" style={{ color: feature.color, fontSize: '1.8rem' }}>
                <i className={`fas ${feature.icon}`}></i>
              </div>
              <div className="season-title" style={{ fontSize: '1.2rem', fontWeight: '600' }}>{feature.name}</div>
              <div className="season-recommendation" style={{ fontSize: '0.95rem' }}>
                {feature.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
