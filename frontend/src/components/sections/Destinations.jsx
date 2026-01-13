import React from 'react';
import { Link } from 'react-router-dom';
import { FaMountain, FaArrowRight } from 'react-icons/fa';
import './Destinations.css';
import abcImage from '../../assets/images/ABC.jpg';
import manasluImage from '../../assets/images/man.jpg';

const Destinations = () => {
  const destinations = [
    { 
      id: 'everest',
      name: 'Everest Region', 
      slug: 'everest', 
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Home to the world\'s highest peak, the Everest region offers breathtaking views of the Himalayas, Sherpa culture, and challenging trekking routes.'
    },
    { 
      id: 'annapurna',
      name: 'Annapurna Region', 
      slug: 'annapurna', 
      image: abcImage,
      description: 'One of the most diverse treks in Nepal, featuring lush valleys, high mountain passes, and stunning views of the Annapurna range.'
    },
    { 
      id: 'langtang',
      name: 'Langtang Region', 
      slug: 'langtang', 
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'A beautiful valley north of Kathmandu, known for its stunning landscapes, Tamang culture, and relatively less crowded trails.'
    },
    { 
      id: 'manaslu',
      name: 'Manaslu Region', 
      slug: 'manaslu', 
      image: manasluImage,
      description: 'A remote and less-traveled trek that circles Mount Manaslu, the eighth highest mountain in the world, offering pristine natural beauty.'
    },
  ];

  return (
    <section className="destinations-section">
      <div className="destinations-container">
        <header className="destinations-header">
          <h2 className="section-title">Explore Popular Trekking Regions</h2>
          <p className="section-subtitle">Discover the most breathtaking trekking destinations in the Himalayas, each offering unique landscapes and unforgettable experiences.</p>
        </header>
        
        <div className="destinations-grid">
          {destinations.slice(0, 3).map((dest) => (
            <article key={dest.id} className="destination-card">
              <div className="destination-image">
                <img src={dest.image} alt={dest.name} />
                <div className="destination-overlay">
                  <Link to={`/all-treks?region=${dest.slug}-region`} className="explore-btn">
                    Explore Region <FaArrowRight />
                  </Link>
                </div>
              </div>
              <div className="destination-content">
                <h3 className="destination-name">{dest.name}</h3>
                <p className="destination-description">{dest.description}</p>
                <div className="destination-meta">
                  <span className="destination-treks">
                    <FaMountain /> Multiple Treks
                  </span>
                  <Link to={`/all-treks?region=${dest.slug}-region`} className="explore-btn">
                    View Treks <FaArrowRight />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        <div className="text-center">
          <Link to="/destinations" className="view-all-btn">
            View All Trekking Regions
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
