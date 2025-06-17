import React from 'react';
import { Card, Button, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import ActionButtons from '../ActionButtons';

const PhoneTab = ({
  phones,
  addPhone,
  editPhone,
  deletePhonehandle,
  copied,
  copyToClipboard,
}) => {
  const columns = [
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
        <ActionButtons
          record={record}
          onEdit={editPhone}
          onDelete={deletePhonehandle}
          copied={copied}
          copyToClipboard={copyToClipboard}
          type="phone"
          textToCopy={record.phone}
        />
      ),
    },
  ];

  return (
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
        columns={columns}
        rowKey="id"
        pagination={false}
        className="contact-table"
      />
    </Card>
  );
};

export default PhoneTab;
