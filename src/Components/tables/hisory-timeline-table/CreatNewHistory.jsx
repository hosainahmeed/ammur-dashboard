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
} from 'antd';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaImage, FaCalendarAlt, FaHistory } from 'react-icons/fa';
import { MdTitle, MdDescription } from 'react-icons/md';
import './HistoryForm.css';
import JoditComponent from '../../Shared/JoditComponent';
import {
  useCreateTimelineMutation,
  useGetSingleTimelineQuery,
  useUpdateTimelineMutation,
} from '../../../Redux/services/dashboard apis/timelineApis';
import dayjs from 'dayjs';

function CreatNewHistory({ id, setCreateNewModal }) {
  const { data: singleTimeLine } = useGetSingleTimelineQuery(
    { id: id },
    {
      skip: !id,
    }
  );
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [createTimeline, { isLoading }] = useCreateTimelineMutation();
  const [updateTimeline] = useUpdateTimelineMutation();

  useEffect(() => {
    if (id === null) {
      form.resetFields;
    }
    if (singleTimeLine?.data) {
      form.setFieldsValue({
        name: singleTimeLine?.data?.title,
        date: dayjs(singleTimeLine?.data?.date),
      });
      setContent(singleTimeLine?.data?.description);
      setDescription(singleTimeLine?.data?.description);

      if (singleTimeLine?.data?.img) {
        setFileList([
          {
            uid: '-1',
            name: 'timeline-image',
            status: 'done',
            url: singleTimeLine?.data?.img,
          },
        ]);
      }
    }
  }, [singleTimeLine, form]);

  const handleFileChange = ({ fileList }) => {
    setFileList(fileList);
    setFile(fileList.length ? fileList[0].originFileObj : null);
  };

  const onFinish = async (values) => {
    if (!file && !id) {
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
    if (file !== null) {
      formData.append('file', file);
    }
    try {
      if (!id) {
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
      } else {
        await updateTimeline({ id, data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(
                res?.message || 'History timeline updated successfully!'
              );
              onReset();
            }
          });
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create history timeline');
    }
  };

  const onReset = () => {
    form.resetFields();
    setCreateNewModal(false);
    setFileList([]);
    setDescription('');
    setContent('');
  };

  return (
    <Card bordered={true}>
      <Spin spinning={isLoading} tip="Creating timeline...">
        <div className="max-w-screen-xl mx-auto">
          <Form
            form={form}
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
          >
            <Row gutter={[24, 16]}>
              <Col xs={24} md={24}>
                <Form.Item
                  label={
                    <span className="form-label flex items-center">
                      <FaImage className="label-icon mr-2" />
                      Timeline Image
                    </span>
                  }
                  name="category_image"
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
                          Click to upload timeline image
                        </p>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </Col>

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
                </ConfigProvider>
              </Col>

              <Col xs={12}>
                <Form.Item
                  label={
                    <span className="form-label flex items-center">
                      <MdTitle className="label-icon mr-2" />
                      Title (Required)
                    </span>
                  }
                  name="name"
                  rules={[{ required: true, message: 'Please enter a title' }]}
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
                onClick={() => onReset()}
                className="reset-button"
                size="large"
                disabled={isLoading}
              >
                Close
              </Button>

              <Button
                htmlType="submit"
                loading={isLoading}
                className="submit-button"
                size="large"
                type="primary"
              >
                {isLoading
                  ? id
                    ? 'Updating...'
                    : 'Creating...'
                  : id
                  ? 'Update Timeline'
                  : 'Create Timeline'}
              </Button>
            </div>
          </Form>
        </div>
      </Spin>
    </Card>
  );
}

export default CreatNewHistory;
