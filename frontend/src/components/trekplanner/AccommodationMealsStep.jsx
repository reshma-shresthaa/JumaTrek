import React from 'react';
import { Row, Col, Form, Input, Card, Typography, Divider, Radio, Checkbox, Tooltip } from 'antd';
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Text, Paragraph } = Typography;

const AccommodationMealsStep = ({
  formData,
  onInputChange,
  accommodationTypes,
  mealPreferences
}) => {
  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography.Title level={3}>
          <HomeOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Accommodation & Meals
        </Typography.Title>
        <Text type="secondary">
          Choose your staying and dining preferences
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title="Preferences"
            style={{ height: '100%' }}
          >
            <Form.Item
              label="Preferred Accommodation Type"
              name="accommodation"
              tooltip={{ title: "Select where you would like to stay during the trek", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select accommodation type' }]}
              style={{ marginBottom: '18px' }}
            >
              <Radio.Group
                onChange={(e) => onInputChange('accommodation', e.target.value)}
                value={formData.accommodation}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 16]}>
                  {accommodationTypes.map(type => (
                    <Col span={12} key={type.value}>
                      <Radio.Button
                        value={type.value}
                        style={{
                          height: 'auto',
                          width: '100%',
                          textAlign: 'center',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '8px',
                          border: formData.accommodation === type.value ? '1px solid #1a73e8' : '1px solid #d9d9d9',
                          backgroundColor: formData.accommodation === type.value ? '#e8f0fe' : '#fff'
                        }}
                      >
                        <span style={{ fontSize: '24px', marginBottom: '8px', display: 'block' }}>{type.icon}</span>
                        <span style={{ fontWeight: 500 }}>{type.label}</span>
                      </Radio.Button>
                    </Col>
                  ))}
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              label="Meal Preferences"
              name="mealPreferences"
              tooltip={{ title: "Select your dietary preferences", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select at least one preference' }]}
              style={{ marginBottom: '18px' }}
            >
              <Checkbox.Group
                options={mealPreferences}
                onChange={(values) => onInputChange('mealPreferences', values)}
                value={formData.mealPreferences}
                style={{ width: '100%' }}
              >
                <Row gutter={[16, 8]}>
                  {mealPreferences.map(pref => (
                    <Col xs={12} sm={8} key={pref.value}>
                      <Checkbox value={pref.value}>{pref.label}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            </Form.Item>

            <Form.Item
              label="Dietary Restrictions"
              name="dietaryRestrictions"
              tooltip={{ title: "Any specific allergies or restrictions we should be aware of?", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
            >
              <Input.TextArea
                rows={4}
                placeholder="Please list any food allergies, dietary restrictions, or special meal requirements..."
                value={formData.dietaryRestrictions}
                onChange={(e) => onInputChange('dietaryRestrictions', e.target.value)}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title="Accommodation Details"
            style={{ height: '100%' }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {formData.accommodation === 'teahouse' && (
                <>
                  <Text strong style={{ fontSize: '15px' }}>Tea House Trekking</Text>
                  <Paragraph style={{ color: '#4b5563', marginBottom: '8px', fontSize: '13px', lineHeight: 1.5 }}>
                    Tea houses are simple lodges along trekking routes that provide basic accommodation and meals. Rooms are typically twin-share with shared bathroom facilities.
                  </Paragraph>
                  <div style={{ backgroundColor: '#fef3c7', padding: '12px', borderRadius: '8px', border: '1px solid #fcd34d' }}>
                    <Text strong style={{ color: '#d97706', fontSize: '13px' }}>What's Included:</Text>
                    <ul style={{ paddingLeft: '18px', marginTop: '6px', marginBottom: 0, color: '#4b5563', fontSize: '12px' }}>
                      <li>Basic private rooms (twin or double)</li>
                      <li>Common dining area</li>
                      <li>Hot showers (small fee)</li>
                      <li>Charging facilities (fee)</li>
                      <li>WiFi (where available, fee)</li>
                    </ul>
                  </div>
                </>
              )}

              {formData.accommodation === 'camping' && (
                <>
                  <Text strong style={{ fontSize: '15px' }}>Camping Trek</Text>
                  <Paragraph style={{ color: '#4b5563', marginBottom: '8px', fontSize: '13px', lineHeight: 1.5 }}>
                    Our staff will set up tents at designated campsites. This provides flexibility in route and schedule, especially in remote areas.
                  </Paragraph>
                  <div style={{ backgroundColor: '#e0f2fe', padding: '12px', borderRadius: '8px', border: '1px solid #7dd3fc' }}>
                    <Text strong style={{ color: '#0284c7', fontSize: '13px' }}>What's Included:</Text>
                    <ul style={{ paddingLeft: '18px', marginTop: '6px', marginBottom: 0, color: '#4b5563', fontSize: '12px' }}>
                      <li>Quality two-person tents</li>
                      <li>Insulated sleeping mats</li>
                      <li>Dining tent with tables</li>
                      <li>Kitchen tent with full crew</li>
                      <li>Toilet tent</li>
                    </ul>
                  </div>
                </>
              )}

              <Divider style={{ margin: '12px 0' }} />

              <div>
                <Text strong style={{ fontSize: '15px', display: 'block', marginBottom: '6px' }}>Meal Information</Text>
                <Paragraph style={{ color: '#4b5563', marginBottom: '12px', fontSize: '12px', lineHeight: 1.5 }}>
                  {formData.mealPreferences?.includes('vegetarian') && (
                    <>Vegetarian options available on all treks.<br /></>
                  )}
                  {formData.mealPreferences?.includes('vegan') && (
                    <>Vegan options available (limited in remote areas).<br /></>
                  )}
                  {formData.mealPreferences?.includes('gluten_free') && (
                    <>Gluten-free options limited. We'll accommodate when possible.<br /></>
                  )}
                </Paragraph>

                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <Text strong style={{ fontSize: '13px' }}>Typical Meals:</Text>
                  <ul style={{ paddingLeft: '18px', marginTop: '6px', marginBottom: 0, color: '#4b5563', fontSize: '12px' }}>
                    <li><strong>Breakfast:</strong> Porridge, eggs, toast, tea/coffee</li>
                    <li><strong>Lunch:</strong> Dal bhat, noodles, pasta</li>
                    <li><strong>Dinner:</strong> Soup, main course, dessert</li>
                    <li><strong>Snacks:</strong> Biscuits, chocolate, fruit</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AccommodationMealsStep;
