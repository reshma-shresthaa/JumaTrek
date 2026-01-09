import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogService } from '../services/api';

const BlogPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                setLoading(true);
                setError(null);
                // Fetch only published blogs
                const response = await blogService.getAllBlogs({ status: 'published' });
                setPosts(response.data || response);
            } catch (err) {
                setError(err.message || 'Failed to fetch blogs');
                console.error('Error fetching blogs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return (
            <div style={{ padding: '2rem 4rem', minHeight: '100vh', textAlign: 'center' }}>
                <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                    <h1 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a202c' }}>Juma Trek Blog</h1>
                    <p className="section-subtitle" style={{ color: '#718096' }}>Stories, tips, and inspiration from the heart of the Himalayas</p>
                </div>
                <p style={{ fontSize: '1.1rem', color: '#718096' }}>Loading blogs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: '2rem 4rem', minHeight: '100vh', textAlign: 'center' }}>
                <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                    <h1 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a202c' }}>Juma Trek Blog</h1>
                    <p className="section-subtitle" style={{ color: '#718096' }}>Stories, tips, and inspiration from the heart of the Himalayas</p>
                </div>
                <p style={{ fontSize: '1.1rem', color: '#e53e3e' }}>Error: {error}</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 4rem', minHeight: '100vh' }}>
            <div className="section-header text-center" style={{ marginBottom: '50px' }}>
                <h1 className="section-title" style={{ fontSize: '2.5rem', fontFamily: 'Playfair Display, serif', color: '#1a202c' }}>Juma Trek Blog</h1>
                <p className="section-subtitle" style={{ color: '#718096' }}>Stories, tips, and inspiration from the heart of the Himalayas</p>
            </div>

            {posts.length === 0 ? (
                <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '1.1rem', color: '#718096' }}>No blog posts available yet.</p>
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {posts.map((post) => (
                        <article key={post._id} style={{
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
                                    src={post.featuredImage || 'https://via.placeholder.com/400x200'}
                                    alt={post.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                                />
                            </div>
                            <div style={{ padding: '24px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '0.8rem', color: '#3182ce', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>{post.category}</span>
                                    <span style={{ fontSize: '0.8rem', color: '#718096' }}>
                                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <h2 style={{ fontSize: '1.25rem', marginBottom: '12px', fontFamily: 'Playfair Display, serif', color: '#2d3748', lineHeight: '1.4' }}>{post.title}</h2>
                                <p style={{ color: '#718096', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>{post.excerpt}</p>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                                    <span style={{ fontSize: '0.9rem', color: '#4a5568', fontStyle: 'italic' }}>By {post.author || 'Admin'}</span>
                                    <Link to={`/blog/${post._id}`} style={{ color: '#3182ce', fontWeight: '600', textDecoration: 'none', fontSize: '0.9rem' }}>Read More &rarr;</Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BlogPage;
