import React from 'react';
import { Table, Button, Popconfirm, Image } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import { useGetGroupesQuery } from '../../../Redux/services/dashboard apis/groupeApis';
import { imageUrl } from '../../../Utils/server';
const DiscussionGroupTable = ({ onEdit, onDelete }) => {
  const { data: group } = useGetGroupesQuery();
  const groups =
    group?.data?.map((item) => {
      return {
        key: item._id,
        familyImage: item.img,
        roomId: item.roomId,
        familyName: item.familyName,
      };
    }) || [];
  const columns = [
    {
      title: 'Group Image',
      dataIndex: 'familyImage',
      key: 'familyImage',
      render: (url) => <Image width={50} src={imageUrl(url)} alt="Family" />,
    },
    {
      title: 'Group Title',
      dataIndex: 'roomId',
      key: 'roomId',
    },
    {
      title: 'Family Name',
      dataIndex: 'familyName',
      key: 'familyName',
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 300,
      render: (_, record) => (
        <div className="flex items-center gap-2">
          <Button
            onClick={() => onEdit(record)}
            icon={<CiEdit />}
            className="!bg-[#0C469D] !text-white"
          />
          <Popconfirm
            title="Are you sure to delete this discussion group?"
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
      dataSource={groups}
      scroll={{ x: 1500 }}
      bordered
    />
  );
};

export default DiscussionGroupTable;
