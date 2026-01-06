import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, theme, Avatar, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  MessageOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  SolutionOutlined
} from '@ant-design/icons';
import { adminService } from '../../services/adminApi';
import logo from '../../assets/images/logo.png';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    // Get admin user from localStorage
    const admin = adminService.getCurrentAdmin();
    if (admin) {
      setAdminUser(admin);
    }
  }, []);

  const handleLogout = () => {
    adminService.logout();
    navigate('/admin/login');
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: 'Logout',
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    const path = location.pathname;
    if (path === '/admin' || path === '/admin/') return '1';
    if (path.includes('/admin/custom-requests')) return 'custom-requests-list';
    if (path.includes('/admin/treks')) return '2';
    if (path.includes('/admin/users')) return '3';
    if (path.includes('/admin/bookings')) return '4';
    if (path.includes('/admin/guides')) return '5';
    if (path.includes('/admin/blogs')) return '6';
    if (path.includes('/admin/messages')) return '7';
    return '1';
  };

  // Get open keys for submenu
  const getOpenKeys = () => {
    const path = location.pathname;
    const openKeys = [];
    if (path.includes('/admin/custom-requests')) openKeys.push('custom-requests');
    if (path.includes('/admin/treks')) openKeys.push('treks');
    if (path.includes('/admin/users')) openKeys.push('users');
    if (path.includes('/admin/bookings')) openKeys.push('bookings');
    if (path.includes('/admin/guides')) openKeys.push('guides');
    if (path.includes('/admin/blogs')) openKeys.push('blogs');
    if (path.includes('/admin/messages')) openKeys.push('messages');
    return openKeys;
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={250}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1,
          boxShadow: '2px 0 8px 0 rgba(0, 0, 0, 0.15)'
        }}
      >
        <div style={{
          height: '64px',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#001529',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            justifyContent: collapsed ? 'center' : 'flex-start',
            overflow: 'hidden'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              width: '40px',
              height: '40px',
              borderRadius: '5px',
              overflow: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}>
              <img
                src={logo}
                alt="JumaTrek"
                style={{
                  width: '36px',
                  height: '36px',
                  objectFit: 'contain',
                  display: 'block',
                  borderRadius: '3px'
                }}
              />
            </div>
            {!collapsed && (
              <span style={{
                color: 'white',
                fontSize: '16px',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                opacity: 0.9,
                letterSpacing: '0.5px',
                marginLeft: '4px',
                textOverflow: 'ellipsis',
                overflow: 'hidden'
              }}>
                JumaTrek Admin
              </span>
            )}
          </div>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          defaultOpenKeys={getOpenKeys()}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: 'custom-requests',
              icon: <SolutionOutlined />,
              label: 'Requests',
              children: [
                { key: 'custom-requests-list', label: <Link to="/admin/custom-requests">Custom Requests</Link> },
              ],
            },
            {
              key: 'treks',
              icon: <BookOutlined />,
              label: 'Treks',
              children: [
                { key: '2', label: <Link to="/admin/treks">All Treks</Link> },
                { key: '2-2', label: <Link to="/admin/treks/add">Add New Trek</Link> },
              ],
            },
            {
              key: 'users',
              icon: <UserOutlined />,
              label: 'Users',
              children: [
                { key: '3', label: <Link to="/admin/users">All Users</Link> },
              ],
            },
            {
              key: 'bookings',
              icon: <CalendarOutlined />,
              label: 'Bookings',
              children: [
                { key: '4', label: <Link to="/admin/bookings">All Bookings</Link> },
              ],
            },
            {
              key: 'guides',
              icon: <TeamOutlined />,
              label: 'Guides',
              children: [
                { key: '5', label: <Link to="/admin/guides">All Guides</Link> },
                { key: '5-2', label: <Link to="/admin/guides/add">Add Guide</Link> },
              ],
            },
            {
              key: 'blogs',
              icon: <FileTextOutlined />,
              label: 'Blogs',
              children: [
                { key: '6', label: <Link to="/admin/blogs">All Blogs</Link> },
                { key: '6-2', label: <Link to="/admin/blogs/add">Add Blog</Link> },
              ],
            },
            {
              key: 'messages',
              icon: <MessageOutlined />,
              label: 'Messages',
              children: [
                { key: '7', label: <Link to="/admin/messages">Inbox</Link> },
              ],
            },
          ]}
        />
      </Sider>
      <Layout
        className="site-layout"
        style={{
          marginLeft: collapsed ? 80 : 250,
          minHeight: '100vh',
          transition: 'all 0.2s'
        }}
      >
        <Header style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: '18px', padding: '0 24px', cursor: 'pointer' },
          })}
          <div style={{ marginRight: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" target="_blank" style={{ marginRight: '16px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <HomeOutlined style={{ fontSize: '18px' }} />
              <span>View Site</span>
            </Link>
            <Dropdown menu={{
              items: [
                {
                  key: 'logout',
                  label: 'Logout',
                  icon: <LogoutOutlined />,
                  onClick: handleLogout,
                },
              ]
            }} placement="bottomRight">
              <div style={{ cursor: 'pointer' }}>
                <Space>
                  <Avatar icon={<UserOutlined />} />
                  <span>{adminUser?.name || 'Admin User'}</span>
                </Space>
              </div>
            </Dropdown>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: '8px',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
