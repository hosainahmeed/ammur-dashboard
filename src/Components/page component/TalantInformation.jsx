import { Button, Divider, Modal, Popconfirm, Table } from 'antd';
import React, { useState } from 'react';
import { EyeOutlined } from '@ant-design/icons';

function TalantInformation({ selectedUser }) {
  console.log(selectedUser);

  const Tabs = ['User Info', 'Inquiries'];
  const [tab, setTab] = useState(Tabs[0]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleOpenModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedInquiry(null);
  };

  const inquiries = [
    {
      inquiryType: 'Tenant',
      priceRange: '$1K - $10K',
      postedOn: '2025-04-10',
      details: {
        fullName: 'Albert Flores',
        mobileNumber: '(406) 555-0120',
        email: 'dric@gmail.com',
        preferredPropertyType: 'Apartment',
        budgetRange: '$1,500 - $2,500 per month',
        moveInDate: '06/15/2025',
        numberOfBedrooms: '02',
        numberOfBathrooms: '02',
        size: '1,200 SQ Ft',
        preferredLocation: 'Manchester',
        additionalComments: 'Lorem ipsum dolor sit amet consectetur.',
      },
    },
    {
      inquiryType: 'Tenant',
      priceRange: '$1K - $10K',
      postedOn: '2025-05-10',
      details: {
        fullName: 'John Doe',
        mobileNumber: '(123) 555-6789',
        email: 'john.doe@example.com',
        preferredPropertyType: 'House',
        budgetRange: '$2,000 - $3,000 per month',
        moveInDate: '07/01/2025',
        numberOfBedrooms: '03',
        numberOfBathrooms: '02',
        size: '1,500 SQ Ft',
        preferredLocation: 'London',
        additionalComments: 'Looking for a place with a garden.',
      },
    },
    // More inquiries can be added here
  ];

  const columns = [
    {
      title: 'Inquiry Type',
      dataIndex: 'inquiryType',
      key: 'inquiryType',
    },
    {
      title: 'Price Range',
      dataIndex: 'priceRange',
      key: 'priceRange',
    },
    {
      title: 'Posted On',
      dataIndex: 'postedOn',
      key: 'postedOn',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Button
          icon={<EyeOutlined />}
          onClick={() => handleOpenModal(record)}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden p-1 border-1 border-[var(--bg-green-high)]">
          <img
            src="https://wallpapercat.com/w/full/b/9/2/2144467-1920x1080-desktop-full-hd-hinata-naruto-wallpaper.jpg"
            className="w-full h-full rounded-full overflow-hidden object-cover"
            alt="user"
          />
        </div>
      </div>
      <h1 className="text-center text-xl">Talant/Landlord Name</h1>
      <Divider />
      <div className="mx-auto p-1 border rounded-sm !w-fit center-center my-3">
        {Tabs.map((item) => (
          <Button
            key={item}
            style={{ width: '200px', justifyContent: 'center' }}
            className={`${
              item === tab
                ? '!bg-[var(--bg-green-high)] !text-white !border-0 !rounded-sm'
                : '!border-0 !rounded-none !text-black !border-black !bg-transparent'
            }`}
            onClick={() => setTab(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <Divider />
      {tab === 'User Info' ? (
        <div className="flex flex-col gap-2">
          <div className="rounded-md px-3 py-2 border border-[#dadada]">
            <h1 className="text-[#0C469D]">─ Full Name</h1>
            <h1>Talant</h1>
          </div>
          <div className="rounded-md px-3 py-2 border border-[#dadada]">
            <h1 className="text-[#0C469D]">─ Email</h1>
            <h1>JennyWilson@gmail.com</h1>
          </div>
          <div className="rounded-md px-3 py-2 border border-[#dadada]">
            <h1 className="text-[#0C469D]">─ Phone Number</h1>
            <h1>(302) 555-0107</h1>
          </div>
          <div className="rounded-md px-3 py-2 border border-[#dadada]">
            <h1 className="text-[#0C469D]">─ Agent Type</h1>
            <div className="p-2 rounded-md bg-[#FDE68A] w-fit">
              Premium Agent
            </div>
          </div>
          <Popconfirm>
            <Button danger>Block This User</Button>
          </Popconfirm>
        </div>
      ) : (
        <Table dataSource={inquiries} columns={columns} rowKey="postedOn" />
      )}

      {/* Modal to show detailed information */}
      <Modal
        title="Inquiry Details"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
        className="custom-modal"
      >
        {selectedInquiry && (
          <div className="grid grid-cols-2 gap-4">
            {/* Loop through the inquiry details */}
            {Object.entries(selectedInquiry.details).map(([key, value]) => {
              // Check if the key is additionalComments
              if (key === 'additionalComments') {
                return (
                  <div
                    key={key}
                    className="col-span-2 rounded-md px-4 py-2 border border-[#dadada]"
                  >
                    <h1 className="text-[#0C469D]">{`─ ${key.replace(
                      /([A-Z])/g,
                      ' $1'
                    )}`}</h1>
                    <h1>{value}</h1>
                  </div>
                );
              }

              return (
                <div
                  key={key}
                  className="!w-full rounded-md px-4 py-2 border border-[#dadada]"
                >
                  <h1 className="text-[#0C469D]">{`─ ${key.replace(
                    /([A-Z])/g,
                    ' $1'
                  )}`}</h1>
                  <h1>{value}</h1>
                </div>
              );
            })}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TalantInformation;
