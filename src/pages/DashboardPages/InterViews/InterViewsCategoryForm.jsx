import React, { useEffect } from 'react';
import { Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from '../../../Redux/services/dashboard apis/interviewApis';
import { imageUrl } from '../../../Utils/server';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

const InterViewsCategoryForm = ({ initialValues, onSuccess }) => {
  const [form] = Form.useForm();
  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpading }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        file: [
          {
            uid: '-1',
            name: 'current-image',
            status: 'done',
            url: imageUrl(initialValues.img),
          },
        ],
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList || []);

  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);

    const fileObj = values.file?.[0]?.originFileObj;
    if (fileObj) {
      formData.append('file', fileObj);
    }

    try {
      if (initialValues) {
        const res = await updateCategory({
          id: initialValues._id,
          data: formData,
        }).unwrap();
        if (res?.success) {
          toast.success(res.message || 'Category updated successfully');
          onSuccess?.();
        }
      } else {
        const res = await createCategory({ data: formData }).unwrap();
        if (res?.success) {
          toast.success(res.message || 'Category created successfully');
          form.resetFields();
          onSuccess?.();
        }
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Submission failed');
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    const image = new Image();
    image.src = file.url || file.preview;
    const imgWindow = window.open(file.url || file.preview);
    imgWindow?.document.write(image.outerHTML);
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleSubmit}>
      <Form.Item
        name="file"
        label="Category Image"
        valuePropName="fileList"
        getValueFromEvent={normFile}
      >
        <Upload
          name="file"
          listType="picture-card"
          beforeUpload={() => false}
          maxCount={1}
          onPreview={handlePreview}
        >
          {!form.getFieldValue('file')?.length && (
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
        rules={[{ required: true, message: 'Please enter category name!' }]}
      >
        <Input placeholder="Enter category name" />
      </Form.Item>

      <Form.Item>
        <Button
          disabled={isCreating || isUpading}
          type="primary"
          htmlType="submit"
          className="!bg-[#0C469D] !text-white"
        >
          {initialValues
            ? isUpading
              ? 'Updating...'
              : 'Update'
            : isCreating
            ? 'Adding...'
            : 'Add'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InterViewsCategoryForm;
