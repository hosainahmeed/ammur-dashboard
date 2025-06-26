import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import toast from 'react-hot-toast';
import { useUpdateAdminMutation } from '../../../Redux/services/dashboard apis/adminApis';

function UpdateAdminInformatio({ adminData, closeModal }) {
  const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
  const [form] = Form.useForm();
  const initialData = {
    fullName: adminData?.name,
    email: adminData?.email,
    phoneNumber: adminData?.contactNumber,
  };
  const onFinish = async (values) => {
    const data = {
      fullName: values?.fullName,
      contactNo: values?.phoneNumber,
    };
    try {
      await updateAdmin({
        id: adminData?.key,
        data,
      })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.success(res?.message || 'Admin updated successfully');
            closeModal();
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update admin');
    }
  };

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <div>
      <div className="text-center">
        <Divider>
          <h1 className="text-3xl font-semibold">Update Admin</h1>
        </Divider>

        <p className="text-sm">
          Create a new admin account by filling in the required information. The
          new admin will receive access based on the assigned role.
        </p>
        <Divider />
      </div>
      <Form
        form={form}
        layout="vertical"
        initialValues={initialData}
        requiredMark={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: 'Please input the full name!' }]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: 'Please input the email!' },
            { type: 'email', message: 'Please input a valid email!' },
          ]}
        >
          <Input
            className="cursor-not-allowed"
            readOnly
            disabled
            placeholder="Enter email"
          />
        </Form.Item>

        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: 'Please input the phone number!' },
          ]}
        >
          <Input placeholder="Please Input the Number" />
        </Form.Item>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '8px',
          }}
        >
          <Button
            className="!w-full !h-10 !text-white !bg-[var(--bg-green-high)]"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            className="!w-full !h-10 !text-white !bg-[var(--bg-green-high)]"
            htmlType="submit"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default UpdateAdminInformatio;
