
import React, { useState } from 'react';
import { Table, Card, Tag, Button, Modal, Descriptions, Space, Tooltip, Badge } from 'antd';
import {
    EyeOutlined,
    CheckCircleOutlined,
    ClockCircleOutlined,
    MailOutlined,
    PhoneOutlined,
    EnvironmentOutlined,
    CalendarOutlined,
    TeamOutlined,
    DollarOutlined,
    CarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const CustomRequestList = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);

    // Mock Data
    const data = [

        {
            key: '3',
            id: 'REQ-2024-003',
            clientName: 'Tech Corp Team',
            email: 'events@techcorp.io',
            phone: '+977 980-1234567',
            destination: 'Annapurna Circuit',
            customDestination: '',
            startDate: '2024-09-10',
            duration: 18,
            groupSize: 12,
            groupType: 'Corporate',
            budgetRange: 'Comfort',
            status: 'confirmed',
            submittedDate: '2024-05-18',
            details: {
                difficulty: 'Moderate',
                experienceLevel: 'Mixed',
                fitnessLevel: 'Moderate',
                accommodation: 'Hotel/Lodge',
                mealPreferences: ['Mixed', 'Vegan Options'],
                guideRequired: true,
                porterRequired: true,
                transportation: ['Private Bus'],
                specialRequests: 'Need team building activities included.',
                emergencyContact: {
                    name: 'HR Department',
                    relationship: 'Employer',
                    phone: '+977 1-4445556'
                }
            }
        }
    ];

    const columns = [
        {
            title: 'Request ID',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
        },
        {
            title: 'Client',
            dataIndex: 'clientName',
            key: 'clientName',
            render: (text, record) => (
                <div>
                    <div style={{ fontWeight: 500 }}>{text}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{record.email}</div>
                </div>
            ),
        },
        {
            title: 'Destination',
            key: 'destination',
            render: (_, record) => (
                <span>
                    <EnvironmentOutlined style={{ marginRight: 6, color: '#1890ff' }} />
                    {record.destination === 'Custom Route' ? record.customDestination : record.destination}
                </span>
            ),
        },
        {
            title: 'Dates',
            key: 'dates',
            render: (_, record) => (
                <div>
                    <div><CalendarOutlined style={{ marginRight: 6 }} />{record.startDate}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{record.duration} Days</div>
                </div>
            ),
        },
        {
            title: 'Group',
            key: 'group',
            render: (_, record) => (
                <div>
                    <Badge count={record.groupSize} style={{ backgroundColor: '#52c41a' }} />
                    <span style={{ marginLeft: 8 }}>{record.groupType}</span>
                </div>
            ),
        },
        {
            title: 'Budget',
            dataIndex: 'budgetRange',
            key: 'budgetRange',
            render: (text) => (
                <Tag color={text === 'Luxury' ? 'gold' : text === 'Budget' ? 'green' : 'blue'}>
                    {text}
                </Tag>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                let color = 'default';
                let icon = <ClockCircleOutlined />;

                if (status === 'replied') {
                    color = 'processing';
                    icon = <MailOutlined />;
                } else if (status === 'confirmed') {
                    color = 'success';
                    icon = <CheckCircleOutlined />;
                }

                return (
                    <Tag icon={icon} color={color} style={{ textTransform: 'capitalize' }}>
                        {status}
                    </Tag>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="primary"
                        icon={<EyeOutlined />}
                        size="small"
                        onClick={() => showRequestDetails(record)}
                    >
                        View
                    </Button>
                </Space>
            ),
        },
    ];

    const showRequestDetails = (record) => {
        setSelectedRequest(record);
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    return (
        <Card title="Custom Trip Requests" bordered={false} className="shadow-md rounded-lg">
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title={
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Request Details: {selectedRequest?.id}</span>
                        <Tag color={selectedRequest?.status === 'confirmed' ? 'green' : 'orange'}>
                            {selectedRequest?.status?.toUpperCase()}
                        </Tag>
                    </div>
                }
                open={isModalVisible}
                onCancel={handleModalClose}
                footer={[
                    <Button key="close" onClick={handleModalClose}>
                        Close
                    </Button>,
                    <Button key="reply" type="primary" icon={<MailOutlined />}>
                        Reply to Client
                    </Button>
                ]}
                width={800}
            >
                {selectedRequest && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Contact Info Section */}
                        <Descriptions title="Client Information" bordered column={2} size="small">
                            <Descriptions.Item label="Name" span={2}>{selectedRequest.clientName}</Descriptions.Item>
                            <Descriptions.Item label="Email">
                                <a href={`mailto:${selectedRequest.email}`}>{selectedRequest.email}</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Phone">
                                <a href={`tel:${selectedRequest.phone}`}>{selectedRequest.phone}</a>
                            </Descriptions.Item>
                            <Descriptions.Item label="Emergency Contact">{selectedRequest.details.emergencyContact.name} ({selectedRequest.details.emergencyContact.relationship})</Descriptions.Item>
                            <Descriptions.Item label="Emergency Phone">{selectedRequest.details.emergencyContact.phone}</Descriptions.Item>
                        </Descriptions>

                        {/* Trip Details Section */}
                        <Descriptions title="Trip Specifications" bordered column={2} size="small">
                            <Descriptions.Item label="Destination">
                                {selectedRequest.destination === 'Custom Route'
                                    ? `${selectedRequest.destination}: ${selectedRequest.customDestination}`
                                    : selectedRequest.destination}
                            </Descriptions.Item>
                            <Descriptions.Item label="Dates">
                                {selectedRequest.startDate} ({selectedRequest.duration} Days)
                            </Descriptions.Item>
                            <Descriptions.Item label="Group Size">{selectedRequest.groupSize} ({selectedRequest.groupType})</Descriptions.Item>
                            <Descriptions.Item label="Budget Range">{selectedRequest.budgetRange}</Descriptions.Item>

                            <Descriptions.Item label="Difficulty Pref">{selectedRequest.details.difficulty}</Descriptions.Item>
                            <Descriptions.Item label="Experience">{selectedRequest.details.experienceLevel}</Descriptions.Item>
                            <Descriptions.Item label="Fitness Level">{selectedRequest.details.fitnessLevel}</Descriptions.Item>
                        </Descriptions>

                        {/* Logistics Section */}
                        <Descriptions title="Logistics & Preferences" bordered column={1} size="small">
                            <Descriptions.Item label="Accommodation">
                                <HomeOutlined style={{ marginRight: 8 }} />
                                {selectedRequest.details.accommodation}
                            </Descriptions.Item>
                            <Descriptions.Item label="Meals">
                                {selectedRequest.details.mealPreferences.join(', ')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Transport">
                                <CarOutlined style={{ marginRight: 8 }} />
                                {selectedRequest.details.transportation.join(', ')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Services">
                                <Space>
                                    {selectedRequest.details.guideRequired && <Tag color="blue">Guide Required</Tag>}
                                    {selectedRequest.details.porterRequired && <Tag color="cyan">Porter Required</Tag>}
                                </Space>
                            </Descriptions.Item>
                        </Descriptions>

                        {/* Special Requests */}
                        {selectedRequest.details.specialRequests && (
                            <Card type="inner" title="Special Requests" size="small">
                                <p style={{ margin: 0 }}>{selectedRequest.details.specialRequests}</p>
                            </Card>
                        )}

                        <div style={{ textAlign: 'right', color: '#999', fontSize: '12px' }}>
                            Submitted on: {selectedRequest.submittedDate}
                        </div>
                    </div>
                )}
            </Modal>
        </Card>
    );
};

export default CustomRequestList;
