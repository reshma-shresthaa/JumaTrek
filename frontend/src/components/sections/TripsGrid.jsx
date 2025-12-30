import React from 'react';
import { Link } from 'react-router-dom';
import { treksData } from '../../data/trekData'; // Ensure this import is correct based on project structure
import './TripsGrid.css';

const TripsGrid = () => {
  // Use data or fallback to kimkim-like dummy data for visual matching if needed
  // But better to use real data from the project.
  const featuredTrips = treksData && treksData.length > 0 ? treksData.slice(0, 6) : [
    {
      id: 1,
      title: 'Discover Norway by Train & Boat - 10 Days',
      image: 'https://images.unsplash.com/photo-1509356843151-3e7d96241e11?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'This relaxing summer itinerary checks off Norway\'s three biggest cities, traveling by train, ferry, and fjord cruise for a true Scandinavian adventure.',
      duration: 10
    },
    {
      id: 2,
      title: 'Highlights of Italy: Venice, Florence, Rome - 14 Days',
      image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'Discover the sights and delights of Italy on this two-week highlights tour. Explore the floating city of Venice, the Renaissance jewel of Florence...',
      duration: 14
    },
    {
      id: 3,
      title: 'Grand Morocco Tour: North to South - 10 Days',
      image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
      description: 'This 10-day itinerary features a perfect mix of culture, history, adventure, and relaxation. Explore imperial cities, mountain villages, desert landscapes...',
      duration: 10
    }
  ];

  return (
    <section className="trips-section">
      <div className="container">
        <h2 className="section-title text-start">Featured Trips</h2>
        <div className="trips-list">
          {featuredTrips.map((trip) => (
            <Link to={`/trek/${trip.id}`} key={trip.id} className="trip-list-item">
              <div className="trip-thumb">
                <img src={trip.image} alt={trip.title} />
              </div>
              <div className="trip-info-block">
                <h3 className="trip-item-title">{trip.title}</h3>
                <p className="trip-item-desc">{trip.description}</p>
                <span className="read-more">Read more...</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/all-treks" className="btn btn--outline">View all trips</Link>
        </div>
      </div>
    </section>
  );
};

export default TripsGrid;
