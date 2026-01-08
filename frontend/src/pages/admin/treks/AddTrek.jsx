import React, { useState } from 'react';
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
  Collapse
} from 'antd';
import {
  SaveOutlined,
  UploadOutlined,
  PlusOutlined,
  MinusCircleOutlined,
  InfoCircleOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RichTextEditor from '../../../components/common/RichTextEditor';
import { adminService } from '../../../services/adminApi';

const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Title, Text } = Typography;

const AddTrek = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  const [featuredImage, setFeaturedImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();

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
          meals: Array.isArray(item.meals) ? item.meals.join(', ') : item.meals?.toString() || ''
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

      // Handle featured image - add as first image
      if (featuredImage) {
        formData.append('images', featuredImage);
      }

      // Handle gallery images
      if (galleryImages && galleryImages.length > 0) {
        galleryImages.forEach((file) => {
          if (file.originFileObj) {
            formData.append('images', file.originFileObj);
          }
        });
      }

      const response = await adminService.createListing(formData);

      if (response.success) {
        message.success('Trek added successfully!');
        navigate('/admin/treks');
      } else {
        throw new Error(response.message || 'Failed to create trek');
      }
    } catch (error) {
      console.error('Error adding trek:', error);
      message.error(error.response?.data?.message || error.message || 'Failed to add trek');
    } finally {
      setLoading(false);
    }
  };

  const handleFeaturedImageChange = (info) => {
    if (info.file.status === 'done' || info.file.originFileObj) {
      setFeaturedImage(info.file.originFileObj || info.file);
    }
  };

  const handleGalleryChange = ({ fileList }) => {
    setGalleryImages(fileList);
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
    if (Array.isArray(e)) {
      return e;
    }
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

          <Form.Item
            label="Trek Start/End Point"
            style={{ marginBottom: 0 }}
          >
            <Form.Item
              name="startPoint"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
              rules={[{ required: true, message: 'Start point is required' }]}
            >
              <Input placeholder="Start point (e.g., Kathmandu)" />
            </Form.Item>
            <Form.Item
              name="endPoint"
              style={{ display: 'inline-block', width: 'calc(50% - 8px)', marginLeft: '16px' }}
              rules={[{ required: true, message: 'End point is required' }]}
            >
              <Input placeholder="End point (e.g., Lukla)" />
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
            label="Discount Price ($)"
            name="discountPrice"
          >
            <InputNumber
              min={0}
              className="w-full"
              size="large"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Leave empty for no discount"
            />
          </Form.Item>

          <Form.Item
            label="Single Supplement ($)"
            name="singleSupplement"
          >
            <InputNumber
              min={0}
              className="w-full"
              size="large"
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/\$\s?|(,*)/g, '')}
              placeholder="Additional cost for single room"
            />
          </Form.Item>

          <Form.Item
            label="Deposit Required ($)"
            name="deposit"
            rules={[{ required: true, message: 'Please enter deposit amount' }]}
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
            label="Featured Image"
            name="featuredImage"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: true, message: 'Please upload a featured image' }]}
          >
            <Upload
              name="featuredImage"
              listType="picture-card"
              className="featured-image-uploader"
              showUploadList={false}
              beforeUpload={beforeUpload}
              onChange={handleFeaturedImageChange}
            >
              {featuredImage ? (
                <img src={URL.createObjectURL(featuredImage)} alt="featured" style={{ width: '100%' }} />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

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

        <Card title="Additional Information" className="mb-6">
          <Form.Item
            label="Accommodation"
            name="accommodation"
            rules={[{ required: true, message: 'Please select accommodation type' }]}
          >
            <Select placeholder="Select accommodation type" mode="multiple">
              {accommodationOptions.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Transportation"
            name="transportation"
            rules={[{ required: true, message: 'Please select transportation' }]}
          >
            <Select placeholder="Select transportation" mode="multiple">
              {transportOptions.map(item => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Group Discount Available?"
            name="groupDiscount"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Private Trip Available?"
            name="privateTrip"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Featured Trek?"
            name="featured"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            initialValue="draft"
          >
            <Select>
              <Option value="draft">Draft</Option>
              <Option value="published">Published</Option>
            </Select>
          </Form.Item>
        </Card>

        <Card title="SEO Settings" className="mb-6">
          <Form.Item
            label="SEO Title"
            name="seoTitle"
            tooltip="This will be used in the browser tab and search results"
          >
            <Input placeholder="E.g., Everest Base Camp Trek - 14 Days | JumaTrek" />
          </Form.Item>

          <Form.Item
            label="Meta Description"
            name="metaDescription"
            tooltip="Brief summary of the page for search engines"
          >
            <TextArea rows={3} maxLength={160} showCount />
          </Form.Item>

          <Form.Item
            label="Slug"
            name="slug"
            tooltip="URL-friendly version of the name"
            rules={[
              { required: true, message: 'Please enter URL slug' },
              {
                pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                message: 'Only lowercase letters, numbers, and hyphens. No spaces or special characters.',
              },
            ]}
          >
            <Input placeholder="everest-base-camp-trek" addonBefore="jumatrek.com/treks/" />
          </Form.Item>
        </Card>
      </Col>
    </Row>
  );

  const renderItineraryTab = () => (
    <Card title="Detailed Itinerary">
      <Alert
        message="Itinerary Information"
        description="Add detailed day-by-day itinerary for this trek. You can include highlights, walking hours, altitude, and other important details for each day."
        type="info"
        showIcon
        className="mb-6"
      />

      <Form.List name="detailedItinerary">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div key={key} className="mb-6 p-4 border rounded">
                <Row gutter={16} align="middle" className="mb-4">
                  <Col xs={24} md={2}>
                    <Form.Item
                      {...restField}
                      name={[name, 'day']}
                      label="Day"
                      rules={[{ required: true, message: 'Day is required' }]}
                    >
                      <InputNumber min={1} className="w-full" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={10}>
                    <Form.Item
                      {...restField}
                      name={[name, 'title']}
                      label="Title"
                      rules={[{ required: true, message: 'Title is required' }]}
                    >
                      <Input placeholder="E.g., Fly to Lukla & trek to Phakding" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={6}>
                    <Form.Item
                      {...restField}
                      name={[name, 'altitude']}
                      label="Altitude (m)"
                    >
                      <InputNumber className="w-full" placeholder="e.g., 2860" />
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

                <Row gutter={16} className="mb-4">
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'walkingHours']}
                      label="Walking Hours"
                    >
                      <Input placeholder="e.g., 5-6 hours" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'distance']}
                      label="Distance"
                    >
                      <Input placeholder="e.g., 12.5 km" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item
                      {...restField}
                      name={[name, 'accommodation']}
                      label="Accommodation"
                    >
                      <Input placeholder="e.g., Tea House" />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item
                  {...restField}
                  name={[name, 'description']}
                  label="Description"
                  rules={[{ required: true, message: 'Description is required' }]}
                >
                  <TextArea rows={4} placeholder="Detailed description of the day's activities" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'highlights']}
                  label="Highlights"
                >
                  <Select
                    mode="tags"
                    style={{ width: '100%' }}
                    placeholder="Add highlights (press enter to add)"
                    tokenSeparators={[',']}
                  />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, 'meals']}
                  label="Meals Included"
                >
                  <Select
                    mode="multiple"
                    placeholder="Select meals"
                    optionLabelProp="label"
                  >
                    <Option value="breakfast" label="Breakfast">Breakfast</Option>
                    <Option value="lunch" label="Lunch">Lunch</Option>
                    <Option value="dinner" label="Dinner">Dinner</Option>
                    <Option value="snacks" label="Snacks">Snacks</Option>
                  </Select>
                </Form.Item>

                <Divider />
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
  );

  return (
    <div className="add-trek-page">
      <div className="mb-6">
        <Button
          type="text"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate('/admin/treks')}
          className="mb-4"
        >
          Back to Treks
        </Button>
        <Title level={3}>Add New Trek</Title>
        <Text type="secondary">Fill in the details below to create a new trek package</Text>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: 'draft',
          difficulty: 'Moderate',
          region: 'Everest',
          groupSize: 12,
          price: 1500,
          deposit: 200,
          priceIncludes: [
            'Airport transfers',
            'Accommodation in tea houses',
            'All meals during the trek',
            'Experienced trekking guide',
            'TIMS card and trekking permits',
          ],
          priceExcludes: [
            'International flights',
            'Travel insurance',
            'Nepal visa fee',
            'Personal expenses',
            'Tips for guides and porters',
          ],
        }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          type="card"
          items={[
            {
              key: 'basic',
              label: 'Basic Information',
              children: renderBasicInfoTab(),
            },
            {
              key: 'itinerary',
              label: 'Detailed Itinerary',
              children: renderItineraryTab(),
            },
          ]}
        />

        <div className="sticky bottom-0 bg-white border-t p-4 -mx-6 -mb-6 mt-6 flex justify-between items-center">
          <div>
            <Form.Item name="saveAsDraft" valuePropName="checked" noStyle>
              <Switch defaultChecked={false} />
            </Form.Item>
            <span className="ml-2">Save as draft</span>
          </div>
          <Space>
            <Button onClick={() => navigate('/admin/treks')}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
              Save Trek
            </Button>
          </Space>
        </div>
      </Form>
    </div>
  );
};

export default AddTrek;
