import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Input } from 'antd';
import toast from 'react-hot-toast';
import UploadPreview from './UploadPreview';

const InterviewFormModal = ({
  open,
  setOpen,
  editData,
  setEditData,
  categoryId,
  createInterview,
  updateInterview,
  isCreating,
  isUpdating,
}) => {
  const [form] = Form.useForm();
  const [thumbnailList, setThumbnailList] = useState([]);
  const [videoList, setVideoList] = useState([]);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');

  useEffect(() => {
    if (editData) {
      form.setFieldsValue({
        title: editData.title,
        description: editData.description,
        duration: editData.duration,
      });
      if (editData.img) {
        setThumbnailList([
          { uid: '-1', name: 'thumb', status: 'done', url: editData.img },
        ]);
        setThumbnailPreview(editData.img);
      }
      if (editData.video) {
        setVideoList([
          { uid: '-2', name: 'video', status: 'done', url: editData.video },
        ]);
        setVideoPreview(editData.video);
      }
    }
  }, [editData, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('duration', values.duration || '00:00');
      if (thumbnailList[0]?.originFileObj)
        formData.append('image', thumbnailList[0].originFileObj);
      if (videoList[0]?.originFileObj)
        formData.append('video', videoList[0].originFileObj);
      formData.append('interviewCategoryId', categoryId);

      if (editData) {
        await updateInterview({ id: editData._id, data: formData }).unwrap();
        toast.success('Interview updated');
      } else {
        await createInterview({ data: formData }).unwrap();
        toast.success('Interview created');
      }
      handleClose();
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to save');
    }
  };

  const handleClose = () => {
    setOpen(false);
    form.resetFields();
    setEditData(null);
    setThumbnailList([]);
    setVideoList([]);
    setThumbnailPreview('');
    setVideoPreview('');
  };

  return (
    <Modal
      title={editData ? 'Edit Interview' : 'Add Interview'}
      open={open}
      onCancel={handleClose}
      onOk={handleSubmit}
      confirmLoading={isCreating || isUpdating}
      okText={editData ? 'Update' : 'Create'}
    >
      <Form form={form} layout="vertical">
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} placeholder="Enter description" />
        </Form.Item>
        <Form.Item name="duration" label="Duration (e.g., 12:00)">
          <Input placeholder="Enter duration" />
        </Form.Item>
        <Form.Item label="Thumbnail">
          <UploadPreview
            type="image"
            fileList={thumbnailList}
            previewUrl={thumbnailPreview}
            setFileList={setThumbnailList}
            setPreviewUrl={setThumbnailPreview}
          />
        </Form.Item>
        <Form.Item label="Video">
          <UploadPreview
            type="video"
            fileList={videoList}
            previewUrl={videoPreview}
            setFileList={setVideoList}
            setPreviewUrl={setVideoPreview}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InterviewFormModal;
