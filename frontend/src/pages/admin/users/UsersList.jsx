import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, Popconfirm, message, Modal } from 'antd';
import { UserOutlined, DeleteOutlined, EyeOutlined, SearchOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';

const { Search } = Input;
const { Option } = Select;

const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        role: 'all',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, users]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await adminService.getAllUsers();
            if (response.success) {
                setUsers(response.data);
                setFilteredUsers(response.data);
            }
        } catch (error) {
            message.error(error || 'Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...users];

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchLower) ||
                    user.email.toLowerCase().includes(searchLower) ||
                    (user.contact && user.contact.toLowerCase().includes(searchLower))
            );
        }

        // Role filter
        if (filters.role !== 'all') {
            filtered = filtered.filter((user) => user.role === filters.role);
        }

        setFilteredUsers(filtered);
    };

    const handleDelete = async (userId, userName) => {
        try {
            const response = await adminService.deleteUser(userId);
            if (response.success) {
                message.success(`User "${userName}" deleted successfully`);
                fetchUsers();
            }
        } catch (error) {
            message.error(error || 'Failed to delete user');
        }
    };

    const handleViewDetails = (user) => {
        Modal.info({
            title: 'User Details',
            width: 600,
            content: (
                <div style={{ marginTop: 16 }}>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Contact:</strong> {user.contact || 'N/A'}</p>
                    <p><strong>Role:</strong> <Tag color={user.role === 'Admin' ? 'red' : 'blue'}>{user.role}</Tag></p>
                    <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
                    <p><strong>User ID:</strong> {user._id}</p>
                </div>
            ),
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            render: (text) => (
                <Space>
                    <UserOutlined />
                    {text}
                </Space>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => a.email.localeCompare(b.email),
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            render: (text) => text || 'N/A',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            filters: [
                { text: 'User', value: 'User' },
                { text: 'Admin', value: 'Admin' },
            ],
            onFilter: (value, record) => record.role === value,
            render: (role) => (
                <Tag color={role === 'Admin' ? 'red' : 'blue'}>{role}</Tag>
            ),
        },
        {
            title: 'Join Date',
            dataIndex: 'createdAt',
            key: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                    >
                        View
                    </Button>
                    {record.role !== 'Admin' && (
                        <Popconfirm
                            title="Delete User"
                            description={`Are you sure you want to delete "${record.name}"?`}
                            onConfirm={() => handleDelete(record._id, record.name)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button type="link" danger icon={<DeleteOutlined />}>
                                Delete
                            </Button>
                        </Popconfirm>
                    )}
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Users Management</h2>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={fetchUsers}
                    loading={loading}
                >
                    Refresh
                </Button>
            </div>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="Search by name, email, or contact"
                            allowClear
                            style={{ width: 300 }}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            prefix={<SearchOutlined />}
                        />
                        <Select
                            style={{ width: 150 }}
                            value={filters.role}
                            onChange={(value) => setFilters({ ...filters, role: value })}
                        >
                            <Option value="all">All Roles</Option>
                            <Option value="User">Users</Option>
                            <Option value="Admin">Admins</Option>
                        </Select>
                    </Space>
                    <div>
                        <Tag color="blue">Total Users: {users.filter(u => u.role === 'User').length}</Tag>
                        <Tag color="red">Total Admins: {users.filter(u => u.role === 'Admin').length}</Tag>
                    </div>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredUsers}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} users`,
                    }}
                />
            </Card>
        </div>
    );
};

export default UsersList;
