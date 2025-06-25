import React, { useState } from 'react';
import {
  Table,
  Space,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosMail } from 'react-icons/io';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import UserInformation from '../../page component/UserInformation';
import {
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from '../../../Redux/services/dashboard apis/userApis';

const AllUsers = ({ recentUser }) => {
  const [searchedUsers, setSearchedUsers] = useState('');
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { data: allUsersData, isLoading } = useGetAllUserQuery({
    role: 'member',
    searchTerm: searchedUsers,
  });
  const [updateUserStatus] = useUpdateUserStatusMutation();

  const users = allUsersData?.data?.map((user) => ({
    key: user?._id || 'N/A',
    id: user?._id || 'N/A',
    name: user?.fullName || 'N/A',
    contactNumber: user?.contactNo || 'N/A',
    email: user?.email || 'N/A',
    familySide: user?.familySide || 'N/A',
    subscription: user?.subscription || 'N/A',
    joined: user?.createdAt.split('T')[0] || 'N/A',
    status: user?.status || 'N/A',
    isBlocked: user?.isDeleted || 'N/A',
    avatar: user?.img || null,
    fullUser: user,
  }));

  const blockUser = async (record) => {
    const id = record?.id;
    const data = {
      status: record?.status === 'active' ? 'blocked' : 'active',
    };
    try {
      await updateUserStatus({ id, data })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'User status updated successfully!');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  const handleSearch = debounce((value) => {
    setSearchedUsers(value);
  }, 300);

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
            size="small"
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
            title={`Are you sure you want ${
              record?.status === 'active' ? 'block' : 'unblock'
            } this user?`}
            onConfirm={() => blockUser(record)}
          >
            <Button
              size="small"
              className={`${
                record?.status === 'active' ? '!bg-green-200' : '!bg-red-300'
              } ant-btn ant-btn-default`}
            >
              <CgBlock />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      {recentUser !== true && (
        <div className="max-w-[400px]">
          <Form>
            <Form.Item>
              <Input
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name or email..."
                allowClear
              />
            </Form.Item>
          </Form>
        </div>
      )}

      <Table
        columns={columnsAllUsers}
        dataSource={users}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        bordered
        loading={isLoading}
      />

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
