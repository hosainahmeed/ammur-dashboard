import React from 'react';
import { Table, Button, Popconfirm, Typography } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';

const FamilyTable = ({ families, onEdit, onDelete }) => {
  const columns = [
    {
      title: 'SL No.',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Family Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      width: 250,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onEdit(record)}
            icon={<CiEdit />}
            className="!bg-[#0C469D] !text-white"
          />
          <Popconfirm
            title="Are you sure to delete this family?"
            onConfirm={() => onDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<MdDelete />} danger />
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      pagination={{ responsive: true }}
      dataSource={families?.map((family, index) => ({
        key: family._id,
        name: family.name,
        index: index + 1,
      }))}
      scroll={{ x: 1500 }}
      bordered
    />
  );
};

export default FamilyTable;
