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
  message,
} from 'antd';
import {
  UserOutlined,
  LockOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

import { adminService } from '../../services/adminApi';

const { Title, Text } = Typography;

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError('');

    try {
      console.log('Attempting admin login:', values.email);

      const response = await adminService.login(
        values.email,
        values.password
      );

      console.log('Login response:', response);

      if (response?.success && response?.user?.role === 'Admin') {
        message.success('Login successful!');
        // Use window.location.href for a full page reload to ensure proper state initialization
        window.location.href = '/admin';
      } else {
        setError('Access denied. Admin privileges required.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(
        typeof err === 'string' ? err : 'An error occurred during login. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '20px',
      }}
    >
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ marginBottom: '8px', color: '#1890ff' }}>
            JumaTrek Admin
          </Title>
          <Text type="secondary">Sign in to your admin account</Text>
        </div>

        <Card
          style={{
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            border: 'none',
          }}
        >
          <Button
            type="text"
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate('/')}
          >
            Back to Home
          </Button>

          {/* Error message */}
          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              closable
              style={{ marginTop: '16px' }}
              onClose={() => setError('')}
            />
          )}

          {/* Login Form */}
          <Form
            name="admin-login"
            layout="vertical"
            onFinish={onFinish}
            size="large"
            style={{ marginTop: '24px' }}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Email"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                autoComplete="current-password"
              />
            </Form.Item>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link to="/admin/forgot-password">Forgot password?</Link>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={loading}
              >
                Sign in
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or</Divider>

          <div style={{ textAlign: 'center' }}>
            <Text type="secondary">
              Having trouble?{' '}
              <Link to="/admin/contact-support">Contact support</Link>
            </Text>
          </div>
        </Card>

        {/* Footer */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '12px',
            color: '#888',
          }}
        >
          © {new Date().getFullYear()} JumaTrek. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
