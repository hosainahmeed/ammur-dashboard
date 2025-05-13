import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import toast from 'react-hot-toast';

function CreateNewAdmin({ closeModal }) {
  const [form] = Form.useForm();
  const initialData = {
    fullName:'',
    email:'',
    phoneNumber:''
  };
  const onFinish = (values) => {
    console.log('Form values:', values);
  };

  const onCancel = () => {
    form.resetFields();
    closeModal();
  };

  return (
    <div>
      <div className="text-center">
        <Divider>
          <h1 className="text-3xl font-semibold">Add New Admin</h1>
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
          <Input placeholder="Enter email" />
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
        <Divider />
        <Form.Item
          name="password"
          label="Admin Password"
          rules={[
            { required: true, message: 'Please input the password!' },
            { min: 6, message: 'Password must be at least 6 characters' },
          ]}
        >
          <Input.Password placeholder="Enter password" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Admin Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm the password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('The two passwords do not match!')
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder="Confirm password" />
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
          onClick={()=>{
            toast.success('Create New Admin succesfully.')
            onCancel()
          }}
            className="!w-full !h-10 !text-white !bg-[var(--bg-green-high)]"
            htmlType="submit"
          >
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateNewAdmin;
