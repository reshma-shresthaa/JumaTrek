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
    Spin,
    Collapse
} from 'antd';
import {
    SaveOutlined,
    PlusOutlined,
    MinusCircleOutlined,
    ArrowLeftOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import RichTextEditor from '../../../components/common/RichTextEditor';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { TabPane } = Tabs;
const { Panel } = Collapse;

const EditTrek = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [activeTab, setActiveTab] = useState('basic');
    const [featuredImage, setFeaturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const [existingGallery, setExistingGallery] = useState([]);

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
                    region: trek.region,
                    difficulty: trek.difficulty,
                    duration: trek.duration,
                    maxAltitude: trek.maxAltitude,
                    groupSize: trek.groupSize,
                    price: trek.price,
                    discountPrice: trek.discountPrice,
                    singleSupplement: trek.singleSupplement,
                    deposit: trek.deposit,
                    bestSeason: trek.bestSeason,
                    priceIncludes: trek.includes,
                    priceExcludes: trek.excludes,
                    detailedDescription: trek.description,
                    itinerary: trek.itinerary,
                    highlights: trek.highlights,
                    accommodation: trek.accommodation,
                    transportation: trek.transportation,
                    groupDiscount: trek.groupDiscount,
                    privateTrip: trek.privateTrip,
                    featured: trek.featured,
                    status: trek.status,
                    startPoint: trek.startPoint,
                    endPoint: trek.endPoint,
                    slug: trek.slug,
                    seoTitle: trek.seoTitle || trek.title,
                    metaDescription: trek.metaDescription,
                });

                // Handle images
                if (trek.gallery && trek.gallery.length > 0) {
                    setExistingGallery(trek.gallery);
                    const formattedImages = trek.gallery.map((url, index) => ({
                        uid: `-${index}`,
                        name: url.split('/').pop(),
                        status: 'done',
                        url: url.startsWith('http') ? url : `http://localhost:5000/${url.replace(/\\/g, '/')}`,
                    }));
                    setGalleryImages(formattedImages);
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

            // Basic fields
            formData.append('title', values.title);
            formData.append('description', values.detailedDescription || '');
            formData.append('region', values.region);
            formData.append('price', values.price);
            formData.append('duration', values.duration);
            formData.append('difficulty', values.difficulty);
            formData.append('maxAltitude', values.maxAltitude?.toString() || '');
            formData.append('groupSize', values.groupSize?.toString() || '');

            if (values.discountPrice) formData.append('discountPrice', values.discountPrice);
            if (values.singleSupplement) formData.append('singleSupplement', values.singleSupplement);
            if (values.deposit) formData.append('deposit', values.deposit);

            formData.append('featured', values.featured || false);
            formData.append('status', values.status || 'draft');
            formData.append('groupDiscount', values.groupDiscount || false);
            formData.append('privateTrip', values.privateTrip || false);
            formData.append('startPoint', values.startPoint || '');
            formData.append('endPoint', values.endPoint || '');

            if (values.slug) formData.append('slug', values.slug);
            if (values.seoTitle) formData.append('seoTitle', values.seoTitle);
            if (values.metaDescription) formData.append('metaDescription', values.metaDescription);

            // Arrays
            if (values.bestSeason && Array.isArray(values.bestSeason)) {
                values.bestSeason.forEach(season => formData.append('bestSeason', season));
            }
            if (values.highlights && Array.isArray(values.highlights)) {
                values.highlights.forEach(h => formData.append('highlights', h));
            }
            if (values.priceIncludes && Array.isArray(values.priceIncludes)) {
                values.priceIncludes.forEach(i => formData.append('includes', i));
            }
            if (values.priceExcludes && Array.isArray(values.priceExcludes)) {
                values.priceExcludes.forEach(e => formData.append('excludes', e));
            }
            if (values.accommodation && Array.isArray(values.accommodation)) {
                values.accommodation.forEach(a => formData.append('accommodation', a));
            }
            if (values.transportation && Array.isArray(values.transportation)) {
                values.transportation.forEach(t => formData.append('transportation', t));
            }

            // Itinerary
            if (values.itinerary && Array.isArray(values.itinerary)) {
                const cleanedItinerary = values.itinerary.map(item => ({
                    day: Number(item.day) || 1,
                    title: item.title || '',
                    description: item.description || '',
                    maxAltitude: item.maxAltitude?.toString() || '',
                    accommodation: item.accommodation?.toString() || '',
                    meals: Array.isArray(item.meals) ? item.meals.join(', ') : item.meals?.toString() || ''
                }));
                formData.append('itinerary', JSON.stringify(cleanedItinerary));
            }

            // Images
            // Calculate which existing images were removed
            const currentGalleryUrls = galleryImages
                .filter(img => !img.originFileObj)
                .map(img => {
                    // Extract relative path from URL
                    if (img.url.includes('http://localhost:5000/')) {
                        return img.url.replace('http://localhost:5000/', '');
                    }
                    return img.url;
                });

            const imagesToRemove = existingGallery.filter(url => !currentGalleryUrls.includes(url));
            if (imagesToRemove.length > 0) {
                formData.append('imagesToRemove', JSON.stringify(imagesToRemove));
            }

            // Append new files
            galleryImages.forEach(file => {
                if (file.originFileObj) {
                    formData.append('images', file.originFileObj);
                }
            });

            const response = await adminService.updateListing(id, formData);

            if (response.success) {
                message.success('Trek updated successfully!');
                navigate('/admin/treks');
            } else {
                throw new Error(response.message || 'Failed to update trek');
            }
        } catch (error) {
            console.error('Error updating trek:', error);
            message.error(error.response?.data?.message || error.message || 'Failed to update trek');
        } finally {
            setLoading(false);
        }
    };

    const handleGalleryChange = ({ fileList }) => {
        setGalleryImages(fileList);
    };

    const beforeUpload = (file) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) message.error('You can only upload image files!');
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) message.error('Image must be smaller than 5MB!');
        return isImage && isLt5M;
    };

    const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

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
        { value: 'spring', label: 'Spring (Mar-May)' },
        { value: 'summer', label: 'Summer (Jun-Aug)' },
        { value: 'autumn', label: 'Autumn (Sep-Nov)' },
        { value: 'winter', label: 'Winter (Dec-Feb)' },
    ];

    const accommodationOptions = [
        { value: 'tea_house', label: 'Tea House' },
        { value: 'camping', label: 'Camping' },
        { value: 'lodge', label: 'Lodge' },
        { value: 'hotel', label: 'Hotel' },
        { value: 'homestay', label: 'Homestay' },
    ];

    const transportOptions = [
        { value: 'flight', label: 'Flight' },
        { value: 'private_vehicle', label: 'Private Vehicle' },
        { value: 'local_bus', label: 'Local Bus' },
        { value: 'jeep', label: 'Jeep' },
    ];

    const renderBasicInfoTab = () => (
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
                                <InputNumber min={1} max={100} className="w-full" size="large" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Max Altitude (m)"
                                name="maxAltitude"
                                rules={[{ required: true, message: 'Please enter max altitude' }]}
                            >
                                <InputNumber min={1000} max={9000} className="w-full" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Group Size"
                                name="groupSize"
                                rules={[{ required: true, message: 'Please enter group size' }]}
                            >
                                <InputNumber min={1} max={100} className="w-full" size="large" />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={8}>
                            <Form.Item
                                label="Best Season"
                                name="bestSeason"
                                rules={[{ required: true, message: 'Please select best season' }]}
                            >
                                <Select mode="multiple" placeholder="Select seasons" size="large" optionLabelProp="label">
                                    {bestSeasonOptions.map(season => (
                                        <Option key={season.value} value={season.value} label={season.label}>
                                            {season.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item label="Trek Start/End Point" style={{ marginBottom: 0 }}>
                        <Form.Item name="startPoint" style={{ display: 'inline-block', width: 'calc(50% - 8px)' }} rules={[{ required: true, message: 'Start point is required' }]}>
                            <Input placeholder="Start point" />
                        </Form.Item>
                        <Form.Item name="endPoint" style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }} rules={[{ required: true, message: 'End point is required' }]}>
                            <Input placeholder="End point" />
                        </Form.Item>
                    </Form.Item>
                </Card>

                <Card title="Detailed Description" className="mb-6">
                    <Form.Item
                        name="detailedDescription"
                        rules={[{ required: true, message: 'Please enter detailed description' }]}
                    >
                        <RichTextEditor />
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
                                                <Form.Item {...restField} name={[name, 'day']} rules={[{ required: true, message: 'Day is required' }]}>
                                                    <InputNumber placeholder="Day" min={1} className="w-full" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item {...restField} name={[name, 'title']} rules={[{ required: true, message: 'Title is required' }]}>
                                                    <Input placeholder="Title" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={12}>
                                                <Form.Item {...restField} name={[name, 'description']} rules={[{ required: true, message: 'Description is required' }]}>
                                                    <Input.TextArea placeholder="Description" rows={1} />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={4} style={{ textAlign: 'right' }}>
                                                <Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>Remove</Button>
                                            </Col>
                                        </Row>
                                        <Divider style={{ margin: '8px 0' }} />
                                    </div>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Day</Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Card>
            </Col>

            <Col xs={24} md={8}>
                <Card title="Pricing" className="mb-6">
                    <Form.Item label="Price per person ($)" name="price" rules={[{ required: true, message: 'Please enter price' }]}>
                        <InputNumber min={0} className="w-full" size="large" formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v.replace(/\$\s?|(,*)/g, '')} />
                    </Form.Item>
                    <Form.Item label="Discount Price ($)" name="discountPrice">
                        <InputNumber min={0} className="w-full" size="large" formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v.replace(/\$\s?|(,*)/g, '')} />
                    </Form.Item>
                    <Form.Item label="Single Supplement ($)" name="singleSupplement">
                        <InputNumber min={0} className="w-full" size="large" formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v.replace(/\$\s?|(,*)/g, '')} />
                    </Form.Item>
                    <Form.Item label="Deposit Required ($)" name="deposit" rules={[{ required: true, message: 'Please enter deposit amount' }]}>
                        <InputNumber min={0} className="w-full" size="large" formatter={v => `$ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} parser={v => v.replace(/\$\s?|(,*)/g, '')} />
                    </Form.Item>
                    <Form.Item label="Price Includes" name="priceIncludes" rules={[{ required: true, message: 'Please specify inclusions' }]}>
                        <Select mode="tags" placeholder="Add inclusions" tokenSeparators={[',']} />
                    </Form.Item>
                    <Form.Item label="Price Excludes" name="priceExcludes">
                        <Select mode="tags" placeholder="Add exclusions" tokenSeparators={[',']} />
                    </Form.Item>
                </Card>

                <Card title="Media" className="mb-6">
                    <Form.Item label="Gallery Images" name="gallery" valuePropName="fileList" getValueFromEvent={normFile}>
                        <Upload multiple listType="picture-card" fileList={galleryImages} beforeUpload={beforeUpload} onChange={handleGalleryChange}>
                            {galleryImages.length >= 10 ? null : (
                                <div><PlusOutlined /><div style={{ marginTop: 8 }}>Upload</div></div>
                            )}
                        </Upload>
                        <Text type="secondary" style={{ display: 'block', marginTop: 8 }}>Upload up to 10 images.</Text>
                    </Form.Item>
                </Card>

                <Card title="Additional Info" className="mb-6">
                    <Form.Item label="Accommodation" name="accommodation" rules={[{ required: true, message: 'Select accommodation' }]}>
                        <Select placeholder="Selection" mode="multiple">
                            {accommodationOptions.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Transportation" name="transportation" rules={[{ required: true, message: 'Select transportation' }]}>
                        <Select placeholder="Selection" mode="multiple">
                            {transportOptions.map(item => <Option key={item.value} value={item.value}>{item.label}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Group Discount?" name="groupDiscount" valuePropName="checked"><Switch /></Form.Item>
                    <Form.Item label="Private Trip?" name="privateTrip" valuePropName="checked"><Switch /></Form.Item>
                    <Form.Item label="Featured?" name="featured" valuePropName="checked"><Switch /></Form.Item>
                    <Form.Item label="Status" name="status"><Select><Option value="draft">Draft</Option><Option value="published">Published</Option></Select></Form.Item>
                </Card>

                <Card title="SEO Settings" className="mb-6">
                    <Form.Item label="SEO Title" name="seoTitle"><Input /></Form.Item>
                    <Form.Item label="Meta Description" name="metaDescription"><TextArea rows={3} maxLength={160} showCount /></Form.Item>
                    <Form.Item label="Slug" name="slug" rules={[{ required: true, message: 'Slug is required' }, { pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/, message: 'Invalid slug' }]}><Input addonBefore="jumatrek.com/treks/" /></Form.Item>
                </Card>
            </Col>
        </Row>
    );

    const renderItineraryTab = () => (
        <Card title="Detailed Itinerary">
            <Form.List name="itinerary">
                {(fields, { add, remove }) => (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className="mb-6 p-4 border rounded">
                                <Row gutter={16} align="middle" className="mb-4">
                                    <Col xs={24} md={2}><Form.Item {...restField} name={[name, 'day']} label="Day" rules={[{ required: true }]}><InputNumber min={1} className="w-full" /></Form.Item></Col>
                                    <Col xs={24} md={10}><Form.Item {...restField} name={[name, 'title']} label="Title" rules={[{ required: true }]}><Input /></Form.Item></Col>
                                    <Col xs={24} md={6}><Form.Item {...restField} name={[name, 'maxAltitude']} label="Alt (m)"><Input /></Form.Item></Col>
                                    <Col xs={24} md={4} style={{ textAlign: 'right' }}><Button type="text" danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>Remove</Button></Col>
                                </Row>
                                <Row gutter={16} className="mb-4">
                                    <Col xs={24} md={8}><Form.Item {...restField} name={[name, 'accommodation']} label="Accommodation"><Input /></Form.Item></Col>
                                    <Col xs={24} md={8}><Form.Item {...restField} name={[name, 'meals']} label="Meals"><Select mode="multiple" placeholder="Select meals"><Option value="breakfast">Breakfast</Option><Option value="lunch">Lunch</Option><Option value="dinner">Dinner</Option><Option value="snacks">Snacks</Option></Select></Form.Item></Col>
                                </Row>
                                <Form.Item {...restField} name={[name, 'description']} label="Description" rules={[{ required: true }]}><TextArea rows={4} /></Form.Item>
                            </div>
                        ))}
                        <Form.Item><Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Day</Button></Form.Item>
                    </>
                )}
            </Form.List>
        </Card>
    );

    if (fetching) return <div className="p-12 text-center"><Spin size="large" /></div>;

    return (
        <div className="add-trek-page">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/admin/treks')} className="mb-2">Back to Treks</Button>
                    <Title level={2}>Edit Trek</Title>
                </div>
            </div>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" items={[{ key: 'basic', label: 'Basic Information', children: renderBasicInfoTab() }, { key: 'itinerary', label: 'Detailed Itinerary', children: renderItineraryTab() }]} />
                <div className="sticky bottom-0 bg-white border-t p-4 flex justify-end items-center mt-6">
                    <Space>
                        <Button onClick={() => navigate('/admin/treks')}>Cancel</Button>
                        <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>Update Trek</Button>
                    </Space>
                </div>
            </Form>
        </div>
    );
};

export default EditTrek;
