import React from 'react';
import { Row, Col, Card, Form, Checkbox, Typography, Divider, Select, Tooltip } from 'antd';
import { CarOutlined, SafetyOutlined, HeartOutlined, ToolOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text, Paragraph } = Typography;

const ServicesTransportStep = ({
  formData,
  onInputChange,
  transportOptions
}) => {
  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography.Title level={3}>
          <CarOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Services & Transport
        </Typography.Title>
        <Text type="secondary">
          Customize your support team and transportation
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card className="step-card" title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <SafetyOutlined />
                </div>
                <span>Guides & Porters</span>
              </div>
            }>
            <Form.Item
              name="guideRequired"
              valuePropName="checked"
              style={{ marginBottom: '16px' }}
            >
              <Checkbox
                checked={formData.guideRequired}
                onChange={(e) => onInputChange('guideRequired', e.target.checked)}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>Professional Guide</div>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    Experienced, English-speaking guide (Highly Recommended)
                  </Text>
                </div>
              </Checkbox>
            </Form.Item>

            {formData.guideRequired && (
              <div style={{
                marginLeft: '24px',
                marginBottom: '16px',
                padding: '12px',
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                fontSize: '13px'
              }}>
                <Text strong>Guide Services Include:</Text>
                <ul style={{ paddingLeft: '20px', marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                  <li>Route navigation and local knowledge</li>
                  <li>Cultural and natural history information</li>
                  <li>Assistance with teahouse bookings</li>
                  <li>First aid and emergency support</li>
                  <li>Communication with local communities</li>
                </ul>
              </div>
            )}

            <Form.Item
              name="porterRequired"
              valuePropName="checked"
              style={{ marginTop: '24px', marginBottom: '16px' }}
            >
              <Checkbox
                checked={formData.porterRequired}
                onChange={(e) => onInputChange('porterRequired', e.target.checked)}
              >
                <div>
                  <div style={{ fontWeight: 500 }}>Porter Service</div>
                  <Text type="secondary" style={{ fontSize: '13px' }}>
                    1 porter for every 2 trekkers (max 15kg per trekker)
                  </Text>
                </div>
              </Checkbox>
            </Form.Item>

            {formData.porterRequired && (
              <div style={{
                marginLeft: '24px',
                padding: '12px',
                backgroundColor: '#f0fdf4',
                borderRadius: '8px',
                fontSize: '13px'
              }}>
                <Text strong>Porter Information:</Text>
                <ul style={{ paddingLeft: '20px', marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                  <li>Maximum load: 25kg per porter (including their own gear)</li>
                  <li>Provided with proper clothing and equipment</li>
                  <li>Insured for medical and emergency evacuation</li>
                  <li>Fair wages and working conditions</li>
                </ul>
                <Text type="secondary" style={{ fontSize: '11px', marginTop: '8px', display: 'block' }}>
                  * We strictly follow IPPG (International Porter Protection Group) guidelines
                </Text>
              </div>
            )}
            </Card>

            <Card className="step-card" title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <CarOutlined />
                </div>
                <span>Transportation</span>
              </div>
            }>
              <Form.Item
                label="Transportation Preferences"
                name="transportation"
                tooltip={{ title: "How would you like to travel to and from the trek starting point?", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select at least one option' }]}
              >
                <Select
                  mode="multiple"
                  placeholder="Select preferred transportation methods"
                  onChange={(values) => onInputChange('transportation', values)}
                  value={formData.transportation}
                  style={{ width: '100%' }}
                  size="large"
                >
                  {transportOptions.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', marginTop: '16px' }}>
                <Text strong style={{ display: 'block', marginBottom: '8px', color: '#1e40af' }}>Transportation Notes:</Text>
                <ul style={{ paddingLeft: '20px', margin: 0, fontSize: '13px', color: '#4b5563' }}>
                  {formData.transportation?.includes('flight') && (
                    <li>Domestic flights are weather-dependent and may be delayed or canceled</li>
                  )}
                  {formData.transportation?.includes('helicopter') && (
                    <li>Helicopter services are subject to weather conditions and availability</li>
                  )}
                  <li>Road conditions in mountainous areas can be challenging</li>
                  <li>Travel times are approximate and may vary</li>
                </ul>
              </div>
            </Card>

            <Card className="step-card" title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <ToolOutlined />
                </div>
                <span>Additional Services</span>
              </div>
            }>
              <Form.Item
                name="insuranceRequired"
                valuePropName="checked"
                style={{ marginBottom: '16px' }}
              >
                <Checkbox
                  checked={formData.insuranceRequired}
                  onChange={(e) => onInputChange('insuranceRequired', e.target.checked)}
                >
                  <div>
                    <div style={{ fontWeight: 500 }}>Travel Insurance</div>
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      Emergency medical and evacuation coverage (Required for high-altitude treks)
                    </Text>
                  </div>
                </Checkbox>
              </Form.Item>

              {formData.insuranceRequired && (
                <div style={{
                  marginLeft: '24px',
                  marginBottom: '16px',
                  padding: '12px',
                  backgroundColor: '#fefce8',
                  borderRadius: '8px',
                  fontSize: '13px'
                }}>
                  <Text strong>Insurance Requirements:</Text>
                  <ul style={{ paddingLeft: '20px', marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                    <li>Minimum coverage: $100,000 for emergency evacuation</li>
                    <li>Must cover trekking up to 6,000m</li>
                    <li>24/7 emergency assistance</li>
                    <li>Trip cancellation and interruption coverage recommended</li>
                  </ul>
                </div>
              )}

              <Form.Item
                name="equipmentRental"
                valuePropName="checked"
                style={{ marginTop: '16px' }}
              >
                <Checkbox
                  checked={formData.equipmentRental}
                  onChange={(e) => onInputChange('equipmentRental', e.target.checked)}
                >
                  Rent Trekking Equipment
                </Checkbox>
              </Form.Item>

              {formData.equipmentRental && (
                <div style={{
                  marginLeft: '24px',
                  marginTop: '8px',
                  padding: '12px',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px'
                }}>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>Available for Rent:</Text>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <div>
                      <Checkbox>Sleeping Bag (-20°C)</Checkbox>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginLeft: '24px' }}>$3/day</div>
                    </div>
                    <div>
                      <Checkbox>Down Jacket</Checkbox>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginLeft: '24px' }}>$2/day</div>
                    </div>
                    <div>
                      <Checkbox>Trekking Poles (pair)</Checkbox>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginLeft: '24px' }}>$2/day</div>
                    </div>
                    <div>
                      <Checkbox>Duffel Bag (80L)</Checkbox>
                      <div style={{ fontSize: '11px', color: '#6b7280', marginLeft: '24px' }}>$1/day</div>
                    </div>
                  </div>
                  <Text type="secondary" style={{ fontSize: '11px', marginTop: '8px', display: 'block' }}>
                    * Equipment is subject to availability. Please confirm your rental items in advance.
                  </Text>
                </div>
              )}
            </Card>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card
              className="step-card"
              style={{ marginTop: 0 }}
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="card-icon-wrapper">
                    <HeartOutlined />
                  </div>
                  <span>Why Choose Us?</span>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <SafetyOutlined style={{ color: '#3b82f6', fontSize: '20px', marginRight: '12px', marginTop: '4px' }} />
                  <div>
                    <Text strong style={{ fontSize: '16px' }}>Safety First</Text>
                    <Paragraph style={{ marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                      Our guides are trained in wilderness first aid and carry comprehensive first aid kits.
                      We monitor altitude sickness symptoms and have emergency evacuation plans in place.
                    </Paragraph>
                  </div>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <HeartOutlined style={{ color: '#ef4444', fontSize: '20px', marginRight: '12px', marginTop: '4px' }} />
                  <div>
                    <Text strong style={{ fontSize: '16px' }}>Responsible Tourism</Text>
                    <Paragraph style={{ marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                      We are committed to responsible tourism practices that benefit local communities and
                      minimize environmental impact. We follow Leave No Trace principles and ensure fair
                      treatment and proper equipment for all our staff.
                    </Paragraph>
                  </div>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <ToolOutlined style={{ color: '#f97316', fontSize: '20px', marginRight: '12px', marginTop: '4px' }} />
                  <div>
                    <Text strong style={{ fontSize: '16px' }}>Quality Equipment</Text>
                    <Paragraph style={{ marginTop: '4px', marginBottom: 0, color: '#4b5563' }}>
                      We use high-quality, well-maintained equipment for all our treks. Tents, sleeping bags,
                      and other gear are regularly inspected and replaced as needed to ensure your comfort and safety.
                    </Paragraph>
                  </div>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div style={{ backgroundColor: '#f8fafc', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <Text strong style={{ color: '#1e40af' }}>Important Notes:</Text>
                  <ul style={{ paddingLeft: '20px', marginTop: '8px', marginBottom: 0, fontSize: '13px', color: '#4b5563' }}>
                    <li>Travel insurance with emergency evacuation coverage is mandatory for all treks above 3,000m</li>
                    <li>Porter weight limit is strictly 25kg per porter (including their own gear)</li>
                    <li>We provide one guide for every 4-6 trekkers (smaller groups available)</li>
                    <li>All guides speak English and local languages</li>
                    <li>24/7 support from our local office in Kathmandu</li>
                  </ul>
                </div>

                <div style={{ backgroundColor: '#f0fdf4', padding: '16px', borderRadius: '8px', border: '1px solid #bbf7d0' }}>
                  <Text strong style={{ color: '#166534' }}>Need Assistance?</Text>
                  <Paragraph style={{ marginTop: '8px', marginBottom: 0, fontSize: '14px', color: '#4b5563' }}>
                    Our team is available to help you choose the right services for your trek.
                    Contact us for personalized recommendations based on your specific needs and preferences.
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row >
    </div >
  );
};

export default ServicesTransportStep;
