import React from 'react';
import { Modal, Form, Input, Select, Space } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';

const platformOptions = [
  { label: 'LinkedIn', value: 'LinkedIn', icon: <LinkedinOutlined /> },
  { label: 'GitHub', value: 'GitHub', icon: <GithubOutlined /> },
  { label: 'Twitter', value: 'Twitter', icon: <TwitterOutlined /> },
  { label: 'Instagram', value: 'Instagram', icon: <InstagramOutlined /> },
  { label: 'Facebook', value: 'Facebook', icon: <FacebookOutlined /> },
];

export const EmailModal = ({ visible, onOk, onCancel, form, editingItem }) => (
  <Modal
    title={editingItem ? 'Edit Email Address' : 'Add Email Address'}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    destroyOnClose
    okText={editingItem ? 'Update' : 'Add'}
  >
    <Form requiredMark={false} form={form} layout="vertical">
      <Form.Item
        label="Email Address"
        name="email"
        rules={[
          { required: true, message: 'Please enter an email address' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email Address" />
      </Form.Item>
      <Form.Item
        label="Label"
        name="lebel"
        rules={[{ required: true, message: 'Please enter a label' }]}
      >
        <Input placeholder="e.g. Work, Personal, etc." />
      </Form.Item>
    </Form>
  </Modal>
);

export const PhoneModal = ({ visible, onOk, onCancel, form, editingItem }) => (
  <Modal
    title={editingItem ? 'Edit Phone Number' : 'Add Phone Number'}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    destroyOnClose
    okText={editingItem ? 'Update' : 'Add'}
  >
    <Form requiredMark={false} form={form} layout="vertical">
      <Form.Item
        label="Phone Number"
        name="phone"
        rules={[{ required: true, message: 'Please enter a phone number' }]}
      >
        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
      </Form.Item>
      <Form.Item
        label="Label"
        name="lebel"
        rules={[{ required: true, message: 'Please enter a label' }]}
      >
        <Input placeholder="e.g. Mobile, Work, Home, etc." />
      </Form.Item>
    </Form>
  </Modal>
);

export const SocialModal = ({ visible, onOk, onCancel, form, editingItem }) => (
  <Modal
    title={editingItem ? 'Edit Social Media' : 'Add Social Media'}
    visible={visible}
    onOk={onOk}
    onCancel={onCancel}
    destroyOnClose
    okText={editingItem ? 'Update' : 'Add'}
  >
    <Form requiredMark={false} form={form} layout="vertical">
      <Form.Item
        label="Platform"
        name="name"
        rules={[{ required: true, message: 'Please select a platform' }]}
      >
        <Select placeholder="Select platform">
          {platformOptions.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              <Space>
                {option.icon}
                {option.label}
              </Space>
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        label="URL"
        name="url"
        rules={[
          { required: true, message: 'Please enter a URL' },
          { type: 'url', message: 'Please enter a valid URL' },
        ]}
      >
        <Input autoComplete="off" placeholder="https://..." />
      </Form.Item>
    </Form>
  </Modal>
);
