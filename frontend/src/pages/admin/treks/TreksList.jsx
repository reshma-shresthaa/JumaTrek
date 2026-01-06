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
import { adminService } from '../../../services/adminApi';

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
      const params = {
        page: pagination.current,
        limit: pagination.pageSize,
        region: filters.region !== 'all' ? filters.region : undefined,
        difficulty: filters.difficulty !== 'all' ? filters.difficulty : undefined,
        // Add search if needed, but the API might not support it directly
      };

      const response = await adminService.getAllListings(params);
      
      if (response.success) {
        // Apply client-side search filter if search is provided
        let filteredData = response.data;
        
        if (filters.search) {
          const searchLower = filters.search.toLowerCase();
          filteredData = response.data.filter(listing => 
            listing.title.toLowerCase().includes(searchLower) ||
            listing.region.toLowerCase().includes(searchLower) ||
            listing.description.toLowerCase().includes(searchLower)
          );
        }

        setTreks(filteredData);
        setPagination({
          ...pagination,
          total: filters.search ? filteredData.length : response.total,
          current: response.page,
        });
      } else {
        message.error('Failed to load treks');
      }
    } catch (error) {
      console.error('Error fetching treks:', error);
      message.error('Failed to load treks');
    } finally {
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

  const handleDelete = async (id) => {
    try {
      await adminService.deleteListing(id);
      message.success('Trek deleted successfully');
      fetchTreks();
    } catch (error) {
      message.error('Failed to delete trek');
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Link to={`/admin/treks/${record._id}`} className="font-medium">
          {text}
        </Link>
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
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => `${duration} days`,
      sorter: (a, b) => a.duration - b.duration,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Max Altitude',
      dataIndex: 'maxAltitude',
      key: 'maxAltitude',
      render: (altitude) => altitude || 'N/A',
    },
    {
      title: 'Created',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => new Date(date).toLocaleDateString(),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="View Details">
            <Link to={`/admin/treks/${record._id}`}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Edit">
            <Link to={`/admin/treks/edit/${record._id}`}>
              <Button type="text" icon={<EditOutlined />} />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure you want to delete this trek?"
              onConfirm={() => handleDelete(record._id)}
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
          rowKey="_id"
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
