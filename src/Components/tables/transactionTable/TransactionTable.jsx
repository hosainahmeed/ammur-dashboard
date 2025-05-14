import React, { useState } from 'react';
import { Table, Tag, Space, Avatar, Button, Modal, Select } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
import { CgBlock } from 'react-icons/cg';
import { IoIosMail, IoIosWarning } from 'react-icons/io';

const TransactionTable = () => {
  const users = [
    {
      id: 1,
      name: 'Theodore Mosciski',
      trId: 'TRX-84921A',
      date: '901-474-6265',
      email: 'maka@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 2,
      name: 'Russell Veum',
      date: '983-842-7095',
      trId: 'TRX-84921A',
      email: 'Nigel16@hotmail.com',
      paOn: 'D coin',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 3,
      name: 'Tracy Grady',
      date: '564-667-5097',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Handcash',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 44444444444444,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43333333333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 4333,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 433,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
      avatar: `https://tinypng.com/images/social/website.jpg`,
    },
    {
      id: 43,
      name: 'Dana Daniel',
      date: '443-393-4346',
      trId: 'TRX-84921A',
      email: 'rrian@yandex.ru',
      paOn: 'Online',
      amount: 'USD 29',
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

          <Button className="ant-btn ant-btn-default">
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
    </div>
  );
};

export default TransactionTable;
