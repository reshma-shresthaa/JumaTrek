import React, { useState, useEffect } from 'react';
import {
    Typography,
    Divider,
    Tag,
    Row,
    Col,
    Carousel,
    Collapse,
    Skeleton,
    Empty,
    Card
} from 'antd';
import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    FireOutlined,
    GlobalOutlined,
    CheckCircleOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './TrekInformation.css';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';

const TrekInformation = ({ destination }) => {
    const [trek, setTrek] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTrekInfo = async () => {
            if (!destination || destination === 'custom') {
                setTrek(null);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${API_BASE}/api/custom-trips/trek-info/${destination}`);
                if (response.data.success) {
                    setTrek(response.data.data);
                } else {
                    setError(response.data.message || 'Failed to fetch trek information');
                }
            } catch (err) {
                console.error('Error fetching trek info:', err);
                setError(err.response?.data?.message || 'Trek information not found');
            } finally {
                setLoading(false);
            }
        };

        fetchTrekInfo();
    }, [destination]);

    if (loading) {
        return (
            <div className="trek-info-loading">
                <Skeleton active paragraph={{ rows: 10 }} />
            </div>
        );
    }

    if (error) {
        return (
            <div className="trek-info-error">
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={
                        <span>
                            {error}. <br />
                            <Text type="secondary">Try selecting another destination or contact us for details.</Text>
                        </span>
                    }
                />
            </div>
        );
    }

    if (!trek) {
        return null;
    }

    return (
        <div className="trek-information">
            <div className="trek-header-section">
                <Title level={4} style={{ marginBottom: '8px' }}>{trek.title}</Title>
                <div className="trek-tags">
                    <Tag color="blue"><ClockCircleOutlined /> {trek.duration} Days</Tag>
                    <Tag color="green"><EnvironmentOutlined /> {trek.maxAltitude}</Tag>
                    <Tag color="orange"><FireOutlined /> {trek.difficulty}</Tag>
                </div>
            </div>

            {trek.gallery && trek.gallery.length > 0 && (
                <div className="trek-gallery-section" style={{ marginTop: '20px' }}>
                    <Carousel autoplay effect="fade">
                        {trek.gallery.map((img, index) => (
                            <div key={index} className="gallery-slide">
                                <img src={img} alt={`${trek.title} gallery item ${index + 1}`} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            )}

            <div className="trek-story-section" style={{ marginTop: '24px' }}>
                <Title level={5}>The Journey</Title>
                <Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'Read More' }}>
                    {trek.description}
                </Paragraph>
            </div>

            <Divider style={{ margin: '16px 0' }} />

            <div className="trek-stats-grid">
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <div className="stat-item">
                            <GlobalOutlined className="stat-icon" />
                            <div className="stat-info">
                                <Text type="secondary" size="small">Best Season</Text>
                                <div>{Array.isArray(trek.bestSeason) ? trek.bestSeason.join(', ') : trek.bestSeason}</div>
                            </div>
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="stat-item">
                            <InfoCircleOutlined className="stat-icon" />
                            <div className="stat-info">
                                <Text type="secondary" size="small">Group Size</Text>
                                <div>{trek.groupSize}</div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>

            {trek.highlights && trek.highlights.length > 0 && (
                <div className="trek-highlights-section" style={{ marginTop: '24px' }}>
                    <Title level={5}>Highlights</Title>
                    <ul className="highlights-list">
                        {trek.highlights.map((highlight, index) => (
                            <li key={index}>
                                <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                <span>{highlight}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {trek.itinerary && trek.itinerary.length > 0 && (
                <div className="trek-itinerary-section" style={{ marginTop: '24px' }}>
                    <Title level={5}>Itinerary Details</Title>
                    <Collapse ghost expandIconPosition="right">
                        {trek.itinerary.map((day) => (
                            <Panel
                                header={<span style={{ fontWeight: 500 }}>Day {day.day}: {day.title}</span>}
                                key={day.day}
                            >
                                <div style={{ paddingLeft: '8px' }}>
                                    <Paragraph style={{ marginBottom: '8px', color: '#4a5568' }}>{day.description}</Paragraph>
                                    <div className="itinerary-meta">
                                        {day.maxAltitude && <Tag style={{ marginBottom: '4px' }}>Alt: {day.maxAltitude}</Tag>}
                                        {day.accommodation && <Tag style={{ marginBottom: '4px' }}>Stay: {day.accommodation}</Tag>}
                                        {day.meals && <Tag style={{ marginBottom: '4px' }}>Meals: {day.meals}</Tag>}
                                    </div>
                                </div>
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            )}
        </div>
    );
};

export default TrekInformation;
