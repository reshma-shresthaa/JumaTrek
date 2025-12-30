import React from 'react';
import { Link } from 'react-router-dom';

const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: 'Top 10 Trekking Tips for Nepal',
            excerpt: 'Prepare for your Himalayan adventure with our expert guide on packing, training, and acclimatization.',
            image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: 'Dec 28, 2024',
            author: 'Pemba Sherpa',
            category: 'Tips & Tricks'
        },
        {
            id: 2,
            title: 'Why Autumn is the Best Time for Everest Base Camp',
            excerpt: 'Crystal clear skies, moderate temperatures, and festive vibes make October and November perfect for EBC.',
            image: 'https://images.unsplash.com/photo-1548674996-0498db2571c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: 'Nov 15, 2024',
            author: 'Maya Gurung',
            category: 'Destinations'
        },
        {
            id: 3,
            title: 'Cultural Etiquette in the Himalayas',
            excerpt: 'Learn about the dos and don\'ts when visiting remote mountain villages to show respect to local communities.',
            image: 'https://images.unsplash.com/photo-1585507700267-fa98d20552ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: 'Oct 05, 2024',
            author: 'Tenzing Norgay',
            category: 'Culture'
        },
        {
            id: 4,
            title: 'Manaslu Circuit: The New Annapurna?',
            excerpt: 'Discover why the Manaslu Circuit is quickly becoming the preferred alternative to the classic Annapurna Circuit.',
            image: 'https://images.unsplash.com/photo-1549488331-5079a49c66e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            date: 'Sep 20, 2024',
            author: 'Pemba Sherpa',
            category: 'Destinations'
        }
    ];

    return (
        <div style={{ padding: '2rem 4rem', minHeight: '100vh' }}>
            <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a202c' }}>Juma Trek Blog</h1>
                <p className="section-subtitle" style={{ color: '#718096' }}>Stories, tips, and inspiration from the heart of the Himalayas</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                {posts.map((post) => (
                    <article key={post.id} style={{
                        backgroundColor: '#fff',
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                        className="blog-card"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
                        }}
                    >
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                            <img
                                src={post.image}
                                alt={post.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                            />
                        </div>
                        <div style={{ padding: '24px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                <span style={{ fontSize: '0.8rem', color: '#3182ce', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.category}</span>
                                <span style={{ fontSize: '0.8rem', color: '#718096' }}>{post.date}</span>
                            </div>
                            <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Playfair Display, serif', color: '#2d3748', lineHeight: '1.4' }}>{post.title}</h2>
                            <p style={{ color: '#718096', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                                <span style={{ fontSize: '0.9rem', color: '#4a5568', fontStyle: 'italic' }}>By {post.author}</span>
                                <Link to={`/blog/${post.id}`} style={{ color: '#3182ce', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>Read More &rarr;</Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
