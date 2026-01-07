import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Select, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';
import RichTextEditor from '../../../components/common/RichTextEditor';

const { TextArea } = Input;
const { Option } = Select;

const AddBlog = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);
    const navigate = useNavigate();

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1)); // keep only latest
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            if (!fileList.length || !fileList[0].originFileObj) {
                message.error('Please upload a featured image');
                setLoading(false);
                return;
            }

            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('excerpt', values.excerpt);
            formData.append('category', values.category);
            (values.tags || []).forEach(tag => formData.append('tags', tag));
            formData.append('status', values.status || 'draft');
            formData.append('content', content);
            formData.append('author', 'Admin');
            formData.append('featuredImage', fileList[0].originFileObj);

            const res = await adminService.createBlog(formData);
            if (res?.success) {
                message.success('Blog created successfully');
            } else {
                message.success('Blog created');
            }
            navigate('/admin/blogs');
        } catch (error) {
            message.error(error || 'Failed to create blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Add New Blog Post</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    initialValues={{
                        status: 'draft',
                        tags: [],
                    }}
                >
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: 'Please enter blog title' }]}
                    >
                        <Input placeholder="Enter blog title" />
                    </Form.Item>

                    <Form.Item
                        name="excerpt"
                        label="Excerpt"
                        rules={[{ required: true, message: 'Please enter blog excerpt' }]}
                    >
                        <TextArea rows={3} placeholder="Brief summary of the blog post" />
                    </Form.Item>

                    <Form.Item
                        label="Content"
                        required
                    >
                        <RichTextEditor
                            value={content}
                            onChange={setContent}
                            placeholder="Write your blog content here..."
                        />
                    </Form.Item>

                    <Form.Item
                        label="Featured Image"
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
                                    <div style={{ marginTop: 8 }}>Select Image</div>
                                </div>
                            )}
                        </Upload>
                        <div style={{ fontSize: 12, color: '#888' }}>
                            Choose a featured image from your computer. Only one image will be uploaded.
                        </div>
                    </Form.Item>

                    <Form.Item
                        name="category"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category' }]}
                    >
                        <Select placeholder="Select category">
                            <Option value="Destination Guide">Destination Guide</Option>
                            <Option value="Trekking Tips">Trekking Tips</Option>
                            <Option value="Seasonal Guide">Seasonal Guide</Option>
                            <Option value="Culture & Heritage">Culture & Heritage</Option>
                            <Option value="Travel Stories">Travel Stories</Option>
                            <Option value="Gear & Equipment">Gear & Equipment</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="tags"
                        label="Tags"
                    >
                        <Select mode="tags" placeholder="Add tags (press Enter to add)">
                            <Option value="Everest">Everest</Option>
                            <Option value="Annapurna">Annapurna</Option>
                            <Option value="Trekking">Trekking</Option>
                            <Option value="Nepal">Nepal</Option>
                            <Option value="Beginner">Beginner</Option>
                            <Option value="Tips">Tips</Option>
                            <Option value="High Altitude">High Altitude</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        name="status"
                        label="Status"
                    >
                        <Select>
                            <Option value="draft">Save as Draft</Option>
                            <Option value="published">Publish Now</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                            Save Blog
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => navigate('/admin/blogs')}>
                            Cancel
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default AddBlog;
