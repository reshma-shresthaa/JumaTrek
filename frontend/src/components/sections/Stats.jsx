import React, { useEffect, useState } from 'react';
import { FaMountain, FaUsers, FaChartLine, FaRoute } from 'react-icons/fa';

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
    <section className="stats-section" id="experiences">
      <div className="container">
        <div className="section-header text-center" style={{ marginBottom: '3rem' }}>
          <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#2c3e50', fontFamily: 'Playfair Display, serif' }}>Our Achievements</h2>
          <p className="section-subtitle" style={{ color: '#7f8c8d' }}>
            Proudly serving adventurers with excellence and passion
          </p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <FaUsers className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.trekkers.toLocaleString()}+</span>
              <span className="stat-label">Happy Trekkers</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaMountain className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.years}+</span>
              <span className="stat-label">Years Experience</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.success}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">
              <FaRoute className="icon" />
            </div>
            <div className="stat-content">
              <span className="stat-number">{counts.routes}+</span>
              <span className="stat-label">Trek Routes</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .stats-section {
          padding: 5rem 0;
          background-color: #f8f9fa;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .stat-card {
          background: #ffffff;
          padding: 2.5rem 2rem;
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px rgba(0,0,0,0.02);
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
          border-color: transparent;
        }
        
        .stat-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ebf8ff;
          border-radius: 50%;
          color: #3182ce;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover .stat-icon {
          background: #3182ce;
          color: #ffffff;
          transform: scale(1.1);
        }
        
        .icon {
          font-size: 2rem;
        }
        
        .stat-number {
          display: block;
          font-size: 3rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
          font-family: 'Playfair Display', serif;
          line-height: 1;
        }
        
        .stat-label {
          font-size: 1rem;
          color: #7f8c8d;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          font-weight: 600;
        }
        
        @media (max-width: 768px) {
          .stats-section {
            padding: 3rem 0;
          }
          .stat-number {
             font-size: 2.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;