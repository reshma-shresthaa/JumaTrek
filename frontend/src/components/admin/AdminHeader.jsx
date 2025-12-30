import React, { useState } from 'react';
import { Layout, Menu, Dropdown, Space, Avatar, Badge, Input, Button } from 'antd';
import {
  BellOutlined,
  SearchOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  QuestionCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Header } = Layout;

const AdminHeader = ({ collapsed, toggleCollapse }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const handleLogout = () => {
    // Handle logout logic
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: 'Profile',
          icon: <UserOutlined />,
        },
        {
          key: '2',
          label: 'Settings',
          icon: <SettingOutlined />,
        },
        {
          type: 'divider',
        },
        {
          key: '3',
          label: 'Help',
          icon: <QuestionCircleOutlined />,
        },
        {
          key: '4',
          label: 'Logout',
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );

  const notificationMenu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>New booking received</p>
              <small>5 minutes ago</small>
            </div>
          ),
        },
        {
          key: '2',
          label: (
            <div>
              <p style={{ margin: 0, fontWeight: 500 }}>New message from user</p>
              <small>1 hour ago</small>
            </div>
          ),
        },
        {
          key: '3',
          label: 'View all notifications',
          style: { textAlign: 'center', fontWeight: 500 },
        },
      ]}
    />
  );

  return (
    <Header 
      style={{
        padding: '0 24px',
        background: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
        position: 'sticky',
        top: 0,
        zIndex: 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: toggleCollapse,
          style: { fontSize: '18px', marginRight: '24px' },
        })}
        
        <div style={{ position: 'relative', width: '300px' }}>
          <Input
            placeholder="Search..."
            prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ borderRadius: '4px' }}
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/" target="_blank" style={{ marginRight: '8px' }}>
          <Button type="text" icon={<HomeOutlined />}>View Site</Button>
        </Link>
        
        <Dropdown overlay={notificationMenu} placement="bottomRight" trigger={['click']}>
          <Badge count={5} size="small">
            <Button 
              type="text" 
              icon={<BellOutlined style={{ fontSize: '18px' }} />} 
              style={{ width: '40px' }}
            />
          </Badge>
        </Dropdown>

        <Dropdown overlay={userMenu} placement="bottomRight" trigger={['click']}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'all 0.3s' }}>
            <Avatar 
              icon={<UserOutlined />} 
              style={{ backgroundColor: '#1890ff', marginRight: '8px' }}
            />
            <span style={{ fontWeight: 500 }}>Admin User</span>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default AdminHeader;
