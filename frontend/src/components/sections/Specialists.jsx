import React from 'react';
import { Link } from 'react-router-dom';
import './Specialists.css';

const Specialists = ({ hideViewAllButton = false }) => {
    const specialists = [
        {
            id: 1,
            name: 'Guðmundur Óli Pálmason',
            role: 'Local Specialist',
            location: 'Iceland',
            description: 'Born in Reykjavík, Iceland, and from a young age I was already travelling all over Iceland with my parents...',
            active: '58 mins ago',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        {
            id: 2,
            name: 'Olman Romero',
            role: 'Local Specialist',
            location: 'Costa Rica',
            description: 'I was born in Turrialba, it is a region famous for hosting the Guayabo Archeological Monument...',
            active: '4 hours ago',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        {
            id: 3,
            name: 'Shona Zhang',
            role: 'Local Specialist',
            location: 'China',
            description: 'With strong passion for traveling, I worked as an English-speaking guide for 10 years...',
            active: '4 hours ago',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        },
        {
            id: 4,
            name: 'Holden Ketchum',
            role: 'Local Specialist',
            location: 'Costa Rica',
            description: 'I have lived in Costa Rica for eight years and made it my home...',
            active: '2 mins ago',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        }
    ];

    return (
        <section className="specialists-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Meet our Local Travel Specialists</h2>
                    <p className="section-subtitle">Plan your trip with a local expert</p>
                </div>

                <div className="specialists-grid">
                    {specialists.map(specialist => (
                        <div key={specialist.id} className="specialist-card">
                            <div className="specialist-header">
                                <div className="specialist-status">
                                    <span className="status-dot"></span>
                                    active {specialist.active}
                                </div>
                            </div>
                            <div className="specialist-content">
                                <img src={specialist.image} alt={specialist.name} className="specialist-image" />
                                <h3 className="specialist-name">{specialist.name}</h3>
                                <div className="specialist-role">{specialist.role}</div>
                                <p className="specialist-desc">{specialist.description}</p>
                                <button className="btn-link">read more...</button>
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
