import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Select, InputNumber } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;
const { Option } = Select;

const EditGuide = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const res = await adminService.getGuides();
                const guides = res.data || [];
                const guide = guides.find(g => g._id === id);
                if (guide) {
                    form.setFieldsValue(guide);
                } else {
                    message.error('Guide not found');
                    navigate('/admin/guides');
                }
            } catch (error) {
                message.error(error || 'Failed to load guide');
                navigate('/admin/guides');
            }
        };

        fetchGuide();
    }, [id, form, navigate]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            await adminService.updateGuide(id, values);
            message.success('Guide updated successfully');
            navigate('/admin/guides');
        } catch (error) {
            message.error(error || 'Failed to update guide');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Edit Guide</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter guide name' }]}
                    >
                        <Input placeholder="Enter guide's full name" />
                    </Form.Item>

                    <Form.Item
                        name="photo"
                        label="Photo URL"
                        rules={[{ required: true, message: 'Please enter photo URL' }]}
                    >
                        <Input placeholder="https://example.com/photo.jpg" />
                    </Form.Item>

                    <Form.Item
                        name="experience"
                        label="Years of Experience"
                        rules={[{ required: true, message: 'Please enter years of experience' }]}
                    >
                        <InputNumber min={1} max={50} style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        name="specialization"
                        label="Specialization"
                        rules={[{ required: true, message: 'Please select at least one specialization' }]}
                    >
                        <Select mode="tags" placeholder="Add specializations">
                            <Option value="Everest Region">Everest Region</Option>
                            <Option value="Annapurna Region">Annapurna Region</Option>
                            <Option value="Langtang Region">Langtang Region</Option>
                            <Option value="Manaslu Region">Manaslu Region</Option>
                            <Option value="High Altitude">High Altitude</Option>
                            <Option value="Mountaineering">Mountaineering</Option>
                            <Option value="Cultural Tours">Cultural Tours</Option>
                            <Option value="Photography Tours">Photography Tours</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="languages"
                        label="Languages"
                        rules={[{ required: true, message: 'Please select at least one language' }]}
                    >
                        <Select mode="tags" placeholder="Add languages">
                            <Option value="English">English</Option>
                            <Option value="Nepali">Nepali</Option>
                            <Option value="Hindi">Hindi</Option>
                            <Option value="Tibetan">Tibetan</Option>
                            <Option value="German">German</Option>
                            <Option value="French">French</Option>
                            <Option value="Spanish">Spanish</Option>
                            <Option value="Chinese">Chinese</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="bio"
                        label="Biography"
                        rules={[{ required: true, message: 'Please enter guide biography' }]}
                    >
                        <TextArea rows={4} placeholder="Enter guide's biography and experience" />
                    </Form.Item>

                    <Form.Item
                        name="certifications"
                        label="Certifications"
                    >
                        <Select mode="tags" placeholder="Add certifications">
                            <Option value="IFMGA Mountain Guide">IFMGA Mountain Guide</Option>
                            <Option value="Nepal Trekking Guide License">Nepal Trekking Guide License</Option>
                            <Option value="Wilderness First Responder">Wilderness First Responder</Option>
                            <Option value="First Aid Certified">First Aid Certified</Option>
                            <Option value="Avalanche Safety Level 3">Avalanche Safety Level 3</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                            Update Guide
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/guides')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default EditGuide;
