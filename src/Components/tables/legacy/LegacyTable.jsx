import React, { useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Popconfirm,
  Table,
  Space,
  Tag,
  Image,
  Divider,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CiEdit } from 'react-icons/ci';
import { FaEye, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  useDeleteLegacyMutation,
  useGetLegacyQuery,
} from '../../../Redux/services/dashboard apis/lagecyApis';

function LegacyTable() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const { data, isLoading } = useGetLegacyQuery();
  const [deleteLegacyApi, { isLoading: isDeleting }] =
    useDeleteLegacyMutation();

  const lagacyData = data?.data?.map((item) => {
    return {
      key: item?._id,
      title: item?.title,
      familyName: item?.familyName,
      dateOfBirth: item?.dateOfBirth,
      burial: item?.burial,
      description: item?.description,
      img: item?.img,
      isDeleted: item?.isDeleted,
    };
  });

  const showModal = (record) => {
    setSelectedHistory(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const deleteLegacy = async (id) => {
    try {
      await deleteLegacyApi(id)
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Legacy deleted successfully');
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete legacy');
    }
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      width: 200,
      render: (_, record) => (
        <div className="w-fit">
          <Image
            preview={false}
            className="w-28 h-16 rounded-md object-cover shadow-md"
            src={record.img}
            alt="banner_image"
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width: 300,
      render: (_, record) => (
        <h2 className="text-lg font-semibold">{record.title}</h2>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 400,
      render: (_, record) => (
        <p className="text-gray-700">{record.description.slice(0, 150)}...</p>
      ),
    },
    {
      title: 'Family',
      dataIndex: 'familyName',
      key: 'familyName',
      render: (familyName) => (
        <Tag color="blue" className="text-nowrap">
          {familyName}
        </Tag>
      ),
    },
    {
      title: 'Date of birth',
      dataIndex: 'dateOfBirth',
      key: 'dateOfBirth',
      render: (dateOfBirth) => (
        <Tag color="green" className="text-nowrap">
          {dateOfBirth}
        </Tag>
      ),
    },
    {
      title: 'RIP',
      dataIndex: 'burial',
      key: 'burial',
      render: (burial) => (
        <Tag color="red" className="text-nowrap">
          {burial}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <Button
            size="small"
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<CiEdit />}
            title="Edit"
          />
          <Button
            size="small"
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<FaEye />}
            title="View"
            onClick={() => showModal(record)}
          />
          <Popconfirm
            placement="bottomRight"
            title="Confirm Deletion"
            description="Are you sure you want to delete this history item?"
            loading={isDeleting}
            onConfirm={() => {
              deleteLegacy(record.key);
            }}
            onCancel={() => console.log('Cancelled')}
            okText="Yes"
            cancelText="No"
          >
            <Button
              size="small"
              className="!border-red-500 !text-red-500 hover:!bg-red-100 transition-all"
              icon={<DeleteOutlined />}
              title="Delete"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <Link to={'/family-legacy/create-new'}>
          <Button
            icon={<FaPlus />}
            className="!h-10 !bg-[#0C469D] !text-white !px-6 !flex items-center"
          >
            Add New Legacy
          </Button>
        </Link>
        <Input.Search
          placeholder="Search by title"
          className="!w-[300px]"
          allowClear
        />
      </div>

      <Table
        loading={isLoading}
        columns={columns}
        dataSource={lagacyData}
        pagination={{ pageSize: 5 }}
        className="history-table"
        rowKey="key"
        scroll={{ x: 1200 }}
        bordered
      />

      {/* History Detail Modal */}
      <Modal
        title={<span className="text-xl font-bold">Legacy Details</span>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Close
          </Button>,
        ]}
        width={800}
        centered
      >
        {selectedHistory && (
          <div className="py-4">
            <div className="mb-6">
              <Image
                src={selectedHistory.img}
                alt={selectedHistory.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
                preview={false}
              />
            </div>

            <div className="flex items-center gap-3 mb-4">
              <FaCalendarAlt className="text-gray-500 text-lg" />
              <span className="text-gray-600 font-medium">
                {selectedHistory.date}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedHistory.title}
            </h2>
            <h2 className="text-sm leading-none font-bold text-gray-800 mb-4">
              {selectedHistory.familyName}
            </h2>

            <Divider
              orientation="left"
              className="!text-gray-500 !text-sm !mt-6"
            >
              <div className="flex items-center gap-2">
                <MdDescription />
                <span>Description</span>
              </div>
            </Divider>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">
                {selectedHistory.description}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default LegacyTable;
