import { Card, Form, Modal } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { imageUrl } from '../../../Utils/server';

function FamilyDiscussion() {
  const [editingFamily, setEditingFamily] = useState(null);
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupImageUrl, setGroupImageUrl] = useState('');
  const [addGroupForm] = Form.useForm();
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

  const showAddGroupModal = () => {
    setEditingGroup(null);
    addGroupForm.resetFields();
    setGroupImageUrl('');
    setIsAddGroupModalOpen(true);
  };

  const handleAddGroupCancel = () => {
    addGroupForm.resetFields();
    setGroupImageUrl('');
    setEditingGroup(null);
    setIsAddGroupModalOpen(false);
  };

  setDiscussionGroups((prevGroups) =>
    prevGroups.map((group) =>
      group.familyName === editingFamily.familyName
        ? { ...group, familyName: values.familyName }
        : group
    )
  );

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
        familyImage: imageUrl(groupImageUrl),
      };

      setDiscussionGroups([...discussionGroups, newGroup]);
      toast.success('Discussion group added successfully');
    }

    handleAddGroupCancel();
  };

  return (
    <div>
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
          scroll={{ x: 1200}}
          bordered
        />
      </Card>
      <Modal
        title={
          editingGroup ? 'Edit Discussion Group' : 'Add New Discussion Group'
        }
        open={isAddGroupModalOpen}
        onCancel={handleAddGroupCancel}
        footer={null}
        maskStyle={{ backdropFilter: 'blur(2px)' }}
        destroyOnClose
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

export default FamilyDiscussion;
