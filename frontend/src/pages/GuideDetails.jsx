import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { guideService } from '../services/api';

const GuideDetails = () => {
    const { id } = useParams();
    const [guide, setGuide] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await guideService.getGuideById(id);
                if (res.success) {
                    setGuide(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch guide details', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchGuide();
        }
    }, [id]);

    const getImageUrl = (photo) => {
        if (!photo) return 'https://via.placeholder.com/400';
        if (photo.startsWith('http')) return photo;
        return `http://localhost:5000/${photo.replace(/\\/g, '/')}`;
    };

    if (loading) {
        return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Loading...</div>;
    }

    if (!guide) {
        return <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>Guide not found</div>;
    }

    return (
        <section style={{ padding: '4rem 0' }}>
            <div className="container">
                <Link to="/guides" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--primary-color)' }}>
                    &larr; Back to Guides
                </Link>
                <div style={{ display: 'flex', gap: '4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                        <img
                            src={getImageUrl(guide.photo)}
                            alt={guide.name}
                            style={{
                                width: '100%',
                                borderRadius: '1rem',
                                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                objectFit: 'cover',
                                aspectRatio: '3/4'
                            }}
                        />
                    </div>
                    <div style={{ flex: '1 1 400px' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{guide.name}</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-light)', marginBottom: '2rem' }}>
                            {guide.specialization?.join(', ')} Specialist
                        </p>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Biography</h3>
                            <p style={{ lineHeight: '1.8', color: 'var(--text-color)' }}>
                                {guide.bio || "No biography available."}
                            </p>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                            <div>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Experience</h4>
                                <p>{guide.experience} Years</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Languages</h4>
                                <p>{guide.languages?.join(', ')}</p>
                            </div>
                            <div>
                                <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Location</h4>
                                <p>Nepal</p>
                            </div>
                            {guide.certifications && guide.certifications.length > 0 && (
                                <div>
                                    <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Certifications</h4>
                                    <ul style={{ paddingLeft: '1rem', margin: 0 }}>
                                        {guide.certifications.map((cert, index) => (
                                            <li key={index}>{cert}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GuideDetails;
