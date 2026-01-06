import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Tag, Input, Select, Card, message, Modal, Form, Row, Col, Statistic, DatePicker, Empty } from 'antd';
import { CalendarOutlined, EyeOutlined, SearchOutlined, ReloadOutlined, EditOutlined, UserOutlined, TeamOutlined, CheckCircleOutlined, CloseCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
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
        dateRange: null,
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
                    booking.trekName?.toLowerCase().includes(searchLower) ||
                    booking.name?.toLowerCase().includes(searchLower) ||
                    booking.email?.toLowerCase().includes(searchLower) ||
                    booking._id?.toLowerCase().includes(searchLower)
            );
        }

        // Status filter
        if (filters.status !== 'all') {
            filtered = filtered.filter((booking) => booking.status === filters.status);
        }

        // Date range filter
        if (filters.dateRange && filters.dateRange[0] && filters.dateRange[1]) {
            filtered = filtered.filter(booking => {
                const bookingDate = dayjs(booking.preferredDate);
                return bookingDate.isAfter(filters.dateRange[0]) && 
                       bookingDate.isBefore(filters.dateRange[1].add(1, 'day'));
            });
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
            width: 100,
            fixed: 'left',
            render: (id) => <span style={{ fontFamily: 'monospace' }}>{id.slice(-8).toUpperCase()}</span>,
        },
        {
            title: 'Trek',
            dataIndex: 'trekName',
            key: 'trekName',
            sorter: (a, b) => a.trekName?.localeCompare(b.trekName),
            ellipsis: true,
            width: 150,
        },
        {
            title: 'Customer',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name?.localeCompare(b.name),
            render: (name, record) => (
                <Space>
                    <UserOutlined style={{ color: '#1890ff' }} />
                    <span>{name}</span>
                </Space>
            ),
            width: 150,
        },
        {
            title: 'Date',
            dataIndex: 'preferredDate',
            key: 'preferredDate',
            sorter: (a, b) => new Date(a.preferredDate) - new Date(b.preferredDate),
            render: (date) => (
                <Space>
                    <CalendarOutlined style={{ color: '#722ed1' }} />
                    {dayjs(date).format('MMM D, YYYY')}
                </Space>
            ),
            width: 150,
        },
        {
            title: 'Group',
            dataIndex: 'groupSize',
            key: 'groupSize',
            align: 'center',
            sorter: (a, b) => a.groupSize - b.groupSize,
            render: (size) => (
                <Tag icon={<TeamOutlined />} color="blue">
                    {size}
                </Tag>
            ),
            width: 100,
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
                <Tag 
                    color={getStatusColor(status)}
                    icon={
                        status === 'confirmed' ? <CheckCircleOutlined /> :
                        status === 'cancelled' ? <CloseCircleOutlined /> :
                        status === 'completed' ? <CheckCircleOutlined /> :
                        <ClockCircleOutlined />
                    }
                >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                </Tag>
            ),
            width: 130,
        },
        {
            title: 'Actions',
            key: 'actions',
            fixed: 'right',
            width: 180,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EyeOutlined />}
                        onClick={() => handleViewDetails(record)}
                        title="View Details"
                    />
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={() => handleStatusUpdate(record)}
                        title="Update Status"
                    />
                </Space>
            ),
        },
    ];


    return (
        <div className="bookings-container">
            <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h2 style={{ marginBottom: 0 }}>Bookings Management</h2>
                    <p style={{ color: '#8c8c8c', marginBottom: 0 }}>Manage and track all booking activities</p>
                </div>
                <Button
                    type="primary"
                    icon={<ReloadOutlined />}
                    onClick={fetchBookings}
                    loading={loading}
                >
                    Refresh
                </Button>
            </div>


            <Card 
                title={
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Booking List</span>
                        <span style={{ fontSize: 14, color: '#8c8c8c', fontWeight: 'normal' }}>
                            {filteredBookings.length} bookings found
                        </span>
                    </div>
                }
                bodyStyle={{ padding: 0 }}
                headStyle={{ borderBottom: '1px solid #f0f0f0' }}
                bordered={false}
                className="booking-table-card"
            >
                <div style={{ padding: '16px 24px', borderBottom: '1px solid #f0f0f0' }}>
                    <Row gutter={[16, 16]} align="middle">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Input
                                placeholder="Search bookings..."
                                prefix={<SearchOutlined />}
                                allowClear
                                value={filters.search}
                                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                style={{ width: '100%' }}
                                value={filters.status}
                                onChange={(value) => setFilters({ ...filters, status: value })}
                                placeholder="Filter by status"
                                allowClear
                            >
                                <Option value="all">All Status</Option>
                                <Option value="pending">Pending</Option>
                                <Option value="confirmed">Confirmed</Option>
                                <Option value="cancelled">Cancelled</Option>
                                <Option value="completed">Completed</Option>
                            </Select>
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={8}>
                            <DatePicker.RangePicker
                                style={{ width: '100%' }}
                                onChange={(dates) => setFilters({ ...filters, dateRange: dates })}
                                placeholder={['Start Date', 'End Date']}
                                allowClear
                            />
                        </Col>
                        <Col xs={24} sm={24} md={8} lg={4} style={{ textAlign: 'right' }}>
                            <Button 
                                onClick={() => setFilters({ search: '', status: 'all', dateRange: null })}
                                disabled={!filters.search && filters.status === 'all' && !filters.dateRange}
                            >
                                Reset Filters
                            </Button>
                        </Col>
                    </Row>
                </div>

                <Table
                    columns={columns}
                    dataSource={filteredBookings}
                    rowKey="_id"
                    loading={loading}
                    scroll={{ x: 1000 }}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Showing ${filteredBookings.length} of ${total} bookings`,
                        showQuickJumper: true,
                        size: 'default',
                    }}
                    locale={{
                        emptyText: (
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <span>
                                        No bookings found
                                        {filters.search || filters.status !== 'all' || filters.dateRange ? (
                                            <span>
                                                . <a onClick={() => setFilters({ search: '', status: 'all', dateRange: null })}>Clear filters</a>
                                            </span>
                                        ) : null}
                                    </span>
                                }
                            />
                        ),
                    }}
                    rowClassName={(record) => `status-${record.status}`}
                    style={{ 
                        borderTop: '1px solid #f0f0f0',
                        borderRadius: '0 0 8px 8px'
                    }}
                />
                <style jsx global>{`
                    .ant-table-thead > tr > th {
                        background: #fafafa;
                        font-weight: 600;
                    }
                    .ant-table-tbody > tr.status-pending {
                        background-color: #fffbe6;
                    }
                    .ant-table-tbody > tr.status-confirmed {
                        background-color: #f6ffed;
                    }
                    .ant-table-tbody > tr.status-cancelled {
                        background-color: #fff1f0;
                        opacity: 0.8;
                    }
                    .ant-table-tbody > tr.status-completed {
                        background-color: #f9f0ff;
                    }
                    .ant-table-tbody > tr:hover > td {
                        background: #f0f5ff !important;
                    }
                    .booking-table-card .ant-card-head {
                        padding: 0 24px;
                    }
                    .booking-table-card .ant-card-body {
                        padding: 0;
                    }
                `}</style>
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