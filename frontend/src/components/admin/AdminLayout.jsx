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
  HomeOutlined
} from '@ant-design/icons';
import { adminService } from '../../services/adminApi';

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
    // Check if user is authenticated
    const admin = adminService.getCurrentAdmin();
    if (!admin) {
      navigate('/admin/login', { replace: true });
      return;
    }
    setAdminUser(admin);
  }, [navigate]);

  const handleLogout = () => {
    adminService.logout();
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
      <Sider trigger={null} collapsible collapsed={collapsed} width={250}>
        <div className="logo" style={{ height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h2 style={{ color: 'white', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden' }}>
            {collapsed ? 'JT' : 'JumaTrek Admin'}
          </h2>
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
      <Layout className="site-layout">
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
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>{adminUser?.name || 'Admin User'}</span>
              </Space>
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
