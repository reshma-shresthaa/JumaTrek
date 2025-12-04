import React from 'react';

const Seasons = () => {
  const seasons = [
    {
      name: 'Spring',
      months: 'March - May',
      icon: 'fas fa-sun',
      color: '#10b981',
      recommendation: 'Rhododendron blooms, clear skies, moderate temperatures. Best for photography.'
    },
    {
      name: 'Autumn',
      months: 'September - November',
      icon: 'fas fa-cloud-sun',
      color: '#f59e0b',
      recommendation: 'Stable weather, clear mountain views. Most popular and crowded season.'
    },
    {
      name: 'Winter',
      months: 'December - February',
      icon: 'fas fa-snowflake',
      color: '#3b82f6',
      recommendation: 'Cold temperatures, fewer crowds. Lower altitude treks recommended.'
    },
    {
      name: 'Monsoon',
      months: 'June - August',
      icon: 'fas fa-cloud-rain',
      color: '#8b5cf6',
      recommendation: 'Rainy season, lush landscapes. Rain-shadow areas like Upper Mustang are best.'
    }
  ];

  return (
    <section id="seasons" className="section">
      <div className="section-header">
        <h2 className="section-title">Best Time to Trek</h2>
        <p className="section-subtitle">Plan your adventure according to Nepal\'s distinct trekking seasons</p>
      </div>
      
      <div className="seasonal-calendar">
        {seasons.map((season, index) => (
          <div className="season" key={index}>
            <div className="season-icon" style={{ color: season.color }}>
              <i className={season.icon}></i>
            </div>
            <div className="season-title">{season.name}</div>
            <div className="season-months">{season.months}</div>
            <div className="season-recommendation">
              {season.recommendation}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Seasons;