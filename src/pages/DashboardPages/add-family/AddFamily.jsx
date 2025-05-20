import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import {
  Card,
  Table,
  Typography,
  Button,
  Popconfirm,
  Divider,
  Image,
  Modal,
  Form,
  Input,
  Select,
  Upload,
  message,
} from 'antd';
import toast from 'react-hot-toast';
import { FaEye, FaPlus } from 'react-icons/fa6';
const { Title } = Typography;
import {
  DeleteOutlined,
  UploadOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { CiEdit } from 'react-icons/ci';

function AddFamily() {
  // State for families
  const [data, setData] = useState([
    { key: '1', familyName: 'Smith' },
    { key: '2', familyName: 'Johnson' },
    { key: '3', familyName: 'Williams' },
  ]);

  // State for discussion groups
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

  // State for modals
  const [isAddFamilyModalOpen, setIsAddFamilyModalOpen] = useState(false);
  const [isAddGroupModalOpen, setIsAddGroupModalOpen] = useState(false);
  const [editingFamily, setEditingFamily] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);

  // Form refs
  const [addFamilyForm] = Form.useForm();
  const [addGroupForm] = Form.useForm();

  // Image state for group
  const [groupImageUrl, setGroupImageUrl] = useState('');

  // Handlers for existing functionality
  const handleEdit = (record) => {
    setEditingFamily(record);
    addFamilyForm.setFieldsValue({
      familyName: record.familyName,
    });
    setIsAddFamilyModalOpen(true);
  };

  const handleDelete = (key) => {
    setData((prevData) => prevData.filter((item) => item.key !== key));
    toast.success('Family deleted successfully');
  };

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

  // Modal handlers
  const showAddFamilyModal = () => {
    setEditingFamily(null);
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
    setIsAddFamilyModalOpen(false);
  };

  const handleAddGroupCancel = () => {
    addGroupForm.resetFields();
    setGroupImageUrl('');
    setEditingGroup(null);
    setIsAddGroupModalOpen(false);
  };

  // Form submission handlers
  const handleAddFamilySubmit = (values) => {
    if (editingFamily) {
      // Update existing family
      setData((prevData) =>
        prevData.map((item) =>
          item.key === editingFamily.key
            ? { ...item, familyName: values.familyName }
            : item
        )
      );

      // Also update family name in discussion groups
      setDiscussionGroups((prevGroups) =>
        prevGroups.map((group) =>
          group.familyName === editingFamily.familyName
            ? { ...group, familyName: values.familyName }
            : group
        )
      );

      toast.success('Family updated successfully');
    } else {
      // Add new family
      const newFamily = {
        key: (data.length + 1).toString(),
        familyName: values.familyName,
      };

      setData([...data, newFamily]);
      toast.success('Family added successfully');
    }

    handleAddFamilyCancel();
  };

  const handleAddGroupSubmit = (values) => {
    if (editingGroup) {
      // Update existing group
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
      // Add new group
      const newGroup = {
        key: (discussionGroups.length + 1).toString(),
        familyTitle: values.groupTitle,
        familyName: values.familyName,
        familyImage:
          groupImageUrl || 'https://randomuser.me/api/portraits/lego/1.jpg', // Default image if none uploaded
      };

      setDiscussionGroups([...discussionGroups, newGroup]);
      toast.success('Discussion group added successfully');
    }

    handleAddGroupCancel();
  };

  // Image upload handlers
  const handleImageUpload = (info) => {
    if (info.file.status === 'done') {
      // In a real app, you would get the URL from the upload response
      // For this demo, we'll use a random user image
      const randomId = Math.floor(Math.random() * 100);
      const randomGender = Math.random() > 0.5 ? 'men' : 'women';
      const imageUrl = `https://randomuser.me/api/portraits/${randomGender}/${randomId}.jpg`;

      setGroupImageUrl(imageUrl);
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  // Table columns
  const columns = [
    {
      title: 'SL no.',
      dataIndex: 'key',
      key: 'key',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Family name',
      dataIndex: 'familyName',
      key: 'familyName',
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleEdit(record)}
            icon={<CiEdit />}
            className="!bg-[#0C469D] !text-white"
          />
          <Popconfirm
            title="Are you sure to delete this family?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const discussionGroupColumns = [
    {
      title: 'Family Image',
      dataIndex: 'familyImage',
      key: 'familyImage',
      render: (url) => <Image width={50} src={url} alt="Family" />,
    },
    {
      title: 'Family Title',
      dataIndex: 'familyTitle',
      key: 'familyTitle',
    },
    {
      title: 'Family Name',
      dataIndex: 'familyName',
      key: 'familyName',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleEditGroup(record)}
            icon={<CiEdit />}
            className="!bg-[#0C469D] !text-white"
          />
          <Popconfirm
            title="Are you sure to delete this discussion group?"
            onConfirm={() => handleDeleteGroup(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<DeleteOutlined />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
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
        <Table
          columns={columns}
          pagination={{ responsive: true }}
          dataSource={data}
          scroll={{ x: 1500 }}
          bordered
        />
      </Card>

      <Divider />

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
        <Table
          columns={discussionGroupColumns}
          pagination={{ responsive: true }}
          dataSource={discussionGroups}
          scroll={{ x: 1500 }}
          bordered
        />
      </Card>

      {/* Add Family Modal */}
      <Modal
        title={editingFamily ? 'Edit Family' : 'Add New Family'}
        open={isAddFamilyModalOpen}
        onCancel={handleAddFamilyCancel}
        footer={null}
      >
        <Form
          form={addFamilyForm}
          layout="vertical"
          onFinish={handleAddFamilySubmit}
        >
          <Form.Item
            name="familyName"
            label="Family Name"
            rules={[{ required: true, message: 'Please enter family name!' }]}
          >
            <Input placeholder="Enter family name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="!bg-[#0C469D]">
              {editingFamily ? 'Update Family' : 'Add Family'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Group Modal */}
      <Modal
        title={
          editingGroup ? 'Edit Discussion Group' : 'Add New Discussion Group'
        }
        open={isAddGroupModalOpen}
        onCancel={handleAddGroupCancel}
        footer={null}
      >
        <Form
          form={addGroupForm}
          layout="vertical"
          onFinish={handleAddGroupSubmit}
        >
          <Form.Item
            name="groupTitle"
            label="Group Title"
            rules={[{ required: true, message: 'Please enter group title!' }]}
          >
            <Input placeholder="Enter group title" />
          </Form.Item>

          <Form.Item
            name="familyName"
            label="Family"
            rules={[{ required: true, message: 'Please select a family!' }]}
          >
            <Select placeholder="Select family">
              {data.map((family) => (
                <Select.Option key={family.key} value={family.familyName}>
                  {family.familyName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="groupImage"
            label="Group Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
          >
            <Upload
              name="groupImage"
              listType="picture-card"
              showUploadList={true}
              action="/api/upload" // Replace with your actual upload endpoint
              onChange={handleImageUpload}
              maxCount={1}
            >
              {groupImageUrl ? (
                <img
                  src={groupImageUrl}
                  alt="Group"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="!bg-[#0C469D]">
              {editingGroup ? 'Update Group' : 'Add Group'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default AddFamily;
