import React from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ActionButtons from '../ActionButtons';

const EmailTab = ({
  emails,
  addEmail,
  editEmail,
  deleteEmailhandle,
}) => {
  const columns = [
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
        <ActionButtons
          record={record}
          onEdit={editEmail}
          onDelete={deleteEmailhandle}
          type="email"
          textToCopy={record.email}
        />
      ),
    },
  ];

  return (
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
        columns={columns}
        rowKey="id"
        pagination={false}
        className="contact-table"
      />
    </Card>
  );
};

export default EmailTab;
