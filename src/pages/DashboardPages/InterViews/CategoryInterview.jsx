import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Card, Modal, Pagination, Popconfirm } from 'antd';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import { imageUrl } from '../../../Utils/server';
import {
  useDeleteCategoryMutation,
  useGetAllInterCategoryQuery,
} from '../../../Redux/services/dashboard apis/interviewApis';
import { Link } from 'react-router-dom';
import { GoArrowUpRight } from 'react-icons/go';
import InterViewsCategoryForm from './InterViewsCategoryForm';
import toast from 'react-hot-toast';

function CategoryInterview() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const [editData, setEditData] = useState(null);
  const limit = 6;

  const { data: interviewCategory, isLoading: categoryLoading } =
    useGetAllInterCategoryQuery({ page, limit });
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleDelete = async (id) => {
    try {
      const res = await deleteCategory({ id }).unwrap();
      if (res?.success) {
        toast.success(res?.message || 'Category deleted successfully');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete category');
    }
  };

  const handleEdit = (category) => {
    setEditData(category);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSuccess = () => {
    handleModalClose();
  };

  const total = interviewCategory?.meta?.total || 0;

  if (categoryLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <PageHeading title="InterViews" />
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setShowModal(true)}
          className="!flex !items-center !gap-2 !bg-[#0C469D] !text-white"
        >
          Add New
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {interviewCategory?.data?.map((item) => (
            <Card
              key={item?._id}
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
                />,
                <Popconfirm
                  title="Are you sure you want to delete this item?"
                  onConfirm={() => handleDelete(item?._id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="text" icon={<FaTrash />} danger />
                </Popconfirm>,
                <Link to={`/interviews/${item?._id}`} state={item?._id}>
                  <Button type="text" icon={<GoArrowUpRight />} />
                </Link>,
              ]}
            >
              <Card.Meta
                title={<span className="font-semibold">{item?.title}</span>}
              />
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={setPage}
            showSizeChanger={false}
          />
        </div>
      </Card>

      <Modal
        open={showModal}
        title={editData ? 'Edit Category' : 'Add New Category'}
        footer={null}
        width={400}
        destroyOnClose
        centered
        onCancel={handleModalClose}
      >
        <InterViewsCategoryForm
          initialValues={editData}
          onSuccess={handleSuccess}
        />
      </Modal>
    </div>
  );
}

export default CategoryInterview;
