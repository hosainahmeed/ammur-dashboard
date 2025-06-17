import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

const FamilyFormModal = ({
  visible,
  onCancel,
  onFinish,
  form,
  editingFamily,
}) => {
  return (
    <Modal
      title={editingFamily ? 'Edit Family' : 'Add New Family'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
  );
};

export default FamilyFormModal;
