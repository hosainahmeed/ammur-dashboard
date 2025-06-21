import React, { useEffect, useState } from 'react';
import { Form, Input, DatePicker, Upload, Modal, Button, Image } from 'antd';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import {
  useCreateEventMutation,
  useUpdateEventMutation,
} from '../../../Redux/services/dashboard apis/eventApis';
import toast from 'react-hot-toast';

export default function EventForm({ open, onCancel, event }) {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [videoPreview, setVideoPreview] = useState('');
  const [createEvent, { isLoading: creating }] = useCreateEventMutation();
  const [updateEvent, { isLoading: updating }] = useUpdateEventMutation();

  useEffect(() => {
    if (event) {
      form.setFieldsValue({
        title: event.title,
        description: event.description,
        duration: event.duration,
        date: dayjs(event.date),
      });
      setImagePreview(event.image || '');
      setVideoPreview(event.video || '');
    } else {
      form.resetFields();
      setImageFile(null);
      setVideoFile(null);
      setImagePreview('');
      setVideoPreview('');
    }
  }, [event, form, open]);

  const handleFilePreview = (file, setFile, setPreview) => {
    setFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const handleImageChange = ({ fileList }) => {
    const file = fileList[0]?.originFileObj;
    file
      ? handleFilePreview(file, setImageFile, setImagePreview)
      : setImagePreview('');
  };

  const handleVideoChange = ({ file }) => {
    file && (setVideoFile(file), setVideoPreview(URL.createObjectURL(file)));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      ['title', 'description', 'duration'].forEach((key) =>
        formData.append(key, values[key])
      );
      formData.append('date', values.date.format('YYYY-MM-DD'));
      if (imageFile) formData.append('image', imageFile);
      if (videoFile) formData.append('video', videoFile);

      if (event && event.key) {
        await updateEvent({ id: event.key, data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Success');
              onCancel();
            }
          });
      } else {
        await createEvent({data:formData})
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Success');
              onCancel();
            }
          });
      }
    } catch (err) {
      toast.error(err?.data?.message || 'An error occurred');
    }
  };

  return (
    <Modal
      title={event ? 'Edit Event' : 'Create Event'}
      open={open}
      onCancel={onCancel}
      footer={null}
      forceRender
      width={800}
    >
      <Form requiredMark={false} form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Enter event title" />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} placeholder="Enter event description" />
        </Form.Item>
        <Form.Item
          name="duration"
          label="Duration"
          rules={[{ required: true }]}
        >
          <Input placeholder="e.g., 45 minutes" />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker className="w-full" />
        </Form.Item>

        <Form.Item label="Thumbnail Image">
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            listType="picture-card"
            onChange={handleImageChange}
            fileList={
              imagePreview
                ? [
                    {
                      uid: '-1',
                      name: 'image',
                      status: 'done',
                      url: imagePreview,
                    },
                  ]
                : []
            }
          >
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
          {!imagePreview && event?.image && (
            <Image width={200} src={event.image} style={{ marginTop: 8 }} />
          )}
        </Form.Item>

        <Form.Item label="Video">
          <Upload
            beforeUpload={() => false}
            showUploadList={false}
            onChange={handleVideoChange}
            accept="video/*"
          >
            <Button icon={<UploadOutlined />}>
              {videoPreview ? 'Change Video' : 'Upload Video'}
            </Button>
          </Upload>
          {videoPreview && (
            <video
              src={videoPreview}
              controls
              className="w-full mt-2"
              style={{ maxHeight: 300 }}
            />
          )}
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button onClick={onCancel}>Cancel</Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={creating || updating}
          >
            {event ? 'Update Event' : 'Create Event'}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
