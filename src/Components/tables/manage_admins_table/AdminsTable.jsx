import React, { useState } from 'react';
import { Table, Tag, Space, Avatar, Button, Modal, Form, Input } from 'antd';
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { FaRegCircle } from 'react-icons/fa6';
import { IoIosWarning } from 'react-icons/io';
import toast from 'react-hot-toast';
import Success from '../../Shared/Success';
import CreateNewAdmin from './CreateNewAdmin';
import UpdateAdminInformatio from './UpdateAdminInformatio';
import PageHeading from '../../Shared/PageHeading';

const AdminsTable = () => {
  const [createNewAdminModal, setCreateNewAdminModal] = useState(false);
  const [updateAdminInfo, setUpdateAdminInfo] = useState(false);
  const [selectAdmin, setSelectAdmin] = useState(null);
  const [userDetailsModal, setUserDetailsModal] = useState(false);
  const admins = [
    {
      key: '1',
      name: 'Theodore Mosciski',
      contactNumber: '901-474-6265',
      email: 'maka@yandex.ru',
    },
    {
      key: '2',
      name: 'Russell Veum',
      contactNumber: '983-842-7095',
      email: 'Nigel16@hotmail.com',
    },
    {
      key: '3',
      name: 'Tracy Grady',
      contactNumber: '564-667-5097',
      email: 'rrian@yandex.ru',
    },
    {
      key: '4',
      name: 'Dana Daniel',
      contactNumber: '443-393-4346',
      email: 'rrian@yandex.ru',
    },
    {
      key: '5',
      name: 'Gerardo Barrows',
      contactNumber: '344-223-4982',
      email: 'cido@gmail.com',
    },
    {
      key: '6',
      name: 'Sheryl Gusikowski',
      contactNumber: '752-792-1071',
      email: 'cedennar@gmail.com',
    },
  ];

  const columns = [
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <div className="flex items-center">
          <Avatar
            size="small"
            style={{ marginRight: 8 }}
            src={`https://avatarfiles.alphacoders.com/364/364731.png`}
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
            onClick={() => setUserDetailsModal(true)}
            className="!bg-[var(--bg-green-high)]"
            type="default"
            icon={<UserOutlined className="!text-white" />}
            size="small"
          />
          <Button
            onClick={() => {
              setSelectAdmin(record.key);
              setUpdateAdminInfo(true);
            }}
            className="!bg-[var(--bg-green-high)]"
            type="default"
            icon={<EditOutlined className="!text-white" />}
            size="small"
          />
          <Button
            danger
            type="default"
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => toast.success('Admin delete successfully')}
          />
          <Button type="default" icon={<FaRegCircle />} size="small" />
        </Space>
      ),
    },
  ];

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
        dataSource={admins}
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
          id={selectAdmin}
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
          <h1 className="text-2xl font-bold">Admin no.1</h1>
          <div className="!w-full p-1 border-1 border-[var(--vg-green-high)] rounded-md">
            <div className="p-2 bg-[var(--bg-green-high)] !text-white flex items-center justify-center font-semibold text-base rounded-md">
              Admin Profile
            </div>
          </div>
          <div className="mt-4 !w-full">
            <p className="font-semibold">Admin Full Name</p>
            <p className="p-2 border border-[#64748B] rounded-md">Admin no.1</p>
            <p className="font-semibold mt-2">Email</p>
            <p className="p-2 border border-[#64748B] rounded-md">
              admin@gmail.com
            </p>
            <p className="font-semibold mt-2">Phone Number</p>
            <p className="p-2 border border-[#64748B] rounded-md">
              1245412458454
            </p>
          </div>
          <div className="mt-4 !w-full">
            <div className="flex items-center justify-between gap-3">
              <Button
                type="primary"
                danger
                onClick={() => {
                  toast.success('User blocked');
                  setUserDetailsModal(false);
                }}
                className="!w-full !border !bg-white !text-red-500 !border-red-500 hover:!text-white hover:!bg-red-500"
              >
                Block This User
              </Button>
              <Button
                type="primary"
                danger
                onClick={() => {
                  setSelectAdmin('as');
                  setUserDetailsModal(false);
                  setUpdateAdminInfo(true);
                }}
                className="!w-full !border !bg-[var(--bg-green-high)] !text-white"
              >
                Update
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AdminsTable;
