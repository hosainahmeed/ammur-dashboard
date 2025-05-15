/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
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
import { FaEdit, FaTrash, FaPlus, FaUpload } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
// import { useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation, useGetCategoriesQuery } from "./categoriesApiSlice";

const { Dragger } = Upload;

function ThingsToKnow() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [fileList, setFileList] = useState([]);

  // RTK Query hooks
  // const { data: categories = [], isLoading, isError } = useGetCategoriesQuery();
  // const [createCategory] = useCreateCategoryMutation();
  // const [updateCategory] = useUpdateCategoryMutation();
  // const [deleteCategory] = useDeleteCategoryMutation();
  const categories = [
    {
      id: 1,
      title: 'Life Lessons & Values',
      image:
        'https://picsum.photos/600/300',
    },
    {
      id: 2,
      title: 'Spirituality & Beliefs',

      image:
        'https://picsum.photos/600/300',
    },
    {
      id: 3,
      title: 'Family & Relationships',

      image:
        'https://picsum.photos/600/300',
    },
  ];
  const handleEdit = (category) => {
    setEditData(category);
    form.setFieldsValue({
      title: category.title,
    });
    setFileList(
      category.image
        ? [
            {
              uid: '-1',
              name: 'current-image.png',
              status: 'done',
              url: category.image,
            },
          ]
        : []
    );
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    // try {
    //   await deleteCategory(id).unwrap();
    //   toast.success('Category deleted successfully');
    // } catch (err) {
    //   toast.error('Failed to delete category');
    // }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append('title', values.title);
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('image', fileList[0].originFileObj);
      }

      if (editData) {
        // Update existing category
        // await updateCategory({ id: editData.id, data: formData }).unwrap();
        // toast.success('Category updated successfully');
      } else {
        // Create new category
        // await createCategory(formData).unwrap();
        // toast.success('Category created successfully');
      }

      handleCloseModal();
    } catch (err) {
      toast.error(err.data?.message || 'Failed to save category');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    form.resetFields();
    setFileList([]);
  };

  const uploadProps = {
    onRemove: (file) => {
      setFileList([]);
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
    fileList,
    maxCount: 1,
  };

  // if (isLoading) return <Spin size="large" className="flex justify-center" />;
  // if (isError) return <div>Error loading categories</div>;

  return (
    <div className="p-5 container mx-auto">
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <PageHeading title={'Things To Know'} />
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setShowModal(true)}
          className="!flex !items-center !bg-[#0C469D] !gap-2"
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
                <img
                  alt={item.title}
                  src={item.image || 'https://via.placeholder.com/150'}
                  className="h-[180px] w-full object-cover"
                />
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
                <Link to={`/things-to-know/blogs/${item.title}`}>
                  <Button
                    type="text"
                    icon={<GoArrowUpRight />}
                    className="!flex !w-full !items-center !justify-center"
                  />
                </Link>,
              ]}
            >
              <Card.Meta
                title={
                  <span className="!text-lg !font-semibold">{item.title}</span>
                }
              />
            </Card>
          ))}
        </div>
      ) : (
        <Empty
          description={
            <span className="!text-gray-400 !text-base">
              No things to know yet. Add your first item!
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
        title={editData ? 'Edit Category' : 'Add New Category'}
        open={showModal}
        onCancel={handleCloseModal}
        footer={[
          <Button key="back" onClick={handleCloseModal}>
            Cancel
          </Button>,
          <Button
            key="submit"
            className="!bg-[#0C469D] !text-white"
            onClick={handleSubmit}
            // loading={isLoading}
          >
            {editData ? 'Update' : 'Save'}
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Category Title"
            rules={[
              { required: true, message: 'Please input the category title!' },
            ]}
          >
            <Input placeholder="Enter category title" />
          </Form.Item>

          <Form.Item label="Category Image">
            <Dragger
              {...uploadProps}
              className="!flex !flex-col !items-center !justify-center !p-4 !border-2 !border-dashed !border-gray-300 !rounded-lg"
            >
              <p className="ant-upload-drag-icon !flex !items-center !justify-center">
                <FaUpload className="text-gray-400 text-2xl" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single image upload
              </p>
            </Dragger>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ThingsToKnow;
