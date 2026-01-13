import React from 'react';
import {
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  Card,
  Typography,
  Divider,
  Alert,
  Tag,
  Progress,
  Tooltip
} from 'antd';
import {
  TeamOutlined,
  SafetyOutlined,
  HeartOutlined,
  ToolOutlined,
  InfoCircleOutlined,
  UserOutlined,
  HeartFilled,
  StarFilled
} from '@ant-design/icons';

const { Option } = Select;
const { Text, Title, Paragraph } = Typography;

const GroupExperienceStep = ({ formData, onInputChange, groupTypes, experienceLevels, fitnessLevels }) => {
  // Helper function to get fitness tips based on level
  const getFitnessTips = (level) => {
    const tips = {
      low: 'Consider starting with easier trails and gradually increasing difficulty.',
      average: 'You can handle moderate trails with some elevation gain. Consider training for more challenging treks.',
      good: 'You\'re ready for most treks. Consider high-altitude challenges with proper acclimatization.',
      excellent: 'You can tackle the most challenging treks, including high-altitude and technical routes.'
    };
    return tips[level] || 'Select your fitness level to see personalized recommendations.';
  };
  const getExperienceProgress = (level) => {
    const levels = { beginner: 0, intermediate: 33, experienced: 66, expert: 100 };
    return levels[level] || 0;
  };

  const getFitnessLevel = (level) => {
    const levels = {
      low: { color: 'red', text: 'Low' },
      average: { color: 'orange', text: 'Average' },
      good: { color: 'blue', text: 'Good' },
      excellent: { color: 'green', text: 'Excellent' }
    };
    return levels[level] || { color: 'gray', text: 'Not specified' };
  };

  return (
    <div className="step-content">
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={3}>
          <TeamOutlined style={{ marginRight: '8px', color: '#1a73e8' }} />
          Group & Experience
        </Title>
        <Text type="secondary">
          Tell us about your group to help us plan the perfect trekking experience
        </Text>
      </div>

      <Row gutter={[32, 24]}>
        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card
              className="step-card group-info-card"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="card-icon-wrapper">
                    <UserOutlined />
                  </div>
                  <span>Group Information</span>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <Form.Item
                  label="Group Size"
                  name="groupSize"
                  tooltip={{ title: "Number of people in your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                  rules={[{ required: true, message: 'Please enter group size' }]}
                >
                  <InputNumber
                    min={1}
                    max={20}
                    size="large"
                    style={{ width: '100%' }}
                    onChange={(value) => onInputChange('groupSize', value)}
                    value={formData.groupSize}
                  />
                </Form.Item>

                <Form.Item
                  label="Group Type"
                  name="groupType"
                  tooltip={{ title: "Select the category that best describes your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                  rules={[{ required: true, message: 'Please select group type' }]}
                >
                  <Select
                    size="large"
                    onChange={(value) => onInputChange('groupType', value)}
                    value={formData.groupType}
                  >
                    {groupTypes.map(type => (
                      <Option key={type.value} value={type.value}>
                        {type.label}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Age Range"
                  name="ageRange"
                  tooltip={{ title: "Age range of participants in your group", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                >
                  <div className="age-range-inputs">
                    <InputNumber
                      min={5}
                      max={80}
                      size="large"
                      placeholder="Min"
                      value={formData.ageRange?.min}
                      onChange={(value) => onInputChange('ageRange', {
                        ...formData.ageRange,
                        min: value
                      })}
                    />
                    <span className="separator">to</span>
                    <InputNumber
                      min={5}
                      max={80}
                      size="large"
                      placeholder="Max"
                      value={formData.ageRange?.max}
                      onChange={(value) => onInputChange('ageRange', {
                        ...formData.ageRange,
                        max: value
                      })}
                    />
                    <span className="separator">years</span>
                  </div>
                </Form.Item>
              </div>
            </Card>

            <Card
              className="step-card experience-fitness-card"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div className="card-icon-wrapper">
                    <StarFilled />
                  </div>
                  <span>Experience & Fitness</span>
                </div>
              }
            >
              <div>
                {/* Experience Level Section */}
                <div style={{ marginBottom: '24px' }}>
                  <Form.Item
                    label="Trekking Experience"
                    name="experienceLevel"
                    tooltip={{ title: "Select your group's highest trekking experience level", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                    rules={[{ required: true, message: 'Please select experience level' }]}
                  >
                    <Select
                      size="large"
                      onChange={(value) => onInputChange('experienceLevel', value)}
                      value={formData.experienceLevel}
                      placeholder="Select experience level"
                    >
                      {experienceLevels.map(level => (
                        <Option key={level.value} value={level.value}>
                          <div style={{ padding: '4px 0' }}>
                            <div className="option-title">{level.label}</div>
                            <div className="helper-text">{level.description}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {formData.experienceLevel && (
                    <div style={{
                      backgroundColor: '#f8fafc',
                      borderRadius: '8px',
                      padding: '16px',
                      marginTop: '16px'
                    }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '8px'
                      }}>
                        <Text strong>Experience Level:</Text>
                        <Tag color="blue">
                          {experienceLevels.find(l => l.value === formData.experienceLevel)?.label}
                        </Tag>
                      </div>
                      <Progress
                        percent={getExperienceProgress(formData.experienceLevel)}
                        showInfo={false}
                        strokeColor="#1a73e8"
                        trailColor="#e2e8f0"
                      />
                    </div>
                  )}
                </div>

                {/* Fitness Level Section */}
                <div>
                  <Form.Item
                    label="Fitness Level"
                    name="fitnessLevel"
                    tooltip={{ title: "Select your group's average fitness level", icon: <InfoCircleOutlined className="tooltip-icon" /> }}
                    rules={[{ required: true, message: 'Please select fitness level' }]}
                  >
                    <Select
                      size="large"
                      onChange={(value) => onInputChange('fitnessLevel', value)}
                      value={formData.fitnessLevel}
                      placeholder="Select fitness level"
                    >
                      {fitnessLevels.map(level => (
                        <Option key={level.value} value={level.value}>
                          <div style={{ padding: '4px 0' }}>
                            <div className="option-title">{level.label}</div>
                            <div className="helper-text">{level.description}</div>
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>

                  {formData.fitnessLevel && (
                    <Alert
                      message={
                        <div>
                          <div style={{ marginBottom: '8px' }}>
                            <Text strong>Fitness Assessment: </Text>
                            <Tag color={getFitnessLevel(formData.fitnessLevel).color}>
                              {getFitnessLevel(formData.fitnessLevel).text}
                            </Tag>
                          </div>
                          <Text type="secondary">
                            {getFitnessTips(formData.fitnessLevel)}
                          </Text>
                        </div>
                      }
                      type="info"
                      showIcon
                      icon={<HeartFilled />}
                      style={{ marginTop: '16px' }}
                    />
                  )}
                </div>
              </div>
            </Card>
          </div>
        </Col>

        <Col xs={24} md={12}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <Card
              className="step-card safety-recommendations-card"
              title={
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <SafetyOutlined style={{ color: '#ef4444', marginRight: '8px', fontSize: '18px' }} />
                  <span>Safety & Recommendations</span>
                </div>
              }
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Alert
                  message="Altitude Sickness Warning"
                  description="Most treks in Nepal reach high altitudes. Proper acclimatization is crucial to prevent AMS (Acute Mountain Sickness)."
                  type="warning"
                  showIcon
                  style={{ marginBottom: '4px' }}
                />

                <div style={{
                  backgroundColor: '#eff6ff',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #dbeafe'
                }}>
                  <div style={{ fontWeight: 500, color: '#1e40af', marginBottom: '6px', display: 'flex', alignItems: 'center', fontSize: '13px' }}>
                    <HeartFilled style={{ color: '#ef4444', marginRight: '6px', fontSize: '14px' }} />
                    Personalized Recommendations
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: 'none', margin: 0, fontSize: '12px', color: '#374151' }}>
                    {formData.experienceLevel === 'beginner' && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <span style={{ color: '#10b981', marginRight: '6px', fontSize: '12px' }}>✓</span>
                        <span>Start with a shorter trek to acclimate to the altitude</span>
                      </li>
                    )}
                    {formData.ageRange?.max > 50 && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <span style={{ color: '#10b981', marginRight: '6px', fontSize: '12px' }}>✓</span>
                        <span>Additional rest days for better acclimatization</span>
                      </li>
                    )}
                    {formData.groupType === 'family' && (
                      <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                        <span style={{ color: '#10b981', marginRight: '6px', fontSize: '12px' }}>✓</span>
                        <span>Family-friendly routes with shorter walking days</span>
                      </li>
                    )}
                    <li style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '4px' }}>
                      <span style={{ color: '#10b981', marginRight: '6px', fontSize: '12px' }}>✓</span>
                      <span>Proper travel insurance covering high-altitude trekking</span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'flex-start' }}>
                      <span style={{ color: '#10b981', marginRight: '6px', fontSize: '12px' }}>✓</span>
                      <span>Pre-trek fitness preparation program</span>
                    </li>
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#dbeafe',
                      padding: '6px',
                      borderRadius: '6px',
                      marginRight: '10px',
                      color: '#2563eb',
                      minWidth: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      <SafetyOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ display: 'block', marginBottom: '2px', fontSize: '13px' }}>Safety First</Text>
                      <Paragraph style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: 1.4 }}>
                        Our guides are trained in wilderness first aid and carry comprehensive first aid kits. We monitor altitude sickness symptoms and have emergency evacuation plans in place.
                      </Paragraph>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#dcfce7',
                      padding: '6px',
                      borderRadius: '6px',
                      marginRight: '10px',
                      color: '#16a34a',
                      minWidth: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      <HeartOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ display: 'block', marginBottom: '2px', fontSize: '13px' }}>Responsible Tourism</Text>
                      <Paragraph style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: 1.4 }}>
                        We follow Leave No Trace principles, support local communities, and ensure fair treatment and proper equipment for all our staff.
                      </Paragraph>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <div style={{
                      backgroundColor: '#fef3c7',
                      padding: '6px',
                      borderRadius: '6px',
                      marginRight: '10px',
                      color: '#d97706',
                      minWidth: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '14px'
                    }}>
                      <ToolOutlined />
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text strong style={{ display: 'block', marginBottom: '2px', fontSize: '13px' }}>Quality Equipment</Text>
                      <Paragraph style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: 1.4 }}>
                        We use high-quality, well-maintained equipment for all our treks. Tents, sleeping bags, and other gear are regularly inspected and replaced as needed.
                      </Paragraph>
                    </div>
                  </div>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 500, color: '#1f2937', marginBottom: '4px', fontSize: '13px' }}>Need help choosing?</div>
                  <Paragraph style={{ fontSize: '12px', color: '#4b5563', margin: 0, lineHeight: 1.4 }}>
                    Our trekking experts can help you select the perfect trek based on your group's experience and fitness levels. Contact us for personalized recommendations.
                  </Paragraph>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default GroupExperienceStep;
