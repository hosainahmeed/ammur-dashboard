import React from 'react';
import { Modal, Form, Input, Button, Upload } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { imageUrl } from '../../../Utils/server';
import {
  useCreateFamilyMutation,
  useUpdateFamilyMutation,
} from '../../../Redux/services/dashboard apis/familiesApis';
import toast from 'react-hot-toast';

const FamilyFormModal = ({
  visible,
  onCancel,
  familyId,
  form,
  editingFamily,
  onImageUpload,
  url,
}) => {
  const [updateFamily, { isLoading: isUpdating }] = useUpdateFamilyMutation();
  const [createFamily, { isLoading: isCreating }] = useCreateFamilyMutation();
  const handleAddFamilySubmit = async (values) => {
    const formData = new FormData();
    formData.append('file', values?.file[0]?.originFileObj);
    formData.append('name', values?.familyName);
    try {
      if (familyId !== null) {
        await updateFamily({ data: formData, id: familyId })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Family updated successfully');
            }
          });
      } else {
        await createFamily({ data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Family created successfully');
            }
          });
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
    onCancel();
  };
  return (
    <Modal
      title={editingFamily ? 'Edit Family' : 'Add New Family'}
      open={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleAddFamilySubmit}>
        <Form.Item
          name="file"
          label="Group Image"
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
            onChange={onImageUpload}
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
          name="familyName"
          label="Family Name"
          rules={[{ required: true, message: 'Please enter family name!' }]}
        >
          <Input placeholder="Enter family name" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="!bg-[#0C469D]">
            {editingFamily
              ? isUpdating
                ? 'Updating...'
                : 'Update Family'
              : isCreating
              ? 'Adding...'
              : 'Add Family'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FamilyFormModal;
