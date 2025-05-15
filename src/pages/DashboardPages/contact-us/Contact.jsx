import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Space,
  Tooltip,
  message,
  Typography,
  Card,
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './Contact.css';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

function Contact() {
  // States for managing data
  const [emails, setEmails] = useState([
    { id: 1, address: 'primary@example.com', label: 'Primary' },
    { id: 2, address: 'work@example.com', label: 'Work' },
    { id: 3, address: 'personal@example.com', label: 'Personal' },
  ]);

  const [phones, setPhones] = useState([
    { id: 1, number: '+1 (555) 123-4567', label: 'Mobile' },
    { id: 2, number: '+1 (555) 987-6543', label: 'Work' },
  ]);

  const [socials, setSocials] = useState([
    {
      id: 1,
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/yourusername',
      icon: 'linkedin',
    },
    {
      id: 2,
      platform: 'GitHub',
      url: 'https://github.com/yourusername',
      icon: 'github',
    },
    {
      id: 3,
      platform: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: 'twitter',
    },
    {
      id: 4,
      platform: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: 'instagram',
    },
    {
      id: 5,
      platform: 'Facebook',
      url: 'https://facebook.com/yourusername',
      icon: 'facebook',
    },
  ]);

  // Modal states
  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [phoneModalVisible, setPhoneModalVisible] = useState(false);
  const [socialModalVisible, setSocialModalVisible] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form instances
  const [emailForm] = Form.useForm();
  const [phoneForm] = Form.useForm();
  const [socialForm] = Form.useForm();

  // Copy state
  const [copied, setCopied] = useState(null);

  // Get icon component based on platform name
  const getIconComponent = (platform) => {
    const iconMap = {
      LinkedIn: <LinkedinOutlined />,
      GitHub: <GithubOutlined />,
      Twitter: <TwitterOutlined />,
      Instagram: <InstagramOutlined />,
      Facebook: <FacebookOutlined />,
    };
    return iconMap[platform] || <GithubOutlined />;
  };

  // Copy to clipboard
  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    message.success('Copied to clipboard!');
    setTimeout(() => setCopied(null), 2000);
  };

  // Email operations
  const addEmail = () => {
    setEditingItem(null);
    emailForm.resetFields();
    setEmailModalVisible(true);
  };

  const editEmail = (record) => {
    setEditingItem(record);
    emailForm.setFieldsValue(record);
    setEmailModalVisible(true);
  };

  const deleteEmail = (id) => {
    setEmails(emails.filter((item) => item.id !== id));
    message.success('Email deleted successfully');
  };

  const handleEmailOk = () => {
    emailForm.validateFields().then((values) => {
      if (editingItem) {
        // Update existing email
        setEmails(
          emails.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success('Email updated successfully');
      } else {
        // Add new email
        const newId =
          emails.length > 0
            ? Math.max(...emails.map((item) => item.id)) + 1
            : 1;
        setEmails([...emails, { id: newId, ...values }]);
        message.success('Email added successfully');
      }
      setEmailModalVisible(false);
    });
  };

  // Phone operations
  const addPhone = () => {
    setEditingItem(null);
    phoneForm.resetFields();
    setPhoneModalVisible(true);
  };

  const editPhone = (record) => {
    setEditingItem(record);
    phoneForm.setFieldsValue(record);
    setPhoneModalVisible(true);
  };

  const deletePhone = (id) => {
    setPhones(phones.filter((item) => item.id !== id));
    message.success('Phone number deleted successfully');
  };

  const handlePhoneOk = () => {
    phoneForm.validateFields().then((values) => {
      if (editingItem) {
        // Update existing phone
        setPhones(
          phones.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success('Phone number updated successfully');
      } else {
        // Add new phone
        const newId =
          phones.length > 0
            ? Math.max(...phones.map((item) => item.id)) + 1
            : 1;
        setPhones([...phones, { id: newId, ...values }]);
        message.success('Phone number added successfully');
      }
      setPhoneModalVisible(false);
    });
  };

  // Social media operations
  const addSocial = () => {
    setEditingItem(null);
    socialForm.resetFields();
    setSocialModalVisible(true);
  };

  const editSocial = (record) => {
    setEditingItem(record);
    socialForm.setFieldsValue(record);
    setSocialModalVisible(true);
  };

  const deleteSocial = (id) => {
    setSocials(socials.filter((item) => item.id !== id));
    message.success('Social media account deleted successfully');
  };

  const handleSocialOk = () => {
    socialForm.validateFields().then((values) => {
      if (editingItem) {
        // Update existing social
        setSocials(
          socials.map((item) =>
            item.id === editingItem.id ? { ...item, ...values } : item
          )
        );
        message.success('Social media account updated successfully');
      } else {
        // Add new social
        const newId =
          socials.length > 0
            ? Math.max(...socials.map((item) => item.id)) + 1
            : 1;
        setSocials([...socials, { id: newId, ...values }]);
        message.success('Social media account added successfully');
      }
      setSocialModalVisible(false);
    });
  };

  // Table column definitions
  const emailColumns = [
    {
      title: 'Email Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Copy">
            <Button
              icon={
                copied === `email-${record.id}` ? (
                  <CheckOutlined />
                ) : (
                  <CopyOutlined />
                )
              }
              onClick={() =>
                copyToClipboard(record.address, `email-${record.id}`)
              }
              type="text"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => editEmail(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteEmail(record.id)}
              type="text"
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const phoneColumns = [
    {
      title: 'Phone Number',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Copy">
            <Button
              icon={
                copied === `phone-${record.id}` ? (
                  <CheckOutlined />
                ) : (
                  <CopyOutlined />
                )
              }
              onClick={() =>
                copyToClipboard(record.number, `phone-${record.id}`)
              }
              type="text"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => editPhone(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deletePhone(record.id)}
              type="text"
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const socialColumns = [
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
      render: (text) => (
        <Space>
          {getIconComponent(text)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Copy URL">
            <Button
              icon={
                copied === `social-${record.id}` ? (
                  <CheckOutlined />
                ) : (
                  <CopyOutlined />
                )
              }
              onClick={() => copyToClipboard(record.url, `social-${record.id}`)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button
              icon={<EditOutlined />}
              onClick={() => editSocial(record)}
              type="text"
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              icon={<DeleteOutlined />}
              onClick={() => deleteSocial(record.id)}
              type="text"
              danger
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  // Social media platform options
  const platformOptions = [
    { label: 'LinkedIn', value: 'LinkedIn', icon: <LinkedinOutlined /> },
    { label: 'GitHub', value: 'GitHub', icon: <GithubOutlined /> },
    { label: 'Twitter', value: 'Twitter', icon: <TwitterOutlined /> },
    { label: 'Instagram', value: 'Instagram', icon: <InstagramOutlined /> },
    { label: 'Facebook', value: 'Facebook', icon: <FacebookOutlined /> },
  ];

  return (
    <div className="contact-dashboard">
      <Title level={2} className="dashboard-title">
        Contact Information
      </Title>
     
      <Tabs defaultActiveKey="1" type="card" className="contact-tabs">
        <TabPane
          tab={
            <span>
              <MailOutlined /> Email Addresses
            </span>
          }
          key="1"
        >
          <Card
            title="Email Addresses"
            extra={
              <Button
                className="!bg-[#0C469D] !text-white"
                icon={<PlusOutlined />}
                onClick={addEmail}
              >
                Add Email
              </Button>
            }
            className="contact-card"
          >
            <Table
              dataSource={emails}
              columns={emailColumns}
              rowKey="id"
              pagination={false}
              className="contact-table"
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <PhoneOutlined /> Phone Numbers
            </span>
          }
          key="2"
        >
          <Card
            title="Phone Numbers"
            extra={
              <Button
                className="!bg-[#0C469D] !text-white"
                icon={<PlusOutlined />}
                onClick={addPhone}
              >
                Add Phone
              </Button>
            }
            className="contact-card"
          >
            <Table
              dataSource={phones}
              columns={phoneColumns}
              rowKey="id"
              pagination={false}
              className="contact-table"
            />
          </Card>
        </TabPane>

        <TabPane
          tab={
            <span>
              <GithubOutlined /> Social Media
            </span>
          }
          key="3"
        >
          <Card
            title="Social Media Accounts"
            extra={
              <Button
                className="!bg-[#0C469D] !text-white"
                icon={<PlusOutlined />}
                onClick={addSocial}
              >
                Add Social Media
              </Button>
            }
            className="contact-card"
          >
            <Table
              dataSource={socials}
              columns={socialColumns}
              rowKey="id"
              pagination={false}
              className="contact-table"
            />
          </Card>
        </TabPane>
      </Tabs>

      {/* Email Modal */}
      <Modal
        title={editingItem ? 'Edit Email Address' : 'Add Email Address'}
        visible={emailModalVisible}
        onOk={handleEmailOk}
        onCancel={() => setEmailModalVisible(false)}
        destroyOnClose
        okText={editingItem ? 'Update' : 'Add'}
      >
        <Form requiredMark={false} form={emailForm} layout="vertical">
          <Form.Item
            label="Email Address"
            name="address"
            rules={[
              { required: true, message: 'Please enter an email address' },
              { type: 'email', message: 'Please enter a valid email address' },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email Address" />
          </Form.Item>
          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: 'Please enter a label' }]}
          >
            <Input placeholder="e.g. Work, Personal, etc." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Phone Modal */}
      <Modal
        title={editingItem ? 'Edit Phone Number' : 'Add Phone Number'}
        visible={phoneModalVisible}
        onOk={handlePhoneOk}
        onCancel={() => setPhoneModalVisible(false)}
        destroyOnClose
        okText={editingItem ? 'Update' : 'Add'}
      >
        <Form requiredMark={false} form={phoneForm} layout="vertical">
          <Form.Item
            label="Phone Number"
            name="number"
            rules={[{ required: true, message: 'Please enter a phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
          </Form.Item>
          <Form.Item
            label="Label"
            name="label"
            rules={[{ required: true, message: 'Please enter a label' }]}
          >
            <Input placeholder="e.g. Mobile, Work, Home, etc." />
          </Form.Item>
        </Form>
      </Modal>

      {/* Social Media Modal */}
      <Modal
        title={editingItem ? 'Edit Social Media' : 'Add Social Media'}
        visible={socialModalVisible}
        onOk={handleSocialOk}
        onCancel={() => setSocialModalVisible(false)}
        destroyOnClose
        okText={editingItem ? 'Update' : 'Add'}
      >
        <Form requiredMark={false} form={socialForm} layout="vertical">
          <Form.Item
            label="Platform"
            name="platform"
            rules={[{ required: true, message: 'Please select a platform' }]}
          >
            <Select placeholder="Select platform">
              {platformOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  <Space>
                    {option.icon}
                    {option.label}
                  </Space>
                </Option>
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
            <Input placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Contact;
