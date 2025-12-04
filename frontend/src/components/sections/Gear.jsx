import React from 'react';

const Gear = () => {
  const gearData = {
    footwear: ['Broken-in hiking boots', 'Hiking socks (wool/synthetic)', 'Camp shoes/sandals', 'Gaiters (for snow/mud)'],
    clothing: ['Moisture-wicking base layers', 'Insulating mid-layers (fleece/down)', 'Waterproof/windproof jacket', 'Quick-dry hiking pants', 'Thermal underwear'],
    equipment: ['40-60L backpack with rain cover', 'Sleeping bag (-10°C comfort)', 'Trekking poles', 'Headlamp with extra batteries', 'Water purification method'],
    healthSafety: ['Comprehensive first aid kit', 'Personal medications', 'High SPF sunscreen', 'Lip balm with SPF', 'Sunglasses with UV protection']
  };

  const downloadGearList = () => {
    // This would typically generate and download a PDF
    console.log('Downloading gear checklist...');
    alert('Gear checklist downloaded!');
  };

  return (
    <section id="gear" className="section">
      <div className="section-header">
        <h2 className="section-title">Essential Gear Guide</h2>
        <p className="section-subtitle">Proper equipment is crucial for a safe and comfortable trekking experience</p>
      </div>
      
      <div className="gear-categories">
        <div className="gear-category">
          <h4><i className="fas fa-hiking"></i> Footwear</h4>
          <ul className="gear-list">
            {gearData.footwear.map((item, index) => (
              <li key={index}><i className="fas fa-check"></i> {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="gear-category">
          <h4><i className="fas fa-tshirt"></i> Clothing</h4>
          <ul className="gear-list">
            {gearData.clothing.map((item, index) => (
              <li key={index}><i className="fas fa-check"></i> {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="gear-category">
          <h4><i className="fas fa-backpack"></i> Equipment</h4>
          <ul className="gear-list">
            {gearData.equipment.map((item, index) => (
              <li key={index}><i className="fas fa-check"></i> {item}</li>
            ))}
          </ul>
        </div>
        
        <div className="gear-category">
          <h4><i className="fas fa-first-aid"></i> Health & Safety</h4>
          <ul className="gear-list">
            {gearData.healthSafety.map((item, index) => (
              <li key={index}><i className="fas fa-check"></i> {item}</li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '32px' }}>
        <button className="btn" onClick={downloadGearList}>
          <i className="fas fa-download"></i> Download Complete Gear Checklist
        </button>
      </div>
    </section>
  );
};

export default Gear;