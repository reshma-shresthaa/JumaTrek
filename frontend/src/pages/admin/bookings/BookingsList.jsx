import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, message, Modal, Form } from 'antd';
import { CalendarOutlined, EyeOutlined, SearchOutlined, ReloadOutlined, EditOutlined } from '@ant-design/icons';
import { adminService } from '../../../services/adminApi';

const { Search } = Input;
const { Option } = Select;

const BookingsList = () => {
    const [loading, setLoading] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: 'all',
    });
    const [statusModalVisible, setStatusModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchBookings();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, bookings]);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const response = await adminService.getAllBookings();
            if (response.success) {
                setBookings(response.data);
                setFilteredBookings(response.data);
            }
        } catch (error) {
            message.error(error || 'Failed to fetch bookings');
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...bookings];

        // Search filter
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(
                (booking) =>
                    booking.trekName.toLowerCase().includes(searchLower) ||
                    booking.name.toLowerCase().includes(searchLower) ||
                    booking.email.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (filters.status !== 'all') {
            filtered = filtered.filter((booking) => booking.status === filters.status);
        }

        setFilteredBookings(filtered);
    };

    const handleStatusUpdate = (booking) => {
        setSelectedBooking(booking);
        form.setFieldsValue({ status: booking.status });
        setStatusModalVisible(true);
    };

    const handleStatusSubmit = async (values) => {
        try {
            const response = await adminService.updateBookingStatus(selectedBooking._id, values.status);
            if (response.success) {
                message.success('Booking status updated successfully');
                setStatusModalVisible(false);
                fetchBookings();
            }
        } catch (error) {
            message.error(error || 'Failed to update booking status');
        }
    };

    const handleViewDetails = (booking) => {
        Modal.info({
            title: 'Booking Details',
            width: 700,
            content: (
                <div style={{ marginTop: 16 }}>
                    <h4>Trek Information</h4>
                    <p><strong>Trek:</strong> {booking.trekName}</p>
                    <p><strong>Preferred Date:</strong> {new Date(booking.preferredDate).toLocaleDateString()}</p>
                    <p><strong>Group Size:</strong> {booking.groupSize} people</p>
                    <p><strong>Total Price:</strong> ${booking.totalPrice || 'N/A'}</p>

                    <h4 style={{ marginTop: 16 }}>Customer Information</h4>
                    <p><strong>Name:</strong> {booking.name}</p>
                    <p><strong>Email:</strong> {booking.email}</p>
                    <p><strong>Phone:</strong> {booking.phone}</p>
                    <p><strong>Country:</strong> {booking.country}</p>

                    <h4 style={{ marginTop: 16 }}>Payment & Status</h4>
                    <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
                    <p><strong>Status:</strong> <Tag color={getStatusColor(booking.status)}>{booking.status.toUpperCase()}</Tag></p>

                    {booking.message && (
                        <>
                            <h4 style={{ marginTop: 16 }}>Message</h4>
                            <p>{booking.message}</p>
                        </>
                    )}

                    <h4 style={{ marginTop: 16 }}>Booking Details</h4>
                    <p><strong>Booking ID:</strong> {booking._id}</p>
                    <p><strong>Created:</strong> {new Date(booking.createdAt).toLocaleString()}</p>
                </div>
            ),
        });
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: 'orange',
            confirmed: 'green',
            cancelled: 'red',
            completed: 'blue',
        };
        return colors[status] || 'default';
    };

    const columns = [
        {
            title: 'Booking ID',
            dataIndex: '_id',
            key: '_id',
            render: (id) => id.slice(-8).toUpperCase(),
        },
        {
            title: 'Trek',
            dataIndex: 'trekName',
            key: 'trekName',
            sorter: (a, b) => a.trekName.localeCompare(b.trekName),
        },
        {
            title: 'Customer',
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
            title: 'Date',
            dataIndex: 'preferredDate',
            key: 'preferredDate',
            sorter: (a, b) => new Date(a.preferredDate) - new Date(b.preferredDate),
            render: (date) => new Date(date).toLocaleDateString(),
        },
        {
            title: 'Group Size',
            dataIndex: 'groupSize',
            key: 'groupSize',
            align: 'center',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Pending', value: 'pending' },
                { text: 'Confirmed', value: 'confirmed' },
                { text: 'Cancelled', value: 'cancelled' },
                { text: 'Completed', value: 'completed' },
            ],
            onFilter: (value, record) => record.status === value,
            render: (status) => (
                <Tag color={getStatusColor(status)}>{status.toUpperCase()}</Tag>
            ),
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
                    <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleStatusUpdate(record)}
                    >
                        Update Status
                    </Button>
                </Space>
            ),
        },
    ];

    const statusCounts = {
        pending: bookings.filter(b => b.status === 'pending').length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        cancelled: bookings.filter(b => b.status === 'cancelled').length,
        completed: bookings.filter(b => b.status === 'completed').length,
    };

    return (
        <div>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Bookings Management</h2>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={fetchBookings}
                    loading={loading}
                >
                    Refresh
                </Button>
            </div>

            <Card>
                <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Search
                            placeholder="Search by trek, customer, or email"
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
                            <Option value="pending">Pending</Option>
                            <Option value="confirmed">Confirmed</Option>
                            <Option value="cancelled">Cancelled</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </Space>
                    <Space>
                        <Tag color="orange">Pending: {statusCounts.pending}</Tag>
                        <Tag color="green">Confirmed: {statusCounts.confirmed}</Tag>
                        <Tag color="red">Cancelled: {statusCounts.cancelled}</Tag>
                        <Tag color="blue">Completed: {statusCounts.completed}</Tag>
                    </Space>
                </Space>

                <Table
                    columns={columns}
                    dataSource={filteredBookings}
                    rowKey="_id"
                    loading={loading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total ${total} bookings`,
                    }}
                />
            </Card>

            <Modal
                title="Update Booking Status"
                open={statusModalVisible}
                onCancel={() => setStatusModalVisible(false)}
                footer={null}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleStatusSubmit}
                >
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[{ required: true, message: 'Please select a status' }]}
                    >
                        <Select>
                            <Option value="pending">Pending</Option>
                            <Option value="confirmed">Confirmed</Option>
                            <Option value="cancelled">Cancelled</Option>
                            <Option value="completed">Completed</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit">
                                Update Status
                            </Button>
                            <Button onClick={() => setStatusModalVisible(false)}>
                                Cancel
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default BookingsList;
