import React, { useState, useRef } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import {
  Button,
  Card,
  Empty,
  Popconfirm,
  Form,
  Input,
  Modal,
  Upload,
  message,
  Spin,
} from 'antd';
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaUpload,
  FaPlay,
  FaPause,
} from 'react-icons/fa';
import toast from 'react-hot-toast';
// Uncomment these when you connect to your API
// import { useCreateInterviewMutation, useUpdateInterviewMutation, useDeleteInterviewMutation, useGetCategoriesQuery } from "./categoriesApiSlice";

const { Dragger } = Upload;

function InterViews() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [thumbnailList, setThumbnailList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const videoRefs = useRef({});

  // RTK Query hooks (commented out)
  // const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();
  // const [createInterview, { isLoading: isCreating }] = useCreateInterviewMutation();
  // const [updateInterview, { isLoading: isUpdating }] = useUpdateInterviewMutation();
  // const [deleteInterview] = useDeleteInterviewMutation();

  // For demo/testing, using local state categories
  const [categories, setCategories] = useState([
    {
      id: 1,
      title: 'Life Lessons & Values',
      duration: '12:34',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60',
    },
    {
      id: 2,
      title: 'Spirituality & Beliefs',
      duration: '15:10',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      videoUrl: 'https://www.w3schools.com/html/movie.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&auto=format&fit=crop&q=60',
    },
  ]);

  const handleEdit = (interview) => {
    setEditData(interview);
    form.setFieldsValue({
      title: interview.title,
      description: interview.description,
      duration: interview.duration,
    });

    // Set the preview URLs for the existing media
    setThumbnailPreview(interview.thumbnail || '');
    setVideoPreview(interview.videoUrl || '');

    setThumbnailList(
      interview.thumbnail
        ? [
            {
              uid: '-1',
              name: 'thumbnail.png',
              status: 'done',
              url: interview.thumbnail,
            },
          ]
        : []
    );
    setVideoList(
      interview.videoUrl
        ? [
            {
              uid: '-2',
              name: 'video.mp4',
              status: 'done',
              url: interview.videoUrl,
            },
          ]
        : []
    );

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // Uncomment to use RTK Query API call
    // try {
    //   await deleteInterview(id).unwrap();
    //   toast.success('Interview deleted successfully');
    // } catch (err) {
    //   toast.error('Failed to delete interview');
    // }

    // For demo, remove locally:
    setCategories((prev) => prev.filter((item) => item.id !== id));
    toast.success('Interview deleted');
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const thumbnailFile = thumbnailList[0]?.originFileObj || null;
      const videoFile = videoList[0]?.originFileObj || null;
      console.log(thumbnailFile, videoFile);
      // For demo, use local URL objects or keep existing URLs
      let thumbnailUrl = thumbnailPreview || editData?.thumbnail || '';
      let videoUrl = videoPreview || editData?.videoUrl || '';

      if (editData) {
        // Demo local update
        setCategories((prev) =>
          prev.map((item) =>
            item.id === editData.id
              ? {
                  ...item,
                  title: values.title,
                  description: values.description,
                  duration: values.duration || item.duration,
                  thumbnail: thumbnailUrl,
                  videoUrl: videoUrl,
                }
              : item
          )
        );
        toast.success('Interview updated');
      } else {
        // Demo local create
        const newItem = {
          id: Date.now(),
          title: values.title,
          description: values.description,
          duration: values.duration || '00:00',
          thumbnail: thumbnailUrl,
          videoUrl: videoUrl,
        };
        setCategories((prev) => [newItem, ...prev]);
        toast.success('Interview created');
      }

      handleCloseModal();
    } catch (err) {
      toast.error(err.data?.message || 'Failed to save interview');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    form.resetFields();
    setThumbnailList([]);
    setVideoList([]);
    setThumbnailPreview('');
    setVideoPreview('');
  };

  const handleCardMouseEnter = (id) => {
    setHoveredCardId(id);
    const videoRef = videoRefs.current[id];
    if (videoRef) {
      videoRef.play().catch((err) => {
        // Autoplay was prevented, show play button
        console.log('Autoplay prevented:', err);
      });
      setIsVideoPlaying(true);
    }
  };

  const handleCardMouseLeave = (id) => {
    setHoveredCardId(null);
    const videoRef = videoRefs.current[id];
    if (videoRef) {
      videoRef.pause();
      videoRef.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const toggleVideoPlay = (id, e) => {
    e.stopPropagation();
    const videoRef = videoRefs.current[id];
    if (videoRef) {
      if (videoRef.paused) {
        videoRef.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const thumbnailUploadProps = {
    onRemove: () => {
      setThumbnailList([]);
      setThumbnailPreview('');
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }

      // Create preview URL for the uploaded image
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);

      // Add to upload list
      setThumbnailList([
        {
          ...file,
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: previewUrl,
          originFileObj: file,
        },
      ]);

      return false;
    },
    fileList: thumbnailList,
    maxCount: 1,
  };

  const videoUploadProps = {
    onRemove: () => {
      setVideoList([]);
      setVideoPreview('');
    },
    beforeUpload: (file) => {
      const isVideo = file.type.startsWith('video/');
      if (!isVideo) {
        message.error('You can only upload video files!');
        return Upload.LIST_IGNORE;
      }

      // Create preview URL for the uploaded video
      const previewUrl = URL.createObjectURL(file);
      setVideoPreview(previewUrl);

      // Add to upload list
      setVideoList([
        {
          ...file,
          uid: file.uid,
          name: file.name,
          status: 'done',
          url: previewUrl,
          originFileObj: file,
        },
      ]);

      return false;
    },
    fileList: videoList,
    maxCount: 1,
  };

  // if (isLoading) return <Spin size="large" className="flex justify-center" />;
  // if (isError) return <div>Error loading categories</div>;

  return (
    <div className="p-5 container mx-auto">
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <PageHeading title={'InterViews'} />
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setShowModal(true)}
          className="!flex !items-center !gap-2 !bg-[#0C469D] !text-white"
        >
          Add New
        </Button>
      </div>

      {categories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((item) => (
            <Card
              key={item.id}
              className="h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
              cover={
                <div
                  className="relative h-[180px] cursor-pointer"
                  onMouseEnter={() => handleCardMouseEnter(item.id)}
                  onMouseLeave={() => handleCardMouseLeave(item.id)}
                >
                  {/* Thumbnail/Video container */}
                  {hoveredCardId === item.id && item.videoUrl ? (
                    <div className="relative h-full w-full">
                      <video
                        ref={(el) => {
                          if (el) videoRefs.current[item.id] = el;
                        }}
                        src={item.videoUrl}
                        className="h-full w-full object-cover"
                        muted
                        loop
                      />
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-transparent bg-opacity-30"
                        onClick={(e) => toggleVideoPlay(item.id, e)}
                      >
                        <button className="p-3 bg-white bg-opacity-70 rounded-full text-blue-600 hover:bg-opacity-90 transition-all">
                          {isVideoPlaying ? (
                            <FaPause size={18} />
                          ) : (
                            <FaPlay size={18} />
                          )}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <img
                      alt={item.title}
                      src={item.thumbnail || 'https://via.placeholder.com/150'}
                      className="h-full w-full object-cover"
                    />
                  )}
                  {/* Duration badge */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 text-xs rounded">
                    {item.duration}
                  </div>
                </div>
              }
              actions={[
                <Button
                  type="text"
                  icon={<FaEdit />}
                  onClick={() => handleEdit(item)}
                  className="!flex !w-full !items-center !justify-center"
                />,
                <Popconfirm
                  title="Are you sure you want to delete this item?"
                  placement="top"
                  onConfirm={() => handleDelete(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button
                    type="text"
                    icon={<FaTrash />}
                    danger
                    className="!flex !w-full !items-center !justify-center"
                  />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                title={
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="!text-lg !font-semibold">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                }
              />
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          description={
            <span className="!text-gray-400 !text-base">
              No interviews yet. Add your first item!
            </span>
          }
          className="!flex !flex-col !items-center !justify-center !p-10 !bg-white !rounded-lg !shadow-sm"
        >
          <Button
            type="primary"
            icon={<FaPlus />}
            onClick={() => setShowModal(true)}
            className="!mt-4"
          >
            Add New Item
          </Button>
        </Empty>
      )}

      <Modal
        title={editData ? 'Edit Interview' : 'Add New Interview'}
        open={showModal}
        width={800}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            onClick={handleSubmit}
            className="!bg-[#0C469D] !text-white"
            // loading={isCreating || isUpdating}
          >
            {editData ? 'Update' : 'Save'}
          </Button>,
        ]}
      >
        <Form requiredMark={false} form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input placeholder="Enter title" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea placeholder="Enter description" rows={3} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="Duration (e.g., 12:30)"
            rules={[{ required: false }]}
          >
            <Input placeholder="Enter video duration" />
          </Form.Item>

          <Form.Item label="Upload Thumbnail Image">
            <Dragger
              {...thumbnailUploadProps}
              className="!flex !flex-col !items-center !justify-center !p-4 !border-2 !border-dashed !border-gray-300 !rounded-lg"
            >
              <p className="ant-upload-drag-icon !flex !items-center !justify-center">
                <FaUpload className="text-gray-400 text-2xl" />
              </p>
              <p className="ant-upload-text">
                Click or drag image file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single thumbnail image upload
              </p>
            </Dragger>

            {/* Image Preview */}
            {thumbnailPreview && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Thumbnail Preview:
                </h4>
                <div className="w-full h-40 rounded overflow-hidden border border-gray-200">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </Form.Item>

          <Form.Item label="Upload Video File">
            <Dragger
              {...videoUploadProps}
              className="!flex !flex-col !items-center !justify-center !p-4 !border-2 !border-dashed !border-gray-300 !rounded-lg"
            >
              <p className="ant-upload-drag-icon !flex !items-center !justify-center">
                <FaUpload className="text-gray-400 text-2xl" />
              </p>
              <p className="ant-upload-text">
                Click or drag video file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single video upload
              </p>
            </Dragger>

            {/* Video Preview */}
            {videoPreview && (
              <div className="mt-4">
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  Video Preview:
                </h4>
                <div className="w-full h-56 rounded overflow-hidden border border-gray-200">
                  <video
                    src={videoPreview}
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                </div>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default InterViews;
