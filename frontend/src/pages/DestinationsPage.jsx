import React from 'react';
import { Link } from 'react-router-dom';
import './DestinationsPage.css';

import abcImg from '../assets/images/ABC.jpg';
import manImg from '../assets/images/man.jpg';

const DestinationsPage = () => {
    const regions = [
        {
            id: 1,
            name: 'Everest Region',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'Home to the world\'s highest peak, the Everest region offers iconic trekking experiences. Walk via the footsteps of legends, experience Sherpa culture, and witness breathtaking Himalayan panoramas.',
            slug: 'everest-region'
        },
        {
            id: 2,
            name: 'Annapurna Region',
            image: abcImg,
            description: 'A diverse region ranging from subtropical forests to alpine peaks. The Annapurna Circuit and Base Camp treks are world-renowned for their accessibility and cultural richness.',
            slug: 'annapurna-region'
        },
        {
            id: 3,
            name: 'Langtang Region',
            image: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            description: 'The "Valley of Glaciers", Langtang is the closest major trekking region to Kathmandu. It offers a more tranquil experience with Tamang heritage and beautiful alpine forests.',
            slug: 'langtang-region'
        },
        {
            id: 4,
            name: 'Manaslu Region',
            image: manImg,
            description: 'A restricted area offering a pristine and remote trekking experience. The Manaslu Circuit circles the world\'s eighth highest peak, providing a perfect blend of culture and raw beauty.',
            slug: 'manaslu-region'
        }
    ];

    return (
        <div className="destinations-page-container">
            <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                <h1 className="section-title">Explore Our Trekking Regions</h1>
                <p className="section-subtitle">
                    Discover the unique character and beauty of Nepal's most famous Himalaya regions.
                </p>
            </div>

            <div className="regions-grid">
                {regions.map((region) => (
                    <div key={region.id} className="region-card">
                        <div className="region-image">
                            <img src={region.image} alt={region.name} />
                        </div>
                        <div className="region-content">
                            <h2 className="region-title">{region.name}</h2>
                            <p className="region-desc">{region.description}</p>
                            <Link
                                to={`/all-treks?region=${region.slug}`}
                                className="btn-view"
                            >
                                View Treks <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DestinationsPage;
