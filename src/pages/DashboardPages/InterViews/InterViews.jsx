import React, { useState, useRef } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Empty } from 'antd';
import { FaPlus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import {
  useCreateInterviewMutation,
  useDeleteInterviewMutation,
  useGetAllInterviewQuery,
  useUpdateInterviewMutation,
} from '../../../Redux/services/dashboard apis/interviewApis';
import InterviewGrid from './InterviewGrid';
import InterviewFormModal from './InterviewFormModal';

function InterViews() {
  const location = useLocation();
  const id = location.state;
  const { data: interviewCategory } = useGetAllInterviewQuery(id);

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const videoRefs = useRef({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const [createInterview, { isLoading: isCreating }] =
    useCreateInterviewMutation();
  const [updateInterview, { isLoading: isUpdating }] =
    useUpdateInterviewMutation();
  const [deleteInterview] = useDeleteInterviewMutation();

  const handleEdit = (interview) => {
    setEditData(interview);
    setFormModalOpen(true);
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
    <div className="p-5 bg-white rounded-md container mx-auto">
      <div className='mb-3 flex itmx-center justify-end'>
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setFormModalOpen(true)}
          className="!flex !items-center !gap-2 !bg-[#0C469D] !text-white"
        >
          Add New
        </Button>
      </div>

      {interviewCategory?.data?.length > 0 ? (
        <InterviewGrid
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
              No interviews yet. Add your first item!
            </span>
          }
          className="p-10 bg-white rounded-lg shadow-sm"
        />
      )}

      <InterviewFormModal
        open={formModalOpen}
        setOpen={setFormModalOpen}
        editData={editData}
        setEditData={setEditData}
        categoryId={id}
        createInterview={createInterview}
        updateInterview={updateInterview}
        isCreating={isCreating}
        isUpdating={isUpdating}
      />
    </div>
  );
}

export default InterViews;
