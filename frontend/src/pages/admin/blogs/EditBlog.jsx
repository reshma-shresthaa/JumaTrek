import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Select } from 'antd';
import { SaveOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { blogsStorage } from '../../../utils/localStorage';
import RichTextEditor from '../../../components/common/RichTextEditor';

const { TextArea } = Input;
const { Option } = Select;

const EditBlog = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const blog = blogsStorage.getById(id);
        if (blog) {
            form.setFieldsValue(blog);
            setContent(blog.content || '');
        } else {
            message.error('Blog not found');
            navigate('/admin/blogs');
        }
    }, [id, form, navigate]);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const updateData = {
                ...values,
                content,
            };

            // If publishing for the first time, set publishedAt
            const currentBlog = blogsStorage.getById(id);
            if (values.status === 'published' && currentBlog.status === 'draft') {
                updateData.publishedAt = new Date().toISOString();
            }

            blogsStorage.update(id, updateData);
            message.success('Blog updated successfully');
            navigate('/admin/blogs');
        } catch (error) {
            message.error('Failed to update blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Edit Blog Post</h2>
            <Card>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
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
                        name="featuredImage"
                        label="Featured Image URL"
                        rules={[{ required: true, message: 'Please enter featured image URL' }]}
                    >
                        <Input placeholder="https://example.com/image.jpg" />
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
                        <Select mode="tags" placeholder="Add tags">
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
                            <Option value="published">Publish</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                            Update Blog
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

export default EditBlog;
