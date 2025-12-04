import React, { useEffect, useState } from 'react';

const Stats = () => {
  const [counts, setCounts] = useState({
    trekkers: 0,
    years: 0,
    success: 0,
    routes: 0
  });

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepTime = duration / steps;
    
    const targetValues = {
      trekkers: 2500,
      years: 15,
      success: 98,
      routes: 45
    };

    const stepValues = {
      trekkers: targetValues.trekkers / steps,
      years: targetValues.years / steps,
      success: targetValues.success / steps,
      routes: targetValues.routes / steps
    };

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setCounts({
        trekkers: Math.min(Math.floor(stepValues.trekkers * currentStep), targetValues.trekkers),
        years: Math.min(Math.floor(stepValues.years * currentStep), targetValues.years),
        success: Math.min(Math.floor(stepValues.success * currentStep), targetValues.success),
        routes: Math.min(Math.floor(stepValues.routes * currentStep), targetValues.routes)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          <div className="stat">
            <span className="stat-number">{counts.trekkers.toLocaleString()}</span>
            <span className="stat-label">Happy Trekkers</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts.years}</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts.success}%</span>
            <span className="stat-label">Success Rate</span>
          </div>
          <div className="stat">
            <span className="stat-number">{counts.routes}</span>
            <span className="stat-label">Trek Routes</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;