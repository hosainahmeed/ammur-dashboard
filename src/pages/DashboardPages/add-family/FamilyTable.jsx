import React from 'react';
import { Table, Button, Popconfirm, Typography, Spin } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { imageUrl } from '../../../Utils/server';

const FamilyTable = ({ families, onEdit, onDelete }) => {
  const [loading, setLoading] = React.useState(false);
  const columns = [
    {
      title: 'SL No.',
      dataIndex: 'index',
      key: 'index',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (url) => <img width={50} src={imageUrl(url)} alt="Family" />,
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
    <Spin spinning={loading}>
      <Table
        columns={columns}
        pagination={{ responsive: true }}
        dataSource={families?.map((family, index) => ({
          key: family._id,
          img: family.img,
          name: family.name,
          index: index + 1,
        }))}
        scroll={{ x: 1200 }}
        bordered
      />
    </Spin>
  );
};

export default FamilyTable;
