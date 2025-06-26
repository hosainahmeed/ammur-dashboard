import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Select,
  Switch,
  Typography,
} from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import JoditComponent from '../../Shared/JoditComponent';
import PageHeading from '../../Shared/PageHeading';
import { useGetFamiliesQuery } from '../../../Redux/services/dashboard apis/familiesApis';
import { useCreateLegacyMutation } from '../../../Redux/services/dashboard apis/lagecyApis';

const { Text } = Typography;

function CreateNewLegacy() {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');
  const [selectedFamily, setSelectedFamily] = useState(null);
  const [isAlive, setIsAlive] = useState(true);

  const { data: families, isLoading: familiesLoading } = useGetFamiliesQuery();
  const [createLegacyApi, { isLoading: isCreating }] =
    useCreateLegacyMutation();

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const handleFamilyChange = (value) => {
    setSelectedFamily(value);
    form.setFieldsValue({ family: value });
  };

  const handleStatusChange = (checked) => {
    setIsAlive(checked);
    if (checked) {
      form.setFieldsValue({ burial: '' });
    }
  };

  const onFinish = async (values) => {
    if (!file) {
      toast.error('Please upload a legacy image');
      return;
    }

    if (!selectedFamily) {
      toast.error('Please select a family');
      return;
    }

    if (!content.trim()) {
      toast.error('Please enter a description');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('familyName', selectedFamily);
    formData.append('dateOfBirth', values.dateOfBirth.format('YYYY-MM-DD'));
    formData.append('description', content);

    if (!isAlive && values.burial) {
      formData.append('burial', values.burial);
    }
    formData.append('file', file, file.name);

    try {
      await createLegacyApi(formData)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Legacy created successfully');
            form.resetFields();
            setFileList([]);
            setFile(null);
            setContent('');
            setSelectedFamily(null);
            setIsAlive(true);
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create legacy');
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        className="h-[calc(100vh-200px)] ::-webkit-scrollbar-none overflow-y-scroll overflow-x-hidden"
      >
        <Row gutter={[24, 16]}>
          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="form-label">
                  <FaImage className="label-icon" /> Legacy Image
                </span>
              }
              name="legacy_image"
              rules={[
                {
                  required: true,
                  message: 'Please upload a legacy image',
                },
              ]}
            >
              <Upload
                beforeUpload={() => false}
                onChange={handleFileChange}
                listType="picture-card"
                maxCount={1}
                accept="image/*"
                fileList={fileList}
              >
                {fileList.length === 0 && (
                  <div className="upload-content">
                    <FaImage className="upload-icon" />
                    <p className="upload-text">Upload Legacy Image</p>
                  </div>
                )}
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={
                <span className="form-label">
                  <FaCalendarAlt className="label-icon" /> Date of Birth
                </span>
              }
              name="dateOfBirth"
              rules={[
                { required: true, message: 'Please select date of birth' },
              ]}
            >
              <DatePicker
                placeholder="Select date of birth"
                className="custom-datepicker"
                style={{ width: '100%' }}
                suffixIcon={<FaCalendarAlt className="text-gray-400" />}
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={<span className="form-label">Title</span>}
              name="title"
              rules={[{ required: true, message: 'Please enter a title' }]}
            >
              <Input
                placeholder="Enter legacy title (e.g., John Doe's Legacy)"
                className="custom-input"
              />
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={<span className="form-label">Select Family</span>}
              name="family"
              rules={[{ required: true, message: 'Please select a family' }]}
            >
              <Select
                allowClear
                loading={familiesLoading}
                placeholder="Select Family"
                optionFilterProp="children"
                onChange={handleFamilyChange}
                value={selectedFamily}
              >
                {families?.data?.map((fam) => (
                  <Select.Option key={fam._id} value={fam.name}>
                    {fam.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={24}>
            <Form.Item
              label={<span className="form-label">Status</span>}
              name="status"
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Switch
                  checked={isAlive}
                  onChange={handleStatusChange}
                  checkedChildren="Alive"
                  unCheckedChildren="Deceased"
                />
                <Text type={isAlive ? 'success' : 'secondary'}>
                  {isAlive ? 'Person is alive' : 'Person is dead'}
                </Text>
              </div>
            </Form.Item>
          </Col>

          {!isAlive && (
            <Col xs={24} md={24}>
              <Form.Item
                label={
                  <span className="form-label">
                    <FaMapMarkerAlt className="label-icon" /> Burial Place
                  </span>
                }
                name="burial"
                rules={[
                  {
                    required: !isAlive,
                    message: 'Please enter burial place for deceased person',
                  },
                ]}
              >
                <Input
                  placeholder="Enter burial place (e.g., Cemetery of the Lost Souls)"
                  className="custom-input"
                />
              </Form.Item>
            </Col>
          )}
        </Row>

        <Form.Item
          label={<span className="form-label">Description</span>}
          name="description"
          validateStatus={!content ? 'error' : ''}
          help={!content ? 'Please enter a description' : ''}
        >
          <JoditComponent setContent={setContent} content={content} />
        </Form.Item>

        <div className="form-actions">
          <Button
            htmlType="submit"
            loading={isCreating}
            className="submit-button"
            size="large"
            type="primary"
          >
            {isCreating ? 'Creating Legacy...' : 'Create New Legacy'}
          </Button>
        </div>
      </Form>
    </>
  );
}

export default CreateNewLegacy;
