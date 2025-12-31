import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { Select, InputNumber, Slider, Button, Steps, Form, Input, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { 
  UserOutlined, 
  EnvironmentOutlined, 
  TeamOutlined, 
  CalendarOutlined, 
  DollarOutlined, 
  StarOutlined, 
  InfoCircleOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './CustomTrip.css';

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'challenging', label: 'Challenging' },
  { value: 'difficult', label: 'Difficult' },
  { value: 'extreme', label: 'Extreme' }
];

const accommodationTypes = [
  { value: 'camping', label: 'Camping' },
  { value: 'teahouse', label: 'Tea House' },
  { value: 'lodge', label: 'Lodge' },
  { value: 'hotel', label: 'Hotel' },
  { value: 'homestay', label: 'Homestay' }
];

const CustomTrip = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: null,
    endDate: null,
    groupSize: 1,
    difficulty: 'moderate',
    budget: 1000,
    accommodation: 'teahouse',
    specialRequirements: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch destinations from your API
    const fetchDestinations = async () => {
      try {
        const response = await axios.get('/api/destinations');
        // Ensure we have an array before setting state
        if (Array.isArray(response?.data)) {
          setDestinations(response.data);
        } else {
          console.warn('Expected an array of destinations but received:', response?.data);
          setDestinations([
            { _id: 'everest', name: 'Everest Base Camp' },
            { _id: 'annapurna', name: 'Annapurna Circuit' },
            { _id: 'langtang', name: 'Langtang Valley' },
            { _id: 'manaslu', name: 'Manaslu Circuit' },
            { _id: 'mustang', name: 'Upper Mustang' }
          ]);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // Fallback to default destinations if API fails
        setDestinations([
          { _id: 'everest', name: 'Everest Base Camp' },
          { _id: 'annapurna', name: 'Annapurna Circuit' },
          { _id: 'langtang', name: 'Langtang Valley' },
          { _id: 'manaslu', name: 'Manaslu Circuit' },
          { _id: 'mustang', name: 'Upper Mustang' }
        ]);
      }
    };
    
    fetchDestinations();
  }, []);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactInfoChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value
      }
    }));
  };

  const handleDateRangeChange = (dates) => {
    if (dates && dates.length === 2) {
      setFormData(prev => ({
        ...prev,
        startDate: dates[0],
        endDate: dates[1]
      }));
    }
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Replace with your API endpoint
      await axios.post('/api/custom-trips', formData);
      toast.success('Your custom trip request has been submitted successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error submitting custom trip:', error);
      toast.error('Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Destination',
      content: (
        <div className="step-content">
          <h3>Where would you like to go?</h3>
          <Form.Item
            label="Destination"
            rules={[{ required: true, message: 'Please select a destination' }]}
          >
            <Select
              showSearch
              placeholder="Select a destination"
              optionFilterProp="children"
              onChange={(value) => handleInputChange('destination', value)}
              value={formData.destination}
              suffixIcon={<EnvironmentOutlined />}
            >
              {destinations.map(dest => (
                <Option key={dest._id} value={dest._id}>
                  {dest.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <h3>When would you like to travel?</h3>
          <Form.Item
            label="Travel Dates"
            rules={[{ required: true, message: 'Please select your travel dates' }]}
          >
            <DatePicker.RangePicker
              onChange={handleDateRangeChange}
              value={formData.startDate && formData.endDate ? [dayjs(formData.startDate), dayjs(formData.endDate)] : null}
              style={{ width: '100%' }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf('day');
              }}
            />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Group & Preferences',
      content: (
        <div className="step-content">
          <h3>Group Information</h3>
          <Form.Item
            label="Group Size"
            rules={[{ required: true, message: 'Please select group size' }]}
          >
            <InputNumber
              min={1}
              max={20}
              value={formData.groupSize}
              onChange={(value) => handleInputChange('groupSize', value)}
              style={{ width: '100%' }}
              prefix={<TeamOutlined />}
            />
          </Form.Item>
          
          <h3>Trek Preferences</h3>
          <Form.Item
            label="Difficulty Level"
            rules={[{ required: true, message: 'Please select difficulty level' }]}
          >
            <Select
              value={formData.difficulty}
              onChange={(value) => handleInputChange('difficulty', value)}
              style={{ width: '100%' }}
            >
              {difficultyLevels.map(level => (
                <Option key={level.value} value={level.value}>
                  {level.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label="Accommodation Type"
            rules={[{ required: true, message: 'Please select accommodation type' }]}
          >
            <Select
              value={formData.accommodation}
              onChange={(value) => handleInputChange('accommodation', value)}
              style={{ width: '100%' }}
            >
              {accommodationTypes.map(type => (
                <Option key={type.value} value={type.value}>
                  {type.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            label={`Budget per person: $${formData.budget}`}
            className="budget-slider"
          >
            <Slider
              min={500}
              max={10000}
              step={100}
              value={formData.budget}
              onChange={(value) => handleInputChange('budget', value)}
              tooltip={{ formatter: value => `$${value}` }}
            />
            <div className="budget-range">
              <span>$500</span>
              <span>$10,000+</span>
            </div>
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Details & Contact',
      content: (
        <div className="step-content">
          <h3>Special Requirements</h3>
          <Form.Item
            label="Any special requirements or preferences?"
            help="E.g., dietary restrictions, medical conditions, special requests"
          >
            <TextArea
              rows={4}
              value={formData.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
              placeholder="Let us know if you have any special requirements..."
            />
          </Form.Item>
          
          <h3>Contact Information</h3>
          <Form.Item
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input
              prefix={<UserOutlined />}
              value={formData.contactInfo.name}
              onChange={(e) => handleContactInfoChange('name', e.target.value)}
              placeholder="Your full name"
            />
          </Form.Item>
          
          <Form.Item
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' }
            ]}
          >
            <Input
              type="email"
              prefix={<EnvironmentOutlined />}
              value={formData.contactInfo.email}
              onChange={(e) => handleContactInfoChange('email', e.target.value)}
              placeholder="your.email@example.com"
            />
          </Form.Item>
          
          <Form.Item
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input
              prefix={<InfoCircleOutlined />}
              value={formData.contactInfo.phone}
              onChange={(e) => handleContactInfoChange('phone', e.target.value)}
              placeholder="+1 (123) 456-7890"
            />
          </Form.Item>
        </div>
      ),
    },
  ];

  return (
    <div className="custom-trip-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="custom-trip-header"
      >
        <h1>Customize Your Dream Trek</h1>
        <p>Fill out the form below to create your perfect trekking experience</p>
      </motion.div>
      
      <div className="custom-trip-steps">
        <Steps current={currentStep} responsive={true}>
          {steps.map((item, index) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </div>
      
      <div className="custom-trip-form">
        <Form layout="vertical">
          {steps[currentStep].content}
          
          <div className="form-navigation">
            {currentStep > 0 && (
              <Button
                onClick={prevStep}
                style={{ marginRight: 8 }}
                icon={<ArrowLeftOutlined />}
              >
                Previous
              </Button>
            )}
            
            {currentStep < steps.length - 1 && (
              <Button type="primary" onClick={nextStep}>
                Next <ArrowRightOutlined />
              </Button>
            )}
            
            {currentStep === steps.length - 1 && (
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                icon={<CheckOutlined />}
              >
                Submit Request
              </Button>
            )}
          </div>
        </Form>
      </div>
      
      <div className="custom-trip-info">
        <div className="info-card">
          <StarOutlined className="info-icon" />
          <h4>Why Customize?</h4>
          <p>Create a trek that matches your exact preferences, schedule, and fitness level.</p>
        </div>
        <div className="info-card">
          <TeamOutlined className="info-icon" />
          <h4>Group Discounts</h4>
          <p>Special rates available for groups of 4 or more people.</p>
        </div>
        <div className="info-card">
          <DollarOutlined className="info-icon" />
          <h4>Best Price Guarantee</h4>
          <p>We'll match any lower price you find elsewhere.</p>
        </div>
      </div>
    </div>
  );
};

export default CustomTrip;
