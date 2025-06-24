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
// import { Link } from 'react-router-dom';
import {
  useDeleteTimelineMutation,
  useGetTimelineQuery,
} from '../../../Redux/services/dashboard apis/timelineApis';
import { imageUrl } from '../../../Utils/server';
import CreatNewHistory from './CreatNewHistory';
import debounce from 'debounce';

function HistoryTable() {
  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const { data, isLoading } = useGetTimelineQuery({
    seachTerm: search,
  });
  const [id, setId] = useState(null);
  const [deleteTimeline] = useDeleteTimelineMutation();
  const [createNewModal, setCreateNewModal] = useState(false);

  const history =
    data?.data?.map((item) => ({
      key: item._id,
      name: item.title,
      description: item.description,
      date: item.date,
      banner: item.img,
    })) || [];

  const showModal = (record) => {
    setSelectedHistory(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = async (record) => {
    try {
      await deleteTimeline({ id: record.key })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res.message || 'Timeline deleted successfully!');
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete timeline');
    }
  };
  const handleSearch = debounce((value) => {
    setSearch(value);
  }, 300);
  const columns = [
    {
      title: 'Image',
      dataIndex: 'banner',
      key: 'banner',
      width: 200,
      render: (_, record) => (
        <div className="w-fit">
          <Image
            preview={false}
            className="w-28 h-16 rounded-md object-cover shadow-md"
            src={imageUrl(record.banner)}
            alt="banner_image"
          />
        </div>
      ),
    },
    {
      title: 'Title',
      dataIndex: 'name',
      key: 'name',
      width: 300,
      render: (_, record) => (
        <h2 className="text-lg font-semibold">{record.name}</h2>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 500,
      render: (_, record) => (
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{
            __html:
              record.description.length > 150
                ? `${record.description.slice(0, 150)}...`
                : record.description,
          }}
        />
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date) => (
        <Tag color="blue" className="text-nowrap">
          {date}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          {/* <Link to={`/timeline/timeline-handle`} state={record.key}> */}
          <Button
            onClick={() => {
              setCreateNewModal(true);
              setId(record.key);
            }}
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<CiEdit />}
            title="Edit"
          />
          {/* </Link> */}
          <Button
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<FaEye />}
            title="View"
            onClick={() => showModal(record)}
          />
          <Popconfirm
            placement="bottomRight"
            title="Confirm Deletion"
            description="Are you sure you want to delete this history item?"
            onConfirm={() => handleDelete(record)}
            onCancel={() => console.log('Cancelled')}
            okText="Yes"
            cancelText="No"
          >
            <Button
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
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search by title"
          className="!w-[300px]"
          allowClear
        />
        {/* <Link to={'/timeline/timeline-handle'}> */}
        <Button
          onClick={() => {
            setId(null);
            setCreateNewModal(true);
          }}
          icon={<FaPlus />}
          className="!h-10 !bg-[#0C469D] !text-white !px-6 !flex items-center"
        >
          Add New History
        </Button>
        {/* </Link> */}
      </div>

      <Table
        columns={columns}
        dataSource={history}
        loading={isLoading}
        pagination={{ pageSize: 5 }}
        className="history-table"
        rowKey="key"
        scroll={{ x: 1200 }}
        bordered
      />

      <Modal
        title={<span className="text-xl font-bold">History Details</span>}
        open={isModalVisible}
        onCancel={handleCancel}
        destroyOnClose
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
                src={selectedHistory.banner}
                alt={selectedHistory.name}
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
              {selectedHistory.name}
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
              <div
                className="text-gray-700 whitespace-pre-line"
                dangerouslySetInnerHTML={{
                  __html: selectedHistory.description,
                }}
              />
            </div>
          </div>
        )}
      </Modal>
      <Modal
        width={800}
        open={createNewModal}
        footer={null}
        destroyOnClose
        onCancel={() => setCreateNewModal(false)}
        closeIcon={false}
        centered
        maskClosable={false}
      >
        <CreatNewHistory setCreateNewModal={setCreateNewModal} id={id} />
      </Modal>
    </div>
  );
}

export default HistoryTable;
