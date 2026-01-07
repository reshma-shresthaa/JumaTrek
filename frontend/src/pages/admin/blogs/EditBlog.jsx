import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Select, Upload } from 'antd';
import { SaveOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import { adminService } from '../../../services/adminApi';
import RichTextEditor from '../../../components/common/RichTextEditor';

const { TextArea } = Input;
const { Option } = Select;

const EditBlog = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState('');
    const [fileList, setFileList] = useState([]);
    const [existingImage, setExistingImage] = useState(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await adminService.getBlogById(id);
                if (res?.success && res.data) {
                    const blog = res.data;
                    form.setFieldsValue({
                        title: blog.title,
                        excerpt: blog.excerpt,
                        category: blog.category,
                        tags: blog.tags || [],
                        status: blog.status || 'draft',
                    });
                    setContent(blog.content || '');
                    if (blog.featuredImage) {
                        setExistingImage(blog.featuredImage);
                        setFileList([
                            {
                                uid: '-1',
                                name: 'featured-image',
                                status: 'done',
                                url: blog.featuredImage,
                            },
                        ]);
                    }
                } else {
                    message.error('Blog not found');
                    navigate('/admin/blogs');
                }
            } catch (error) {
                message.error(error || 'Failed to load blog');
                navigate('/admin/blogs');
            }
        };

        fetchBlog();
    }, [id, form, navigate]);

    const handleUploadChange = ({ fileList: newFileList }) => {
        setFileList(newFileList.slice(-1));
    };

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            let payload;

            // If a new file is chosen, send multipart/form-data
            const hasNewFile =
                fileList.length &&
                fileList[0].originFileObj;

            if (hasNewFile) {
                const formData = new FormData();
                formData.append('title', values.title);
                formData.append('excerpt', values.excerpt);
                formData.append('category', values.category);
                (values.tags || []).forEach(tag => formData.append('tags', tag));
                formData.append('status', values.status || 'draft');
                formData.append('content', content);
                formData.append('featuredImage', fileList[0].originFileObj);
                payload = formData;
            } else {
                payload = {
                    ...values,
                    content,
                };
            }

            await adminService.updateBlog(id, payload);
            message.success('Blog updated successfully');
            navigate('/admin/blogs');
        } catch (error) {
            message.error(error || 'Failed to update blog');
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
                            Choose a featured image from your computer. Leave as-is to keep the current image.
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
