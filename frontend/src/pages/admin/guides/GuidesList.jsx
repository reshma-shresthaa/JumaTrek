import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Card, message, Popconfirm, Switch, Avatar } from 'antd';
import { TeamOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';

const { Search } = Input;

const GuidesList = () => {
    const [loading, setLoading] = useState(false);
    const [guides, setGuides] = useState([]);
    const [filteredGuides, setFilteredGuides] = useState([]);
    const [searchText, setSearchText] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchGuides();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [searchText, guides]);

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const res = await adminService.getGuides();
            const data = res.data || [];
            setGuides(data);
            setFilteredGuides(data);
        } catch (error) {
            message.error(error || 'Failed to fetch guides');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...guides];

        if (searchText) {
            const searchLower = searchText.toLowerCase();
            filtered = filtered.filter(
                (guide) =>
                    guide.name.toLowerCase().includes(searchLower) ||
                    guide.specialization.some(s => s.toLowerCase().includes(searchLower)) ||
                    guide.languages.some(l => l.toLowerCase().includes(searchLower))
            );
        }

        setFilteredGuides(filtered);
    };

    const handleDelete = async (id, name) => {
        try {
            await adminService.deleteGuide(id);
            message.success(`Guide "${name}" deleted successfully`);
            fetchGuides();
        } catch (error) {
            message.error(error || 'Failed to delete guide');
        }
    };

    const handleStatusToggle = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
            await adminService.updateGuide(id, { status: newStatus });
            message.success(`Guide status updated to ${newStatus}`);
            fetchGuides();
        } catch (error) {
            message.error(error || 'Failed to update guide status');
        }
    };

    const columns = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            width: 80,
            render: (photo, record) => (
                <Avatar src={photo} icon={<TeamOutlined />} size={50} />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Experience',
            dataIndex: 'experience',
            key: 'experience',
            sorter: (a, b) => a.experience - b.experience,
            render: (years) => `${years} years`,
        },
        {
            title: 'Specialization',
            dataIndex: 'specialization',
            key: 'specialization',
            render: (specialization) => (
                <>
                    {specialization.slice(0, 2).map((spec, index) => (
                        <Tag key={index} color="blue">{spec}</Tag>
                    ))}
                    {specialization.length > 2 && <Tag>+{specialization.length - 2} more</Tag>}
                </>
            ),
        },
        {
            title: 'Languages',
            dataIndex: 'languages',
            key: 'languages',
            render: (languages) => languages.join(', '),
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            render: (rating) => `⭐ ${rating}`,
        },
        {
            title: 'Total Trips',
            dataIndex: 'totalTrips',
            key: 'totalTrips',
            sorter: (a, b) => a.totalTrips - b.totalTrips,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status === 'active'}
                    onChange={() => handleStatusToggle(record._id, status)}
                    checkedChildren="Active"
                    unCheckedChildren="Inactive"
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                    onClick={() => navigate(`/admin/guides/edit/${record._id}`)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete Guide"
                        description={`Are you sure you want to delete "${record.name}"?`}
                        onConfirm={() => handleDelete(record._id, record.name)}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button type="link" danger icon={<DeleteOutlined />}>
                            Delete
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Guides Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/admin/guides/add')}
                >
                    Add New Guide
                </Button>
            </div>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Search
                        placeholder="Search by name, specialization, or language"
                        allowClear
                        style={{ width: 400 }}
                        onChange={(e) => setSearchText(e.target.value)}
                        prefix={<SearchOutlined />}
                    />
                    <Space>
                        <Tag color="green">Active: {guides.filter(g => g.status === 'active').length}</Tag>
                        <Tag color="gray">Inactive: {guides.filter(g => g.status === 'inactive').length}</Tag>
                    </Space>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredGuides}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} guides`,
                    }}
                />
            </Card>
        </div>
    );
};

export default GuidesList;
