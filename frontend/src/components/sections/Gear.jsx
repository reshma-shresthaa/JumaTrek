import React from 'react';

const Gear = () => {
  const gearData = {
    footwear: ['Broken-in hiking boots', 'Hiking socks (wool/synthetic)', 'Camp shoes/sandals', 'Gaiters (for snow/mud)'],
    clothing: ['Moisture-wicking base layers', 'Insulating mid-layers (fleece/down)', 'Waterproof/windproof jacket', 'Quick-dry hiking pants', 'Thermal underwear'],
    equipment: ['40-60L backpack with rain cover', 'Sleeping bag (-10°C comfort)', 'Trekking poles', 'Headlamp with extra batteries', 'Water purification method'],
    healthSafety: ['Comprehensive first aid kit', 'Personal medications', 'High SPF sunscreen', 'Lip balm with SPF', 'Sunglasses with UV protection']
  };

  const downloadGearList = async () => {
    try {
      // Dynamically import required libraries
      const [jsPDF, html2canvas] = await Promise.all([
        import('jspdf'),
        import('html2canvas')
      ]);

      // Create a temporary div to render the content
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = '800px';
      tempDiv.style.padding = '20px';
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.color = 'black';
      
      // Set the HTML content
      tempDiv.innerHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto;">
          <h1 style="color: #2c3e50; text-align: center; font-size: 24px; margin-bottom: 5px;">JumaTrek - Essential Gear Checklist</h1>
          <p style="text-align: center; color: #7f8c8d; margin-top: 0; margin-bottom: 20px;">
            Your complete packing list for a safe and comfortable trek<br>
            Generated on: ${new Date().toLocaleDateString()}
          </p>
          
          ${Object.entries({
            'FOOTWEAR': gearData.footwear,
            'CLOTHING': gearData.clothing,
            'EQUIPMENT': gearData.equipment,
            'HEALTH & SAFETY': gearData.healthSafety
          }).map(([category, items]) => `
            <div style="margin-bottom: 20px;">
              <h2 style="color: #3498db; border-bottom: 2px solid #3498db; padding-bottom: 5px; font-size: 18px; margin-bottom: 10px;">
                ${category}
              </h2>
              <ul style="list-style-type: none; padding-left: 20px; margin: 0;">
                ${items.map(item => `
                  <li style="margin: 8px 0; position: relative; padding-left: 25px;">
                    <span style="position: absolute; left: 0; color: #27ae60;">✓</span> ${item}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
          
          <div style="margin-top: 40px; text-align: center; color: #7f8c8d; font-style: italic; font-size: 14px;">
            <p>Happy Trekking! - JumaTrek Team</p>
          </div>
        </div>
      `;

      // Append to body and render
      document.body.appendChild(tempDiv);
      
      // Use html2canvas to render the div as a canvas
      const canvas = await html2canvas.default(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF.jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });

      const imgWidth = 190; // A4 width in mm (210 - 10mm margins on each side)
      const pageHeight = 277; // A4 height in mm (297 - 10mm margins on top/bottom)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
      
      // Save the PDF
      pdf.save('JumaTrek-Gear-Checklist.pdf');
      
      // Clean up
      document.body.removeChild(tempDiv);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating the gear checklist. Please try again.');
    }
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
        <button 
          className="btn btn-download" 
          onClick={downloadGearList}
        >
          <i className="fas fa-download" style={{ fontSize: '1.1em' }}></i>
          <span>Download Complete Gear Checklist</span>
        </button>
      </div>
    </section>
  );
};

export default Gear;