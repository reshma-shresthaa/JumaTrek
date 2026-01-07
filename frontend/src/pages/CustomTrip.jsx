import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Select, InputNumber, Slider, Button, Steps, Form, Input, DatePicker,
  Card, Row, Col, Typography, Divider, Collapse, Tag, Alert, Checkbox, Radio,
  message, Spin, Result, Modal
} from 'antd';
import dayjs from 'dayjs';
import {
  UserOutlined, EnvironmentOutlined, TeamOutlined, CalendarOutlined,
  DollarOutlined, StarOutlined, InfoCircleOutlined, ArrowLeftOutlined,
  ArrowRightOutlined, CheckOutlined, SafetyOutlined, HeartOutlined,
  HomeOutlined, CarOutlined, ForkOutlined, MedicineBoxOutlined,
  ToolOutlined, GlobalOutlined, ClockCircleOutlined, FireOutlined,
  CheckCircleOutlined, SmileOutlined
} from '@ant-design/icons';
import axios from 'axios';

const API_BASE = import.meta?.env?.VITE_API_BASE || 'http://localhost:5000';
import './CustomTrip.css';

// Import step components
import TrekDetailsStep from '../components/trekplanner/TrekDetailsStep';
import GroupExperienceStep from '../components/trekplanner/GroupExperienceStep';
import AccommodationMealsStep from '../components/trekplanner/AccommodationMealsStep';
import ServicesTransportStep from '../components/trekplanner/ServicesTransportStep';
import BudgetDatesStep from '../components/trekplanner/BudgetDatesStep';
import ReviewSubmitStep from '../components/trekplanner/ReviewSubmitStep';

const { Title, Text, Paragraph } = Typography;
const { Panel } = Collapse;

const { Option } = Select;
const { TextArea } = Input;
const { Step } = Steps;

// Trek Difficulty Levels
const difficultyLevels = [
  { value: 'easy', label: 'Easy', description: '3-5 hours of walking per day, gentle terrain, low altitude' },
  { value: 'moderate', label: 'Moderate', description: '5-7 hours of walking, some steep sections, up to 4,000m altitude' },
  { value: 'challenging', label: 'Challenging', description: '6-8 hours of walking, steep ascents/descents, up to 5,500m' },
  { value: 'difficult', label: 'Difficult', description: '7-9 hours of walking, technical terrain, high altitude above 5,500m' },
  { value: 'extreme', label: 'Extreme', description: 'Expedition style, technical climbing, extreme altitude' }
];

// Accommodation Types
const accommodationTypes = [
  { value: 'camping', label: 'Camping', icon: <HomeOutlined /> },
  { value: 'teahouse', label: 'Tea House', icon: <HomeOutlined /> },
  { value: 'lodge', label: 'Mountain Lodge', icon: <HomeOutlined /> },
  { value: 'hotel', label: 'Hotel', icon: <HomeOutlined /> },
  { value: 'homestay', label: 'Homestay', icon: <HomeOutlined /> }
];

// Experience Levels
const experienceLevels = [
  { value: 'beginner', label: 'Beginner', description: 'First time trekking' },
  { value: 'novice', label: 'Novice', description: '1-2 treks completed' },
  { value: 'intermediate', label: 'Intermediate', description: '3-5 treks, some at high altitude' },
  { value: 'experienced', label: 'Experienced', description: 'Multiple high-altitude treks' },
  { value: 'expert', label: 'Expert', description: 'Extensive high-altitude experience' }
];

// Fitness Levels
const fitnessLevels = [
  { value: 'low', label: 'Low', description: 'Minimal exercise, mostly sedentary' },
  { value: 'moderate', label: 'Moderate', description: 'Some regular exercise' },
  { value: 'good', label: 'Good', description: 'Regular exercise 3-4 times per week' },
  { value: 'very_good', label: 'Very Good', description: 'Regular cardio and strength training' },
  { value: 'excellent', label: 'Excellent', description: 'Athletic training, regular endurance exercise' }
];

// Meal Preferences
const mealPreferences = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'non_vegetarian', label: 'Non-Vegetarian' },
  { value: 'gluten_free', label: 'Gluten-Free' },
  { value: 'lactose_free', label: 'Lactose-Free' },
  { value: 'halal', label: 'Halal' },
  { value: 'kosher', label: 'Kosher' }
];

// Transportation Options
const transportOptions = [
  { value: 'private_vehicle', label: 'Private Vehicle' },
  { value: 'public_bus', label: 'Public Bus' },
  { value: 'flight', label: 'Domestic Flight' },
  { value: 'helicopter', label: 'Helicopter (where applicable)' }
];

// Popular Trekking Routes in Nepal
const popularTreks = [
  { value: 'everest_base_camp', label: 'Everest Base Camp' },
  { value: 'annapurna_circuit', label: 'Annapurna Circuit' },
  { value: 'langtang_valley', label: 'Langtang Valley' },
  { value: 'manaslu_circuit', label: 'Manaslu Circuit' },
  { value: 'upper_mustang', label: 'Upper Mustang' },
  { value: 'annapurna_base_camp', label: 'Annapurna Base Camp' },
  { value: 'ghorepani_poonhill', label: 'Ghorepani Poon Hill' },
  { value: 'kanchenjunga', label: 'Kanchenjunga Base Camp' },
  { value: 'makalu_base_camp', label: 'Makalu Base Camp' },
  { value: 'rolwaling_valley', label: 'Rolwaling Valley' },
  { value: 'custom', label: 'Custom Route' }
];

// Group Types
const groupTypes = [
  { value: 'solo', label: 'Solo Traveler' },
  { value: 'couple', label: 'Couple' },
  { value: 'friends', label: 'Friends' },
  { value: 'family', label: 'Family' },
  { value: 'corporate', label: 'Corporate Group' },
  { value: 'school', label: 'School/College' }
];

// Budget Ranges (per person in USD)
const budgetRanges = [
  { value: 'budget', label: 'Budget ($500-$1000)', min: 500, max: 1000 },
  { value: 'standard', label: 'Standard ($1000-$2000)', min: 1000, max: 2000 },
  { value: 'comfort', label: 'Comfort ($2000-$3500)', min: 2000, max: 3500 },
  { value: 'luxury', label: 'Luxury ($3500+)', min: 3500, max: 10000 }
];

const CustomTrip = () => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Basic Information
    destination: '',
    customDestination: '',
    startDate: null,
    endDate: null,
    duration: 10, // Default 10 days
    groupSize: 1,
    groupType: 'friends',
    ageRange: { min: 20, max: 50 },

    // Experience & Fitness
    difficulty: 'moderate',
    experienceLevel: 'beginner',
    fitnessLevel: 'moderate',

    // Accommodation & Meals
    accommodation: 'teahouse',
    mealPreferences: ['vegetarian'],
    dietaryRestrictions: '',

    // Services
    guideRequired: true,
    porterRequired: true,
    transportation: ['private_vehicle'],
    insuranceRequired: true,
    equipmentRental: false,

    // Budget
    budgetRange: 'standard',
    budgetAmount: 1500, // USD

    // Special Requests
    specialRequests: '',

    // Contact Information
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      country: '',
      emergencyContact: {
        name: '',
        relationship: '',
        phone: '',
        email: ''
      }
    },

    // Internal use
    itinerary: [],
    gearRecommendations: [],
    costBreakdown: {},
    safetyNotes: []
  });

  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [hasPendingTrip, setHasPendingTrip] = useState(false);
  const navigate = useNavigate();

  // Reset form to initial state when component mounts
  useEffect(() => {
    // Clear any existing form data
    const resetForm = () => {
      const initialState = {
        // Basic Information
        destination: '',
        customDestination: '',
        startDate: null,
        endDate: null,
        duration: 10,
        groupSize: 1,
        groupType: 'friends',
        // Reset all other form fields to their defaults
        experienceLevel: 'beginner',
        fitnessLevel: 'average',
        hasMedicalCondition: false,
        medicalCondition: '',
        accommodationType: 'teahouse',
        mealPreferences: ['nepali'],
        specialDietary: '',
        needsGuide: true,
        needsPorter: false,
        transportType: 'private',
        budgetRange: 'standard',
        budgetMin: 1000,
        budgetMax: 2000,
        flexibleDates: false,
        contactInfo: {
          name: '',
          email: '',
          phone: '',
          country: '',
          emergencyContact: {
            name: '',
            relationship: '',
            phone: ''
          }
        },
        specialRequests: '',
        termsAgreed: false,
        // Internal use
        itinerary: [],
        gearRecommendations: [],
        costBreakdown: {},
        safetyNotes: []
      };

      setFormData(initialState);
      if (form) {
        form.resetFields();
        form.setFieldsValue(initialState);
      }
    };

    resetForm();

    // Only load draft if user explicitly wants to continue
    const loadDraft = () => {
      try {
        const pendingTrip = localStorage.getItem('pendingCustomTrip');
        if (pendingTrip) {
          const tripData = JSON.parse(pendingTrip);
          const { isAuthenticated } = checkAuth();

          if (isAuthenticated && tripData.isSubmissionPending) {
            // User just logged in to complete submission
            Modal.confirm({
              title: 'Complete Your Submission',
              content: 'Welcome back! Would you like to submit your pending custom trip request now?',
              okText: 'Submit Request',
              cancelText: 'Review First',
              onOk() {
                // Auto-submit immediately
                setFormData(tripData);
                // We pass the data directly to submit
                handleSubmit(tripData);
              },
              onCancel() {
                setFormData(tripData);
                if (form) {
                  form.setFieldsValue(tripData);
                }
                // Remove the pending flag but keep draft
                const updatedDraft = { ...tripData, isSubmissionPending: false };
                localStorage.setItem('pendingCustomTrip', JSON.stringify(updatedDraft));
              }
            });
          } else if (tripData.isDraft) {
            // Ask user if they want to continue with draft
            Modal.confirm({
              title: 'Continue with draft?',
              content: 'We found a previously saved trip draft. Would you like to continue where you left off?',
              okText: 'Continue Draft',
              cancelText: 'Start New Trip',
              onOk() {
                try {
                  setFormData(tripData);
                  setHasPendingTrip(true);
                  if (form) {
                    form.setFieldsValue(tripData);
                  }
                } catch (error) {
                  console.error('Error loading draft:', error);
                  message.error('Error loading draft. Starting a new trip.');
                  localStorage.removeItem('pendingCustomTrip');
                }
              },
              onCancel() {
                // Clear the draft if user wants to start fresh
                localStorage.removeItem('pendingCustomTrip');
              }
            });
          }
        }
      } catch (error) {
        console.error('Error processing draft data:', error);
        localStorage.removeItem('pendingCustomTrip');
      }
    };

    loadDraft();
    
    // Clean up function to clear draft if component unmounts
    return () => {
      const pendingTrip = localStorage.getItem('pendingCustomTrip');
      if (pendingTrip) {
        try {
          const tripData = JSON.parse(pendingTrip);
          if (tripData.isDraft) {
            // Update the last saved time when navigating away
            const updatedTrip = { ...tripData, lastSaved: new Date().toISOString() };
            localStorage.setItem('pendingCustomTrip', JSON.stringify(updatedTrip));
          }
        } catch (error) {
          console.error('Error saving draft:', error);
        }
      }
    };
  }, [form]);

  // Form steps configuration
  const steps = [
    { title: 'Trek Details', icon: <EnvironmentOutlined /> },
    { title: 'Group & Experience', icon: <TeamOutlined /> },
    { title: 'Accommodation & Meals', icon: <HomeOutlined /> },
    { title: 'Services & Transport', icon: <CarOutlined /> },
    { title: 'Budget & Dates', icon: <DollarOutlined /> },
    { title: 'Review & Submit', icon: <CheckOutlined /> }
  ];

  // Calculate end date based on start date and duration
  const calculateEndDate = (startDate, duration) => {
    if (!startDate) return null;
    return dayjs(startDate).add(duration - 1, 'day');
  };

  // Handle form field changes
  const handleInputChange = (name, value) => {
    // Update the form field value
    if (form) {
      form.setFieldsValue({ [name]: value });
    }
    // Special handling for fields that affect other fields
    if (name === 'startDate' || name === 'duration') {
      const newFormData = { ...formData, [name]: value };
      if (name === 'startDate' && formData.duration) {
        newFormData.endDate = calculateEndDate(value, formData.duration);
      } else if (name === 'duration' && formData.startDate) {
        newFormData.endDate = calculateEndDate(formData.startDate, value);
      }
      setFormData(newFormData);
    } else if (name === 'budgetRange') {
      const range = budgetRanges.find(r => r.value === value);
      setFormData(prev => ({
        ...prev,
        budgetRange: value,
        budgetAmount: Math.round((range.min + range.max) / 2) // Set to middle of range
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle nested object updates
  const handleNestedChange = (parent, name, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [name]: value
      }
    }));
  };

  useEffect(() => {
    const fetchDestinations = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_BASE}/api/listing`);
        if (response.data.success) {
          const dbDestinations = response.data.data.map(listing => ({
            value: listing.title, // Use title as value for backend lookup
            label: listing.title,
            duration: listing.duration,
          }));

          // Combine with "Custom Route" option
          setDestinations([...dbDestinations, { value: 'custom', label: 'Custom Route' }]);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        // Fallback to static list if API fails
        const staticDestinations = popularTreks.map(trek => ({
          value: trek.value,
          label: trek.label,
        }));
        setDestinations(staticDestinations);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const nextStep = async () => {
    try {
      // Define fields to validate for each step
      const stepFields = {
        0: ['destination', 'customDestination'],
        1: ['groupSize', 'groupType', 'ageRange', 'experienceLevel', 'fitnessLevel'],
        2: ['accommodation', 'mealPreferences'],
        3: ['transportation'], // checkboxes typically default to false if unchecked
        4: ['budgetRange', 'startDate', 'duration', 'customDuration']
      };

      // Get fields for current step
      const currentFields = stepFields[currentStep] || [];

      // Update form data with current values before validation to ensure everything is synced
      if (form) {
        const currentValues = form.getFieldsValue(true);
        setFormData(prev => ({
          ...prev,
          ...currentValues,
          contactInfo: {
            ...prev.contactInfo,
            ...(currentValues.contactInfo || {})
          }
        }));
      }

      // Validate only the fields for the current step
      await form.validateFields(currentFields);

      // Additional custom validation/checks if needed
      if (currentStep === 0) {
        const values = form.getFieldsValue();
        if (values.destination === 'custom' && !values.customDestination) {
          // Redundant if caught by rules, but safe.
        }
      }

      // Proceed to next step
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.log('Validation failed:', error);
      message.error('Please fill in all required fields before proceeding');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Check if user is logged in
      const token = localStorage.getItem('token');
      if (!token) {
        // Save form data to localStorage before redirecting
        const formValues = form.getFieldsValue(true);
        const pendingTrip = {
          ...formData,
          ...formValues,
          isDraft: true,
          lastSaved: new Date().toISOString()
        };
        localStorage.setItem('pendingCustomTrip', JSON.stringify(pendingTrip));
        
        // Redirect to login with redirect URL
        message.info('Please login to submit your custom trip');
        navigate('/auth?redirect=/custom-trip');
        return;
      }
      
      setLoading(true);
      
      try {
        // Get form values
        const values = await form.validateFields();
        const tripData = { ...formData, ...values };
        
        // Save to database
        await axios.post('/api/trips/custom', tripData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Clear any pending trip data
        localStorage.removeItem('pendingCustomTrip');
        
        // Mark as submitted and show success message
        setFormSubmitted(true);
        message.success('Your custom trip has been submitted successfully!');
        
        // Redirect to profile page after a short delay
        setTimeout(() => {
          navigate('/profile');
        }, 3000);
        
      } catch (apiError) {
        console.error('API Error:', apiError);
        const errorMessage = apiError.response?.data?.message || 'Failed to submit your request. Please try again.';

        if (apiError.response?.status === 401) {
          // Token expired or invalid - redirect to login
          message.error('Your session has expired. Please sign in again.');
          navigate('/login', { state: { from: 'custom-trip' } });
        } else {
          message.error(errorMessage);
        }
      }
    } catch (error) {
      console.error('Error in form submission:', error);
      message.error(error.message || 'Failed to submit your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Render the current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <TrekDetailsStep
            formData={formData}
            onInputChange={handleInputChange}
            popularTreks={popularTreks}
            destinations={destinations}
          />
        );
      case 1:
        return (
          <GroupExperienceStep
            formData={formData}
            onInputChange={handleInputChange}
            groupTypes={groupTypes}
            experienceLevels={experienceLevels}
            fitnessLevels={fitnessLevels}
          />
        );
      case 2:
        return (
          <AccommodationMealsStep
            formData={formData}
            onInputChange={handleInputChange}
            accommodationTypes={accommodationTypes}
            mealPreferences={mealPreferences}
          />
        );
      case 3:
        return (
          <ServicesTransportStep
            formData={formData}
            onInputChange={handleInputChange}
            transportOptions={transportOptions}
          />
        );
      case 4:
        return (
          <BudgetDatesStep
            formData={formData}
            onInputChange={handleInputChange}
            budgetRanges={budgetRanges}
          />
        );
      case 5:
        return (
          <ReviewSubmitStep
            formData={formData}
            onPrevious={prevStep}
            onSubmit={handleSubmit}
            loading={loading}
            popularTreks={popularTreks}
            destinations={destinations}
            groupTypes={groupTypes}
            experienceLevels={experienceLevels}
            fitnessLevels={fitnessLevels}
            accommodationTypes={accommodationTypes}
            budgetRanges={budgetRanges}
          />
        );
      default:
        return null;
    }
  };


  if (formSubmitted) {
    return (
      <div className="custom-trip-container">
        <Result
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title="Your Trekking Request Has Been Submitted!"
          subTitle={
            <>
              <p>Thank you for choosing JumaTrek for your adventure!</p>
              <p>We've received your request and our team will contact you within 24 hours to finalize your trekking plan.</p>
              <p>You'll be redirected to the homepage shortly, or <a href="/">click here</a> to return now.</p>
            </>
          }
          extra={[
            <Button type="primary" key="home" onClick={() => navigate('/')}>
              Back to Home
            </Button>,
            <Button key="contact" onClick={() => window.location.href = 'mailto:info@jumatrek.com'}>
              Contact Us
            </Button>,
          ]}
        />
      </div>
    );
  }

  // Update form values when formData changes
  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        ...formData,
        contactInfo: {
          ...formData.contactInfo,
          emergencyContact: {
            ...(formData.contactInfo?.emergencyContact || {})
          }
        }
      });
    }
  }, [formData, form]);

  return (
    <div className="custom-trip-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="custom-trip-header"
      >
        <h1>Customize Your Dream Trek</h1>
        <p>Fill out the form below to create your perfect trekking experience in the Himalayas</p>
      </motion.div>

      <div className="custom-trip-steps">
        <Steps
          current={currentStep}
          responsive={true}
          items={steps.map(item => ({
            key: item.title,
            title: item.title,
            icon: item.icon,
            disabled: loading
          }))}
        />
      </div>

      <div className="custom-trip-form">
        <Spin spinning={loading} tip="Processing...">
          <Form
            layout="vertical"
            form={form}
            onFinish={currentStep === steps.length - 1 ? handleSubmit : nextStep}
            initialValues={formData}
          >
            {renderStepContent()}

            {currentStep < steps.length - 1 && (
              <div className="form-navigation">
                {currentStep > 0 && (
                  <Button
                    onClick={prevStep}
                    style={{ marginRight: 8 }}
                    icon={<ArrowLeftOutlined />}
                    disabled={loading}
                  >
                    Previous
                  </Button>
                )}

                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<ArrowRightOutlined />}
                  loading={loading}
                >
                  {currentStep === steps.length - 2 ? 'Review & Submit' : 'Next'}
                </Button>
              </div>
            )}
          </Form>
        </Spin>
      </div>

      <div className="custom-trip-info">
        <div className="info-card">
          <StarOutlined className="info-icon" />
          <h4>Why Choose Us?</h4>
          <p>Local expertise, experienced guides, and 100% customizable treks tailored to your preferences.</p>
        </div>
        <div className="info-card">
          <SafetyOutlined className="info-icon" />
          <h4>Safety First</h4>
          <p>Certified guides, proper equipment, and emergency protocols for a safe adventure.</p>
        </div>
        <div className="info-card">
          <HeartOutlined className="info-icon" />
          <h4>Sustainable Tourism</h4>
          <p>We're committed to responsible travel that benefits local communities.</p>
        </div>
      </div>

      <div className="custom-trip-support">
        <Alert
          message="Need help?"
          description={
            <>
              Our trekking experts are here to assist you. <br />
              Call us at <a href="tel:+977-1-1234567">+977-1-1234567</a> or email <a href="mailto:info@jumatrek.com">info@jumatrek.com</a>
            </>
          }
          type="info"
          showIcon
          icon={<SmileOutlined />}
        />
      </div>
    </div>
  );
};

export default CustomTrip;
