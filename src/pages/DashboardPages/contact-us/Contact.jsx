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
  Card,
  Popconfirm,
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
  CopyOutlined,
  CheckOutlined,
} from '@ant-design/icons';
import './Contact.css';
import PageHeading from '../../../Components/Shared/PageHeading';
import {
  useCreateEmailMutation,
  useCreatePhoneMutation,
  useCreateSocialMediaMutation,
  useDeleteEmailMutation,
  useDeletePhoneMutation,
  useDeleteSocialMediaMutation,
  useGetAllEmailQuery,
  useGetAllPhoneQuery,
  useSocialMediaQuery,
  useUpdateEmailMutation,
  useUpdatePhoneMutation,
  useUpdateSocialMediaMutation,
} from '../../../Redux/services/settings/contactUsApis';
import toast from 'react-hot-toast';

const { Option } = Select;
const { TabPane } = Tabs;

function Contact() {
  const { data: emailsData } = useGetAllEmailQuery();
  const [createEmail] = useCreateEmailMutation();
  const [updateEmail] = useUpdateEmailMutation();
  const [deleteEmail] = useDeleteEmailMutation();

  const { data: phoneData } = useGetAllPhoneQuery();
  const [updatePhone] = useUpdatePhoneMutation();
  const [createPhone] = useCreatePhoneMutation();
  const [deletePhone] = useDeletePhoneMutation();

  const { data: socialMediaData } = useSocialMediaQuery();
  const [createSocialMedia] = useCreateSocialMediaMutation();
  const [updateSocialMedia] = useUpdateSocialMediaMutation();
  const [deleteSocialMedia] = useDeleteSocialMediaMutation();

  const emails = emailsData?.data.map((email) => ({
    id: email?._id,
    lebel: email?.lebel,
    email: email?.email,
    isDeleted: email?.isDeleted,
  }));
  const phones = phoneData?.data.map((phone) => ({
    id: phone?._id,
    lebel: phone?.lebel,
    phone: phone?.phone,
    isDeleted: phone?.isDeleted,
  }));
  const socials = socialMediaData?.data?.map((social) => ({
    id: social?._id,
    name: social?.name,
    url: social?.url,
    isDeleted: social?.isDeleted,
  }));

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

  const deleteEmailhandle = async (id) => {
    await deleteEmail({ id: id })
      .unwrap()
      .then((res) => {
        if (res?.success) {
          toast.success(res?.message || 'Email deleted successfully');
        }
      });
  };

  const handleEmailOk = async () => {
    try {
      const values = await emailForm.validateFields();
      if (editingItem) {
        await updateEmail({ id: editingItem.id, data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Email updated successfully');
          });
      } else {
        await createEmail({ data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Email added successfully');
          });
      }
      setEmailModalVisible(false);
    } catch (error) {
      toast.error(
        error?.data?.errorSources[0].message || 'Something went wrong'
      );
    }
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

  const deletePhonehandle = async (id) => {
    try {
      await deletePhone({ id: id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Phone number deleted successfully');
          }
        });
    } catch (error) {
      console.log(error);
    }
    toast.success('Phone number deleted successfully');
  };

  const handlePhoneOk = async () => {
    try {
      const values = await phoneForm.validateFields();
      if (editingItem) {
        await updatePhone({ id: editingItem.id, data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Phone number updated successfully');
          });
      } else {
        await createPhone({ data: values })
          .unwrap()
          .then((res) => {
            toast.success(res?.message || 'Phone number added successfully');
          });
      }
      setPhoneModalVisible(false);
    } catch (error) {
      toast.error(
        error?.data?.errorSources[0].message || 'Something went wrong'
      );
    }
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

  const deleteSocial = async (id) => {
    try {
      await deleteSocialMedia({ id: id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(
              res?.message || 'Social media account deleted successfully'
            );
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
      console.log(error);
    }
  };

  const handleSocialOk = async () => {
    try {
      socialForm.validateFields().then((values) => {
        if (editingItem) {
          updateSocialMedia({ id: editingItem.id, data: values })
            .unwrap()
            .then((res) => {
              toast.success(
                res?.message || 'Social media updated successfully'
              );
            });
        } else {
          createSocialMedia({ data: values })
            .unwrap()
            .then((res) => {
              toast.success(res?.message || 'Social media added successfully');
            });
        }
        setSocialModalVisible(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Table column definitions
  const emailColumns = [
    {
      title: 'Email Address',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Label',
      dataIndex: 'lebel',
      key: 'lebel',
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
                copyToClipboard(record.email, `email-${record.id}`)
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
            <Popconfirm
              placement="bottomRight"
              title="Are you sure to delete this email?"
              onConfirm={() => deleteEmailhandle(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const phoneColumns = [
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Label',
      dataIndex: 'lebel',
      key: 'lebel',
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
                copyToClipboard(record.phone, `phone-${record.id}`)
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
            <Popconfirm
              placement="bottomRight"
              title="Are you sure to delete this phone number?"
              onConfirm={() => deletePhonehandle(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const socialColumns = [
    {
      title: 'Platform',
      dataIndex: 'name',
      key: 'name',
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
            <Popconfirm
              placement="bottomRight"
              title="Are you sure to delete this social media?"
              onConfirm={() => deleteSocial(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} type="text" danger />
            </Popconfirm>
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
      <PageHeading title={'Contact Information'} />
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
            name="name"
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
            <Input autoComplete="off" placeholder="https://..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Contact;
