import React, { useState } from 'react';
import { Table, Tag, Space, Avatar, Button, Modal, Select } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosMail, IoIosWarning } from 'react-icons/io';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TransactionTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [blockUserId, setBlockUserId] = useState(null);
  console.log(blockUserId);
  const users = [
    {
      id: 1,
      name: 'Theodore Mosciski',
      trId: 'TRX-84921A',
      date: '901-474-6265',
      email: 'maka@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 2,
      name: 'Russell Veum',
      date: '983-842-7095',
      trId: 'TRX-84921A',
      email: 'Nigel16@hotmail.com',
      paOn: 'D coin',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 3,
      name: 'Tracy Grady',
      date: '564-667-5097',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Handcash',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 44444444444444,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43333333333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 433,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'MR 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
  ];

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.avatar} />
          {text}
        </Space>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (email) => (
        <Space size="middle">
          <IoIosMail />
          {email}
        </Space>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Pay On',
      dataIndex: 'paOn',
      key: 'paOn',
    },
    {
      title: 'TR ID',
      dataIndex: 'trId',
      key: 'trId',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button className="!bg-[var(--bg-green-high)]">
            <UserOutlined className="!text-white" />
          </Button>

          <Button
            onClick={() => {
              setBlockUserId(record.id);
              setShowModal(true);
            }}
            className="ant-btn ant-btn-default"
          >
            <CgBlock />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <Table
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={
          users.length > 5
            ? {
                defaultPageSize: 5,
                showSizeChanger: false,
              }
            : false
        }
        bordered
      />
      <Modal
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <div className="flex flex-col items-center">
          <IoIosWarning size={60} color="#f6a112" />
          <h1 className="text-2xl font-bold text-black">Warning</h1>
          <p className="text-lg text-black">
            Are you sure you want to block this user?
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Button onClick={() => setShowModal(false)} type="primary" danger>
              Cancel
            </Button>
            <Button
              type="primary"
              className="!bg-[var(--bg-green-high)] !text-white"
              onClick={() => {
                toast.success('User successfully blocked');
                setShowModal(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TransactionTable;
