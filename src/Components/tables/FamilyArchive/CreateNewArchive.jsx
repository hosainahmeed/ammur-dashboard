import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  Upload,
  Row,
  Col,
  Spin,
  ConfigProvider,
  Select,
} from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaCalendarAlt } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';
import JoditComponent from '../../Shared/JoditComponent';
import { useCreateSubArchiveMutation } from '../../../Redux/services/dashboard apis/archiveApis';
import { useGetFamiliesQuery } from '../../../Redux/services/dashboard apis/familiesApis';
import { Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Text } = Typography;

function CreateNewArchive({ setCreateNewModal }) {
  const location = useLocation();
  const state = location.state;

  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  // API hooks
  const [createSubArchive, { isLoading: createLoading }] =
    useCreateSubArchiveMutation();
  const { data: families, isLoading: familiesLoading } = useGetFamiliesQuery(
    {}
  );

  const isLoading = createLoading;

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const onFinish = async (values) => {
    if (!description || description.trim() === '') {
      toast.error('Please enter a description');
      return;
    }

    const formData = new FormData();

    try {
      const data = {
        title: values.name,
        date: values.date.format('YYYY-MM-DD'),
        description: description,
        familyName: values.familyName,
        archieveCategoryId: state?.id,
      };

      if (file) {
        formData.append('file', file);
      }

      formData.append('data', JSON.stringify(data));

      await createSubArchive({ data: formData })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Archive created successfully!');
            onReset();
          }
        });
    } catch (error) {
      const errorMessage =
        error?.data?.errorSources?.[0]?.message ||
        error?.data?.message ||
        `Failed to create archive`;
      toast.error(errorMessage);
    }
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
    setDescription('');
    setContent('');
    if (setCreateNewModal) {
      setCreateNewModal(false);
    }
  };

  return (
    <Card bordered={true}>
      <Spin spinning={isLoading} tip={'Creating archive...'}>
        <div className="max-w-screen-xl mx-auto">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={[24, 16]}>
              {/* Image Upload */}
              <Col xs={24} md={24}>
                <Form.Item
                  label={
                    <span className="form-label flex items-center">
                      <FaImage className="label-icon mr-2" />
                      Archive Image
                    </span>
                  }
                  name="img"
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
                        <FaImage className="upload-icon text-3xl text-blue-400" />
                        <p className="upload-text mt-2 font-medium text-gray-600">
                          Click to upload archive image
                        </p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              {/* Date Picker */}
              <Col xs={24} md={12}>
                <ConfigProvider
                  theme={{
                    components: {
                      DatePicker: {
                        activeBorderColor: 'rgb(14,239,239)',
                        algorithm: true,
                        hoverBorderColor: 'rgb(82,196,26)',
                        colorPrimary: 'rgb(82,196,26)',
                      },
                    },
                  }}
                >
                  <Form.Item
                    label={
                      <span className="form-label flex items-center">
                        <FaCalendarAlt className="label-icon mr-2" />
                        Event Date <span className="text-red-500">*</span>
                      </span>
                    }
                    name="date"
                    rules={[
                      { required: true, message: 'Please select a date' },
                    ]}
                  >
                    <DatePicker
                      placeholder="Select event date"
                      className="w-full custom-datepicker"
                      suffixIcon={<FaCalendarAlt className="text-gray-400" />}
                      style={{ height: '40px' }}
                    />
                  </Form.Item>
                </ConfigProvider>
              </Col>

              {/* Title */}
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="form-label flex items-center">
                      <MdTitle className="label-icon mr-2" />
                      Title <span className="text-red-500">*</span>
                    </span>
                  }
                  name="name"
                  rules={[{ required: true, message: 'Please enter a title' }]}
                >
                  <Input
                    placeholder="Enter archive title"
                    className="custom-input"
                    prefix={<MdTitle className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Family Name */}
            <Form.Item
              label={
                <span className="form-label flex items-center">
                  <Text strong>
                    Family Name <span className="text-red-500">*</span>
                  </Text>
                </span>
              }
              name="familyName"
              rules={[{ required: true, message: 'Please select a family' }]}
            >
              <Select
                allowClear
                loading={familiesLoading}
                placeholder="Select Family"
                optionFilterProp="children"
              >
                {families?.data?.map((family) => (
                  <Select.Option key={family._id} value={family.name}>
                    {family.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            {/* Description */}
            <Row>
              <Col xs={24}>
                <Form.Item
                  label={
                    <span className="form-label flex items-center">
                      <MdDescription className="label-icon mr-2" />
                      Description <span className="text-red-500">*</span>
                    </span>
                  }
                  name="description"
                  validateStatus={!description ? 'error' : ''}
                  help={!description ? 'Please enter a description' : ''}
                >
                  <JoditComponent
                    setContent={setDescription}
                    content={content}
                  />
                </Form.Item>
              </Col>
            </Row>

            {/* Form Actions */}
            <div className="form-actions flex justify-end space-x-4 mt-8">
              {/* <Button
                onClick={onReset}
                className="reset-button"
                size="large"
                disabled={isLoading}
              >
                Cancel
              </Button> */}

              <Button
                htmlType="submit"
                loading={isLoading}
                className="submit-button"
                size="large"
                type="primary"
              >
                {isLoading ? 'Creating...' : 'Create Archive'}
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Card>
  );
}

export default CreateNewArchive;
