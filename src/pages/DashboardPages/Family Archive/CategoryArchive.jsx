import React, { useState, useRef } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Empty, Modal } from 'antd';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import {
  useDeleteInterviewMutation,
  useGetAllInterviewQuery,
} from '../../../Redux/services/dashboard apis/interviewApis';
import ArchiveGrid from './ArchiveGrid';
import CategoryForm from './CategoryForm';

function CategoryArchive() {
  const location = useLocation();
  const id = location.state;
  const { data: interviewCategory } = useGetAllInterviewQuery(id);
  const [editData, setEditData] = useState(null);
  const videoRefs = useRef({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [deleteInterview] = useDeleteInterviewMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (interview) => {
    setEditData(interview);
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteInterview(id).unwrap();
      if (res?.success) toast.success(res.message);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to delete interview');
    }
  };

  return (
    <div className="p-5  rounded-md container mx-auto">
      <PageHeading title="Archive Category" />
      <Button
        type="primary"
        icon={<FaPlus />}
        onClick={() => setIsModalOpen(true)}
        className="!flex !items-center !mb-3 !gap-2 !bg-[#0C469D] !text-white"
      >
        Add New Category
      </Button>

      {interviewCategory?.data?.length > 0 ? (
        <ArchiveGrid
          data={interviewCategory.data}
          onEdit={handleEdit}
          onDelete={handleDelete}
          videoRefs={videoRefs}
          isVideoPlaying={isVideoPlaying}
          setIsVideoPlaying={setIsVideoPlaying}
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
    </div>
  );
}

export default CategoryArchive;
