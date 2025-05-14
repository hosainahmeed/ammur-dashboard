import { Button, Card, DatePicker, Form, Input, Upload, Row, Col } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaCalendarAlt } from 'react-icons/fa';
import JoditComponent from '../../Shared/JoditComponent';
import PageHeading from '../../Shared/PageHeading';
import './HistoryForm.css';

function CreatNewHistory() {
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const initialData = {
    name: 'name',
    description: `
      if (!file) {
      toast.error('Please upload a category image');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category_image', file);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('description', description);`,
  };
  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const onFinish = async (values) => {
    if (!file) {
      toast.error('Please upload a category image');
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('category_image', file);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    formData.append('description', description);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('History created successfully!');
      form.resetFields();
      setFileList([]);
      setDescription('');
    } catch (error) {
      toast.error('Failed to create history');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="history-form-container">
      <div className="page-header">
        <div className="flex mb-4 items-center justify-between bg-white shadow-sm pr-12 rounded-md w-full">
          <PageHeading title="Create New History Timeline" />
        </div>
      </div>

      <Card className="form-card">
        <div className="max-w-screen-xl mx-auto">
          <Form
            form={form}
            onFinish={onFinish}
            initialValues={initialData}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={12}>
                <Form.Item
                  label={
                    <span className="form-label">
                      <FaImage className="label-icon" /> Image
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
                        <FaImage className="upload-icon" />
                        <p className="upload-text">Upload Timeline Image</p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

              <Col xs={24} md={24}>
                <Form.Item
                  label={
                    <span className="form-label">
                      <FaCalendarAlt className="label-icon" /> Date
                    </span>
                  }
                  name="date"
                  rules={[{ required: true, message: 'Please select a date' }]}
                >
                  <DatePicker
                    placeholder="Select event date"
                    className="custom-datepicker"
                    suffixIcon={<FaCalendarAlt className="text-gray-400" />}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={24}>
                <Form.Item
                  label={<span className="form-label">Title</span>}
                  name="name"
                  rules={[{ required: true, message: 'Please enter a title' }]}
                >
                  <Input
                    placeholder="Enter timeline event title"
                    className="custom-input"
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label={<span className="form-label">Description</span>}
              name="description"
              rules={[
                { required: true, message: 'Please enter a description' },
              ]}
            >
              <div className="description-editor">
                <JoditComponent
                  value={description}
                  onChange={setDescription}
                  config={{
                    height: 200,
                    buttons:
                      'bold,italic,underline,ul,ol,font,fontsize,align,link,undo,redo',
                  }}
                />
              </div>
            </Form.Item>

            <div className="form-actions">
              <Button
                htmlType="submit"
                loading={isSubmitting}
                className="submit-button"
                size="large"
              >
                {isSubmitting ? 'Creating...' : 'Create New History'}
              </Button>

              <Button
                onClick={() => {
                  form.resetFields();
                  setFileList([]);
                  setDescription('');
                }}
                className="reset-button"
                size="large"
              >
                Clear Form
              </Button>
            </div>
          </Form>
        </div>
      </Card>
    </div>
  );
}

export default CreatNewHistory;
