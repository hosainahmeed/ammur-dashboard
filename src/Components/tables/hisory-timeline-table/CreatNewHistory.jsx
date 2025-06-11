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
  Alert,
} from 'antd';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';
import PageHeading from '../../Shared/PageHeading';
import './HistoryForm.css';
import JoditComponent from '../../Shared/JoditComponent';
import { useCreateTimelineMutation } from '../../../Redux/services/dashboard apis/timelineApis';

function CreatNewHistory() {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [initialData, setInitialData] = useState({
    name: '',
  });
  const [createTimeline, { isLoading }] = useCreateTimelineMutation();

  useEffect(() => {
    setInitialData({ name: 'History Timeline' });
    setContent('');
  }, []);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const onFinish = async (values) => {
    if (!file) {
      toast.error('Please upload a timeline image');
      return;
    }

    if (!description || description.trim() === '') {
      toast.error('Please enter a description');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.name);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('description', description);
    formData.append('file', file);

    try {
      await createTimeline({ data: formData })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || 'History timeline created successfully!'
            );
            form.resetFields();
            setFileList([]);
            setDescription('');
            setContent('');
          }
        });
    } catch (error) {
      toast.error('Failed to create history timeline');
    }
  };

  const onReset = () => {
    form.resetFields();
    setFileList([]);
    setDescription('');
    setContent('');
  };

  return (
    <div className="history-form-container">
      <div className="page-header">
        <div className="flex mb-6 items-center justify-between bg-white p-4 shadow-sm rounded-lg">
          <PageHeading
            title="Create New History Timeline"
            icon={<FaHistory className="mr-2 text-blue-500" />}
          />
        </div>
      </div>

      <Card
        className="form-card shadow-lg"
        title={
          <span className="text-lg font-semibold text-gray-800">
            Timeline Details
          </span>
        }
        bordered={false}
      >
        <Spin spinning={isLoading} tip="Creating timeline...">
          <div className="max-w-screen-xl mx-auto">
            <Form
              form={form}
              onFinish={onFinish}
              initialValues={initialData}
              layout="vertical"
              requiredMark="optional"
            >
              <Row gutter={[24, 16]}>
                <Col xs={24} md={6}>
                  <Form.Item
                    label={
                      <span className="form-label flex items-center">
                        <FaImage className="label-icon mr-2" />
                        Timeline Image (Required)
                      </span>
                    }
                    name="category_image"
                    rules={[
                      {
                        required: true,
                        message: 'Please upload a timeline image',
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
                      className="image-uploader"
                    >
                      {fileList.length === 0 && (
                        <div className="upload-content">
                          <FaImage className="upload-icon text-3xl text-blue-400" />
                          <p className="upload-text mt-2 font-medium text-gray-600">
                            Click to upload timeline image
                          </p>
                          <p className="text-xs text-gray-400">
                            JPG, PNG (Max 5MB)
                          </p>
                        </div>
                      )}
                    </Upload>
                  </Form.Item>
                </Col>

                <Col xs={24} md={24}>
                  <Form.Item
                    label={
                      <span className="form-label flex items-center">
                        <FaCalendarAlt className="label-icon mr-2" />
                        Event Date (Required)
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
                </Col>

                <Col xs={24}>
                  <Form.Item
                    label={
                      <span className="form-label flex items-center">
                        <MdTitle className="label-icon mr-2" />
                        Title (Required)
                      </span>
                    }
                    name="name"
                    rules={[
                      { required: true, message: 'Please enter a title' },
                    ]}
                  >
                    <Input
                      placeholder="Enter timeline event title"
                      className="custom-input"
                      prefix={<MdTitle className="text-gray-400" />}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label={
                  <span className="form-label flex items-center">
                    <MdDescription className="label-icon mr-2" />
                    Description (Required)
                  </span>
                }
                name="description"
                validateStatus={!description ? 'error' : ''}
                help={!description ? 'Please enter a description' : ''}
              >
                <JoditComponent setContent={setDescription} content={content} />
              </Form.Item>

              <div className="form-actions flex justify-end space-x-4 mt-8">
                <Button
                  onClick={onReset}
                  className="reset-button"
                  size="large"
                  disabled={isLoading}
                >
                  Clear Form
                </Button>

                <Button
                  htmlType="submit"
                  loading={isLoading}
                  className="submit-button"
                  size="large"
                  type="primary"
                >
                  {isLoading ? 'Creating...' : 'Create Timeline'}
                </Button>
              </div>
            </Form>
          </div>
        </Spin>
      </Card>
    </div>
  );
}

export default CreatNewHistory;
