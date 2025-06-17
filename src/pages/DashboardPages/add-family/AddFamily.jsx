import React, { useState } from 'react';
import { Card, Typography, Button, Divider, message, Form } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import FamilyTable from './FamilyTable';
import DiscussionGroupTable from './DiscussionGroupTable';
import FamilyFormModal from './FamilyFormModal';
import DiscussionGroupFormModal from './DiscussionGroupFormModal';
import {
  useCreateFamilyMutation,
  useDeleteFamilyMutation,
  useGetFamiliesQuery,
  useUpdateFamilyMutation,
} from '../../../Redux/services/dashboard apis/familiesApis';
import toast from 'react-hot-toast';

const { Title } = Typography;

function AddFamily() {
  // API Hooks
  const { data: families } = useGetFamiliesQuery();
  const [deleteFamily] = useDeleteFamilyMutation();
  const [updateFamily] = useUpdateFamilyMutation();
  const [createFamily] = useCreateFamilyMutation();

  // State
  const [familyId, setFamilyId] = useState(null);
  const [discussionGroups, setDiscussionGroups] = useState([
    {
      key: '1',
      familyImage: 'https://randomuser.me/api/portraits/men/32.jpg',
      familyTitle: 'Smith Family Group',
      familyName: 'Smith',
    },
    {
      key: '2',
      familyImage: 'https://randomuser.me/api/portraits/women/44.jpg',
      familyTitle: 'Johnson Family Group',
      familyName: 'Johnson',
    },
    {
      key: '3',
      familyImage: 'https://randomuser.me/api/portraits/men/12.jpg',
      familyTitle: 'Williams Family Group',
      familyName: 'Williams',
    },
  ]);
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupImageUrl, setGroupImageUrl] = useState('');

  // Form refs
  const [addFamilyForm] = Form.useForm();
  const [addGroupForm] = Form.useForm();

  // Family Handlers
  const handleEditFamily = (record) => {
    setEditingFamily(record);
    setFamilyId(record.key);
    addFamilyForm.setFieldsValue({
      familyName: record.name,
    });
    setIsAddFamilyModalOpen(true);
  };

  const handleDeleteFamily = async (key) => {
    await deleteFamily(key)
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message || 'Family deleted successfully');
        }
      });
  };

  const handleAddFamilySubmit = async (values) => {
    const data = { name: values?.familyName };
    try {
      if (familyId !== null) {
        await updateFamily({ data, id: familyId })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Family updated successfully');
            }
          });
      } else {
        await createFamily({ data })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Family created successfully');
            }
          });
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
    handleAddFamilyCancel();
  };

  // Group Handlers
  const handleEditGroup = (record) => {
    setEditingGroup(record);
    addGroupForm.setFieldsValue({
      groupTitle: record.familyTitle,
      familyName: record.familyName,
    });
    setGroupImageUrl(record.familyImage);
    setIsAddGroupModalOpen(true);
  };

  const handleDeleteGroup = (key) => {
    setDiscussionGroups((prev) => prev.filter((item) => item.key !== key));
    toast.success('Discussion group deleted successfully');
  };

  const handleAddGroupSubmit = (values) => {
    if (editingGroup) {
      setDiscussionGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.key === editingGroup.key
            ? {
                ...group,
                familyTitle: values.groupTitle,
                familyName: values.familyName,
                familyImage: groupImageUrl || group.familyImage,
              }
            : group
        )
      );
      toast.success('Discussion group updated successfully');
    } else {
      const newGroup = {
        key: (discussionGroups.length + 1).toString(),
        familyTitle: values.groupTitle,
        familyName: values.familyName,
        familyImage:
          groupImageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg',
      };
      setDiscussionGroups([...discussionGroups, newGroup]);
      toast.success('Discussion group added successfully');
    }
    handleAddGroupCancel();
  };

  // Image Upload Handler
  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      const randomId = Math.floor(Math.random() * 100);
      const randomGender = Math.random() > 0.5 ? 'men' : 'women';
      const imageUrl = `https://randomuser.me/api/portraits/${randomGender}/${randomId}.jpg`;
      setGroupImageUrl(imageUrl);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Modal Handlers
  const showAddFamilyModal = () => {
    setEditingFamily(null);
    setFamilyId(null);
    addFamilyForm.resetFields();
    setIsAddFamilyModalOpen(true);
  };

  const showAddGroupModal = () => {
    setEditingGroup(null);
    addGroupForm.resetFields();
    setGroupImageUrl('');
    setIsAddGroupModalOpen(true);
  };

  const handleAddFamilyCancel = () => {
    addFamilyForm.resetFields();
    setEditingFamily(null);
    setFamilyId(null);
    setIsAddFamilyModalOpen(false);
  };

  const handleAddGroupCancel = () => {
    addGroupForm.resetFields();
    setGroupImageUrl('');
    setEditingGroup(null);
    setIsAddGroupModalOpen(false);
  };

  return (
    <div>
      {/* Families Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Title level={3}>All Family</Title>
          <Button
            className="!bg-[#0C469D] !text-white"
            icon={<FaPlus />}
            onClick={showAddFamilyModal}
          >
            Add New Family
          </Button>
        </div>
        <FamilyTable
          families={families?.data}
          onEdit={handleEditFamily}
          onDelete={handleDeleteFamily}
        />
      </Card>

      <Divider />

      {/* Discussion Groups Section */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <Title level={3}>Family discussion groups</Title>
          <Button
            className="!bg-[#0C469D] !text-white"
            icon={<FaPlus />}
            onClick={showAddGroupModal}
          >
            Add New Group
          </Button>
        </div>
        <DiscussionGroupTable
          groups={discussionGroups}
          onEdit={handleEditGroup}
          onDelete={handleDeleteGroup}
        />
      </Card>

      {/* Modals */}
      <FamilyFormModal
        visible={isAddFamilyModalOpen}
        onCancel={handleAddFamilyCancel}
        onFinish={handleAddFamilySubmit}
        form={addFamilyForm}
        editingFamily={editingFamily}
      />

      <DiscussionGroupFormModal
        visible={isAddGroupModalOpen}
        onCancel={handleAddGroupCancel}
        onFinish={handleAddGroupSubmit}
        form={addGroupForm}
        editingGroup={editingGroup}
        families={families?.data}
        imageUrl={groupImageUrl}
        onImageUpload={handleImageUpload}
      />
    </div>
  );
}

export default AddFamily;
