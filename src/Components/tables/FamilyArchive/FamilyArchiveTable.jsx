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
  Spin,
  Breadcrumb,
  ConfigProvider,
  Alert,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { CiEdit } from 'react-icons/ci';
import { FaEye, FaPlus, FaCalendarAlt } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CreateNewArchive from './CreateNewArchive';
import { useGetAllSubArchiveQuery } from '../../../Redux/services/dashboard apis/archiveApis';
import UpdateArchive from './UpdateArchive';
function FamilyArchiveTable() {
  const location = useLocation();
  const { id: categoryId, title } = location.state;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [createNewModal, setCreateNewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const { data, isLoading } = useGetAllSubArchiveQuery(
    { id: categoryId },
    { skip: !categoryId }
  );

  console.log(data)
  const navigate = useNavigate();

  const archiveData = data?.data?.map((item) => ({
    key: item._id,
    img: item?.img,
    title: item?.title,
    description: item?.description,
    familyName: item?.familyName,
    date: item?.date,
  }));
  const [editId, setEditId] = useState(null);

  const showModal = (record) => {
    setSelectedHistory(record);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
            className="w-28 max-h-16 rounded-md object-cover shadow-md"
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
        <h2 className="text-lg font-semibold">{record?.title?.slice(0, 15)}</h2>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      width: 500,
      render: (_, record) => (
        <div dangerouslySetInnerHTML={{ __html: record.description }} />
      ),
    },
    {
      title: 'Family',
      dataIndex: 'familyName',
      key: 'familyName',
      render: (family) => (
        <Tag color="blue" className="text-nowrap">
          {family}
        </Tag>
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
          <Button
            onClick={() => {
              setEditModal(true);
              setEditId(record.key);
            }}
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<CiEdit />}
            title="Edit"
          />
          <Button
            className="!bg-[#0C469D] !text-white hover:!bg-[#0C469D]/90 transition-all"
            icon={<FaEye />}
            title="View"
            onClick={() => showModal(record)}
          />
          <Popconfirm
            placement="bottomRight"
            title="Confirm Deletion"
            description="Are you sure you want to delete this archive?"
            onConfirm={() => {
              toast.success('Deleted successfully');
            }}
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
    <Spin spinning={isLoading}>
      <Alert
        className="!mb-4"
        description={
          <Breadcrumb
            items={[
              {
                title: (
                  <span
                    className="cursor-pointer leading-0 hover:text-blue-500 transition-all"
                    onClick={() => navigate('/family-archive')}
                  >
                    Family Archive
                  </span>
                ),
              },
              {
                title: <span>{title}</span>,
              },
            ]}
          />
        }
        type="info"
      />

      <div className="flex items-center justify-between mb-4">
        <Button
          onClick={() => {
            setCreateNewModal(true);
          }}
          icon={<FaPlus />}
          className="!h-10 !bg-[#0C469D] !text-white !px-6 !flex items-center"
        >
          Add New Archive
        </Button>
        <Input.Search
          placeholder="Search by title"
          className="!w-[300px]"
          allowClear
        />
      </div>

      <Table
        columns={columns}
        dataSource={archiveData}
        pagination={{ pageSize: 5 }}
        className="history-table"
        rowKey="id"
        scroll={{ x: 1200 }}
        bordered
      />
      <Modal
        title={<span className="text-xl font-bold">Add New Archive</span>}
        open={createNewModal}
        onCancel={() => {
          setCreateNewModal(false);
        }}
        footer={null}
        width={800}
        centered
      >
        <CreateNewArchive setCreateNewModal={setCreateNewModal} />
      </Modal>
      <Modal
        title={<span className="text-xl font-bold">Edit Archive</span>}
        open={editModal}
        onCancel={() => {
          setEditModal(false);
          setEditId(null);
        }}
        footer={null}
        width={800}
        centered
      >
        <UpdateArchive
          setCreateNewModal={setCreateNewModal}
          archiveId={categoryId}
          id={editId}
        />
      </Modal>

      {/* History Detail Modal */}
      <Modal
        title={<span className="text-xl font-bold">History Details</span>}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        centered
      >
        {selectedHistory && (
          <div className="py-4">
            <div className="mb-6">
              <Image
                src={selectedHistory.img}
                alt={selectedHistory.title}
                className="w-full max-h-64 object-cover rounded-lg shadow-md"
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
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedHistory.description,
                }}
              />
            </div>
          </div>
        )}
      </Modal>
    </Spin>
  );
}

export default FamilyArchiveTable;
