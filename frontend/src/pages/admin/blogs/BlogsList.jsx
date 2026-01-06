import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, message, Popconfirm, Switch } from 'antd';
import { FileTextOutlined, PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { blogsStorage } from '../../../utils/localStorage';

const { Search } = Input;
const { Option } = Select;

const BlogsList = () => {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
        category: 'all',
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, blogs]);

    const fetchBlogs = () => {
        setLoading(true);
        try {
            const data = blogsStorage.getAll();
            setBlogs(data);
            setFilteredBlogs(data);
        } catch (error) {
            message.error('Failed to fetch blogs');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...blogs];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (blog) =>
                    blog.title.toLowerCase().includes(searchLower) ||
                    blog.excerpt.toLowerCase().includes(searchLower) ||
                    blog.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        if (filters.status !== 'all') {
            filtered = filtered.filter((blog) => blog.status === filters.status);
        }

        if (filters.category !== 'all') {
            filtered = filtered.filter((blog) => blog.category === filters.category);
        }

        setFilteredBlogs(filtered);
    };

    const handleDelete = (id, title) => {
        try {
            blogsStorage.delete(id);
            message.success(`Blog "${title}" deleted successfully`);
            fetchBlogs();
        } catch (error) {
            message.error('Failed to delete blog');
        }
    };

    const handleStatusToggle = (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'published' ? 'draft' : 'published';
            const updateData = { status: newStatus };
            if (newStatus === 'published' && !blogsStorage.getById(id).publishedAt) {
                updateData.publishedAt = new Date().toISOString();
            }
            blogsStorage.update(id, updateData);
            message.success(`Blog status updated to ${newStatus}`);
            fetchBlogs();
        } catch (error) {
            message.error('Failed to update blog status');
        }
    };

    const categories = [...new Set(blogs.map(b => b.category))];

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => a.title.localeCompare(b.title),
            render: (text) => <strong>{text}</strong>,
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            render: (category) => <Tag color="blue">{category}</Tag>,
        },
        {
            title: 'Author',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status, record) => (
                <Switch
                    checked={status === 'published'}
                    onChange={() => handleStatusToggle(record.id, status)}
                    checkedChildren="Published"
                    unCheckedChildren="Draft"
                />
            ),
        },
        {
            title: 'Published Date',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            sorter: (a, b) => new Date(a.publishedAt || 0) - new Date(b.publishedAt || 0),
            render: (date) => date ? new Date(date).toLocaleDateString() : 'Not published',
        },
        {
            title: 'Views',
            dataIndex: 'views',
            key: 'views',
            sorter: (a, b) => a.views - b.views,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => navigate(`/admin/blogs/edit/${record.id}`)}
                    >
                        Edit
                    </Button>
                    <Popconfirm
                        title="Delete Blog"
                        description={`Are you sure you want to delete "${record.title}"?`}
                        onConfirm={() => handleDelete(record.id, record.title)}
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
                <h2>Blogs Management</h2>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => navigate('/admin/blogs/add')}
                >
                    Add New Blog
                </Button>
            </div>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="Search by title, excerpt, or tags"
                            allowClear
                            style={{ width: 300 }}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                            prefix={<SearchOutlined />}
                        />
                        <Select
                            style={{ width: 150 }}
                            value={filters.status}
                            onChange={(value) => setFilters({ ...filters, status: value })}
                        >
                            <Option value="all">All Status</Option>
                            <Option value="published">Published</Option>
                            <Option value="draft">Draft</Option>
                        </Select>
                        <Select
                            style={{ width: 180 }}
                            value={filters.category}
                            onChange={(value) => setFilters({ ...filters, category: value })}
                        >
                            <Option value="all">All Categories</Option>
                            {categories.map(cat => (
                                <Option key={cat} value={cat}>{cat}</Option>
                            ))}
                        </Select>
                    </Space>
                    <Space>
                        <Tag color="green">Published: {blogs.filter(b => b.status === 'published').length}</Tag>
                        <Tag color="orange">Draft: {blogs.filter(b => b.status === 'draft').length}</Tag>
                    </Space>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredBlogs}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} blogs`,
                    }}
                />
            </Card>
        </div>
    );
};

export default BlogsList;
