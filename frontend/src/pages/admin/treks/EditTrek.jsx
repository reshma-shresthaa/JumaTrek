import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Button,
    Card,
    Row,
    Col,
    Select,
    InputNumber,
    Upload,
    message,
    Switch,
    Divider,
    Tabs,
    Typography,
    Space,
    Alert,
    Spin
} from 'antd';
import {
    SaveOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../../../components/common/RichTextEditor';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const EditTrek = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [detailedDescription, setDetailedDescription] = useState('');

    useEffect(() => {
        fetchTrekDetails();
    }, [id]);

    const fetchTrekDetails = async () => {
        setFetching(true);
        try {
            const response = await adminService.getListingById(id);
            if (response.success) {
                const trek = response.data;

                // Populate form
                form.setFieldsValue({
                    title: trek.title,
                    shortDescription: trek.description, // Assuming description is used as short description too if not separate
                    detailedDescription: trek.description,
                    region: trek.region,
                    difficulty: trek.difficulty,
                    duration: trek.duration,
                    maxAltitude: trek.maxAltitude,
                    groupSize: trek.groupSize,
                    price: trek.price,
                    bestSeason: trek.bestSeason,
                    priceIncludes: trek.includes,
                    priceExcludes: trek.excludes,
                    seoTitle: trek.title, // Default seo title
                    // ... other mappings based on data structure
                });

                // Set state for complex fields
                setDetailedDescription(trek.description);

                // Handle images visualization (this is tricky with just URLs, usually we just show them)
                if (trek.gallery && trek.gallery.length > 0) {
                    const formattedImages = trek.gallery.map((url, index) => ({
                        uid: `-${index}`,
                        name: `image-${index}.jpg`,
                        status: 'done',
                        url: url.startsWith('http') ? url : `http://localhost:5000/${url.replace(/\\/g, '/')}`,
                    }));
                    setGalleryImages(formattedImages);
                    if (formattedImages.length > 0) setFeaturedImage(formattedImages[0]); // Just for visual
                }

                // Handle Itinerary
                if (trek.itinerary && Array.isArray(trek.itinerary)) {
                    form.setFieldsValue({
                        itinerary: trek.itinerary
                    });
                }


            } else {
                message.error('Failed to load trek details');
                navigate('/admin/treks');
            }
        } catch (error) {
            console.error('Error fetching trek details:', error);
            message.error('Failed to load trek details');
        } finally {
            setFetching(false);
        }
    };


    const onFinish = async (values) => {
        setLoading(true);
        try {

            const formData = new FormData();

            formData.append('title', values.title);
            const description = detailedDescription || values.detailedDescription || values.shortDescription || '';
            formData.append('description', description);
            formData.append('region', values.region);
            formData.append('price', values.price);
            formData.append('duration', values.duration);
            formData.append('difficulty', values.difficulty);
            formData.append('maxAltitude', values.maxAltitude?.toString() || '');
            formData.append('groupSize', values.groupSize?.toString() || '');

            if (values.bestSeason && Array.isArray(values.bestSeason)) {
                values.bestSeason.forEach(season => {
                    formData.append('bestSeason', season);
                });
            }

            // Handle highlights array
            if (values.highlights && Array.isArray(values.highlights)) {
                values.highlights.forEach(highlight => {
                    formData.append('highlights', highlight);
                });
            }

            // Handle itinerary - convert to JSON string
            if (values.itinerary && Array.isArray(values.itinerary)) {
                const cleanedItinerary = values.itinerary.map(item => ({
                    day: Number(item.day) || 1,
                    title: item.title || '',
                    description: item.description || '',
                    maxAltitude: item.maxAltitude?.toString() || '',
                    accommodation: item.accommodation?.toString() || '',
                    meals: item.meals?.toString() || ''
                }));
                formData.append('itinerary', JSON.stringify(cleanedItinerary));
            }

            // Handle includes/excludes arrays
            if (values.priceIncludes && Array.isArray(values.priceIncludes)) {
                values.priceIncludes.forEach(item => {
                    formData.append('includes', item);
                });
            }

            if (values.priceExcludes && Array.isArray(values.priceExcludes)) {
                values.priceExcludes.forEach(item => {
                    formData.append('excludes', item);
                });
            }

            // Handle new gallery images
            // Logic for updating images is complex with FormData. 
            // Usually backend expects new images to append, or specific field to replace.
            // For now, let's append NEW files. Exisitng URLs are not sent as files.
            if (galleryImages && galleryImages.length > 0) {
                galleryImages.forEach((file) => {
                    if (file.originFileObj) {
                        formData.append('images', file.originFileObj);
                    }
                });
            }

            // Call the API
            const response = await adminService.updateListing(id, formData); // Assuming updateListing exists and accepts ID, formData

            if (response.success) {
                message.success('Trek updated successfully!');
                navigate('/admin/treks');
            } else {
                throw new Error(response.message || 'Failed to update trek');
            }
        } catch (error) {
            console.error('Error updating trek:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to update trek. Please try again.';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleGalleryChange = ({ fileList }) => {
        // Ensure all files have originFileObj where possible
        const processedFileList = fileList.map(file => {
            if (file.originFileObj) return file;
            if (file instanceof File) {
                return {
                    uid: file.uid || `-${Date.now()}`,
                    name: file.name,
                    status: 'done',
                    url: URL.createObjectURL(file),
                    originFileObj: file
                };
            }
            return file;
        });
        setGalleryImages(processedFileList);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('You can only upload image files!');
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
            message.error('Image must be smaller than 5MB!');
        }
        return isImage && isLt5M;
    };

    const normFile = (e) => {
        if (Array.isArray(e)) return e;
        return e?.fileList;
    };

    const difficultyOptions = [
        { value: 'Easy', label: 'Easy' },
        { value: 'Moderate', label: 'Moderate' },
        { value: 'Challenging', label: 'Challenging' },
        { value: 'Strenuous', label: 'Strenuous' },
        { value: 'Technical', label: 'Technical' },
    ];

    const regionOptions = [
        { value: 'Everest', label: 'Everest Region' },
        { value: 'Annapurna', label: 'Annapurna Region' },
        { value: 'Langtang', label: 'Langtang Region' },
        { value: 'Manaslu', label: 'Manaslu Region' },
        { value: 'Mustang', label: 'Mustang Region' },
        { value: 'Kanchenjunga', label: 'Kanchenjunga Region' },
        { value: 'Dolpo', label: 'Dolpo Region' },
        { value: 'Rara', label: 'Rara Lake Region' },
    ];

    const bestSeasonOptions = [
        { value: 'Spring', label: 'Spring (Mar-May)' },
        { value: 'Summer', label: 'Summer (Jun-Aug)' },
        { value: 'Autumn', label: 'Autumn (Sep-Nov)' },
        { value: 'Winter', label: 'Winter (Dec-Feb)' },
    ];

    if (fetching) {
        return <div className="p-12 text-center"><Spin size="large" /></div>;
    }

    return (
        <div className="add-trek-page">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Button
                        icon={<ArrowLeftOutlined />}
                        onClick={() => navigate('/admin/treks')}
                        className="mb-2"
                    >
                        Back to Treks
                    </Button>
                    <Typography.Title level={2}>Edit Trek</Typography.Title>
                </div>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    difficulty: 'Moderate',
                    region: 'Everest',
                    duration: 14,
                }}
            >
                <Row gutter={24}>
                    <Col xs={24} md={16}>
                        <Card title="Basic Information" className="mb-6">
                            <Form.Item
                                label="Trek Title"
                                name="title"
                                rules={[{ required: true, message: 'Please enter trek title' }]}
                            >
                                <Input placeholder="E.g., Everest Base Camp Trek" size="large" />
                            </Form.Item>

                            <Form.Item
                                label="Short Description"
                                name="shortDescription"
                                rules={[{ required: true, message: 'Please enter a short description' }]}
                            >
                                <TextArea
                                    rows={3}
                                    placeholder="A short description that appears in trek listings"
                                    maxLength={300}
                                    showCount
                                />
                            </Form.Item>

                            <Row gutter={16}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Region"
                                        name="region"
                                        rules={[{ required: true, message: 'Please select a region' }]}
                                    >
                                        <Select placeholder="Select region" size="large">
                                            {regionOptions.map(region => (
                                                <Option key={region.value} value={region.value}>
                                                    {region.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Difficulty"
                                        name="difficulty"
                                        rules={[{ required: true, message: 'Please select difficulty' }]}
                                    >
                                        <Select placeholder="Select difficulty" size="large">
                                            {difficultyOptions.map(level => (
                                                <Option key={level.value} value={level.value}>
                                                    {level.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Duration (Days)"
                                        name="duration"
                                        rules={[{ required: true, message: 'Please enter duration' }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={100}
                                            className="w-full"
                                            size="large"
                                            placeholder="e.g., 14"
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Max Altitude (meters)"
                                        name="maxAltitude"
                                        rules={[{ required: true, message: 'Please enter max altitude' }]}
                                    >
                                        <InputNumber
                                            min={1000}
                                            max={9000}
                                            className="w-full"
                                            size="large"
                                            placeholder="e.g., 5545"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Group Size"
                                        name="groupSize"
                                        rules={[{ required: true, message: 'Please enter group size' }]}
                                    >
                                        <InputNumber
                                            min={1}
                                            max={100}
                                            className="w-full"
                                            size="large"
                                            placeholder="e.g., 12"
                                        />
                                    </Form.Item>
                                </Col>
                                <Col xs={24} md={8}>
                                    <Form.Item
                                        label="Best Season"
                                        name="bestSeason"
                                        rules={[{ required: true, message: 'Please select best season' }]}
                                    >
                                        <Select
                                            mode="multiple"
                                            placeholder="Select seasons"
                                            size="large"
                                            optionLabelProp="label"
                                        >
                                            {bestSeasonOptions.map(season => (
                                                <Option key={season.value} value={season.value} label={season.label}>
                                                    {season.label}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>

                        <Card title="Detailed Description" className="mb-6">
                            <Form.Item
                                name="detailedDescription"
                                rules={[{ required: true, message: 'Please enter detailed description' }]}
                            >
                                <RichTextEditor value={detailedDescription} onChange={setDetailedDescription} />
                            </Form.Item>
                        </Card>

                        <Card title="Itinerary" className="mb-6">
                            <Form.List name="itinerary">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <div key={key} style={{ marginBottom: 16 }}>
                                                <Row gutter={16} align="middle">
                                                    <Col xs={24} md={2}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'day']}
                                                            rules={[{ required: true, message: 'Day is required' }]}
                                                        >
                                                            <InputNumber placeholder="Day" min={1} className="w-full" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={6}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'title']}
                                                            rules={[{ required: true, message: 'Title is required' }]}
                                                        >
                                                            <Input placeholder="Title" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={12}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'description']}
                                                            rules={[{ required: true, message: 'Description is required' }]}
                                                        >
                                                            <Input.TextArea placeholder="Description" rows={1} />
                                                        </Form.Item>
                                                    </Col>
                                                    <Col xs={24} md={4} style={{ textAlign: 'right' }}>
                                                        <Button
                                                            type="text"
                                                            danger
                                                            icon={<MinusCircleOutlined />}
                                                            onClick={() => remove(name)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    </Col>
                                                </Row>
                                                <Divider style={{ margin: '8px 0' }} />
                                            </div>
                                        ))}
                                        <Form.Item>
                                            <Button
                                                type="dashed"
                                                onClick={() => add()}
                                                block
                                                icon={<PlusOutlined />}
                                            >
                                                Add Day
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Card>
                    </Col>

                    <Col xs={24} md={8}>
                        <Card title="Pricing" className="mb-6">
                            <Form.Item
                                label="Price per person ($)"
                                name="price"
                                rules={[{ required: true, message: 'Please enter price' }]}
                            >
                                <InputNumber
                                    min={0}
                                    className="w-full"
                                    size="large"
                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Price Includes"
                                name="priceIncludes"
                                rules={[{ required: true, message: 'Please specify what\'s included' }]}
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Add items included in price"
                                    tokenSeparators={[',']}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Price Excludes"
                                name="priceExcludes"
                            >
                                <Select
                                    mode="tags"
                                    style={{ width: '100%' }}
                                    placeholder="Add items not included in price"
                                    tokenSeparators={[',']}
                                />
                            </Form.Item>
                        </Card>

                        <Card title="Media" className="mb-6">
                            <Form.Item
                                label="Gallery Images"
                                name="gallery"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                            >
                                <Upload
                                    multiple
                                    listType="picture-card"
                                    fileList={galleryImages}
                                    beforeUpload={beforeUpload}
                                    onChange={handleGalleryChange}
                                >
                                    {galleryImages.length >= 10 ? null : (
                                        <div>
                                            <PlusOutlined />
                                            <div style={{ marginTop: 8 }}>Upload</div>
                                        </div>
                                    )}
                                </Upload>
                                <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>
                                    Upload up to 10 images. First image will be used as cover.
                                </Text>
                            </Form.Item>
                        </Card>

                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                block
                                icon={<SaveOutlined />}
                                loading={loading}
                            >
                                Update Trek
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        </div>
    );
};

export default EditTrek;
