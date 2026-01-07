import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, message, Modal, Form } from 'antd';
import { MessageOutlined, EyeOutlined, DeleteOutlined, SearchOutlined, CheckOutlined, CloseOutlined, MailOutlined } from '@ant-design/icons';
import { adminService } from '../../../services/adminApi';

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

    const fetchMessages = async () => {
        setLoading(true);
        try {
            const res = await adminService.getInquiries({
                status: filters.status !== 'all' ? filters.status : undefined,
                search: filters.search || undefined,
            });
            const data = res.data || [];
            setMessages(data);
            setFilteredMessages(data);
        } catch (error) {
            message.error(error || 'Failed to fetch messages');
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
            updateStatus(msg._id, 'read', false);
        }
    };

    const handleDelete = async (id, name) => {
        try {
            await adminService.deleteInquiry(id);
            message.success(`Message from "${name}" deleted successfully`);
            fetchMessages();
        } catch (error) {
            message.error(error || 'Failed to delete message');
        }
    };

    const handleReply = async (values) => {
        if (!selectedMessage?._id) return;
        try {
            await adminService.replyToInquiry(selectedMessage._id, values.replyMessage);
            message.success('Reply sent successfully via email');
            setDetailModalVisible(false);
            replyForm.resetFields();
            fetchMessages();
        } catch (error) {
            message.error(error || 'Failed to send reply');
        }
    };

    const handleArchive = (id) => {
        updateStatus(id, 'archived');
    };

    const updateStatus = async (id, status, showMessage = true) => {
        try {
            await adminService.updateInquiryStatus(id, status);
            if (showMessage) message.success(`Status updated to ${status}`);
            fetchMessages();
        } catch (error) {
            message.error(error || 'Failed to update status');
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
                <Tag color={getStatusColor(status)}>{status?.toUpperCase()}</Tag>
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
            render: (date) => date ? new Date(date).toLocaleString() : '—',
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
                            onClick={() => handleArchive(record._id)}
                        >
                            Archive
                        </Button>
                    )}
                    <Button
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record._id, record.name)}
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
                    rowKey="_id"
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

                        {selectedMessage.status === 'replied' && selectedMessage.lastReply && (
                            <div style={{ marginBottom: 16, padding: 16, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 4 }}>
                                <h4 style={{ color: '#389e0d' }}><MailOutlined /> Previous Reply:</h4>
                                <p style={{ whiteSpace: 'pre-wrap' }}>{selectedMessage.lastReply.text}</p>
                                <div style={{ fontSize: '12px', color: '#8c8c8c', marginTop: 8 }}>
                                    Sent by {selectedMessage.lastReply.adminName || 'Admin'} on {new Date(selectedMessage.lastReply.sentAt).toLocaleString()}
                                </div>
                            </div>
                        )}

                        <div>
                            <h4>Reply to Message</h4>
                            <Form
                                form={replyForm}
                                layout="vertical"
                                onFinish={handleReply}
                            >
                                <Form.Item
                                    name="replyMessage"
                                    label="Your Reply"
                                    rules={[{ required: true, message: 'Please enter your reply' }]}
                                >
                                    <TextArea rows={4} placeholder="Type your reply here" />
                                </Form.Item>
                                <Form.Item>
                                    <Space>
                                        <Button type="primary" htmlType="submit" icon={<MailOutlined />}>
                                            Send Reply
                                        </Button>
                                        <Button icon={<CloseOutlined />} onClick={() => setDetailModalVisible(false)}>
                                            Close
                                        </Button>
                                    </Space>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default ContactMessagesList;
