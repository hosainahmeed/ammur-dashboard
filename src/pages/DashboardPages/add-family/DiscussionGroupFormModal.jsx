import React from 'react';
import { Modal, Form, Input, Select, Upload, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const DiscussionGroupFormModal = ({
  visible,
  onCancel,
  onFinish,
  form,
  editingGroup,
  families,
  imageUrl,
  onImageUpload,
}) => {
  return (
    <Modal
      title={
        editingGroup ? 'Edit Discussion Group' : 'Add New Discussion Group'
      }
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
            {families?.map((family) => (
              <Select.Option key={family._id} value={family.name}>
                {family.name}
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
            action="/api/upload"
            onChange={onImageUpload}
            maxCount={1}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
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
  );
};

export default DiscussionGroupFormModal;
