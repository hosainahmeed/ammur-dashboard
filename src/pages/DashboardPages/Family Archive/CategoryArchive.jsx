import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Empty, Modal, Spin } from 'antd';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import ArchiveGrid from './ArchiveGrid';
import CategoryForm from './CategoryForm';
import {
  useDeleteArchiveMutation,
  useGetAllArchiveQuery,
} from '../../../Redux/services/dashboard apis/archiveApis';

function CategoryArchive() {
  const location = useLocation();
  const id = location.state;
  const { data: archiveCategory, isLoading } = useGetAllArchiveQuery(id);
  const [editData, setEditData] = useState(null);
  const [deleteArchive] = useDeleteArchiveMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (archive) => {
    setEditData(archive);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteArchive({ id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Archive deleted successfully');
          }
        });
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete archive');
    }
  };
  console.log(archiveCategory?.data);
  return (
    <Spin spinning={isLoading}>
      <PageHeading title="Archive Category" />
      <Button
        type="primary"
        icon={<FaPlus />}
        onClick={() => setIsModalOpen(true)}
        className="!flex !items-center !mb-3 !gap-2 !bg-[#0C469D] !text-white"
      >
        Add New Category
      </Button>

      {archiveCategory?.data?.length > 0 ? (
        <ArchiveGrid
          data={archiveCategory.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <Empty
          description={
            <span className="text-gray-400">
              No Category yet. Add your first item!
            </span>
          }
          className="p-10 bg-white rounded-lg shadow-sm"
        />
      )}

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        title={editData ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialValues={editData}
          onSuccess={() => {
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </Spin>
  );
}

export default CategoryArchive;
