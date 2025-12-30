import React from 'react';
import { Link } from 'react-router-dom';
import './TripsGrid.css'; // Using the same styles as TripsGrid
import abcImage from '../../assets/images/ABC.jpg';
import manasluImage from '../../assets/images/man.jpg';

const Destinations = () => {
  const destinations = [
    { 
      id: 'everest',
      name: 'Everest Region', 
      slug: 'everest-region', 
      image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'Home to the world\'s highest peak, the Everest region offers breathtaking views of the Himalayas, Sherpa culture, and challenging trekking routes.'
    },
    { 
      id: 'annapurna',
      name: 'Annapurna Circuit', 
      slug: 'annapurna-circuit', 
      image: abcImage,
      description: 'One of the most diverse treks in Nepal, featuring lush valleys, high mountain passes, and stunning views of the Annapurna range.'
    },
    { 
      id: 'langtang',
      name: 'Langtang Valley', 
      slug: 'langtang-valley', 
      image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      description: 'A beautiful valley north of Kathmandu, known for its stunning landscapes, Tamang culture, and relatively less crowded trails.'
    },
    { 
      id: 'manaslu',
      name: 'Manaslu Circuit', 
      slug: 'manaslu-circuit', 
      image: manasluImage,
      description: 'A remote and less-traveled trek that circles Mount Manaslu, the eighth highest mountain in the world, offering pristine natural beauty.'
    },
  ];

  return (
    <section className="trips-section">
      <div className="container">
        <h2 className="section-title text-start">Popular Trekking Regions</h2>
        <div className="trips-list">
          {destinations.map((dest) => (
            <Link 
              to={`/all-treks?region=${dest.slug}`} 
              key={dest.id} 
              className="trip-list-item"
            >
              <div className="trip-thumb">
                <img src={dest.image} alt={dest.name} />
              </div>
              <div className="trip-info-block">
                <h3 className="trip-item-title">{dest.name}</h3>
                <p className="trip-item-desc">{dest.description}</p>
                <span className="read-more">Explore treks</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/all-treks" className="btn btn--outline">View all regions</Link>
        </div>
      </div>
    </section>
  );
};

export default Destinations;
