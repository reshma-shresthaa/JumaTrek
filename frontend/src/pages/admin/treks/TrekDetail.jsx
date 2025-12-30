import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  Card, 
  Button, 
  Tag, 
  Tabs, 
  Descriptions, 
  Space, 
  Typography, 
  Image, 
  Divider, 
  List,
  Badge,
  Alert,
  Skeleton,
  message,
  Popconfirm
} from 'antd';
import { 
  EditOutlined, 
  DeleteOutlined, 
  ArrowLeftOutlined, 
  CalendarOutlined, 
  TeamOutlined, 
  EnvironmentOutlined,
  DollarOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const TrekDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [trek, setTrek] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Fetch trek data
  useEffect(() => {
    const fetchTrek = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data - replace with actual API call
        const mockTrek = {
          id,
          title: 'Everest Base Camp Trek',
          description: 'Experience the adventure of a lifetime with this classic trek to the base of the world\'s highest peak. This trek offers breathtaking views of the Himalayas, cultural experiences in Sherpa villages, and a sense of accomplishment that lasts a lifetime.',
          region: 'Everest',
          difficulty: 'Challenging',
          duration: 14,
          maxAltitude: 5545,
          groupSize: 12,
          bestSeason: ['Spring (Mar-May)', 'Autumn (Sep-Nov)'],
          startPoint: 'Kathmandu',
          endPoint: 'Lukla',
          price: 1500,
          discountPrice: 1400,
          singleSupplement: 300,
          deposit: 200,
          status: 'published',
          featured: true,
          priceIncludes: [
            'Airport transfers',
            'Accommodation in tea houses',
            'All meals during the trek',
            'Experienced trekking guide',
            'TIMS card and trekking permits',
            'First aid kit',
            'Farewell dinner'
          ],
          priceExcludes: [
            'International flights',
            'Travel insurance',
            'Nepal visa fee',
            'Personal expenses',
            'Tips for guides and porters',
            'Alcoholic beverages'
          ],
          accommodation: ['Tea House', 'Lodge'],
          transportation: ['Flight', 'Private Vehicle'],
          groupDiscount: true,
          privateTrip: true,
          images: [
            'https://images.unsplash.com/photo-1580502304784-8985b7eb7260?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1580706483919-2d6871a03b99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            'https://images.unsplash.com/photo-1580706483919-2d6871a03b99?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
          ],
          itinerary: [
            { day: 1, title: 'Arrival in Kathmandu', description: 'Arrive at Tribhuvan International Airport and transfer to your hotel. Briefing about the trek in the evening.' },
            { day: 2, title: 'Fly to Lukla & Trek to Phakding', description: 'Early morning flight to Lukla (2,860m) and trek to Phakding (2,610m).' },
            // Add more days as needed
          ],
          faqs: [
            { question: 'What is the best time to do this trek?', answer: 'The best times are during spring (March to May) and autumn (September to November).' },
            { question: 'How difficult is this trek?', answer: 'This trek is considered challenging but achievable for people with good physical condition.' },
          ],
          createdAt: '2025-01-15',
          updatedAt: '2025-01-20',
          bookings: 24,
          rating: 4.8,
        };
        
        setTrek(mockTrek);
      } catch (error) {
        console.error('Error fetching trek:', error);
        message.error('Failed to load trek details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrek();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Handle delete logic
      await new Promise(resolve => setTimeout(resolve, 800));
      message.success('Trek deleted successfully');
      navigate('/admin/treks');
    } catch (error) {
      console.error('Error deleting trek:', error);
      message.error('Failed to delete trek');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      // Handle status change logic
      await new Promise(resolve => setTimeout(resolve, 500));
      setTrek({ ...trek, status: newStatus });
      message.success(`Trek marked as ${newStatus}`);
    } catch (error) {
      console.error('Error updating trek status:', error);
      message.error('Failed to update trek status');
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  if (!trek) {
    return (
      <Alert
        message="Trek not found"
        description="The trek you are looking for does not exist or has been removed."
        type="error"
        showIcon
        className="m-6"
      />
    );
  }

  return (
    <div className="trek-detail">
      <div className="mb-6">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/admin/treks')}
          className="mb-4"
        >
          Back to Treks
        </Button>
        
        <div className="flex flex-wrap justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Title level={2} className="mb-0">{trek.title}</Title>
              <Tag color={trek.status === 'published' ? 'green' : 'orange'} className="text-sm">
                {trek.status.charAt(0).toUpperCase() + trek.status.slice(1)}
              </Tag>
              {trek.featured && <Tag color="gold">Featured</Tag>}
            </div>
            <Text type="secondary">
              {trek.region} Region • {trek.difficulty} • {trek.duration} days
            </Text>
          </div>
          
          <Space>
            <Button 
              type={trek.status === 'draft' ? 'primary' : 'default'} 
              onClick={() => handleStatusChange(trek.status === 'published' ? 'draft' : 'published')}
            >
              {trek.status === 'published' ? 'Unpublish' : 'Publish'}
            </Button>
            <Button 
              icon={<EditOutlined />} 
              onClick={() => navigate(`/admin/treks/edit/${id}`)}
            >
              Edit
            </Button>
            <Popconfirm
              title="Are you sure you want to delete this trek?"
              onConfirm={handleDelete}
              okText="Yes"
              cancelText="No"
              placement="topRight"
            >
              <Button danger icon={<DeleteOutlined />}>
                Delete
              </Button>
            </Popconfirm>
          </Space>
        </div>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} type="card">
        <TabPane tab="Overview" key="overview">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <Card className="mb-6">
                <div className="mb-6" style={{ borderRadius: '8px', overflow: 'hidden' }}>
                  <Image
                    src={trek.images[0]}
                    alt={trek.title}
                    className="w-full"
                    style={{ maxHeight: '400px', objectFit: 'cover' }}
                    preview={false}
                  />
                </div>
                
                <Title level={4}>Description</Title>
                <Paragraph>{trek.description}</Paragraph>
                
                <Divider />
                
                <Title level={4}>Quick Facts</Title>
                <Descriptions bordered column={1} className="mb-6">
                  <Descriptions.Item label="Region">{trek.region} Region</Descriptions.Item>
                  <Descriptions.Item label="Difficulty">
                    <Tag color={trek.difficulty === 'Easy' ? 'green' : trek.difficulty === 'Moderate' ? 'blue' : 'red'}>
                      {trek.difficulty}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Duration">{trek.duration} days</Descriptions.Item>
                  <Descriptions.Item label="Max Altitude">{trek.maxAltitude} meters</Descriptions.Item>
                  <Descriptions.Item label="Group Size">Up to {trek.groupSize} people</Descriptions.Item>
                  <Descriptions.Item label="Best Season">
                    {trek.bestSeason.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Start/End Point">
                    {trek.startPoint} / {trek.endPoint}
                  </Descriptions.Item>
                  <Descriptions.Item label="Accommodation">
                    {trek.accommodation.join(', ')}
                  </Descriptions.Item>
                  <Descriptions.Item label="Transportation">
                    {trek.transportation.join(', ')}
                  </Descriptions.Item>
                </Descriptions>
                
                <Divider />
                
                <Title level={4}>Pricing</Title>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="text-center">
                    <Text type="secondary" className="block">Price per person</Text>
                    <Title level={3} className="my-2">${trek.price}</Title>
                    {trek.discountPrice && (
                      <Text delete type="secondary">${trek.discountPrice}</Text>
                    )}
                  </Card>
                  <Card className="text-center">
                    <Text type="secondary" className="block">Single Supplement</Text>
                    <Title level={3} className="my-2">${trek.singleSupplement || 'N/A'}</Title>
                  </Card>
                  <Card className="text-center">
                    <Text type="secondary" className="block">Deposit Required</Text>
                    <Title level={3} className="my-2">${trek.deposit}</Title>
                  </Card>
                </div>
                
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Card title="Price Includes" size="small">
                      <List
                        size="small"
                        dataSource={trek.priceIncludes}
                        renderItem={item => (
                          <List.Item>
                            <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="Price Excludes" size="small">
                      <List
                        size="small"
                        dataSource={trek.priceExcludes}
                        renderItem={item => (
                          <List.Item>
                            <CloseCircleOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                            {item}
                          </List.Item>
                        )}
                      />
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
            
            <Col xs={24} lg={8}>
              <Card 
                title="Trek Statistics" 
                className="mb-6"
                extra={
                  <Tag color={trek.status === 'published' ? 'green' : 'orange'}>
                    {trek.status}
                  </Tag>
                }
              >
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      title="Status"
                      description={
                        <Badge 
                          status={trek.status === 'published' ? 'success' : 'warning'} 
                          text={trek.status.charAt(0).toUpperCase() + trek.status.slice(1)}
                        />
                      }
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="Created"
                      description={new Date(trek.createdAt).toLocaleDateString()}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="Last Updated"
                      description={new Date(trek.updatedAt).toLocaleDateString()}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="Total Bookings"
                      description={trek.bookings}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      title="Average Rating"
                      description={
                        <div className="flex items-center">
                          <span className="text-yellow-500 mr-1">★</span>
                          {trek.rating.toFixed(1)}/5.0
                        </div>
                      }
                    />
                  </List.Item>
                </List>
                
                <Divider />
                
                <div className="space-y-2">
                  <Button 
                    type="primary" 
                    block 
                    icon={<EditOutlined />}
                    onClick={() => navigate(`/admin/treks/edit/${id}`)}
                  >
                    Edit Trek Details
                  </Button>
                  
                  {trek.status === 'published' ? (
                    <Button 
                      block 
                      onClick={() => handleStatusChange('draft')}
                    >
                      Unpublish Trek
                    </Button>
                  ) : (
                    <Button 
                      type="primary" 
                      block 
                      ghost
                      onClick={() => handleStatusChange('published')}
                    >
                      Publish Trek
                    </Button>
                  )}
                  
                  <Popconfirm
                    title="Are you sure you want to delete this trek?"
                    onConfirm={handleDelete}
                    okText="Yes, delete it"
                    cancelText="No, keep it"
                    placement="top"
                  >
                    <Button 
                      danger 
                      block 
                      icon={<DeleteOutlined />}
                    >
                      Delete Trek
                    </Button>
                  </Popconfirm>
                </div>
              </Card>
              
              <Card 
                title="Quick Actions" 
                className="mb-6"
              >
                <div className="space-y-2">
                  <Button block>View Bookings</Button>
                  <Button block>View Reviews</Button>
                  <Button block>Duplicate Trek</Button>
                  <Button block>View on Website</Button>
                </div>
              </Card>
              
              <Card title="Gallery">
                <div className="grid grid-cols-3 gap-2">
                  {trek.images.map((img, index) => (
                    <div key={index} className="aspect-square overflow-hidden rounded">
                      <Image
                        src={img}
                        alt={`${trek.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        preview={{
                          src: img
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Button type="dashed" block className="mt-4">
                  Add More Images
                </Button>
              </Card>
            </Col>
          </Row>
        </TabPane>
        
        <TabPane tab="Itinerary" key="itinerary">
          <Card>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <Title level={4} className="mb-0">Detailed Itinerary</Title>
                <Button type="primary" onClick={() => navigate(`/admin/treks/edit/${id}?tab=itinerary`)}>
                  Edit Itinerary
                </Button>
              </div>
              
              {trek.itinerary && trek.itinerary.length > 0 ? (
                <div className="space-y-6">
                  {trek.itinerary.map((day, index) => (
                    <Card key={index} className="mb-4">
                      <div className="flex items-start">
                        <div className="bg-blue-100 text-blue-600 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4">
                          <span className="font-bold">{day.day}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-medium mb-1">{day.title}</h4>
                          <p className="text-gray-600 mb-0">{day.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <Alert
                  message="No itinerary available"
                  description="Add a detailed day-by-day itinerary for this trek."
                  type="info"
                  showIcon
                />
              )}
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab="Bookings" key="bookings">
          <Card>
            <Alert
              message="Booking Management"
              description="View and manage all bookings for this trek."
              type="info"
              showIcon
              className="mb-6"
            />
            
            <div className="text-center py-8">
              <InfoCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>No Bookings Yet</Title>
              <Text type="secondary">When customers book this trek, their bookings will appear here.</Text>
              <div className="mt-4">
                <Button type="primary">View All Bookings</Button>
              </div>
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab="Reviews" key="reviews">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title level={4} className="mb-0">Customer Reviews</Title>
                <Text type="secondary">What travelers are saying about this trek</Text>
              </div>
              <div className="text-center bg-gray-50 p-3 rounded">
                <div className="text-3xl font-bold text-yellow-500">{trek.rating.toFixed(1)}</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={i < Math.floor(trek.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                      ★
                    </span>
                  ))}
                </div>
                <Text type="secondary" className="text-xs">
                  Based on {trek.bookings} {trek.bookings === 1 ? 'review' : 'reviews'}
                </Text>
              </div>
            </div>
            
            <div className="text-center py-12">
              <InfoCircleOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
              <Title level={4}>No Reviews Yet</Title>
              <Text type="secondary">When customers review this trek, their feedback will appear here.</Text>
            </div>
          </Card>
        </TabPane>
        
        <TabPane tab="FAQ" key="faq">
          <Card>
            <div className="flex justify-between items-center mb-6">
              <div>
                <Title level={4} className="mb-0">Frequently Asked Questions</Title>
                <Text type="secondary">Common questions about this trek</Text>
              </div>
              <Button type="primary" onClick={() => navigate(`/admin/treks/edit/${id}?tab=faq`)}>
                Edit FAQ
              </Button>
            </div>
            
            {trek.faqs && trek.faqs.length > 0 ? (
              <div className="space-y-4">
                {trek.faqs.map((faq, index) => (
                  <Card key={index} className="mb-2">
                    <div className="font-medium text-gray-900 mb-1">Q: {faq.question}</div>
                    <div className="text-gray-600">A: {faq.answer}</div>
                  </Card>
                ))}
              </div>
            ) : (
              <Alert
                message="No FAQ available"
                description="Add frequently asked questions to help potential trekkers."
                type="info"
                showIcon
              />
            )}
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TrekDetail;
