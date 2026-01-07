import React from 'react';
import {
  Row,
  Col,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Card,
  Typography,
  Slider,
  Divider,
  Tag,
  Tooltip
} from 'antd';
import {
  EnvironmentOutlined,
  ClockCircleOutlined,
  FireOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  StarFilled,
  CalendarOutlined,
  FieldTimeOutlined,
  CompassOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import TrekInformation from './TrekInformation';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const TrekDetailsStep = ({ formData, onInputChange, popularTreks, destinations }) => {
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
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

  const getTrekInfo = (destination) => {
    // Check if the destination is in our fetched destinations list
    const foundTrek = destinations.find(d => d.value === destination);

    if (foundTrek && destination !== 'custom') {
      return {
        title: foundTrek.title,
        description: foundTrek.description,
        duration: `${foundTrek.duration} days`,
        altitude: foundTrek.maxAltitude || 'N/A',
        difficulty: foundTrek.difficulty,
        bestSeason: foundTrek.bestSeason,
        highlights: foundTrek.highlights || []
      };
    }

    return {
      title: 'Custom Trek',
      description: 'We\'ll work with you to create a personalized trekking experience based on your preferences.',
      duration: 'Custom',
      altitude: 'Custom',
      difficulty: 'Custom',
      bestSeason: 'Year-round',
      highlights: [
        'Personalized itinerary',
        'Flexible duration',
        'Custom difficulty level',
        'Tailored to your interests'
      ]
    };
  };

  const currentTrek = getTrekInfo(formData.destination);
  const isCustomTrek = formData.destination === 'custom';

  return (
    <div className="step-content trek-details-step">
      <div className="text-center mb-8">
        <Title level={3} className="flex items-center justify-center">
          <EnvironmentOutlined className="mr-2 text-blue-500" />
          Trek Details
        </Title>
        <Text type="secondary" className="text-base">
          Tell us about your trekking preferences and we'll help you plan the perfect adventure
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <Card
            className="step-card"
            title={
              <div className="flex items-center">
                <div className="card-title-icon">
                  <CompassOutlined />
                </div>
                <h4>Trek Selection</h4>
              </div>
            }
          >
            <div className="space-y-6">
              <Form.Item
                label={
                  <div className="form-label">
                    <span>Select Trek</span>
                    <Tooltip title="Choose from our popular treks or select custom">
                      <InfoCircleOutlined className="info-icon" />
                    </Tooltip>
                  </div>
                }
                name="destination"
                rules={[{ required: true, message: 'Please select a trek' }]}
              >
                <Select
                  className="trek-select"
                  placeholder="Select a popular trek or choose custom"
                  onChange={(value) => onInputChange('destination', value)}
                  value={formData.destination}
                  showSearch
                  optionFilterProp="label"
                  size="large"
                >
                  {destinations.map(trek => (
                    <Option key={trek.value} value={trek.value} label={trek.label}>
                      <div className="option-content">
                        <div className="option-title">{trek.label}</div>
                        {trek.duration && <div className="option-description">{trek.duration} days • {trek.difficulty}</div>}
                      </div>
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {isCustomTrek && (
                <Form.Item
                  label={
                    <div className="form-label">
                      <span>Custom Destination</span>
                      <Tooltip title="Enter your desired trekking destination">
                        <InfoCircleOutlined className="info-icon" />
                      </Tooltip>
                    </div>
                  }
                  name="customDestination"
                  rules={[
                    {
                      required: isCustomTrek,
                      message: 'Please specify your custom destination'
                    }
                  ]}
                >
                  <Input
                    placeholder="Enter your custom trek destination"
                    onChange={(e) => onInputChange('customDestination', e.target.value)}
                    value={formData.customDestination}
                    size="large"
                  />
                </Form.Item>
              )}

              <div className="date-duration-section">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <div className="form-label">
                          <span>Start Date</span>
                          <Tooltip title="Your preferred trek start date">
                            <CalendarOutlined className="info-icon" />
                          </Tooltip>
                        </div>
                      }
                      name="startDate"
                      rules={[{ required: true, message: 'Please select a start date' }]}
                    >
                      <DatePicker
                        className="w-full"
                        onChange={handleDateChange}
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                        size="large"
                        placeholder="Select date"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label={
                        <div className="form-label">
                          <span>Duration</span>
                          <Tooltip title="Number of trekking days">
                            <FieldTimeOutlined className="info-icon" />
                          </Tooltip>
                        </div>
                      }
                      name="duration"
                      rules={[{ required: true, message: 'Please select trek duration' }]}
                    >
                      <InputNumber
                        min={1}
                        max={30}
                        className="w-full"
                        onChange={handleDurationChange}
                        value={formData.duration}
                        size="large"
                        placeholder="Days"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                {formData.startDate && formData.duration > 0 && (
                  <div className="date-summary">
                    <div className="date-summary-content">
                      <div className="date-summary-dates">
                        <span className="date-label">Your Trek:</span>
                        <span className="date-range">
                          {dayjs(formData.startDate).format('MMM D, YYYY')} - {formData.endDate.format('MMM D, YYYY')}
                        </span>
                      </div>
                      <Tag color="blue" className="duration-tag">
                        {formData.duration} {formData.duration === 1 ? 'Day' : 'Days'}
                      </Tag>
                    </div>
                    <div className="date-note">
                      <InfoCircleOutlined className="mr-1" />
                      Dates are flexible and can be adjusted based on availability
                    </div>
                  </div>
                )}
              </div>

              <div className="duration-slider">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Trek Duration: {formData.duration} days</span>
                  <span className="text-sm text-gray-400">1-30 days</span>
                </div>
                <Slider
                  min={1}
                  max={30}
                  tooltip={{ formatter: (value) => `${value} days` }}
                  onChange={handleDurationChange}
                  value={formData.duration}
                  trackStyle={{ backgroundColor: '#4f46e5' }}
                  handleStyle={{
                    borderColor: '#4f46e5',
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <div className="sticky top-6 space-y-6">
            <Card
              className="trek-preview-card"
              title={
                <div className="flex items-center">
                  <div className="card-title-icon">
                    <StarFilled />
                  </div>
                  <h4>Trek Preview</h4>
                </div>
              }
            >
              <div className="trek-preview-content">
                {!formData.destination ? (
                  <div className="empty-state">
                    <EnvironmentOutlined className="text-4xl text-gray-300 mb-4" />
                    <h4>Select a Trek</h4>
                    <p className="text-gray-500">Choose a trek from the options to see details and preview</p>
                  </div>
                ) : (
                  <>
                    <div className="trek-header">
                      <h3 className="trek-title">
                        {isCustomTrek && formData.customDestination
                          ? formData.customDestination
                          : currentTrek.title}
                      </h3>
                      {!isCustomTrek && (
                        <Tag color="blue" className="trek-tag">
                          Popular
                        </Tag>
                      )}
                    </div>

                    <p className="trek-description">
                      {isCustomTrek
                        ? 'We\'ll work with you to create a personalized trekking experience based on your preferences. Our experts will contact you to discuss the details and create a custom itinerary.'
                        : currentTrek.description}
                    </p>

                    <div className="trek-stats">
                      <div className="stat-item">
                        <div className="stat-icon">
                          <ClockCircleOutlined />
                        </div>
                        <div>
                          <div className="stat-label">Duration</div>
                          <div className="stat-value">
                            {isCustomTrek ? 'Custom' : currentTrek.duration}
                          </div>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon">
                          <EnvironmentOutlined />
                        </div>
                        <div>
                          <div className="stat-label">Max Altitude</div>
                          <div className="stat-value">
                            {isCustomTrek ? 'Custom' : currentTrek.altitude}
                          </div>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon">
                          <FireOutlined />
                        </div>
                        <div>
                          <div className="stat-label">Difficulty</div>
                          <div className="stat-value">
                            {isCustomTrek ? 'Custom' : currentTrek.difficulty}
                          </div>
                        </div>
                      </div>

                      <div className="stat-item">
                        <div className="stat-icon">
                          <GlobalOutlined />
                        </div>
                        <div>
                          <div className="stat-label">Best Season</div>
                          <div className="stat-value">
                            {isCustomTrek ? 'Year-round' : currentTrek.bestSeason}
                          </div>
                        </div>
                      </div>
                    </div>

                    <Divider className="preview-divider" />

                    <div className="trek-highlights">
                      <h4 className="highlights-title">Trek Highlights</h4>
                      <ul className="highlights-list">
                        {currentTrek.highlights.map((highlight, index) => (
                          <li key={index} className="highlight-item">
                            <span className="highlight-bullet">•</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {isCustomTrek && (
                      <div className="custom-trek-note">
                        <InfoCircleOutlined className="mr-2" />
                        Our team will contact you within 24 hours to discuss your custom trek requirements in detail.
                      </div>
                    )}
                  </>
                )}
              </div>
            </Card>

            <Card className="trek-tips-card">
              <div className="flex items-start">
                <div className="tips-icon">
                  <InfoCircleOutlined />
                </div>
                <div>
                  <h4 className="tips-title">Planning Your Trek</h4>
                  <p className="tips-content">
                    Need help choosing the perfect trek? Our experts are here to help you select the best
                    route based on your fitness level, experience, and interests.
                    <a href="#" className="text-blue-500 hover:underline ml-1">Contact us</a> for personalized advice.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>

      <style jsx>{`
        .trek-details-step {
          padding: 0 8px;
        }
        
        .card-title-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background-color: #eef2ff;
          color: #4f46e5;
          margin-right: 12px;
        }
        
        .trek-selection-card,
        .trek-preview-card {
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          margin-bottom: 24px;
          overflow: hidden;
        }
        
        .trek-selection-card :global(.ant-card-head),
        .trek-preview-card :global(.ant-card-head) {
          background-color: #f8fafc;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 20px;
          min-height: 60px;
        }
        
        .trek-selection-card :global(.ant-card-head-title),
        .trek-preview-card :global(.ant-card-head-title) {
          padding: 16px 0;
        }
        
        .trek-selection-card h4,
        .trek-preview-card h4 {
          font-size: 16px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        
        .form-label {
          display: flex;
          align-items: center;
          font-weight: 500;
          color: #334155;
          font-size: 14px;
          margin-bottom: 6px;
        }
        
        .info-icon {
          margin-left: 6px;
          color: #94a3b8;
          font-size: 14px;
          cursor: help;
        }
        
        .date-duration-section {
          background-color: #f8fafc;
          border-radius: 8px;
          padding: 16px;
          margin: 16px 0;
        }
        
        .date-summary {
          background-color: white;
          border-radius: 6px;
          padding: 12px;
          margin-top: 16px;
          border: 1px solid #e2e8f0;
        }
        
        .date-summary-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }
        
        .date-summary-dates {
          display: flex;
          align-items: center;
        }
        
        .date-label {
          font-size: 13px;
          color: #64748b;
          margin-right: 8px;
        }
        
        .date-range {
          font-weight: 500;
          color: #1e293b;
        }
        
        .duration-tag {
          font-weight: 600;
          background-color: #eef2ff;
          color: #4f46e5;
          border: none;
        }
        
        .date-note {
          font-size: 12px;
          color: #64748b;
          display: flex;
          align-items: center;
        }
        
        .duration-slider {
          margin-top: 24px;
          padding: 0 8px;
        }
        
        .trek-preview-content {
          min-height: 200px;
        }
        
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 32px 16px;
          color: #94a3b8;
        }
        
        .empty-state h4 {
          margin: 8px 0 4px;
          color: #475569;
        }
        
        .trek-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }
        
        .trek-title {
          font-size: 18px;
          font-weight: 600;
          color: #1e293b;
          margin: 0;
        }
        
        .trek-tag {
          margin-left: 8px;
          font-size: 12px;
          height: 22px;
          line-height: 20px;
        }
        
        .trek-description {
          color: #475569;
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 16px;
        }
        
        .trek-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin: 20px 0;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
        }
        
        .stat-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background-color: #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          color: #4f46e5;
          font-size: 16px;
        }
        
        .stat-label {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 2px;
        }
        
        .stat-value {
          font-size: 14px;
          font-weight: 500;
          color: #1e293b;
        }
        
        .preview-divider {
          margin: 20px 0;
          border-color: #e2e8f0;
        }
        
        .highlights-title {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin-bottom: 12px;
        }
        
        .highlights-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .highlight-item {
          display: flex;
          margin-bottom: 8px;
          font-size: 14px;
          color: #475569;
          line-height: 1.5;
        }
        
        .highlight-bullet {
          color: #4f46e5;
          margin-right: 8px;
          font-weight: bold;
        }
        
        .custom-trek-note {
          background-color: #f0f9ff;
          border-left: 3px solid #0ea5e9;
          padding: 12px;
          border-radius: 4px;
          font-size: 13px;
          color: #0369a1;
          margin-top: 16px;
          display: flex;
          align-items: flex-start;
        }
        
        .trek-tips-card {
          border-radius: 8px;
          background-color: #f8fafc;
          border: 1px dashed #cbd5e1;
        }
        
        .tips-icon {
          color: #4f46e5;
          font-size: 18px;
          margin-right: 12px;
          margin-top: 2px;
        }
        
        .tips-title {
          font-size: 15px;
          font-weight: 600;
          color: #1e293b;
          margin: 0 0 6px 0;
        }
        
        .tips-content {
          font-size: 13px;
          color: #475569;
          margin: 0;
          line-height: 1.5;
        }
        
        /* Responsive styles */
        @media (max-width: 768px) {
          .trek-stats {
            grid-template-columns: 1fr;
          }
          
          .date-duration-section {
            padding: 12px;
          }
          
          .trek-selection-card,
          .trek-preview-card {
            margin-bottom: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default TrekDetailsStep;
