import { Avatar, Button, Modal, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import {
  useRequiestUserQuery,
  useUpdateUserStatusMutation,
} from '../../../Redux/services/dashboard apis/userApis';
import toast from 'react-hot-toast';
import { PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { IoIosMail } from 'react-icons/io';
import PageHeading from '../../Shared/PageHeading';
import UserInformation from '../../page component/UserInformation';

function RequestUser() {
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filteredRequestedUsers, setFilteredRequestedUsers] = useState([]);
  const { data: requestedUserData, isLoading: requestedUsersLoading } =
    useRequiestUserQuery();
  const [updateUserStatus, { isLoading: updateUserStatusLoading }] =
    useUpdateUserStatusMutation();
  useEffect(() => {
    if (requestedUserData?.data) {
      const reqUsers = requestedUserData?.data?.map((user) => ({
        key: user?._id || 'N/A',
        id: user?._id || 'N/A',
        name: user?.fullName || 'N/A',
        contactNumber: user?.contactNo || 'N/A',
        email: user?.email || 'N/A',
        familySide: user?.familySide || 'N/A',
        elderFamilyMember: user?.eldestRelative || 'N/A',
        joined: user?.createdAt.split('T')[0] || 'N/A',
        isBlocked: user?.isDeleted || 'N/A',
        status: user?.status || 'N/A',
        avatar: user?.img || null,
        fullUser: user,
      }));
      setFilteredRequestedUsers(reqUsers);
    }
  }, [requestedUserData]);
  const updateUserStatusHandler = async (record) => {
    const id = record?.id;
    const data = {
      approvalStatus: true,
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
          <Popconfirm
            placement="bottomRight"
            title="Are you sure you want approve this user?"
            onConfirm={() => updateUserStatusHandler(record)}
          >
            <Button
              className="!bg-yellow-300"
              disabled={
                updateUserStatusLoading && selectedUser?.id === record.id
              }
              loading={
                updateUserStatusLoading && selectedUser?.id === record.id
              }
            >
              Approve
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageHeading title="Request User Manage" />
      <Table
        columns={columnsRequestedUsers}
        dataSource={filteredRequestedUsers}
        rowKey="id"
        pagination={true}
        bordered
        loading={requestedUsersLoading}
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
}

export default RequestUser;
