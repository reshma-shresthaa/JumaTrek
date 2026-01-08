import React from 'react';
import dayjs from 'dayjs';
import {
  Row,
  Col,
  Card,
  Typography,
  Divider,
  Button,
  Form,
  Input,
  Alert,
  Space,
  Tag,
  Collapse,
  Checkbox,
  message
} from 'antd';
import {
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  HomeOutlined,
  DollarOutlined,
  SafetyOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const ReviewSubmitStep = ({
  formData,
  onPrevious,
  onSubmit,
  loading,
  popularTreks,
  destinations,
  groupTypes,
  experienceLevels,
  fitnessLevels,
  accommodationTypes,
  budgetRanges,
  onInputChange
}) => {
  const [form] = Form.useForm();

  const getTrekName = (value) => {
    const list = destinations && destinations.length > 0 ? destinations : popularTreks;
    const trek = list.find(t => t.value === value);
    return trek ? trek.label : formData.customDestination || 'Custom Trek';
  };

  const getGroupType = (value) => {
    const type = groupTypes.find(t => t.value === value);
    return type ? type.label : value;
  };

  const getExperienceLevel = (value) => {
    const level = experienceLevels.find(l => l.value === value);
    return level ? level.label : value;
  };

  const getFitnessLevel = (value) => {
    const level = fitnessLevels.find(l => l.value === value);
    return level ? level.label : value;
  };

  const getAccommodationType = (value) => {
    const type = accommodationTypes.find(t => t.value === value);
    return type ? type.label : value;
  };

  const getBudgetRange = (value) => {
    const range = budgetRanges.find(r => r.value === value);
    return range ? range.label.replace(/\([^)]+\)/g, '').trim() : value;
  };

  const handleSubmit = async (values) => {
    try {
      const finalData = {
        ...formData,
        contactInfo: {
          ...(formData.contactInfo || {}),
          ...(values.contactInfo || {}),
          emergencyContact: {
            ...(formData.contactInfo?.emergencyContact || {}),
            ...(values.emergencyContact || {})
          }
        },
        termsAgreed: values.termsAgreed || false,
        specialRequests: values.specialRequests
      };

      // Call the parent's onSubmit handler with the form values
      await onSubmit(finalData);
    } catch (error) {
      console.error('Form submission failed:', error);
      if (error.errorFields) {
        const errorMessages = error.errorFields.map(field => field.errors.join(', ')).join('\n');
        message.error(errorMessages);
      } else {
        message.error(error.message || 'Failed to submit your request');
      }
    }
  };

  return (
    <div className="step-content">
      <div className="text-center mb-8">
        <CheckCircleOutlined className="text-4xl text-green-500 mb-4" />
        <Title level={3} className="mb-2">Review Your Trekking Plan</Title>
        <Text type="secondary">
          Please review all the details below before submitting your trekking request.
        </Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          contactInfo: {
            name: formData.contactInfo?.name || '',
            email: formData.contactInfo?.email || '',
            phone: formData.contactInfo?.phone || '',
            country: formData.contactInfo?.country || ''
          },
          emergencyContact: {
            name: formData.contactInfo?.emergencyContact?.name || '',
            relationship: formData.contactInfo?.emergencyContact?.relationship || '',
            phone: formData.contactInfo?.emergencyContact?.phone || '',
            email: formData.contactInfo?.emergencyContact?.email || ''
          },
          specialRequests: formData.specialRequests || '',
          termsAgreed: formData.termsAgreed || false
        }}
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} lg={16}>
            <Collapse defaultActiveKey={['trek-details', 'contact-info']} className="mb-6" ghost>
              <Panel
                header={<span className="font-semibold text-lg">Trek Details</span>}
                key="trek-details"
              >
                <div className="pl-6 bg-gray-50 p-4 rounded-lg">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <div className="mb-2"><Text strong>Trek: </Text><Text>{getTrekName(formData.destination)}</Text></div>
                      <div className="mb-2"><Text strong>Start Date: </Text><Text>{formData.startDate ? dayjs(formData.startDate).format('MMMM D, YYYY') : 'Not specified'}</Text></div>
                      <div className="mb-2"><Text strong>Duration: </Text><Text>{formData.duration} days</Text></div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="mb-2"><Text strong>Group Size: </Text><Text>{formData.groupSize} person(s)</Text></div>
                      <div className="mb-2"><Text strong>Group Type: </Text><Text>{getGroupType(formData.groupType)}</Text></div>
                      <div className="mb-2"><Text strong>Budget: </Text><Text>{getBudgetRange(formData.budgetRange)}</Text></div>
                    </Col>
                  </Row>
                </div>
              </Panel>

              <Panel
                header={<span className="font-semibold text-lg">Accommodation & Services</span>}
                key="services"
                className="mt-4"
              >
                <div className="pl-6 bg-gray-50 p-4 rounded-lg">
                  <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                      <div className="mb-2"><Text strong>Accommodation: </Text><Text>{getAccommodationType(formData.accommodation)}</Text></div>
                      <div className="mb-2">
                        <Text strong>Meals: </Text>
                        {formData.mealPreferences?.map(m => <Tag key={m} color="orange">{m}</Tag>)}
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="mb-2"><Checkbox checked={formData.guideRequired} disabled>Guide Required</Checkbox></div>
                      <div className="mb-2"><Checkbox checked={formData.porterRequired} disabled>Porter Required</Checkbox></div>
                    </Col>
                  </Row>
                </div>
              </Panel>

              <Panel
                header={<span className="font-semibold text-lg">Contact Information</span>}
                key="contact-info"
                className="mt-4"
              >
                <div className="pl-6">
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name={['contactInfo', 'name']} label="Full Name" rules={[{ required: true }]}>
                        <Input prefix={<UserOutlined />} placeholder="Full Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name={['contactInfo', 'email']} label="Email" rules={[{ required: true, type: 'email' }]}>
                        <Input prefix={<MailOutlined />} placeholder="Email Address" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name={['contactInfo', 'phone']} label="Phone" rules={[{ required: true }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name={['contactInfo', 'country']} label="Country" rules={[{ required: true }]}>
                        <Input prefix={<GlobalOutlined />} placeholder="Country" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider orientation="left">Emergency Contact</Divider>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name={['emergencyContact', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input placeholder="Emergency Contact Name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name={['emergencyContact', 'relationship']} label="Relationship" rules={[{ required: true }]}>
                        <Input placeholder="Relationship" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col xs={24} md={12}>
                      <Form.Item name={['emergencyContact', 'phone']} label="Phone" rules={[{ required: true }]}>
                        <Input placeholder="Emergency Phone" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item name={['emergencyContact', 'email']} label="Email" rules={[{ type: 'email' }]}>
                        <Input placeholder="Emergency Email" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Form.Item name="specialRequests" label="Special Requests">
                    <Input.TextArea rows={3} placeholder="Any other details..." onChange={(e) => onInputChange && onInputChange('specialRequests', e.target.value)} />
                  </Form.Item>
                </div>
              </Panel>
            </Collapse>

            <Card className="mt-6 shadow-sm">
              <Form.Item
                name="termsAgreed"
                valuePropName="checked"
                rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject('You must agree to terms') }]}
              >
                <Checkbox>I agree to the Terms & Conditions and Privacy Policy</Checkbox>
              </Form.Item>

              <Alert
                message="Your safety is our priority"
                description="We ensure all our treks follow strict safety protocols and are led by certified professionals."
                type="info"
                showIcon
                className="mb-4"
              />

              <div className="flex justify-between mt-8">
                <Button onClick={onPrevious} disabled={loading} size="large">Back</Button>
                <Button type="primary" htmlType="submit" loading={loading} icon={<CheckCircleOutlined />} size="large">
                  Submit Request
                </Button>
              </div>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="Summary" className="sticky top-4 shadow-sm" bordered={false}>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="text-lg font-semibold text-center mb-2">{getTrekName(formData.destination)}</div>
                  <div className="text-center text-gray-600 mb-3">{formData.duration} days • {formData.groupSize} {formData.groupSize > 1 ? 'People' : 'Person'}</div>
                  <Divider className="my-2" />
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span>Start Date:</span><span className="font-medium">{formData.startDate ? dayjs(formData.startDate).format('MMM D, YYYY') : 'Not set'}</span></div>
                    <div className="flex justify-between"><span>Difficulty:</span><span className="font-medium capitalize">{formData.difficulty || 'Moderate'}</span></div>
                    <div className="flex justify-between"><span>Budget:</span><span className="font-medium">${formData.budgetAmount} / person</span></div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-sm">
                  <div className="font-semibold mb-1">What's Next?</div>
                  <ul className="pl-4 list-disc space-y-1 text-gray-600">
                    <li>Our team reviews your request</li>
                    <li>Expert advice on your itinerary</li>
                    <li>Finalized quote within 24h</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ReviewSubmitStep;
