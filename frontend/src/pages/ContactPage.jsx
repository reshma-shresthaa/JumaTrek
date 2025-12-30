import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaGlobe } from 'react-icons/fa';

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Thank you! We will get back to you shortly.');
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem 4rem' }}>
            {/* Hero / Header Section */}
            <div style={{
                backgroundColor: '#f8f9fa',
                padding: '40px 0 30px', /* Reduced padding */
                textAlign: 'center',
                marginBottom: '30px' /* Reduced margin */
            }}>
                <div className="container">
                    <h1 style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: '3.5rem',
                        color: '#2c3e50',
                        marginBottom: '0.5rem' /* Reduced margin */
                    }}>Contact Us</h1>
                    <p style={{
                        color: '#7f8c8d',
                        fontSize: '1.2rem',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        Have questions about your next adventure? We're here to help you plan the trip of a lifetime.
                    </p>
                </div>
            </div>

            <div className="container" style={{ paddingBottom: '60px' }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                    gap: '40px' /* Reduced gap */
                }}>
                    {/* Contact Information Column */}
                    <div>
                        <h2 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '2rem',
                            marginBottom: '20px', /* Reduced margin */
                            color: '#2c3e50'
                        }}>Get in Touch</h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' /* Reduced gap */ }}>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#ebf8ff',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#3182ce',
                                    fontSize: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>Visit Us</h3>
                                    <p style={{ color: '#718096', lineHeight: '1.6', margin: 0 }}>
                                        Juma Trek Pvt. Ltd.<br />
                                        Thamel Marg, Kathmandu 44600<br />
                                        Nepal
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#f0fff4',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#38a169',
                                    fontSize: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>Email Us</h3>
                                    <p style={{ color: '#718096', lineHeight: '1.6', margin: 0 }}>
                                        info@jumatrek.com<br />
                                        support@jumatrek.com
                                    </p>
                                </div>
                            </div>

                            <div style={{ display: 'flex', gap: '20px' }}>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#fff5f5',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: '#e53e3e',
                                    fontSize: '1.2rem',
                                    flexShrink: 0
                                }}>
                                    <FaPhone />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: '#2d3748' }}>Call Us</h3>
                                    <p style={{ color: '#718096', lineHeight: '1.6', margin: 0 }}>
                                        +977 1 4412345 (Office)<br />
                                        +977 9851012345 (Mobile/WhatsApp)
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '40px' }}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.240403132262!2d85.31238931506213!3d27.70903198279144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1907b0522ead%3A0x34a312d1a337b5!2sThamel%2C%20Kathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1645520779782!5m2!1sen!2sus"
                                width="100%"
                                height="250"
                                style={{ border: 0, borderRadius: '12px' }}
                                allowFullScreen=""
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form Column */}
                    <div style={{
                        backgroundColor: '#ffffff',
                        padding: '30px', /* Reduced padding */
                        borderRadius: '16px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.02), 0 10px 15px rgba(0,0,0,0.03)',
                        border: '1px solid #e2e8f0'
                    }}>
                        <h2 style={{
                            fontFamily: 'Playfair Display, serif',
                            fontSize: '2rem',
                            marginBottom: '20px', /* Reduced margin */
                            color: '#2c3e50'
                        }}>Send a Message</h2>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: '20px' /* Reduced margin */ }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '20px' /* Reduced margin */ }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e0',
                                        fontSize: '1rem',
                                        outline: 'none'
                                    }}
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            <div style={{ marginBottom: '20px' /* Reduced margin */ }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Subject</label>
                                <select
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        backgroundColor: 'white'
                                    }}
                                    required
                                >
                                    <option value="">Select a topic</option>
                                    <option value="General Inquiry">General Inquiry</option>
                                    <option value="Trek Booking">Trek Booking</option>
                                    <option value="Custom Itinerary">Custom Itinerary</option>
                                    <option value="Partnership">Partnership</option>
                                </select>
                            </div>

                            <div style={{ marginBottom: '24px' /* Reduced margin */ }}>
                                <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600', color: '#4a5568', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        borderRadius: '8px',
                                        border: '1px solid #cbd5e0',
                                        fontSize: '1rem',
                                        outline: 'none',
                                        minHeight: '120px', /* Reduced height slightly */
                                        resize: 'vertical'
                                    }}
                                    placeholder="How can we help you?"
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" style={{
                                width: '100%',
                                padding: '14px', /* Slightly reduced padding */
                                backgroundColor: '#2c3e50',
                                color: 'white',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#1a202c'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#2c3e50'}
                            >
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
