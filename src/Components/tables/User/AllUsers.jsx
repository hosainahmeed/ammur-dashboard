import React, { useState } from 'react';
import {
  Table,
  Space,
  Avatar,
  Button,
  Modal,
  Tabs,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosWarning, IoIosMail } from 'react-icons/io';
// import toast from 'react-hot-toast';
import './alluserVanila.css';
import toast from 'react-hot-toast';
import UserInformation from '../../page component/UserInformation';

const AllUsers = ({ recentUser }) => {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Example data for "All Users"
  const allUsers = [
    {
      key: '1',
      id: '1',
      name: 'Theodore Mosciski',
      contactNumber: '901-474-6265',
      email: 'maka@yandex.ru',
      familySide: 'Father',
      subscription: 'Premium',
      joined: '2025-01-10',
      status: true,
      isBlocked: false,
      avatar: null,
    },
    // Add other users here...
  ];

  // Example data for "Requested Users"
  const requestedUsers = [
    {
      key: '1',
      id: '1',
      name: 'Russell Veum',
      contactNumber: '983-842-7095',
      email: 'Nigell6@hotmail.com',
      familySide: 'Mother',
      elderFamilyMember: 'Grandfather',
      joined: '2025-01-10',
      status: false,
      isBlocked: false,
      avatar: null,
    },
    // Add other requested users here...
  ];

  const [filteredUsers, setFilteredUsers] = useState(allUsers);
  const [filteredRequestedUsers, setFilteredRequestedUsers] =
    useState(requestedUsers);

  const columnsAllUsers = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: 'Family Side',
      dataIndex: 'familySide',
      key: 'familySide',
    },
    {
      title: 'Subscription',
      dataIndex: 'subscription',
      key: 'subscription',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
            }}
            className="ant-btn !bg-[var(--bg-green-high)] !text-white ant-btn-primary"
          >
            <UserOutlined />
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="Are you sure you want block this user?"
            onConfirm={() => toast.success('successfully blocked user')}
          >
            <Button
              className={`${
                record?.isBlocked ? '!bg-red-300' : '!bg-green-200'
              } ant-btn ant-btn-default`}
            >
              <CgBlock />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const columnsRequestedUsers = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar icon={<UserOutlined />} src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
      render: (phone) => (
        <Space>
          <PhoneOutlined />
          {phone}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space>
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: 'Family Side',
      dataIndex: 'familySide',
      key: 'familySide',
    },
    {
      title: 'Elder Family Member',
      dataIndex: 'elderFamilyMember',
      key: 'elderFamilyMember',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            onClick={() => {
              setSelectedUser(record);
              setUserDetailsModal(true);
            }}
            className="ant-btn !bg-[var(--bg-green-high)] !text-white ant-btn-primary"
          >
            <UserOutlined />
          </Button>
          <Button className="!bg-yellow-300">Approve</Button>
          <Button className="!bg-red-300">Reject</Button>
        </Space>
      ),
    },
  ];

  const [activeTab, setActiveTab] = useState('1');

  const handleTabChange = (key) => {
    setActiveTab(key);
    if (key === '1') {
      setFilteredUsers(allUsers);
    } else if (key === '2') {
      setFilteredRequestedUsers(requestedUsers);
    }
  };

  const handleSearch = (value) => {
    const filtered = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase()) ||
        user.contactNumber.includes(value)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="w-full overflow-x-auto">
      {recentUser !== true && (
        <div className="max-w-[400px]">
          <Form>
            <Form.Item>
              <Input.Search
                placeholder="Search here"
                onSearch={handleSearch}
                allowClear
              />
            </Form.Item>
          </Form>
        </div>
      )}

      <Tabs
        defaultActiveKey="1"
        activeKey={activeTab}
        type="card"
        onChange={handleTabChange}
      >
        <Tabs.TabPane tab="All Users" key="1" />
        <Tabs.TabPane tab="Requested User" key="2" />
      </Tabs>

      {/* Conditionally render tables based on selected tab */}
      {activeTab === '1' && (
        <Table
          columns={columnsAllUsers}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={true}
          bordered
        />
      )}

      {activeTab === '2' && (
        <Table
          columns={columnsRequestedUsers}
          dataSource={filteredRequestedUsers}
          rowKey="id"
          pagination={true}
          bordered
        />
      )}

      {/* Modal for user details */}
      <Modal
        centered
        visible={userDetailsModal}
        onCancel={() => setUserDetailsModal(false)}
        footer={null}
        className="user-details-modal"
      >
        <UserInformation selectedUser={setUserDetailsModal} />
      </Modal>
    </div>
  );
};

export default AllUsers;
