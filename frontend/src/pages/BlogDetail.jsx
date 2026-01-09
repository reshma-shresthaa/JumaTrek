import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogService } from '../services/api';
import './BlogDetail.css';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogDetails = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await blogService.getBlogById(id);
                setBlog(response.data || response);
            } catch (err) {
                setError(err.message || 'Failed to fetch blog details');
                console.error('Error fetching blog:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBlogDetails();
        }
    }, [id]);

    useEffect(() => {
        const fetchRelatedBlogs = async () => {
            if (!blog) return;
            try {
                const response = await blogService.getAllBlogs({ status: 'published' });
                const blogs = response.data || response;
                // Filter out current blog and get related ones by category
                const related = blogs
                    .filter(b => b._id !== blog._id && b.category === blog.category)
                    .slice(0, 3);
                setRelatedBlogs(related);
            } catch (err) {
                console.error('Error fetching related blogs:', err);
            }
        };

        fetchRelatedBlogs();
    }, [blog]);

    if (loading) {
        return (
            <div style={{ padding: '2rem 4rem', minHeight: '100vh', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: '#718096' }}>Loading blog details...</p>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div style={{ padding: '2rem 4rem', minHeight: '100vh', textAlign: 'center' }}>
                <div style={{ marginBottom: '30px' }}>
                    <h2 style={{ fontSize: '2rem', color: '#1a202c', marginBottom: '10px' }}>Blog Not Found</h2>
                    <p style={{ fontSize: '1rem', color: '#718096', marginBottom: '20px' }}>
                        {error || "The blog post you're looking for doesn't exist."}
                    </p>
                    <Link 
                        to="/blog" 
                        style={{
                            display: 'inline-block',
                            padding: '10px 20px',
                            backgroundColor: '#3182ce',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontWeight: '600'
                        }}
                    >
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ padding: '2rem 4rem', minHeight: '100vh', backgroundColor: '#ffffff' }}>
            <div style={{ maxWidth: '100%', margin: '0 auto' }}>
                {/* Breadcrumb */}
                <div style={{ marginBottom: '30px', fontSize: '0.9rem', maxWidth: '1200px', margin: '0 auto 30px' }}>
                    <Link to="/blog" style={{ color: '#3182ce', textDecoration: 'none', marginRight: '8px', fontWeight: '500' }}>Blog</Link>
                    <span style={{ color: '#cbd5e0', margin: '0 8px' }}>/</span>
                    <span style={{ color: '#718096', marginRight: '8px' }}>{blog.category}</span>
                </div>

                {/* Hero Image - 60% width */}
                <div style={{ marginBottom: '50px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', width: '60%', margin: '0 auto 50px' }}>
                    <img
                        src={blog.featuredImage || 'https://via.placeholder.com/1200x350'}
                        alt={blog.title}
                        style={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '400px',
                            objectFit: 'cover',
                            display: 'block'
                        }}
                    />
                </div>

                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '50px', alignItems: 'start' }}>
                    {/* Main Content */}
                    <div>
                        {/* Title Section */}
                        <div style={{ marginBottom: '35px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                                <span style={{
                                    fontSize: '0.75rem',
                                    color: '#3182ce',
                                    fontWeight: '700',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    backgroundColor: '#ede9fe',
                                    padding: '6px 14px',
                                    borderRadius: '20px'
                                }}>
                                    {blog.category}
                                </span>
                            </div>

                            <h1 style={{
                                fontSize: '2.8rem',
                                fontFamily: 'Playfair Display, serif',
                                color: '#1a202c',
                                marginBottom: '20px',
                                lineHeight: '1.25',
                                fontWeight: '700'
                            }}>
                                {blog.title}
                            </h1>

                            {/* Article Meta Info - Cleaner design */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '30px',
                                paddingBottom: '25px',
                                borderBottom: '2px solid #f0f0f0'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <div style={{
                                        width: '44px',
                                        height: '44px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '1.3rem',
                                        fontWeight: '700',
                                        color: 'white'
                                    }}>
                                        {(blog.author || 'A').charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <div style={{ fontWeight: '600', color: '#2d3748', fontSize: '0.95rem' }}>
                                            {blog.author || 'Admin'}
                                        </div>
                                        <div style={{ fontSize: '0.85rem', color: '#718096', marginTop: '2px' }}>
                                            {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    gap: '8px',
                                    fontSize: '0.9rem',
                                    color: '#718096',
                                    alignItems: 'center'
                                }}>
                                    <i className="fas fa-eye"></i>
                                    <span>{blog.views || 0} views</span>
                                </div>
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div style={{
                            fontSize: '1.2rem',
                            color: '#4a5568',
                            fontStyle: 'italic',
                            marginBottom: '40px',
                            lineHeight: '1.7',
                            paddingLeft: '25px',
                            borderLeft: '4px solid #667eea'
                        }}>
                            "{blog.excerpt}"
                        </div>

                        {/* Main Content */}
                        <div style={{
                            fontSize: '1.05rem',
                            color: '#2d3748',
                            lineHeight: '1.85',
                            marginBottom: '40px',
                            letterSpacing: '0.3px'
                        }}
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div style={{
                                paddingTop: '30px',
                                borderTop: '2px solid #f0f0f0',
                                marginBottom: '40px'
                            }}>
                                <span style={{ fontWeight: '600', color: '#2d3748', marginRight: '20px', fontSize: '0.95rem' }}>Tags:</span>
                                <div style={{ display: 'inline-flex', gap: '12px', flexWrap: 'wrap', marginTop: '12px' }}>
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} style={{
                                            display: 'inline-block',
                                            backgroundColor: '#f8f9ff',
                                            border: '1px solid #d4d9e6',
                                            padding: '8px 14px',
                                            borderRadius: '24px',
                                            fontSize: '0.85rem',
                                            color: '#4a5568',
                                            fontWeight: '500'
                                        }}>
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Back Link */}
                        <Link
                            to="/blog"
                            style={{
                                display: 'inline-block',
                                color: '#3182ce',
                                fontWeight: '600',
                                textDecoration: 'none',
                                fontSize: '0.95rem',
                                transition: 'all 0.3s ease',
                                padding: '8px 0'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2c5aa0'}
                            onMouseLeave={(e) => e.target.style.color = '#3182ce'}
                        >
                            ← Back to Blog
                        </Link>
                </div>

                    {/* Sidebar - Optimized */}
                    <div style={{ position: 'sticky', top: '20px' }}>
                        {/* Related Posts */}
                        {relatedBlogs.length > 0 && (
                            <div style={{
                                backgroundColor: '#f8f9ff',
                                padding: '24px',
                                borderRadius: '12px',
                                marginBottom: '30px',
                                border: '1px solid #e6eef7'
                            }}>
                                <h3 style={{
                                    fontSize: '1.1rem',
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#1a202c',
                                    marginBottom: '20px',
                                    fontWeight: '600'
                                }}>
                                    Related Articles
                                </h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {relatedBlogs.map(relatedBlog => (
                                        <Link
                                            key={relatedBlog._id}
                                            to={`/blog/${relatedBlog._id}`}
                                            style={{
                                                padding: '14px',
                                                backgroundColor: 'white',
                                                border: '1px solid #e6eef7',
                                                borderRadius: '8px',
                                                textDecoration: 'none',
                                                transition: 'all 0.3s ease',
                                                cursor: 'pointer'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = '#3182ce';
                                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(49, 130, 206, 0.15)';
                                                e.currentTarget.style.transform = 'translateX(4px)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = '#e6eef7';
                                                e.currentTarget.style.boxShadow = 'none';
                                                e.currentTarget.style.transform = 'translateX(0)';
                                            }}
                                        >
                                            <div style={{
                                                fontSize: '0.75rem',
                                                color: '#3182ce',
                                                fontWeight: '700',
                                                marginBottom: '6px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px'
                                            }}>
                                                {relatedBlog.category}
                                            </div>
                                            <div style={{
                                                fontSize: '0.9rem',
                                                color: '#2d3748',
                                                fontWeight: '600',
                                                lineHeight: '1.4',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {relatedBlog.title}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Share Box */}
                        <div style={{
                            backgroundColor: '#f8f9ff',
                            padding: '24px',
                            borderRadius: '12px',
                            border: '1px solid #e6eef7'
                        }}>
                            <h3 style={{
                                fontSize: '1.1rem',
                                fontFamily: 'Playfair Display, serif',
                                color: '#1a202c',
                                marginBottom: '20px',
                                fontWeight: '600'
                            }}>
                                Share Article
                            </h3>
                            <div style={{
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'column'
                            }}>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 14px',
                                        backgroundColor: 'white',
                                        border: '1px solid #e6eef7',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        color: '#2d3748',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '500',
                                        fontSize: '0.9rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#3182ce';
                                        e.currentTarget.style.color = '#3182ce';
                                        e.currentTarget.style.backgroundColor = '#e6f2ff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e6eef7';
                                        e.currentTarget.style.color = '#2d3748';
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    <i className="fab fa-facebook-f" style={{ fontSize: '1rem' }}></i>
                                    <span>Facebook</span>
                                </a>
                                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}&text=${blog.title}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 14px',
                                        backgroundColor: 'white',
                                        border: '1px solid #e6eef7',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        color: '#2d3748',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '500',
                                        fontSize: '0.9rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#3182ce';
                                        e.currentTarget.style.color = '#3182ce';
                                        e.currentTarget.style.backgroundColor = '#e6f2ff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e6eef7';
                                        e.currentTarget.style.color = '#2d3748';
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    <i className="fab fa-twitter" style={{ fontSize: '1rem' }}></i>
                                    <span>Twitter</span>
                                </a>
                                <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px 14px',
                                        backgroundColor: 'white',
                                        border: '1px solid #e6eef7',
                                        borderRadius: '8px',
                                        textDecoration: 'none',
                                        color: '#2d3748',
                                        transition: 'all 0.3s ease',
                                        fontWeight: '500',
                                        fontSize: '0.9rem'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#3182ce';
                                        e.currentTarget.style.color = '#3182ce';
                                        e.currentTarget.style.backgroundColor = '#e6f2ff';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = '#e6eef7';
                                        e.currentTarget.style.color = '#2d3748';
                                        e.currentTarget.style.backgroundColor = 'white';
                                    }}
                                >
                                    <i className="fab fa-linkedin-in" style={{ fontSize: '1rem' }}></i>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;
