import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Button, message } from 'antd';
import { 
  UserOutlined, 
  BookOutlined, 
  TeamOutlined, 
  DollarOutlined, 
  ClockCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  ReloadOutlined,
  CalendarOutlined,
  MessageOutlined
} from '@ant-design/icons';
import { Line, Pie } from '@ant-design/charts';
import { Link } from 'react-router-dom';
import { adminService } from '../../services/adminApi';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTreks: 0,
    totalBookings: 0,
    activeGuides: 0,
    revenue: 0,
    conversionRate: 0,
  });

  const [revenueData, setRevenueData] = useState([
    { month: 'Jan', revenue: 0 },
    { month: 'Feb', revenue: 0 },
    { month: 'Mar', revenue: 0 },
    { month: 'Apr', revenue: 0 },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
  ]);

  const [bookingStatusData, setBookingStatusData] = useState([
    { type: 'Confirmed', value: 0 },
    { type: 'Pending', value: 0 },
    { type: 'Cancelled', value: 0 },
  ]);

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  // Fetch real data from the backend
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch dashboard stats
      const statsResponse = await adminService.getDashboardStats();
      if (statsResponse.success) {
        setStats({
          totalUsers: statsResponse.data.totalUsers || 0,
          totalTreks: statsResponse.data.totalListings || 0,
          totalBookings: statsResponse.data.totalBookings || 0,
          activeGuides: statsResponse.data.totalAdmins || 0, // Assuming admins are guides for now
          revenue: 0, // This would come from a different endpoint
          conversionRate: statsResponse.data.totalBookings > 0 ? 
            Math.round((statsResponse.data.confirmedBookings / statsResponse.data.totalBookings) * 100) : 0,
        });

        // Update booking status data for the pie chart
        setBookingStatusData([
          { type: 'Confirmed', value: statsResponse.data.confirmedBookings || 0 },
          { type: 'Pending', value: statsResponse.data.pendingBookings || 0 },
          { type: 'Cancelled', value: (statsResponse.data.totalBookings - statsResponse.data.confirmedBookings - statsResponse.data.pendingBookings) || 0 },
        ]);
      }

      // Fetch recent bookings
      const bookingsResponse = await adminService.getAllBookings({
        limit: 5,
        sort: '-createdAt'
      });
      
      if (bookingsResponse.success) {
        setRecentBookings(bookingsResponse.data.map(booking => ({
          id: booking._id,
          trek: booking.trek?.name || 'N/A',
          user: booking.user?.name || 'Guest User',
          date: booking.createdAt ? new Date(booking.createdAt).toLocaleDateString() : 'N/A',
          status: booking.status || 'pending',
          amount: booking.totalAmount || 0,
        })));
      }

      // Fetch recent users
      const usersResponse = await adminService.getAllUsers({
        limit: 5,
        sort: '-createdAt'
      });
      
      if (usersResponse.success) {
        setRecentUsers(usersResponse.data.map(user => ({
          id: user._id,
          name: user.name || 'User',
          email: user.email || 'No email',
          joinDate: user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A',
        })));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      message.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Function to handle refresh
  const handleRefresh = () => {
    fetchDashboardData();
  };

  const bookingColumns = [
    {
      title: 'Booking ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Trek',
      dataIndex: 'trek',
      key: 'trek',
      render: (text) => <Link to={`/admin/treks/${text.toLowerCase().replace(/\s+/g, '-')}`}>{text}</Link>,
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusMap = {
          confirmed: { color: 'green', text: 'Confirmed' },
          pending: { color: 'orange', text: 'Pending' },
          cancelled: { color: 'red', text: 'Cancelled' },
          completed: { color: 'blue', text: 'Completed' },
        };
        const statusInfo = statusMap[status] || { color: 'default', text: status };
        return <Tag color={statusInfo.color}>{statusInfo.text}</Tag>;
      },
    },
  ];

  const userColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Link to={`/admin/users/${text.toLowerCase().replace(/\s+/g, '-')}`}>{text}</Link>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
  ];

  const configRevenue = {
    data: revenueData,
    xField: 'month',
    yField: 'revenue',
    point: {
      size: 5,
      shape: 'diamond',
    },
    label: {
      style: {
        fill: '#aaa',
      },
    },
  };

  const configBookingStatus = {
    appendPadding: 10,
    data: bookingStatusData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    color: ['#52c41a', '#faad14', '#ff4d4f'], // green, orange, red
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{ 
        marginBottom: '24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <Button 
          type="primary" 
          icon={<ReloadOutlined />} 
          onClick={handleRefresh}
        >
          Refresh
        </Button>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.totalUsers}
              prefix={<UserOutlined />}
              suffix={
                <Tag color="green" style={{ marginLeft: '8px' }}>
                  <ArrowUpOutlined /> 12%
                </Tag>
              }
            />
            <div style={{ marginTop: '8px' }}>
              <Progress percent={100} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Total registered users</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Treks"
              value={stats.totalTreks}
              prefix={<BookOutlined />}
            />
            <div style={{ marginTop: '8px' }}>
              <Progress percent={100} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Total treks available</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Bookings"
              value={stats.totalBookings}
              prefix={<CalendarOutlined />}
              suffix={
                <Tag color="red" style={{ marginLeft: '8px' }}>
                  <ArrowDownOutlined /> 5%
                </Tag>
              }
            />
            <div style={{ marginTop: '8px' }}>
              <Progress percent={stats.conversionRate || 0} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>{stats.conversionRate}% booking conversion rate</div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Guides"
              value={stats.activeGuides}
              prefix={<TeamOutlined />}
            />
            <div style={{ marginTop: '8px' }}>
              <Progress percent={100} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>Active team members</div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Revenue and Distribution */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} md={16}>
          <Card 
            title="Revenue Overview" 
            extra={
              <div>
                <Button type="link" size="small">Week</Button>
                <Button type="link" size="small">Month</Button>
                <Button type="link" size="small">Year</Button>
              </div>
            }
          >
            <div style={{ height: '300px' }}>
              <Line {...configRevenue} />
            </div>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Booking Status">
            <div style={{ height: '300px' }}>
              <Pie {...configBookingStatus} />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Recent Activities */}
      <Row gutter={[16, 16]}>
        <Col xs={24} md={16}>
          <Card 
            title="Recent Bookings" 
            extra={<Link to="/admin/bookings">View All</Link>}
          >
            <Table 
              columns={bookingColumns} 
              dataSource={recentBookings} 
              size="small" 
              pagination={{ pageSize: 5 }}
              rowKey="id"
            />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card 
            title="Recent Users" 
            extra={<Link to="/admin/users">View All</Link>}
          >
            <Table 
              columns={userColumns} 
              dataSource={recentUsers} 
              size="small" 
              pagination={{ pageSize: 5 }}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

    </div>
  );
};

export default Dashboard;