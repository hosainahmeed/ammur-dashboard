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
import { Link, useParams } from 'react-router-dom';
import { FaEdit, FaPlus } from 'react-icons/fa';
import { FaEye, FaTrash } from 'react-icons/fa6';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment/moment';

function Blogs() {
  const [form] = Form.useForm();
  const params = useParams();

  const [blogs, setBlogs] = useState([
    {
      id: 12,
      image: 'https://picsum.photos/600/300',
      title: 'Lorem ipsum dolor sit amet.',
      date: '2025-02-02',
      descriptions:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde dignissimos error quasi! Vel minus inventore molestias sunt corporis sequi excepturi voluptatem.',
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [fileList, setFileList] = useState([]);

  const showModal = (item) => {
    setSelectedBlog(item);
    setIsModalVisible(true);
  };

  const showEditModal = (item) => {
    setSelectedBlog(item);
    form.setFieldsValue({
      title: item.title,
      date: item.date ? moment(item.date, 'YYYY-MM-DD') : null,
      descriptions: item.descriptions,
    });
    setIsEditModalVisible(true);
  };

  const showCreateModal = () => {
    form.resetFields();
    setFileList([]);
    setIsCreateModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditModalVisible(false);
    setIsCreateModalVisible(false);
    setSelectedBlog(null);
  };

  const handleDelete = (id) => {
    setBlogs(blogs.filter((blog) => blog.id !== id));
    message.success('Blog deleted successfully');
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedBlogs = blogs.map((blog) => {
        if (blog.id === selectedBlog.id) {
          return {
            ...blog,
            title: values.title,
            date: values.date.format('YYYY-MM-DD'),
            descriptions: values.descriptions,
            image:
              fileList.length > 0
                ? URL.createObjectURL(fileList[0].originFileObj)
                : blog.image,
          };
        }
        return blog;
      });

      setBlogs(updatedBlogs);
      setIsEditModalVisible(false);
      message.success('Blog updated successfully');
    });
  };

  const handleCreate = () => {
    form.validateFields().then((values) => {
      const newBlog = {
        id: Math.max(...blogs.map((blog) => blog.id), 0) + 1,
        title: values.title,
        date: values.date.format('YYYY-MM-DD'),
        descriptions: values.descriptions,
        image:
          fileList.length > 0
            ? URL.createObjectURL(fileList[0].originFileObj)
            : 'https://via.placeholder.com/150',
      };

      setBlogs([...blogs, newBlog]);
      setIsCreateModalVisible(false);
      message.success('Blog created successfully');
    });
  };

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
    }
    return isImage;
  };

  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList.slice(-1)); // Only allow one file
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
              title: `${params.slug}`,
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
      <div className="grid-4">
        {blogs.map((item) => (
          <Card
            key={item.id}
            className="h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
            cover={
              <img
                alt={item.title}
                src={item.image}
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
                    {item.descriptions.slice(0, 40)}...
                  </p>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      {/* View Modal */}
      <Modal
        visible={isModalVisible}
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
              src={selectedBlog.image}
              alt={selectedBlog.title}
              style={{
                width: '100%',
                marginBottom: '16px',
                borderRadius: '8px',
              }}
            />
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Title">
                {selectedBlog.title}
              </Descriptions.Item>
              <Descriptions.Item label="Date">
                {selectedBlog.date}
              </Descriptions.Item>
              <Descriptions.Item label="Description">
                {selectedBlog.descriptions}
              </Descriptions.Item>
            </Descriptions>
          </>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Blog"
        visible={isEditModalVisible}
        onOk={handleUpdate}
        onCancel={handleCancel}
        okText="Update"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="descriptions"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item label="Image">
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

      {/* Create Modal */}
      <Modal
        title="Create New Blog"
        visible={isCreateModalVisible}
        onOk={handleCreate}
        onCancel={handleCancel}
        okText="Create"
        width={700}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: 'Please input the title!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="Date"
            rules={[{ required: true, message: 'Please select the date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="descriptions"
            label="Description"
            rules={[
              { required: true, message: 'Please input the description!' },
            ]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Image"
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
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

export default Blogs;
