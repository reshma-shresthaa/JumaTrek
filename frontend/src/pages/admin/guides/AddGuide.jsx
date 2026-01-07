import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select, InputNumber, Upload, Avatar } from 'antd';
import { UploadOutlined, SaveOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;
const { Option } = Select;

const AddGuide = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // keep only latest file
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (!fileList.length || !fileList[0].originFileObj) {
                message.error('Please choose a photo from your computer');
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('experience', values.experience);
            values.specialization?.forEach(spec => formData.append('specialization', spec));
            values.languages?.forEach(lang => formData.append('languages', lang));
            values.certifications?.forEach(cert => formData.append('certifications', cert));
            formData.append('bio', values.bio || '');
            formData.append('rating', 0);
            formData.append('totalTrips', 0);
            formData.append('status', 'active');
            formData.append('photo', fileList[0].originFileObj);

            const res = await adminService.createGuide(formData);
            if (res?.success) {
                message.success('Guide added successfully');
            } else {
                message.success('Guide added');
            }
            navigate('/admin/guides');
        } catch (error) {
            message.error(error || 'Failed to add guide');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Guide</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        experience: 1,
                        specialization: [],
                        languages: [],
                        certifications: [],
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please enter guide name' }]}
                    >
                        <Input placeholder="Enter guide's full name" />
                    </Form.Item>

                    <Form.Item
                        label="Guide Photo"
                        required
                    >
                        <Upload
                            listType="picture-card"
                            fileList={fileList}
                            beforeUpload={() => false}
                            onChange={handleUploadChange}
                            accept="image/*"
                        >
                            {fileList.length >= 1 ? null : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Select Photo</div>
                                </div>
                            )}
                        </Upload>
                        <div style={{ fontSize: 12, color: '#888' }}>
                            Choose a guide photo from your computer. Only one image will be uploaded.
                        </div>
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
                        <Select mode="tags" placeholder="Add specializations (press Enter to add)">
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
                        <Select mode="tags" placeholder="Add languages (press Enter to add)">
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
                        <Select mode="tags" placeholder="Add certifications (press Enter to add)">
                            <Option value="IFMGA Mountain Guide">IFMGA Mountain Guide</Option>
                            <Option value="Nepal Trekking Guide License">Nepal Trekking Guide License</Option>
                            <Option value="Wilderness First Responder">Wilderness First Responder</Option>
                            <Option value="First Aid Certified">First Aid Certified</Option>
                            <Option value="Avalanche Safety Level 3">Avalanche Safety Level 3</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                            Add Guide
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

export default AddGuide;
