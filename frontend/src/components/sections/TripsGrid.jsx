import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { trekService } from '../../services/api';
import { FaMapMarkerAlt, FaClock, FaStar, FaArrowRight, FaMountain } from 'react-icons/fa';
import './TripsGrid.css';

const TripsGrid = () => {
  const [featuredTrips, setFeaturedTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const res = await trekService.getFeaturedTreks();
        if (res.success) {
          setFeaturedTrips(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch featured treks', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  const getImageUrl = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) return 'https://via.placeholder.com/800x600?text=No+Image';
    const image = images[0];
    if (typeof image !== 'string') return 'https://via.placeholder.com/800x600?text=No+Image';
    if (image.startsWith('http')) return image;
    return `http://localhost:5000/${image.replace(/\\/g, '/')}`;
  };

  if (loading) {
    return <div className="text-center py-12">Loading featured treks...</div>;
  }

  return (
    <section className="treks-grid-section">
      <div className="treks-grid-container">
        <div className="section-header">
          <h2 className="section-title">Featured Treks</h2>
          <p className="section-subtitle">Discover our most popular trekking adventures in the Himalayas</p>
        </div>

        <div className="trips-grid">
          {featuredTrips.slice(0, 3).map((trip) => (
            <div key={trip._id} className="trip-card">
              <div className="trip-card__image">
                <img src={getImageUrl(trip.gallery)} alt={trip.title} />
                <div className="trip-card__badge">{trip.region}</div>
                <div className="trip-card__overlay">
                  <Link to={`/trek/${trip._id}`} className="trip-card__view-btn">
                    View Details <FaArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
              <div className="trip-card__content">
                <div className="trip-card__header">
                  <h3 className="trip-card__title">{trip.title}</h3>
                  <div className="trip-card__meta">
                    <span className="trip-card__duration">
                      <FaClock className="mr-1" /> {trip.duration} days
                    </span>
                    <span className="trip-card__difficulty">
                      <FaMountain className="mr-1" /> {trip.difficulty}
                    </span>
                    {trip.region && (
                      <span className="trip-card__region">
                        <FaMapMarkerAlt className="mr-1" /> {trip.region}
                      </span>
                    )}
                  </div>
                </div>
                {/* Use a short description or substring logic if description is long */}
                <p className="trip-card__description">
                  {trip.description
                    ? (() => {
                      const plainText = trip.description.replace(/<[^>]*>/g, '');
                      return plainText.length > 100 ? plainText.substring(0, 100) + '...' : plainText;
                    })()
                    : 'No description available.'}
                </p>
                <Link to={`/trek/${trip._id}`} className="explore-btn">
                  Explore Trip <FaArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/all-treks" className="view-all-btn">
            View All Treks
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TripsGrid;
