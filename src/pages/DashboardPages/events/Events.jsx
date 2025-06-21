/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
  Space,
  Table,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  PlayCircleFilled,
  DeleteOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import locale from 'antd/locale/en_GB';
import { FaEdit } from 'react-icons/fa';
import PageHeading from '../../../Components/Shared/PageHeading';
import { useGetEventQuery } from '../../../Redux/services/dashboard apis/eventApis';

const { TextArea } = Input;

const initialEventsData = [
  {
    id: '1',
    title: 'Tech Conference 2024',
    description: 'Join us for the premier tech conference of the year!',
    date: '2024-12-15',
    thumbnail:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '12:34', // Added duration
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'A showcase of contemporary art from local artists.',
    date: '2024-11-20',
    thumbnail:
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60',
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '15:10', // Added duration
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

function Events() {
  const { data } = useGetEventQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [events, setEvents] = useState(initialEventsData);
  const [editingEvent, setEditingEvent] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [videoPreviewUrl, setVideoPreviewUrl] = useState(null);

  const eventsData = data?.data?.map((event) => ({
    _id: event?._id,
    interviewCategoryId: event?.interviewCategoryId,
    title: event?.title,
    description: event?.description,
    duration: event?.duration,
    img: event?.img,
    video: event?.video,
    isDeleted: event?.isDeleted,
  }));

  const showModal = () => {
    setIsModalOpen(true);
    setEditingEvent(null);
    form.resetFields();
    // Clear all previews and files when opening a new modal
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setVideoFile(null);
    setVideoPreviewUrl(null);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
    form.resetFields();
    // Clear all previews and files when canceling
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setVideoFile(null);
    setVideoPreviewUrl(null);
  };

  const onFinish = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('date', values.date.format('YYYY-MM-DD'));
    if (thumbnailFile) {
      formData.append('thumbnail', thumbnailFile);
    }
    if (videoFile) {
      formData.append('video', videoFile);
    }
    formData.append('duration', values.duration || '');

    if (editingEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              title: values.title,
              description: values.description,
              date: values.date.format('YYYY-MM-DD'),
              // Only update thumbnail if a new one was provided
              thumbnail: thumbnailPreview || event.thumbnail,
              // Only update video if a new one was provided
              video: videoPreviewUrl || event.video,
              duration: values.duration || event.duration,
            }
          : event
      );
      setEvents(updatedEvents);
      message.success('Event updated successfully!');
    } else {
      const newEvent = {
        id: Date.now().toString(),
        title: values.title,
        description: values.description,
        date: values.date.format('YYYY-MM-DD'),
        thumbnail:
          thumbnailPreview ||
          'https://via.placeholder.com/150/888888/FFFFFF?Text=No%20Image',
        video: videoPreviewUrl || '',
        duration: values.duration || '0:00', // Default duration
      };
      setEvents([...events, newEvent]);
      message.success('Event created successfully!');
    }

    setIsModalOpen(false);
    form.resetFields();
    // Clear all previews and files after submission
    setThumbnailPreview(null);
    setThumbnailFile(null);
    setVideoFile(null);
    setVideoPreviewUrl(null);
  };

  const handleEdit = (record) => {
    setEditingEvent(record);
    setIsModalOpen(true);
    form.setFieldsValue({
      title: record.title,
      description: record.description,
      date: dayjs(record.date),
      duration: record.duration,
    });

    // Set the thumbnail preview to the existing thumbnail
    setThumbnailPreview(record.thumbnail);

    // Set video preview URL for existing videos
    if (record.video) {
      setVideoPreviewUrl(record.video);
    } else {
      setVideoPreviewUrl(null);
    }
  };

  const handlePlayVideo = (videoUrl) => {
    setSelectedVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const handleThumbnailChange = async ({ file }) => {
    // Handle thumbnail upload
    if (file.status === 'uploading') {
      return;
    }

    if (file.status === 'done' || file.status === 'error') {
      try {
        const base64 = await getBase64(file.originFileObj);
        setThumbnailPreview(base64);
        setThumbnailFile(file.originFileObj);
      } catch (error) {
        console.error('Error processing thumbnail:', error);
        message.error('Failed to process thumbnail.');
      }
    }
  };

  const handleVideoChange = ({ file }) => {
    // Handle video upload
    if (file.status === 'uploading') {
      return;
    }

    if (file.status === 'done' || file.status === 'error') {
      try {
        setVideoFile(file.originFileObj);
        const videoUrl = URL.createObjectURL(file.originFileObj);
        setVideoPreviewUrl(videoUrl);
      } catch (error) {
        console.error('Error processing video:', error);
        message.error('Failed to process video.');
      }
    }
  };

  // Custom request implementation to simulate a completed upload
  const customRequest = ({ onSuccess }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Thumbnail',
      dataIndex: 'thumbnail',
      key: 'thumbnail',
      render: (thumbnail, record) => (
        <div className="relative w-20 h-12 overflow-hidden rounded">
          {record.video ? (
            <>
              <div className="absolute inset-0 bg-black flex items-center justify-center opacity-70">
                <PlayCircleFilled
                  className="text-white text-xl cursor-pointer"
                  onClick={() => handlePlayVideo(record.video)}
                />
              </div>
              <img
                src={thumbnail}
                alt="thumbnail"
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(50%)' }}
              />
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-tl">
                {record.duration}
              </div>
            </>
          ) : (
            <img
              src={thumbnail}
              alt="thumbnail"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      ),
    },
    {
      title: 'Video',
      dataIndex: 'video',
      key: 'video',
      render: (video, record) =>
        video ? (
          <Button
            type="link"
            onClick={() => handlePlayVideo(video)}
            icon={<PlayCircleFilled />}
          >
            Play
          </Button>
        ) : (
          <span>No Video</span>
        ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="!bg-[#0C469D]"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => {
              const updatedEvents = events.filter(
                (event) => event.id !== record.id
              );
              setEvents(updatedEvents);
              message.success('Event deleted successfully!');
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white flex items-center px-4 justify-between rounded-md shadow-md">
        <PageHeading title={'Events'} />
        <Button
          className="!bg-[#0C469D]"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Add New Event
        </Button>
      </div>

      <Table dataSource={events} columns={columns} rowKey="id" />

      <Modal
        title={editingEvent ? 'Edit Event' : 'Create New Event'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            date: dayjs(),
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: 'Please enter the event title!' },
            ]}
          >
            <Input placeholder="Event Title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please enter the event description!',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Event Description" />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              { required: true, message: 'Please select the event date!' },
            ]}
          >
            <DatePicker locale={locale} className="w-full" />
          </Form.Item>

          <Form.Item label="Thumbnail">
            <Upload
              name="thumbnail"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              customRequest={customRequest}
              onChange={handleThumbnailChange}
            >
              {thumbnailPreview ? (
                <div className="w-full h-full relative">
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-70">
                      <FaEdit />
                    </div>
                  </div>
                  <img
                    src={thumbnailPreview}
                    alt="thumbnail"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </div>
              ) : (
                <div>
                  <PlusOutlined />
                  <div className="ant-upload-text">Upload</div>
                </div>
              )}
            </Upload>
            <div className="mt-1 text-xs text-gray-500">
              Click to upload or change thumbnail
            </div>
          </Form.Item>

          <Form.Item label="Event Video">
            <Upload
              name="video"
              customRequest={customRequest}
              onChange={handleVideoChange}
              showUploadList={false}
              accept="video/*"
            >
              <Button
                className="!bg-[#0C469D] !text-white"
                icon={<UploadOutlined />}
              >
                {videoPreviewUrl ? 'Change Video' : 'Upload Video'}
              </Button>
            </Upload>

            {videoPreviewUrl && (
              <div className="mt-3">
                <p className="mb-1 font-medium">Video Preview:</p>
                <video
                  src={videoPreviewUrl}
                  controls
                  className="w-full h-48 object-contain border rounded"
                />
              </div>
            )}
          </Form.Item>

          <Form.Item label="Video Duration (e.g., 12:34)" name="duration">
            <Input placeholder="Enter video duration" />
          </Form.Item>

          <Form.Item className="text-right mb-0">
            <Space>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingEvent ? 'Update Event' : 'Create Event'}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        open={isVideoModalOpen}
        title="Event Video"
        onCancel={() => setIsVideoModalOpen(false)}
        footer={null}
        width={800}
        destroyOnClose={true}
      >
        {selectedVideoUrl && (
          <video src={selectedVideoUrl} controls className="w-full" autoPlay />
        )}
      </Modal>
    </div>
  );
}

export default Events;
