import React, { useState } from 'react';
import { Button, Popconfirm, Space, Table } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlayCircleFilled,
  PlusOutlined,
} from '@ant-design/icons';
import {
  useDeleteEventMutation,
  useGetEventQuery,
} from '../../../Redux/services/dashboard apis/eventApis';
import EventForm from './EventForm';
import VideoModal from './VideoModal';
import { FaRegCirclePlay } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import PageHeading from '../../../Components/Shared/PageHeading';

function Events() {
  const { data, isLoading, error } = useGetEventQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState('');
  const [editingEvent, setEditingEvent] = useState(null);
  const [deleteEvent] = useDeleteEventMutation();

  if (error) {
    toast.error('Failed to load events');
    return <div>Error loading events</div>;
  }

  const eventsData =
    data?.data?.map((event) => ({
      key: event._id,
      title: event.title,
      description: event.description,
      date: new Date(event.date).toLocaleDateString(),
      duration: event.duration,
      image: event.img || 'https://via.placeholder.com/150',
      video: event.video,
    })) || [];

  const handlePlayVideo = (videoUrl) => {
    if (!videoUrl) {
      toast.error('No video available');
      return;
    }
    setSelectedVideoUrl(videoUrl);
    setIsVideoModalOpen(true);
  };

  const handleEdit = (record) => {
    setEditingEvent(record);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent({ id: id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.dismiss();
            toast.success(res?.message || 'Event deleted successfully');
          }
        });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete event');
    }
  };

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Video',
      dataIndex: 'image',
      key: 'image',
      render: (image, record) => (
        <div
          className="relative w-20 h-12 overflow-hidden rounded cursor-pointer"
          onClick={() => handlePlayVideo(record.video)}
        >
          <img
            src={image}
            alt="image"
            className={`w-full h-full object-cover ${
              record.video ? 'brightness-50' : ''
            }`}
          />
          {record.video && (
            <>
              <PlayCircleFilled className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl" />
              <div className="absolute bottom-0 right-0 bg-gray-800 text-white text-xs px-1 py-0.5 rounded-tl">
                {record.duration}
              </div>
            </>
          )}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="bg-[#0C469D]"
            icon={<EditOutlined />}
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this event?"
            placement="bottomRight"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} size="small">
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <PageHeading title="Events" />
      <Button
        className="!bg-[#0C469D] !mb-3 !text-white"
        icon={<PlusOutlined />}
        onClick={() => {
          setEditingEvent(null);
          setIsModalOpen(true);
        }}
      >
        Add New Event
      </Button>

      <Table
        scroll={{ x: 1200 }}
        dataSource={eventsData}
        columns={columns}
        loading={isLoading}
        rowKey="key"
      />

      <EventForm
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        event={editingEvent}
      />

      <VideoModal
        open={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoUrl={selectedVideoUrl}
      />
    </div>
  );
}

export default Events;
