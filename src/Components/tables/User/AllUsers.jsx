import React, { useState, useEffect } from 'react';
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
import { IoIosMail } from 'react-icons/io';
import toast from 'react-hot-toast';
import UserInformation from '../../page component/UserInformation';
import {
  useGetAllUserQuery,
  useRequiestUserQuery,
} from '../../../Redux/services/dashboard apis/userApis/userApis';

const AllUsers = ({ recentUser }) => {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: allUsersData, isLoading } = useGetAllUserQuery({
    role: 'member',
  });
  const { data: requestedUserData, isLoading: requestedUsersLoading } =
    useRequiestUserQuery();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filteredRequestedUsers, setFilteredRequestedUsers] = useState([]);

  const [activeTab, setActiveTab] = useState('1');

  // Transform API data into table-friendly format when data changes
  useEffect(() => {
    if (allUsersData?.data) {
      const users = allUsersData.data.map((user) => ({
        key: user?._id,
        id: user?._id,
        name: user?.fullName,
        contactNumber: user?.contactNo,
        email: user?.email,
        familySide: user?.familySide,
        subscription: user?.subscription,
        joined: user?.createdAt.split('T')[0],
        status: user?.status === 'active',
        isBlocked: user?.isDeleted,
        avatar: user?.img || null,
        fullUser: user,
      }));
      setFilteredUsers(users);
    }
  }, [allUsersData]);

  useEffect(() => {
    if (requestedUserData?.data) {
      const reqUsers = requestedUserData.data.map((user) => ({
        key: user?._id,
        id: user?._id,
        name: user?.fullName,
        contactNumber: user?.contactNo,
        email: user?.email,
        familySide: user?.familySide,
        elderFamilyMember: user?.eldestRelative || '',
        joined: user?.createdAt.split('T')[0],
        status: user?.status === 'active',
        isBlocked: false,
        avatar: user?.img || null,
        fullUser: user,
      }));
      setFilteredRequestedUsers(reqUsers);
    }
  }, [requestedUserData]);

  // Search handler for all users
  const handleSearch = (value) => {
    if (activeTab === '1') {
      const filtered = filteredUsers.filter(
        (user) =>
          user?.name.toLowerCase().includes(value.toLowerCase()) ||
          user?.email.toLowerCase().includes(value.toLowerCase()) ||
          user?.contactNumber.includes(value)
      );
      setFilteredUsers(filtered);
    } else if (activeTab === '2') {
      const filtered = filteredRequestedUsers.filter(
        (user) =>
          user?.name.toLowerCase().includes(value.toLowerCase()) ||
          user?.email.toLowerCase().includes(value.toLowerCase()) ||
          user?.contactNumber.includes(value)
      );
      setFilteredRequestedUsers(filtered);
    }
  };

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
              setSelectedUser(record.fullUser);
              setUserDetailsModal(true);
            }}
            className="ant-btn !bg-[var(--bg-green-high)] !text-white ant-btn-primary"
          >
            <UserOutlined />
          </Button>
          <Popconfirm
            placement="bottomRight"
            title="Are you sure you want block this user?"
            onConfirm={() => toast.success('Successfully blocked user')}
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
              setSelectedUser(record.fullUser);
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

  const handleTabChange = (key) => {
    setActiveTab(key);
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

      {activeTab === '1' && (
        <Table
          columns={columnsAllUsers}
          dataSource={filteredUsers}
          rowKey="id"
          pagination={true}
          bordered
          loading={isLoading}
        />
      )}

      {activeTab === '2' && (
        <Table
          columns={columnsRequestedUsers}
          dataSource={filteredRequestedUsers}
          rowKey="id"
          pagination={true}
          bordered
          loading={requestedUsersLoading}
        />
      )}

      <Modal
        centered
        visible={userDetailsModal}
        onCancel={() => setUserDetailsModal(false)}
        footer={null}
        className="user-details-modal"
      >
        {selectedUser && <UserInformation user={selectedUser} />}
      </Modal>
    </div>
  );
};

export default AllUsers;
