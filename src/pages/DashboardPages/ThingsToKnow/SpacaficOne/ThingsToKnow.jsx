// imports remain unchanged
import React, { useState } from 'react';
import {
  Breadcrumb,
  Button,
  Card,
  Descriptions,
  Popconfirm,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
  message,
} from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaEye, FaTrash, FaUpload } from 'react-icons/fa6';
import { UploadOutlined } from '@ant-design/icons';
import { useSingleThingsToKnowQuery } from '../../../../Redux/services/dashboard apis/thingsToKnowApis';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import JoditComponent from '../../../../Components/Shared/JoditComponent';

function ThingsToKnowSpecific() {
  const [form] = Form.useForm();
  const location = useLocation();
  const id = location.state;

  const { data } = useSingleThingsToKnowQuery({ id: id });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [content, setContent] = useState('');
  const showModal = (item) => {
    setSelectedBlog(item);
    setIsModalVisible(true);
  };

  const showEditModal = (item) => {
    setSelectedBlog(item);
    setContent(item.description || '');
    setFileList([{ uid: '-1', url: item.img, name: 'existing-image.png' }]);
    form.setFieldsValue({
      title: item.title,
      date: dayjs(item.createdAt),
    });
    setIsEditModalVisible(true);
  };

  const showCreateModal = () => {
    form.resetFields();
    setFileList([]);
    setContent('');
    setIsCreateModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
    setSelectedBlog(null);
    setContent('');
    setFileList([]);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleDelete = (id) => {
    // plug in delete mutation here
    toast.success('Deleted successfully');
  };

  const handleUpdate = () => {
    const values = form.getFieldsValue();
    const updatedData = {
      ...values,
      description: content,
      image: fileList[0]?.url || null,
    };
    console.log('Updated Data:', updatedData);
    toast.success('Blog updated successfully');
    handleCancel();
  };

  const handleCreate = () => {
    const values = form.getFieldsValue();
    const newData = {
      ...values,
      description: content,
      image: fileList[0]?.url || null,
    };
    console.log('Created Data:', newData);
    toast.success('Blog created successfully');
    handleCancel();
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1));
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const uploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('You can only upload image files!');
        return Upload.LIST_IGNORE;
      }

      setFileList([file]);
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList);
    },
    onPreview: handlePreview,
    fileList,
    maxCount: 1,
    listType: 'picture-card',
    accept: 'image/*',
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <Breadcrumb
          items={[
            {
              title: <Link to="/things-to-know">Things To Know</Link>,
            },
            {
              title: `${data?.data?.title}`,
            },
          ]}
        />
        <Button
          className="!bg-[#0C469D] !text-white"
          icon={<FaPlus />}
          onClick={showCreateModal}
        >
          Add New Blog
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.data?.ThingToKnows?.map((item) => (
          <Card
            key={item._id}
            className="h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            cover={
              <img
                alt={item.title}
                src={item.img}
                className="h-[180px] w-full object-cover"
              />
            }
            actions={[
              <Button
                type="text"
                icon={<FaEdit />}
                onClick={() => showEditModal(item)}
                className="!flex !w-full !items-center !justify-center"
              />,
              <Popconfirm
                title="Are you sure you want to delete this item?"
                onConfirm={() => handleDelete(item._id)}
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
              <Button
                type="text"
                icon={<FaEye />}
                onClick={() => showModal(item)}
                className="!flex !w-full !items-center !justify-center"
              />,
            ]}
          >
            <Card.Meta
              title={
                <div className="flex flex-col">
                  <span className="!text-lg !font-semibold">{item.title}</span>
                  <p className="font-normal text-sm text-wrap">
                    {item.description
                      ? `${item.description.slice(0, 40)}...`
                      : 'No description available.'}
                  </p>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Modal
        open={isModalVisible}
        title={selectedBlog?.title}
        onCancel={handleCancel}
        footer={[
          <Button key="close" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedBlog && (
          <>
            <img
              src={selectedBlog.img}
              alt={selectedBlog.title}
              style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
            />
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {selectedBlog.title}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {dayjs(selectedBlog.createdAt).format('YYYY-MM-DD')}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: selectedBlog.description }}
                />
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Blog"
        open={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Update"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Description">
            <JoditComponent content={content} setContent={setContent} />
          </Form.Item>

          <Form.Item label="Image">
            <Upload {...uploadProps}>
              {fileList.length >= 1 ? null : (
                <div>
                  <FaUpload className="text-gray-400 text-lg mb-1" />
                  <div>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Modal */}
      <Modal
        title="Create New Blog"
        open={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText="Create"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Description" rules={[{ required: true }]}>
            <JoditComponent content={content} setContent={setContent} />
          </Form.Item>

          <Form.Item label="Image" rules={[{ required: true }]}>
            <Upload
              beforeUpload={beforeUpload}
              onChange={handleUploadChange}
              fileList={fileList}
              maxCount={1}
              listType="picture"
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ThingsToKnowSpecific;
