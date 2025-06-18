import React, { useState } from 'react';
import {
  Table,
  Tag,
  Space,
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  Popconfirm,
} from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { FaRegCircle } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import toast from 'react-hot-toast';
import CreateNewAdmin from './CreateNewAdmin';
import UpdateAdminInformatio from './UpdateAdminInformatio';
import PageHeading from '../../Shared/PageHeading';
import {
  useDeleteUserMutation,
  useGetAllUserQuery,
  useUpdateUserStatusMutation,
} from '../../../Redux/services/dashboard apis/userApis';
import { imageUrl } from '../../../Utils/server';

const AdminsTable = () => {
  const [createNewAdminModal, setCreateNewAdminModal] = useState(false);
  const [updateAdminInfo, setUpdateAdminInfo] = useState(false);
  const [selectAdmin, setSelectAdmin] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const { data: adminsData, isLoading: adminsLoading } = useGetAllUserQuery({
    role: 'admin',
  });

  const [updateUserStatus] = useUpdateUserStatusMutation();
  const [deleteUser] = useDeleteUserMutation();

  const adminsInfo =
    adminsData?.data?.map((item) => {
      return {
        key: item?._id,
        name: item?.fullName,
        contactNumber: item?.contactNo,
        email: item?.email,
        approvalStatus: item?.approvalStatus,
        otpVerified: item?.otpVerified,
        preferedContactMethod: item?.preferedContactMethod,
        address: item?.address,
        proffession: item?.proffession,
        eldestRelative: item?.eldestRelative,
        familySide: item?.familySide,
        subscription: item?.subscription,
        paymentStatus: item?.paymentStatus,
        img: item?.img,
        role: item?.role,
        status: item?.status,
        isDeleted: item?.isDeleted,
      };
    }) || [];

  const columns = [
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar
            size="small"
            style={{ marginRight: 8 }}
            src={imageUrl(record.img)}
          />
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button
            onClick={() => {
              setUserDetailsModal(true);
              setSelectedUser(record);
            }}
            className="!bg-[var(--bg-green-high)]"
            type="default"
            icon={<UserOutlined className="!text-white" />}
            size="small"
          />
          <Button
            onClick={() => {
              setSelectAdmin(record);
              setUpdateAdminInfo(true);
            }}
            className="!bg-[var(--bg-green-high)]"
            type="default"
            icon={<EditOutlined className="!text-white" />}
            size="small"
          />
          <Popconfirm
            title="Are you sure to delete this admin?"
            onConfirm={() => deleteHandler(record.key)}
          >
            <Button
              danger
              type="default"
              icon={<DeleteOutlined />}
              size="small"
            />
          </Popconfirm>

          <Popconfirm
            title={`Are you sure to ${
              record?.status === 'active' ? 'block' : 'unblock'
            } this admin?`}
            onConfirm={() => blockUser(record)}
          >
            <Button
              className={`${
                record?.status === 'active' ? '!bg-green-200' : '!bg-red-300'
              } ant-btn ant-btn-default`}
              type="default"
              icon={<FaRegCircle />}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  const deleteHandler = (id) => {
    try {
      deleteUser({ id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'User deleted successfully!');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };
  const blockUser = async (record) => {
    const id = record?.key;
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

  const handleSearch = () => {};
  return (
    <div className="admin-table">
      <PageHeading title={'Admins Manage'} />
      <div className="flex !items-start justify-between">
        <div className="max-w-[400px] min-w-[400px]">
          <Form className="!w-full !h-fit">
            <Form.Item>
              <Input.Search
                placeholder="Search by name"
                onSearch={handleSearch}
                allowClear
              />
            </Form.Item>
          </Form>
        </div>
        <Button
          onClick={() => setCreateNewAdminModal(true)}
          icon={<PlusOutlined />}
          className="!bg-[var(--bg-green-high)] !text-white"
        >
          Add New Admin
        </Button>
      </div>
      <Table
        columns={columns}
        loading={adminsLoading}
        dataSource={adminsInfo}
        pagination={{
          position: ['bottomCenter'],
          showSizeChanger: false,
          defaultPageSize: 10,
          showQuickJumper: false,
          size: 'small',
        }}
      />

      <Modal open={createNewAdminModal} footer={null} closeIcon={false}>
        <CreateNewAdmin closeModal={setCreateNewAdminModal} />
      </Modal>
      <Modal centered open={updateAdminInfo} footer={null} closeIcon={false}>
        <UpdateAdminInformatio
          adminData={selectAdmin}
          closeModal={setUpdateAdminInfo}
        />
      </Modal>
      <Modal
        visible={userDetailsModal}
        onCancel={() => setUserDetailsModal(false)}
        footer={null}
        className="user-details-modal"
      >
        <div className="flex flex-col items-center">
          <Avatar
            className="!w-24 !h-24"
            src="https://xsgames.co/randomusers/avatar.php?g=male"
          />
          <h1 className="text-2xl font-bold">{selectedUser?.name}</h1>
          <div className="!w-full p-1 border-1 border-[var(--vg-green-high)] rounded-md">
            <div className="p-2 bg-[var(--bg-green-high)] !text-white flex items-center justify-center font-semibold text-base rounded-md">
              Admin Profile
            </div>
          </div>
          <div className="mt-4 !w-full">
            <p className="font-semibold">Admin Full Name</p>
            <p className="p-2 border border-[#64748B] rounded-md">
              {selectedUser?.name}
            </p>
            <p className="font-semibold mt-2">Email</p>
            <p className="p-2 border border-[#64748B] rounded-md">
              {selectedUser?.email}
            </p>
            <p className="font-semibold mt-2">Phone Number</p>
            <p className="p-2 border border-[#64748B] rounded-md">
              {selectedUser?.contactNumber}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminsTable;
