import React from 'react';
import { Table, Button, Popconfirm, Image } from 'antd';
import { CiEdit } from 'react-icons/ci';
import { MdDelete } from 'react-icons/md';
import {
  useDeleteGroupeMutation,
  useGetGroupesQuery,
} from '../../../Redux/services/dashboard apis/groupeApis';
import { imageUrl } from '../../../Utils/server';
import toast from 'react-hot-toast';
const DiscussionGroupTable = () => {
  const { data: group } = useGetGroupesQuery();
  const [deleteGroupe] = useDeleteGroupeMutation();

  const handleDeleteGroup = async (key) => {
    console.log(key)
    try {
      await deleteGroupe({ id: key })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Family deleted successfully');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };
  const groups =
    group?.data?.map((item) => {
      return {
        id: item._id,
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
          <Popconfirm
            title="Are you sure to delete this discussion group?"
            onConfirm={() => handleDeleteGroup(record.id)}
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
      scroll={{ x: 1200}}
      bordered
    />
  );
};

export default DiscussionGroupTable;
