import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Progress, Button } from 'antd';
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

  const [recentBookings, setRecentBookings] = useState([]);
  const [recentUsers, setRecentUsers] = useState([]);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      try {
        // Mock data
        setStats({
          totalUsers: 1245,
          totalTreks: 28,
          totalBookings: 324,
          activeGuides: 15,
          revenue: 45230,
          conversionRate: 68,
        });

        setRecentBookings([
          {
            id: 'BK001',
            trek: 'Everest Base Camp',
            user: 'John Doe',
            date: '2025-01-15',
            status: 'confirmed',
            amount: 1500,
          },
          {
            id: 'BK002',
            trek: 'Annapurna Circuit',
            user: 'Jane Smith',
            date: '2025-01-14',
            status: 'pending',
            amount: 1250,
          },
          {
            id: 'BK003',
            trek: 'Langtang Valley',
            user: 'Robert Johnson',
            date: '2025-01-13',
            status: 'cancelled',
            amount: 980,
          },
          {
            id: 'BK004',
            trek: 'Manaslu Circuit',
            user: 'Emily Davis',
            date: '2025-01-12',
            status: 'confirmed',
            amount: 1350,
          },
          {
            id: 'BK005',
            trek: 'Upper Mustang',
            user: 'Michael Brown',
            date: '2025-01-11',
            status: 'completed',
            amount: 1750,
          },
        ]);

        setRecentUsers([
          { id: 1, name: 'John Doe', email: 'john@example.com', joinDate: '2025-01-10' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', joinDate: '2025-01-09' },
          { id: 3, name: 'Robert Johnson', email: 'robert@example.com', joinDate: '2025-01-08' },
          { id: 4, name: 'Emily Davis', email: 'emily@example.com', joinDate: '2025-01-07' },
          { id: 5, name: 'Michael Brown', email: 'michael@example.com', joinDate: '2025-01-06' },
        ]);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // Chart data
  const revenueData = [
    { month: 'Jan', value: 12000 },
    { month: 'Feb', value: 15000 },
    { month: 'Mar', value: 18000 },
    { month: 'Apr', value: 25000 },
    { month: 'May', value: 32000 },
    { month: 'Jun', value: 40000 },
    { month: 'Jul', value: 50000 },
  ];

  const trekDistributionData = [
    { type: 'Everest Region', value: 35 },
    { type: 'Annapurna Region', value: 25 },
    { type: 'Langtang Region', value: 20 },
    { type: 'Manaslu Region', value: 15 },
    { type: 'Other Regions', value: 5 },
  ];

  const configRevenue = {
    data: revenueData,
    xField: 'month',
    yField: 'value',
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

  const configTrekDistribution = {
    appendPadding: 10,
    data: trekDistributionData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'element-active',
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        <h2>Dashboard</h2>
        <div>
          <Button type="primary" icon={<ReloadOutlined />} onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
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
              <Progress percent={65} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>+120 from last month</div>
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
              <Progress percent={45} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>+5 from last month</div>
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
              <Progress percent={78} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>+24 from last month</div>
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
              <Progress percent={90} size="small" status="active" showInfo={false} />
              <div style={{ fontSize: '12px', color: '#8c8c8c' }}>+3 from last month</div>
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
          <Card title="Trek Distribution">
            <div style={{ height: '300px' }}>
              <Pie {...configTrekDistribution} />
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
