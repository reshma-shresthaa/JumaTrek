import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Space, 
  Tag, 
  Input, 
  Select, 
  Card, 
  Row, 
  Col, 
  Popconfirm, 
  message, 
  Badge,
  Tooltip,
  Switch
} from 'antd';
import { 
  PlusOutlined, 
  SearchOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  EyeOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Search } = Input;
const { Option } = Select;

const TreksList = () => {
  const [loading, setLoading] = useState(false);
  const [treks, setTreks] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    difficulty: 'all',
    region: 'all',
  });
  const navigate = useNavigate();

  // Mock data - replace with API call
  useEffect(() => {
    fetchTreks();
  }, [pagination.current, filters]);

  const fetchTreks = async () => {
    setLoading(true);
    try {
      // Simulate API call
      setTimeout(() => {
        const mockTreks = [
          {
            id: '1',
            title: 'Everest Base Camp Trek',
            region: 'Everest',
            difficulty: 'Challenging',
            duration: '14 days',
            price: 1500,
            status: 'active',
            featured: true,
            bookings: 24,
            rating: 4.8,
            createdAt: '2025-01-10',
          },
          {
            id: '2',
            title: 'Annapurna Circuit',
            region: 'Annapurna',
            difficulty: 'Moderate',
            duration: '18 days',
            price: 1250,
            status: 'active',
            featured: true,
            bookings: 18,
            rating: 4.9,
            createdAt: '2025-01-15',
          },
          {
            id: '3',
            title: 'Langtang Valley Trek',
            region: 'Langtang',
            difficulty: 'Easy',
            duration: '10 days',
            price: 850,
            status: 'draft',
            featured: false,
            bookings: 8,
            rating: 4.5,
            createdAt: '2025-01-20',
          },
          // Add more mock data as needed
        ];

        // Apply filters
        let filteredTreks = [...mockTreks];
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredTreks = filteredTreks.filter(trek => 
            trek.title.toLowerCase().includes(searchLower) ||
            trek.region.toLowerCase().includes(searchLower)
          );
        }
        
        if (filters.status !== 'all') {
          filteredTreks = filteredTreks.filter(trek => trek.status === filters.status);
        }
        
        if (filters.difficulty !== 'all') {
          filteredTreks = filteredTreks.filter(trek => trek.difficulty === filters.difficulty);
        }
        
        if (filters.region !== 'all') {
          filteredTreks = filteredTreks.filter(trek => trek.region === filters.region);
        }

        setTreks(filteredTreks);
        setPagination({
          ...pagination,
          total: filteredTreks.length,
        });
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error fetching treks:', error);
      message.error('Failed to load treks');
      setLoading(false);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setPagination(pagination);
  };

  const handleSearch = (value) => {
    setFilters({
      ...filters,
      search: value,
    });
    setPagination({
      ...pagination,
      current: 1, // Reset to first page on new search
    });
  };

  const handleFilterChange = (key, value) => {
    setFilters({
      ...filters,
      [key]: value,
    });
    setPagination({
      ...pagination,
      current: 1, // Reset to first page on filter change
    });
  };

  const handleDelete = (id) => {
    // Handle delete logic
    message.success('Trek deleted successfully');
    fetchTreks();
  };

  const handleStatusChange = (id, checked) => {
    // Handle status change logic
    const newStatus = checked ? 'active' : 'inactive';
    message.success(`Trek status updated to ${newStatus}`);
    fetchTreks();
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <>
          <Link to={`/admin/treks/${record.id}`} className="font-medium">
            {text}
          </Link>
          {record.featured && (
            <Tag color="gold" style={{ marginLeft: 8 }}>Featured</Tag>
          )}
        </>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Region',
      dataIndex: 'region',
      key: 'region',
      sorter: (a, b) => a.region.localeCompare(b.region),
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      render: (difficulty) => {
        let color = 'default';
        if (difficulty === 'Easy') color = 'green';
        if (difficulty === 'Moderate') color = 'orange';
        if (difficulty === 'Challenging') color = 'red';
        
        return <Tag color={color}>{difficulty}</Tag>;
      },
      sorter: (a, b) => a.difficulty.localeCompare(b.difficulty),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Bookings',
      dataIndex: 'bookings',
      key: 'bookings',
      sorter: (a, b) => a.bookings - b.bookings,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <span className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          {rating}
        </span>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status, record) => (
        <Switch 
          checked={status === 'active'}
          onChange={(checked) => handleStatusChange(record.id, checked)}
          checkedChildren="Active"
          unCheckedChildren="Inactive"
        />
      ),
      filters: [
        { text: 'Active', value: 'active' },
        { text: 'Draft', value: 'draft' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Link to={`/admin/treks/${record.id}`}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/admin/treks/edit/${record.id}`}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this trek?"
              onConfirm={() => handleDelete(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="treks-list">
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Manage Treks</h2>
        <p className="text-gray-500">View and manage all treks in the system</p>
      </div>

      <Card className="mb-6">
        <Row gutter={[16, 16]} className="mb-4">
          <Col xs={24} md={8}>
            <Search
              placeholder="Search treks..."
              allowClear
              enterButton={
                <Button type="primary">
                  <SearchOutlined />
                </Button>
              }
              onSearch={handleSearch}
              className="w-full"
            />
          </Col>
          <Col xs={24} md={16} className="flex flex-wrap gap-2 justify-end">
            <Select
              placeholder="Filter by status"
              className="w-full md:w-40"
              value={filters.status}
              onChange={(value) => handleFilterChange('status', value)}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Status</Option>
              <Option value="active">Active</Option>
              <Option value="draft">Draft</Option>
              <Option value="archived">Archived</Option>
            </Select>
            
            <Select
              placeholder="Filter by difficulty"
              className="w-full md:w-40"
              value={filters.difficulty}
              onChange={(value) => handleFilterChange('difficulty', value)}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Levels</Option>
              <Option value="Easy">Easy</Option>
              <Option value="Moderate">Moderate</Option>
              <Option value="Challenging">Challenging</Option>
            </Select>
            
            <Select
              placeholder="Filter by region"
              className="w-full md:w-40"
              value={filters.region}
              onChange={(value) => handleFilterChange('region', value)}
              suffixIcon={<FilterOutlined />}
            >
              <Option value="all">All Regions</Option>
              <Option value="Everest">Everest</Option>
              <Option value="Annapurna">Annapurna</Option>
              <Option value="Langtang">Langtang</Option>
              <Option value="Manaslu">Manaslu</Option>
              <Option value="Mustang">Mustang</Option>
            </Select>
            
            <Button 
              type="default" 
              icon={<ReloadOutlined />} 
              onClick={() => {
                setFilters({
                  search: '',
                  status: 'all',
                  difficulty: 'all',
                  region: 'all',
                });
              }}
            >
              Reset
            </Button>
            
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
              onClick={() => navigate('/admin/treks/add')}
            >
              Add New Trek
            </Button>
          </Col>
        </Row>

        <Table
          columns={columns}
          dataSource={treks}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            pageSizeOptions: ['10', '25', '50', '100'],
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} treks`,
          }}
          onChange={handleTableChange}
          scroll={{ x: true }}
        />
      </Card>
    </div>
  );
};

export default TreksList;
