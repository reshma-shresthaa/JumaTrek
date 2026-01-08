import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Card,
    Row,
    Col,
    Tag,
    Button,
    Typography,
    Divider,
    Image,
    Spin,
    message,
    Space,
    Descriptions,
    List
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    ClockCircleOutlined,
    GlobalOutlined,
    TeamOutlined,
    DollarOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import { adminService } from '../../../services/adminApi';

const { Title, Text, Paragraph } = Typography;

const TrekDetailAdmin = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [trek, setTrek] = useState(null);

    useEffect(() => {
        fetchTrekDetails();
    }, [id]);

    const fetchTrekDetails = async () => {
        setLoading(true);
        try {
            const response = await adminService.getListingById(id);
            if (response.success) {
                setTrek(response.data);
            } else {
                message.error('Failed to load trek details');
            }
        } catch (error) {
            console.error('Error fetching trek details:', error);
            message.error('Failed to load trek details');
        } finally {
            setLoading(false);
        }
    };

    const getImageUrl = (image) => {
        if (!image) return 'https://via.placeholder.com/800x600?text=No+Image';
        if (typeof image === 'string') {
            if (image.startsWith('http')) return image;
            return `http://localhost:5000/${image.replace(/\\/g, '/')}`;
        }
        return 'https://via.placeholder.com/800x600?text=Invalid+Image';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Spin size="large" tip="Loading trek details..." />
            </div>
        );
    }

    if (!trek) {
        return (
            <div className="text-center mt-10">
                <Title level={3}>Trek not found</Title>
                <Button onClick={() => navigate('/admin/treks')}>Back to Treks</Button>
            </div>
        );
    }

    return (
        <div className="trek-detail-admin">
            <div className="mb-6" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                    icon={<ArrowLeftOutlined />}
                    onClick={() => navigate('/admin/treks')}
                >
                    Back to Treks
                </Button>
                <Link to={`/admin/treks/edit/${trek._id}`}>
                    <Button type="primary" icon={<EditOutlined />}>
                        Edit Trek
                    </Button>
                </Link>
            </div>

            <Row gutter={[24, 24]}>
                <Col xs={24} lg={16}>
                    <Card className="mb-6" cover={
                        <div style={{ height: 400, overflow: 'hidden' }}>
                            <Image
                                width="100%"
                                height="100%"
                                style={{ objectFit: 'cover' }}
                                src={getImageUrl(trek.gallery?.[0])}
                                alt={trek.title}
                            />
                        </div>
                    }>
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <Title level={2} style={{ marginBottom: 0 }}>{trek.title}</Title>
                                <Space className="mt-2">
                                    <Tag color="blue">{trek.region}</Tag>
                                    <Tag color={
                                        trek.difficulty === 'Easy' ? 'green' :
                                            trek.difficulty === 'Moderate' ? 'orange' : 'red'
                                    }>{trek.difficulty}</Tag>
                                    <Tag>{trek.duration} Days</Tag>
                                </Space>
                            </div>
                            <Title level={3} type="success" style={{ margin: 0 }}>
                                ${trek.price}
                            </Title>
                        </div>

                        <div
                            className="trek-description-content"
                            dangerouslySetInnerHTML={{ __html: trek.description }}
                        />

                        <Divider />

                        <Descriptions title="Key Details" column={{ xxl: 3, xl: 3, lg: 2, md: 2, sm: 1, xs: 1 }}>
                            <Descriptions.Item label="Group Size">{trek.groupSize || 'N/A'}</Descriptions.Item>
                            <Descriptions.Item label="Max Altitude">{trek.maxAltitude || 'N/A'} m</Descriptions.Item>
                            <Descriptions.Item label="Best Season">
                                {Array.isArray(trek.bestSeason) ? trek.bestSeason.join(', ') : trek.bestSeason || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Created At">{new Date(trek.createdAt).toLocaleDateString()}</Descriptions.Item>
                            <Descriptions.Item label="Last Updated">{new Date(trek.updatedAt).toLocaleDateString()}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card title="Itinerary" className="mb-6">
                        <List
                            itemLayout="vertical"
                            dataSource={trek.itinerary || []}
                            renderItem={item => (
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<Tag color="blue">Day {item.day}</Tag>}
                                        title={<Text strong>{item.title}</Text>}
                                        description={<div dangerouslySetInnerHTML={{ __html: item.description }} />}
                                    />
                                    <Space size="large" style={{ marginLeft: 50, fontSize: 12, color: '#888' }}>
                                        {item.maxAltitude && <span><EnvironmentOutlined /> Max Alt: {item.maxAltitude}m</span>}
                                        {item.accommodation && <span> Accommodation: {item.accommodation}</span>}
                                    </Space>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                <Col xs={24} lg={8}>
                    <Card title="Highlights" className="mb-6">
                        <List
                            dataSource={trek.highlights || []}
                            renderItem={item => (
                                <List.Item>
                                    <Typography.Text>• {item}</Typography.Text>
                                </List.Item>
                            )}
                        />
                    </Card>

                    <Card title="Includes & Excludes" className="mb-6">
                        <Title level={5}>Price Includes</Title>
                        <List
                            size="small"
                            dataSource={trek.includes || []}
                            renderItem={item => <List.Item>✓ {item}</List.Item>}
                            className="mb-4"
                        />

                        <Divider />

                        <Title level={5}>Price Excludes</Title>
                        <List
                            size="small"
                            dataSource={trek.excludes || []}
                            renderItem={item => <List.Item>✗ {item}</List.Item>}
                        />
                    </Card>

                    <Card title="Gallery">
                        <Row gutter={[8, 8]}>
                            {trek.gallery && trek.gallery.map((img, index) => (
                                <Col span={8} key={index}>
                                    <Image src={getImageUrl(img)} style={{ width: '100%', height: 80, objectFit: 'cover', borderRadius: 4 }} />
                                </Col>
                            ))}
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default TrekDetailAdmin;
