import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { guideService } from '../../services/api';
import './Specialists.css';

const Specialists = ({ hideViewAllButton = false }) => {
    const [specialists, setSpecialists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuides = async () => {
            try {
                const res = await guideService.getAllGuides();
                if (res.success) {
                    setSpecialists(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch guides', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGuides();
    }, []);

    const getImageUrl = (photo) => {
        if (!photo) return 'https://via.placeholder.com/200';
        if (photo.startsWith('http')) return photo;
        return `http://localhost:5000/${photo.replace(/\\/g, '/')}`;
    };

    if (loading) {
        return <div className="container" style={{ textAlign: 'center', padding: '2rem' }}>Loading specialists...</div>;
    }

    return (
        <section className="specialists-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Meet our Local Travel Specialists</h2>
                    <p className="section-subtitle">Plan your trip with a local expert</p>
                </div>

                <div className="specialists-grid">
                    {specialists.map(specialist => (
                        <div key={specialist._id} className="specialist-card">
                            <div className="specialist-header">
                                {/* Status section removed */}
                            </div>
                            <div className="specialist-content">
                                <img
                                    src={getImageUrl(specialist.photo)}
                                    alt={specialist.name}
                                    className="specialist-image"
                                />
                                <h3 className="specialist-name">{specialist.name}</h3>
                                <div className="specialist-role">
                                    {specialist.specialization && specialist.specialization[0]
                                        ? specialist.specialization[0]
                                        : 'Local Specialist'}
                                </div>
                                <p className="specialist-desc">
                                    {specialist.bio ? specialist.bio.substring(0, 100) + '...' : ''}
                                </p>
                                <Link to={`/guides/${specialist._id}`} className="btn-link">read more...</Link>
                            </div>
                        </div>
                    ))}
                </div>

                {!hideViewAllButton && (
                    <div className="specialists-cta">
                        <Link to="/guides" className="btn btn--outline">See all local travel agents</Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Specialists;
