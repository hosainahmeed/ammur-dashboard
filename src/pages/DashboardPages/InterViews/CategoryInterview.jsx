import React, { useState } from 'react';
import PageHeading from '../../../Components/Shared/PageHeading';
import { Button, Card, Form, Input, Modal, Pagination, Upload } from 'antd';
import { FaPlus } from 'react-icons/fa6';
import { imageUrl } from '../../../Utils/server';
import {
  useCreateCategoryMutation,
  useGetAllInterCategoryQuery,
} from '../../../Redux/services/dashboard apis/interviewApis';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

function CategoryInterview() {
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: interviewCategory, isLoading: categoryLoading } =
    useGetAllInterCategoryQuery({ page, limit });

  if (categoryLoading) {
    return <div>Loading...</div>;
  }

  const total = interviewCategory?.meta?.total || 0;

  return (
    <div>
      <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
        <PageHeading title={'InterViews'} />
        <Button
          type="primary"
          icon={<FaPlus />}
          onClick={() => setShowModal(true)}
          className="!flex !items-center !gap-2 !bg-[#0C469D] !text-white"
        >
          Add New
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {interviewCategory?.data?.map((item) => (
            <Card
              key={item._id}
              className="p-4 cursor-pointer"
              cover={<img src={imageUrl(item?.img)} alt="category" />}
              footer={<p>{item?.title}</p>}
            ></Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Pagination
            current={page}
            pageSize={limit}
            total={total}
            onChange={(newPage) => setPage(newPage)}
            showSizeChanger={false}
          />
        </div>
      </Card>

      <Modal
        open={showModal}
        title="Add New Category"
        footer={null}
        width={800}
        destroyOnClose
        centered
        onCancel={() => setShowModal(false)}
      >
        <InterViewsCategoryForm />
      </Modal>
    </div>
  );
}

export default CategoryInterview;

const InterViewsCategoryForm = ({ url }) => {
  const [form] = Form.useForm();
  const [createCategory] = useCreateCategoryMutation();

  const handleAddFamilySubmit = async (values) => {
    const data = {
      title: values?.title,
      file: values?.file?.[0]?.originFileObj,
    };
    try {
      await createCategory({ data })
        .unwrap()
        .then((res) => {
          if (res?.data?.success) {
            toast.success(res?.data?.message || 'Category added successfully');
            form.resetFields();
          }
        });
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error?.message || 'An unexpected error occurred'
      );
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical" onFinish={handleAddFamilySubmit}>
        <Form.Item
          name="file"
          label="Category Image"
          valuePropName="fileList"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) {
              return e;
            }
            return e && e.fileList;
          }}
        >
          <Upload
            name="file"
            listType="picture-card"
            showUploadList={true}
            action="/api/upload"
            maxCount={1}
          >
            {url ? (
              <img
                src={imageUrl(url)}
                alt="Group"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>
        <Form.Item
          name="title"
          label="Interview Category Name"
          rules={[{ required: true, message: 'Please enter family name!' }]}
        >
          <Input placeholder="Enter family name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="!bg-[#0C469D]">
            Add
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
