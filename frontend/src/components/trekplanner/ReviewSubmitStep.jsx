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
  Checkbox
} from 'antd';
import {
  CheckCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  InfoCircleOutlined,
  SafetyCertificateOutlined
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
  budgetRanges
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

  const handleSubmit = async (e) => {
    e?.preventDefault();
    try {
      const values = await form.validateFields();
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
      console.error('Form validation failed:', error);
      if (error.errorFields) {
        // Handle Ant Design form validation errors
        const errorMessages = error.errorFields.map(field =>
          `${field.errors.join(', ')}`
        ).join('\n');
        message.error(errorMessages);
      } else {
        // Handle other errors
        message.error(error.message || 'Please fill in all required fields');
      }
      throw error; // Re-throw to prevent form submission
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

      <Row gutter={[24, 16]}>
        <Col xs={24} lg={16}>
          <Collapse defaultActiveKey={['trek-details']} className="mb-6" ghost>
            <Panel
              header={<span className="font-semibold text-lg">Trek Details</span>}
              key="trek-details"
            >
              <div className="pl-6">
                <Row gutter={[16, 16]} className="mb-4">
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text strong>Trek: </Text>
                      <Text>{getTrekName(formData.destination)}</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Start Date: </Text>
                      <Text>{formData.startDate ? (typeof formData.startDate === 'string' ? formData.startDate : dayjs(formData.startDate).format('MMMM D, YYYY')) : 'Not specified'}</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Duration: </Text>
                      <Text>{formData.duration} days</Text>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text strong>Group Size: </Text>
                      <Text>{formData.groupSize} person(s)</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Group Type: </Text>
                      <Text>{getGroupType(formData.groupType)}</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Age Range: </Text>
                      <Text>{formData.ageRange?.min || 'N/A'} - {formData.ageRange?.max || 'N/A'} years</Text>
                    </div>
                  </Col>
                </Row>

                <Divider className="my-4" />

                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text strong>Experience Level: </Text>
                      <Text>{getExperienceLevel(formData.experienceLevel)}</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Fitness Level: </Text>
                      <Text>{getFitnessLevel(formData.fitnessLevel)}</Text>
                    </div>
                  </Col>
                  <Col xs={24} md={12}>
                    <div className="mb-2">
                      <Text strong>Accommodation: </Text>
                      <Text>{getAccommodationType(formData.accommodation)}</Text>
                    </div>
                    <div className="mb-2">
                      <Text strong>Budget Range: </Text>
                      <Text>{getBudgetRange(formData.budgetRange)} (${formData.budgetAmount}/person)</Text>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>

            <Panel
              header={<span className="font-semibold text-lg">Services & Preferences</span>}
              key="services-preferences"
              className="mt-4"
            >
              <div className="pl-6">
                <Row gutter={[16, 16]}>
                  <Col xs={24} md={12}>
                    <div className="mb-3">
                      <Text strong>Meal Preferences: </Text>
                      <div className="mt-1">
                        {formData.mealPreferences?.length > 0 ? (
                          formData.mealPreferences.map(pref => (
                            <Tag key={pref} color="blue" className="mb-1">
                              {pref.charAt(0).toUpperCase() + pref.slice(1).replace('_', ' ')}
                            </Tag>
                          ))
                        ) : (
                          <Text type="secondary">No specific preferences</Text>
                        )}
                      </div>
                    </div>

                    {formData.dietaryRestrictions && (
                      <div className="mb-3">
                        <Text strong>Dietary Restrictions: </Text>
                        <div className="mt-1">
                          <Text>{formData.dietaryRestrictions}</Text>
                        </div>
                      </div>
                    )}
                  </Col>

                  <Col xs={24} md={12}>
                    <div className="mb-3">
                      <Text strong>Services: </Text>
                      <div className="mt-1 space-y-1">
                        <div>
                          <Checkbox checked={formData.guideRequired} disabled>
                            Professional Guide
                          </Checkbox>
                        </div>
                        <div>
                          <Checkbox checked={formData.porterRequired} disabled>
                            Porter Service
                          </Checkbox>
                        </div>
                        <div>
                          <Checkbox checked={formData.insuranceRequired} disabled>
                            Travel Insurance
                          </Checkbox>
                        </div>
                        <div>
                          <Checkbox checked={formData.equipmentRental} disabled>
                            Equipment Rental
                          </Checkbox>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <Text strong>Transportation: </Text>
                      <div className="mt-1">
                        {formData.transportation?.length > 0 ? (
                          formData.transportation.map(trans => (
                            <Tag key={trans} color="green" className="mb-1">
                              {trans.split('_').map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')}
                            </Tag>
                          ))
                        ) : (
                          <Text type="secondary">Not specified</Text>
                        )}
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Panel>

            <Panel
              header={<span className="font-semibold text-lg">Contact Information</span>}
              key="contact-info"
              className="mt-4"
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{
                  contactInfo: {
                    name: formData.contactInfo?.name || '',
                    email: formData.contactInfo?.email || '',
                    phone: formData.contactInfo?.phone || '',
                    address: formData.contactInfo?.address || ''
                  },
                  emergencyContact: {
                    name: formData.contactInfo?.emergencyContact?.name || '',
                    relationship: formData.contactInfo?.emergencyContact?.relationship || '',
                    phone: formData.contactInfo?.emergencyContact?.phone || ''
                  },
                  termsAgreed: formData.termsAgreed || false
                }}
                className="pl-6"
              >
                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['contactInfo', 'name']}
                      label="Full Name"
                      rules={[{ required: true, message: 'Please enter your full name' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.name || ''}
                    >
                      <Input
                        prefix={<UserOutlined className="text-gray-400" />}
                        placeholder="Your full name"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['contactInfo', 'email']}
                      label="Email Address"
                      rules={[
                        { required: true, message: 'Please enter your email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.email || ''}
                    >
                      <Input
                        prefix={<MailOutlined className="text-gray-400" />}
                        placeholder="your.email@example.com"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['contactInfo', 'phone']}
                      label="Phone Number"
                      rules={[{ required: true, message: 'Please enter your phone number' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.phone || ''}
                    >
                      <Input
                        prefix={<PhoneOutlined className="text-gray-400" />}
                        placeholder="+1 234 567 8900"
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['contactInfo', 'country']}
                      label="Country of Residence"
                      rules={[{ required: true, message: 'Please enter your country' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.country || ''}
                    >
                      <Input
                        prefix={<GlobalOutlined className="text-gray-400" />}
                        placeholder="Your country"
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Divider orientation="left" className="mt-6">
                  <span className="text-gray-600">Emergency Contact</span>
                </Divider>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['emergencyContact', 'name']}
                      label="Emergency Contact Name"
                      rules={[{ required: true, message: 'Please enter emergency contact name' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.emergencyContact?.name || ''}
                    >
                      <Input placeholder="Full name" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['emergencyContact', 'relationship']}
                      label="Relationship"
                      rules={[{ required: true, message: 'Please specify relationship' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.emergencyContact?.relationship || ''}
                    >
                      <Input placeholder="e.g., Spouse, Parent, Friend" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['emergencyContact', 'phone']}
                      label="Emergency Phone"
                      rules={[{ required: true, message: 'Please enter emergency phone number' }]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.emergencyContact?.phone || ''}
                    >
                      <Input placeholder="+1 234 567 8900" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12}>
                    <Form.Item
                      name={['emergencyContact', 'email']}
                      label="Emergency Email"
                      rules={[
                        { required: true, message: 'Please enter emergency email' },
                        { type: 'email', message: 'Please enter a valid email' }
                      ]}
                      className="mb-4"
                      initialValue={formData.contactInfo?.emergencyContact?.email || ''}
                    >
                      <Input placeholder="emergency.contact@example.com" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  name="specialRequests"
                  label="Special Requests or Additional Information"
                  initialValue={formData.specialRequests}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Please provide any additional information or special requests..."
                    onChange={(e) => onInputChange('specialRequests', e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Panel>
          </Collapse>

          <Card className="mt-6">
            <Form
              form={form}
              onFinish={async (values) => {
                try {
                  await handleSubmit();
                } catch (error) {
                  // Error is already handled in handleSubmit
                }
              }}
              initialValues={{ termsAgreed: false }}
            >
              <Form.Item
                name="termsAgreed"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value ? Promise.resolve() : Promise.reject(new Error('You must agree to the terms and conditions')),
                  },
                ]}
                className="mb-6"
                initialValue={formData.termsAgreed || false}
              >
                <Checkbox>
                  I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer">Terms & Conditions</a> and
                  <a href="/privacy" target="_blank" rel="noopener noreferrer"> Privacy Policy</a>.
                </Checkbox>
              </Form.Item>

              <Alert
                message="Important Information"
                description={
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <InfoCircleOutlined className="text-blue-500 mt-1 mr-2" />
                      <span>By submitting this form, you agree to our booking terms and conditions.</span>
                    </div>
                    <div className="flex items-start">
                      <SafetyCertificateOutlined className="text-green-500 mt-1 mr-2" />
                      <span>Your personal information is secure and will only be used for your booking.</span>
                    </div>
                  </div>
                }
                type="info"
                showIcon
                className="mb-6"
              />

              <div className="flex justify-between mt-8">
                <Button
                  type="default"
                  onClick={onPrevious}
                  disabled={loading}
                >
                  Back
                </Button>

                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  icon={<CheckCircleOutlined />}
                  size="large"
                  className="w-full md:w-auto"
                >
                  Submit Request
                </Button>
              </div>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            title="Summary"
            className="sticky top-4"
            bordered={false}
          >
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-lg font-semibold text-center mb-2">
                  {getTrekName(formData.destination)}
                </div>
                <div className="text-center text-gray-600 mb-3">
                  {formData.duration} days • {formData.groupSize} {formData.groupSize > 1 ? 'People' : 'Person'}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Start Date:</span>
                    <span className="font-medium">
                      {formData.startDate ? dayjs(formData.startDate).format('MMM D, YYYY') : 'Not set'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>End Date:</span>
                    <span className="font-medium">
                      {formData.endDate ? dayjs(formData.endDate).format('MMM D, YYYY') : 'Not set'}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Accommodation:</span>
                    <span className="font-medium">
                      {getAccommodationType(formData.accommodation)}
                    </span>
                  </div>

                  <div className="pt-2 mt-2 border-t border-gray-200">
                    <div className="flex justify-between font-semibold">
                      <span>Estimated Cost:</span>
                      <span>${formData.budgetAmount} <span className="text-sm font-normal">per person</span></span>
                    </div>
                    <div className="text-right text-sm text-gray-500">
                      {formData.groupSize > 1 && (
                        <span>Total: ${formData.budgetAmount * formData.groupSize}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">What happens next?</div>
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  <li>Submit your trek request</li>
                  <li>We'll review your preferences</li>
                  <li>Receive a detailed itinerary and quote within 24 hours</li>
                  <li>Confirm your booking with a deposit</li>
                  <li>Start preparing for your adventure!</li>
                </ol>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-semibold mb-2">Need help?</div>
                <div className="text-sm space-y-1">
                  <div>Email: info@jumatrek.com</div>
                  <div>Phone: +977-1-1234567</div>
                  <div>WhatsApp: +977-9801234567</div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  Our team is available 24/7 to assist you with any questions.
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewSubmitStep;
