import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, message, Modal, Form } from 'antd';
import { MessageOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { messagesStorage } from '../../../utils/localStorage';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const ContactMessagesList = () => {
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);
    const [filteredMessages, setFilteredMessages] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
    });
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [replyForm] = Form.useForm();

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, messages]);

    const fetchMessages = () => {
        setLoading(true);
        try {
            const data = messagesStorage.getAll();
            setMessages(data);
            setFilteredMessages(data);
        } catch (error) {
            message.error('Failed to fetch messages');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...messages];

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (msg) =>
                    msg.name.toLowerCase().includes(searchLower) ||
                    msg.email.toLowerCase().includes(searchLower) ||
                    msg.subject.toLowerCase().includes(searchLower)
            );
        }

        if (filters.status !== 'all') {
            filtered = filtered.filter((msg) => msg.status === filters.status);
        }

        setFilteredMessages(filtered);
    };

    const handleViewDetails = (msg) => {
        setSelectedMessage(msg);
        setDetailModalVisible(true);

        // Mark as read if it's new
        if (msg.status === 'new') {
            messagesStorage.markAsRead(msg.id);
            fetchMessages();
        }
    };

    const handleDelete = (id, name) => {
        try {
            messagesStorage.delete(id);
            message.success(`Message from "${name}" deleted successfully`);
            fetchMessages();
        } catch (error) {
            message.error('Failed to delete message');
        }
    };

    const handleReply = (values) => {
        try {
            messagesStorage.markAsReplied(selectedMessage.id);
            message.success('Reply sent successfully (UI only)');
            setDetailModalVisible(false);
            replyForm.resetFields();
            fetchMessages();
        } catch (error) {
            message.error('Failed to send reply');
        }
    };

    const handleArchive = (id) => {
        try {
            messagesStorage.archive(id);
            message.success('Message archived successfully');
            fetchMessages();
        } catch (error) {
            message.error('Failed to archive message');
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            new: 'red',
            read: 'blue',
            replied: 'green',
            archived: 'gray',
        };
        return colors[status] || 'default';
    };

    const columns = [
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 100,
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            sorter: (a, b) => a.subject.localeCompare(b.subject),
        },
        {
            title: 'Date',
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
                    {record.status !== 'archived' && (
                        <Button
                            type="link"
                            icon={<CheckOutlined />}
                            onClick={() => handleArchive(record.id)}
                        >
                            Archive
                        </Button>
                    )}
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.id, record.name)}
                    >
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    const statusCounts = {
        new: messages.filter(m => m.status === 'new').length,
        read: messages.filter(m => m.status === 'read').length,
        replied: messages.filter(m => m.status === 'replied').length,
        archived: messages.filter(m => m.status === 'archived').length,
    };

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Contact Messages</h2>
            </div>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="Search by name, email, or subject"
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
                            <Option value="new">New</Option>
                            <Option value="read">Read</Option>
                            <Option value="replied">Replied</Option>
                            <Option value="archived">Archived</Option>
                        </Select>
                    </Space>
                    <Space>
                        <Tag color="red">New: {statusCounts.new}</Tag>
                        <Tag color="blue">Read: {statusCounts.read}</Tag>
                        <Tag color="green">Replied: {statusCounts.replied}</Tag>
                        <Tag color="gray">Archived: {statusCounts.archived}</Tag>
                    </Space>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredMessages}
                    rowKey="id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} messages`,
                    }}
                />
            </Card>

            <Modal
                title="Message Details"
                open={detailModalVisible}
                onCancel={() => setDetailModalVisible(false)}
                width={700}
                footer={null}
            >
                {selectedMessage && (
                    <div>
                        <div style={{ marginBottom: 16 }}>
                            <p><strong>From:</strong> {selectedMessage.name}</p>
                            <p><strong>Email:</strong> {selectedMessage.email}</p>
                            <p><strong>Phone:</strong> {selectedMessage.phone}</p>
                            <p><strong>Subject:</strong> {selectedMessage.subject}</p>
                            <p><strong>Date:</strong> {new Date(selectedMessage.createdAt).toLocaleString()}</p>
                            <p><strong>Status:</strong> <Tag color={getStatusColor(selectedMessage.status)}>{selectedMessage.status.toUpperCase()}</Tag></p>
                        </div>

                        <div style={{ marginBottom: 16, padding: 16, background: '#f5f5f5', borderRadius: 4 }}>
                            <h4>Message:</h4>
                            <p>{selectedMessage.message}</p>
                        </div>

                        {selectedMessage.notes && (
                            <div style={{ marginBottom: 16, padding: 16, background: '#fff7e6', borderRadius: 4 }}>
                                <h4>Internal Notes:</h4>
                                <p>{selectedMessage.notes}</p>
                            </div>
                        )}

                        {selectedMessage.status !== 'replied' && (
                            <div>
                                <h4>Reply to Message (UI Only)</h4>
                                <Form
                                    form={replyForm}
                                    layout="vertical"
                                    onFinish={handleReply}
                                >
                                    <Form.Item
                                        name="reply"
                                        rules={[{ required: true, message: 'Please enter your reply' }]}
                                    >
                                        <TextArea rows={4} placeholder="Type your reply here..." />
                                    </Form.Item>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                            Send Reply
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </div>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ContactMessagesList;
