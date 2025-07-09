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
import { FaEdit, FaTrash, FaPlus, FaUpload, FaEye } from 'react-icons/fa';
import { GoArrowUpRight } from 'react-icons/go';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  useCreateThingsToKnowMutation,
  useDeleteThingsToKnowMutation,
  useGetThingsToKnowQuery,
  useUpdateThingsToKnowMutation,
} from '../../../Redux/services/dashboard apis/thingsToKnowApis';
import { imageUrl } from '../../../Utils/server';
import debounce from 'debounce';

function ThingsToKnow() {
  const [form] = Form.useForm();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [search, setSearch] = useState('');

  const {
    data: categories = [],
    isLoading,
  } = useGetThingsToKnowQuery({
    searchTerm: search,
  });
  const [createCategory, { isLoading: isCreating }] =
    useCreateThingsToKnowMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateThingsToKnowMutation();
  const [deleteCategory] = useDeleteThingsToKnowMutation();

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleEdit = (category) => {
    setEditData(category);
    form.setFieldsValue({
      title: category.title,
    });

    if (category.img) {
      setFileList([
        {
          uid: '-1',
          name: 'current-image',
          status: 'done',
          url: imageUrl(category.img),
        },
      ]);
    } else {
      setFileList([]);
    }

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategory({ id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Category deleted successfully');
          }
        });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete category');
    }
  };

  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('title', values.title);
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append('file', fileList[0].originFileObj);
      } else if (fileList.length === 0 && editData?.img) {
        formData.delete('file', '');
      }

      if (editData) {
        await updateCategory({ id: editData?._id, data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Category updated successfully');
              handleCloseModal();
            }
          });
      } else {
        await createCategory({ data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Category created successfully');
              handleCloseModal();
            }
          });
      }
    } catch (err) {
      toast.error(
        err?.data?.errorSources[0].message || 'Failed to save category'
      );
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
    form.resetFields();
    setFileList([]);
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
    <Spin spinning={isLoading}>
      <div className="container mx-auto">
        <PageHeading title={'Things To Know'} />

        <div className="flex items-center justify-between mb-4">
          <Input.Search
            placeholder="Search by title"
            className="!w-[300px]"
            allowClear
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button
            onClick={() => setShowModal(true)}
            type="primary"
            icon={<FaPlus />}
            className="!flex !items-center !bg-[#0C469D] !gap-2"
          >
            Add Catgeory
          </Button>
        </div>

        {categories?.data?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories?.data.map((item) => (
              <Card
                key={item?._id}
                className="h-full flex flex-col rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md"
                cover={
                  <img
                    alt={item?.title}
                    src={imageUrl(item?.img)}
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
                    onConfirm={() => handleDelete(item?._id)}
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
                  <Link to={`/things-to-know/${item?._id}`} state={item?._id}>
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
                    <span className="!text-lg !font-semibold">
                      {item?.title}
                    </span>
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
          ></Empty>
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
              loading={isCreating || isUpdating}
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
      </div>
    </Spin>
  );
}

export default ThingsToKnow;
