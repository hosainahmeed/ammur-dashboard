import React from 'react';
import { Form, Input, Button, Divider } from 'antd';
import toast from 'react-hot-toast';

function UpdateAdminInformatio({ adminData, closeModal }) {
  console.log(adminData);
  const [form] = Form.useForm();

  // {
  //   key: '684e45cc81714191f0728d8a',
  //   name: 'ahmad musa',
  //   contactNumber: '1234567890',
  //   email: 'john4.doe4@example.com',
  //   approvalStatus: true,
  //   otpVerified: false,
  //   preferedContactMethod: 'email',
  //   address: '',
  //   proffession: '',
  //   eldestRelative: '',
  //   familySide: '',
  //   subscription: 'basic',
  //   paymentStatus: 'pending',
  //   img: '',
  //   role: 'admin',
  //   status: 'active',
  //   isDeleted: false
  // }
  const initialData = {
    name: 'Hosain Ahmed',
    email: 'hosain@gmail.com',
    contactNumber: '998877665544',
    password: '12112122',
    confirmPassword: '12112122',
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
            onClick={() => {
              toast.success('Update successfully');
              closeModal();
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

export default UpdateAdminInformatio;
