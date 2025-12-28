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
    <section className="stats-section">
      <h2 className="section-title" style={{ color: '#1a1a2e', marginBottom: '1rem', textAlign: 'center' }}>Our Achievements</h2>
      <p className="section-subtitle" style={{ color: '#4b5563', maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        Proudly serving adventurers with excellence and passion
      </p>
      <div className="stats-container">
        <div className="container">
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
      </div>
      <style >{`
        .stats-section {
          padding: 2rem 0 0;
          position: relative;
          overflow: hidden;
        }
        
        .stats-container {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          padding: 4rem 0;
          border-radius: 15px;
          margin: 2rem 0;
        }
        
        .stats-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/images/mountain-pattern.png') center/cover;
          opacity: 0.03;
          pointer-events: none;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2.5rem;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        
        .stat-card {
          background: rgba(255, 255, 255, 0.1);
          padding: 2.5rem 1.5rem;
          border-radius: 12px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
        
        .stat-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto 1.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover .stat-icon {
          background: rgba(255, 255, 255, 0.2);
          transform: scale(1.1);
        }
        
        .icon {
          font-size: 2rem;
          color: #ff7e5f;
        }
        
        .stat-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .stat-number {
          display: block;
          font-size: 2.8rem;
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          line-height: 1.2;
          font-family: 'Poppins', sans-serif;
          background: linear-gradient(90deg, #fff, #a5b4fc);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
        }
        
        .stat-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 500;
          margin-top: 0.5rem;
          display: inline-block;
          position: relative;
        }
        
        .stat-label::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -5px;
          left: 50%;
          background: #4cc9f0;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover .stat-label::after {
          width: 50%;
          left: 25%;
        }
        
        @media (max-width: 768px) {
          .stats-section {
            padding: 1rem 0 0;
          }
          .stats-container {
            padding: 2rem 0;
          }
          
          .stats-grid {
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
          }
          
          .stat-card {
            padding: 1.5rem 1rem;
          }
          
          .stat-number {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default Stats;