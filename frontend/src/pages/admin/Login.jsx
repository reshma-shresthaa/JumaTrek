import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography, 
  Alert, 
  Divider, 
  Checkbox,
  message
} from 'antd';
import { 
  UserOutlined, 
  LockOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - replace with actual API call
      if (values.username === 'admin' && values.password === 'admin123') {
        // In a real app, you would store the token in localStorage or httpOnly cookie
        localStorage.setItem('adminToken', 'dummy-jwt-token');
        message.success('Login successful!');
        navigate('/admin');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f2f5',
      padding: '20px',
      backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px', color: '#1890ff' }}>
            JumaTrek Admin
          </Title>
          <Text type="secondary" style={{ fontSize: '16px' }}>
            Sign in to your admin account
          </Text>
        </div>

        <Card 
          className="shadow-lg"
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: 'none'
          }}
        >
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>
          
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className="mb-6" 
              closable 
              onClose={() => setError('')}
            />
          )}
          
          <Form
            name="login"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            style={{
              marginTop: '24px'
            }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Username" 
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                type="password"
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px'
          }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/admin/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <Form.Item className="mt-6">
              <Button 
                type="primary" 
                htmlType="submit" 
                className="w-full" 
                size="large"
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>
          
          <Divider style={{ margin: '24px 0' }}>Or</Divider>
          
          <div style={{ textAlign: 'center' }}>
            <Text type="secondary" style={{ fontSize: '14px' }}>
              Having trouble signing in?{' '}
              <Link to="/admin/contact-support" style={{ color: '#1890ff' }}>
                Contact support
              </Link>
            </Text>
          </div>
        </Card>
        
        <div style={{
          textAlign: 'center',
          marginTop: '32px',
          padding: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <Text type="secondary" style={{ fontSize: '12px' }}>
            © {new Date().getFullYear()} JumaTrek. All rights reserved.
          </Text>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
