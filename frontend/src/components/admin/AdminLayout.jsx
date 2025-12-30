import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, Avatar, Dropdown, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  TeamOutlined,
  PictureOutlined,
  BookOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
          label: 'Logout',
          icon: <LogoutOutlined />,
          onClick: handleLogout,
        },
      ]}
    />
  );

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
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: '2',
              icon: <BookOutlined />,
              label: 'Treks',
              children: [
                { key: '2-1', label: <Link to="/admin/treks">All Treks</Link> },
                { key: '2-2', label: <Link to="/admin/treks/add">Add New Trek</Link> },
                { key: '2-3', label: <Link to="/admin/trek-categories">Categories</Link> },
                { key: '2-4', label: <Link to="/admin/trek-regions">Regions</Link> },
              ],
            },
            {
              key: '3',
              icon: <UserOutlined />,
              label: 'Users',
              children: [
                { key: '3-1', label: <Link to="/admin/users">All Users</Link> },
                { key: '3-2', label: <Link to="/admin/users/add">Add New User</Link> },
                { key: '3-3', label: <Link to="/admin/user-roles">User Roles</Link> },
              ],
            },
            {
              key: '4',
              icon: <TeamOutlined />,
              label: 'Guides',
              children: [
                { key: '4-1', label: <Link to="/admin/guides">All Guides</Link> },
                { key: '4-2', label: <Link to="/admin/guides/add">Add Guide</Link> },
              ],
            },
            {
              key: '5',
              icon: <PictureOutlined />,
              label: 'Media',
              children: [
                { key: '5-1', label: <Link to="/admin/media">Media Library</Link> },
                { key: '5-2', label: <Link to="/admin/media/upload">Upload</Link> },
              ],
            },
            {
              key: '6',
              icon: <MessageOutlined />,
              label: 'Messages',
              children: [
                { key: '6-1', label: <Link to="/admin/messages">Inbox</Link> },
                { key: '6-2', label: <Link to="/admin/contact-forms">Contact Forms</Link> },
              ],
            },
            {
              key: '7',
              icon: <SettingOutlined />,
              label: 'Settings',
              children: [
                { key: '7-1', label: <Link to="/admin/settings/general">General</Link> },
                { key: '7-2', label: <Link to="/admin/settings/seo">SEO</Link> },
                { key: '7-3', label: <Link to="/admin/settings/email">Email</Link> },
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
            style: { fontSize: '18px', padding: '0 24px' },
          })}
          <div style={{ marginRight: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" target="_blank" style={{ marginRight: '16px' }}>
              <HomeOutlined style={{ fontSize: '18px' }} /> View Site
            </Link>
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                <span>Admin User</span>
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
