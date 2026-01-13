import React from 'react';
import { Row, Col, Card, Form, Select, DatePicker, InputNumber, Typography, Divider, Slider, Tooltip } from 'antd';
import { DollarOutlined, CalendarOutlined, InfoCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const BudgetDatesStep = ({
  formData,
  onInputChange,
  budgetRanges
}) => {
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
  };

  const handleBudgetRangeChange = (value) => {
    const range = budgetRanges.find(r => r.value === value);
    onInputChange('budgetRange', value);
    onInputChange('budgetAmount', Math.round((range.min + range.max) / 2));
  };

  const handleDateChange = (date) => {
    onInputChange('startDate', date);
    if (formData.duration > 0) {
      onInputChange('endDate', calculateEndDate(date, formData.duration));
    }
  };

  const handleDurationChange = (value) => {
    onInputChange('duration', value);
    if (formData.startDate) {
      onInputChange('endDate', calculateEndDate(formData.startDate, value));
    }
  };

  const getSeason = (month) => {
    if (month >= 2 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'monsoon';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
  };

  const getSeasonInfo = (season) => {
    const seasons = {
      spring: {
        name: 'Spring',
        months: 'March to May',
        description: 'Mild temperatures, blooming rhododendrons, clear mountain views',
        pros: 'Pleasant weather, beautiful flowers, good visibility',
        cons: 'More crowded, book in advance',
        icon: '🌸',
        bestFor: 'Photography, nature lovers'
      },
      autumn: {
        name: 'Autumn',
        months: 'September to November',
        description: 'Stable weather, clear skies, excellent mountain views',
        pros: 'Best visibility, comfortable temperatures, major festivals',
        cons: 'Most popular time, higher prices',
        icon: '🍂',
        bestFor: 'Trekking, photography, cultural experiences'
      },
      winter: {
        name: 'Winter',
        months: 'December to February',
        description: 'Cold temperatures, especially at night, snow at higher elevations',
        pros: 'Fewer trekkers, clear views, unique winter landscapes',
        cons: 'Very cold, some high passes may be closed',
        icon: '❄️',
        bestFor: 'Lower altitude treks, cultural tours'
      },
      monsoon: {
        name: 'Monsoon',
        months: 'June to August',
        description: 'Rainy season, lush green landscapes, limited mountain views',
        pros: 'Few tourists, lower prices, lush vegetation',
        cons: 'Leeches, landslides, flight delays',
        icon: '🌧️',
        bestFor: 'Rain-shadow areas like Upper Mustang, cultural tours'
      }
    };
    return seasons[season] || seasons.autumn;
  };

  const currentSeason = formData.startDate ? getSeason(formData.startDate.month()) : 'autumn';
  const seasonInfo = getSeasonInfo(currentSeason);

  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Typography.Title level={3}>
          <DollarOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Budget & Dates
        </Typography.Title>
        <Text type="secondary">
          Plan your investment and schedule
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card className="step-card" title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <DollarOutlined />
                </div>
                <span>Budget Planning</span>
              </div>
            }>
            <Form.Item
              label="Select Your Budget Range (per person)"
              name="budgetRange"
              tooltip={{ title: "Choose a budget range that suits you", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
              rules={[{ required: true, message: 'Please select a budget range' }]}
            >
              <Select
                onChange={handleBudgetRangeChange}
                value={formData.budgetRange}
                placeholder="Select your budget range"
                size="large"
                style={{ width: '100%' }}
              >
                {budgetRanges.map(range => (
                  <Option key={range.value} value={range.value}>
                    {range.label} (${range.min} - ${range.max})
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {formData.budgetRange && (
              <div style={{ marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <Text strong>Your Budget:</Text>
                  <Text strong style={{ fontSize: '18px', color: '#1a73e8' }}>${formData.budgetAmount}</Text>
                </div>

                <Slider
                  min={budgetRanges.find(r => r.value === formData.budgetRange).min}
                  max={budgetRanges.find(r => r.value === formData.budgetRange).max}
                  value={formData.budgetAmount}
                  onChange={(value) => onInputChange('budgetAmount', value)}
                  tipFormatter={(value) => `$${value}`}
                  style={{ marginBottom: '24px' }}
                />

                <div style={{ backgroundColor: '#f9fafb', padding: '16px', borderRadius: '8px' }}>
                  <Text strong style={{ display: 'block', marginBottom: '8px' }}>Budget Breakdown:</Text>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Accommodation:</span>
                      <span>${Math.round(formData.budgetAmount * 0.3)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Meals:</span>
                      <span>${Math.round(formData.budgetAmount * 0.2)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Permits & Fees:</span>
                      <span>${Math.round(formData.budgetAmount * 0.15)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Guide & Porter:</span>
                      <span>${Math.round(formData.budgetAmount * 0.25)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Transportation:</span>
                      <span>${Math.round(formData.budgetAmount * 0.1)}</span>
                    </div>
                    <Divider style={{ margin: '8px 0' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                      <span>Total (per person):</span>
                      <span>${formData.budgetAmount}</span>
                    </div>
                  </div>
                  <Text type="secondary" style={{ fontSize: '11px', marginTop: '8px', display: 'block' }}>
                    * This is an estimate. Final pricing will be confirmed based on your exact requirements.
                  </Text>
                </div>
              </div>
            )}
            </Card>

            <Card className="step-card" title={
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div className="card-icon-wrapper">
                  <CalendarOutlined />
                </div>
                <span>Tentative Dates</span>
              </div>
            }>
              <Form.Item
                label="Preferred Start Date"
                name="startDate"
                tooltip={{ title: "Select when you want to start your trek", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select a start date' }]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={handleDateChange}
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf('day');
                  }}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Trek Duration"
                name="duration"
                tooltip={{ title: "How many days for the trek?", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                rules={[{ required: true, message: 'Please select duration' }]}
              >
                <Select
                  onChange={(value) => handleDurationChange(value)}
                  value={formData.duration}
                  placeholder="Select trek duration"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <Option value={7}>7 days</Option>
                  <Option value={10}>10 days</Option>
                  <Option value={14}>14 days</Option>
                  <Option value={21}>21 days</Option>
                  <Option value={0}>Custom duration</Option>
                </Select>
              </Form.Item>

              {formData.duration === 0 && (
                <Form.Item
                  label="Custom Duration (days)"
                  name="customDuration"
                  rules={[{ required: true, message: 'Please enter duration' }]}
                >
                  <InputNumber
                    min={1}
                    max={30}
                    style={{ width: '100%' }}
                    onChange={(value) => handleDurationChange(value)}
                    placeholder="Enter number of days"
                    size="large"
                  />
                </Form.Item>
              )}

              {formData.startDate && formData.duration > 0 && (
                <div style={{
                  marginTop: '16px',
                  padding: '16px',
                  backgroundColor: '#eff6ff',
                  borderRadius: '8px',
                  border: '1px solid #bfdbfe'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                    <CalendarOutlined style={{ marginRight: '8px', color: '#2563eb' }} />
                    <Text strong>Your Trek Dates:</Text>
                  </div>
                  <div style={{ marginLeft: '24px' }}>
                    {dayjs(formData.startDate).format('dddd, MMMM D, YYYY')}
                    <br />
                    <span style={{ marginLeft: '16px' }}>to</span> {formData.endDate.format('dddd, MMMM D, YYYY')}
                    <div style={{ marginTop: '4px', fontSize: '13px', color: '#4b5563' }}>
                      ({formData.duration} days total)
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card
              className="step-card"
              title="What's Included"
              style={{ height: '100%' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <Typography.Title level={5} style={{ fontSize: '15px', marginBottom: '6px' }}>Included in Your Trek:</Typography.Title>
                  <ul style={{ paddingLeft: '20px', marginTop: '0', marginBottom: '0', color: '#4b5563', fontSize: '12px', listStyle: 'disc' }}>
                    <li>Trekking permits and TIMS card</li>
                    <li>Accommodation (twin sharing)</li>
                    <li>All meals (breakfast, lunch, dinner)</li>
                    <li>English-speaking guide</li>
                    <li>Porter service (1 for 2 trekkers, max 15kg)</li>
                    <li>Ground transportation</li>
                    <li>First aid kit</li>
                    <li>Taxes and charges</li>
                  </ul>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div>
                  <Typography.Title level={5} style={{ fontSize: '15px', marginBottom: '6px' }}>Not Included:</Typography.Title>
                  <ul style={{ paddingLeft: '20px', marginTop: '0', marginBottom: '0', color: '#4b5563', fontSize: '12px', listStyle: 'disc' }}>
                    <li>International flights</li>
                    <li>Nepal visa fee</li>
                    <li>Travel insurance (mandatory)</li>
                    <li>Personal expenses</li>
                    <li>Tips for guide and porter</li>
                    <li>Meals in Kathmandu</li>
                    <li>Other unlisted expenses</li>
                  </ul>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                <div style={{ backgroundColor: '#fefce8', padding: '12px', borderRadius: '8px', border: '1px solid #fde047' }}>
                  <Typography.Title level={5} style={{ fontSize: '14px', marginBottom: '6px', color: '#854d0e' }}>Payment & Cancellation</Typography.Title>
                  <ul style={{ paddingLeft: '20px', marginTop: '0', marginBottom: '0', color: '#854d0e', fontSize: '12px' }}>
                    <li>20% deposit to confirm</li>
                    <li>Full payment 30 days before</li>
                    <li>60+ days: Full refund</li>
                    <li>30-60 days: 50% refund</li>
                    <li>Less than 30 days: No refund</li>
                  </ul>
                  <Text type="secondary" style={{ fontSize: '10px', marginTop: '6px', display: 'block', color: '#a16207' }}>
                    * Policy subject to change. Verify before booking.
                  </Text>
                </div>

                <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '8px', border: '1px solid #bfdbfe' }}>
                  <Typography.Title level={5} style={{ fontSize: '14px', marginBottom: '4px', color: '#1e40af' }}>Flexible Booking</Typography.Title>
                  <Paragraph style={{ marginBottom: '4px', fontSize: '12px', color: '#1e40af' }}>
                    We offer flexible options:
                  </Paragraph>
                  <ul style={{ paddingLeft: '20px', marginTop: '0', marginBottom: '0', color: '#1e40af', fontSize: '12px' }}>
                    <li>Free date changes (30 days prior)</li>
                    <li>Low deposit booking</li>
                    <li>Payment plans</li>
                    <li>Group discounts (4+ people)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BudgetDatesStep;
