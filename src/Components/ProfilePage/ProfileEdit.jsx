import React from 'react';
import { Button, Form, Spin } from 'antd';
import toast from 'react-hot-toast';
import { useUpdateProfileDataMutation } from '../../Redux/services/profileApis';
const ProfileEdit = ({ image, data }) => {
  const [form] = Form.useForm();
  const [setProfileUpdate, { isLoading: isProfileUpdate }] =
    useUpdateProfileDataMutation();
  const onFinish = async (values) => {
    const updateData = {
      fullName: values?.name,
      contactNo: values?.contactNo,
    };

    const formData = new FormData();
    Object.keys(updateData).forEach((key) => {
      formData.append(key, updateData[key]);
    });

    if (image === null) {
      formData.delete('file', image);
    } else {
      formData.append('file', image);
    }

    try {
      await setProfileUpdate({ data: formData, id: data?._id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.dismiss();
            toast.success(res?.message || 'Profile updated successfully');
          }
        });
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  return (
    <div>
      <p className="text-[var(--bg-green-high)] text-3xl text-center">
        Edit Your Profile
      </p>
      <Form
        className="text-white"
        requiredMark={false}
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: data?.fullName || '',
          email: data?.email || '',
          contactNo: data?.contactNo || '',
        }}
      >
        <Form.Item
          name="name"
          label={<span className="text-black">Name</span>}
          rules={[{ required: true, message: 'Name is required' }]}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: '1px solid #222',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Name"
            className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={<span className="text-black">Email</span>}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: '1px solid #222',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            disabled
            type="email"
            placeholder="Email"
            className="cursor-not-allowed p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Form.Item
          name="contactNo"
          label={<span className="text-black">Phone Number</span>}
          rules={[{ required: true, message: 'Phone number is required' }]}
        >
          <input
            style={{
              width: '100%',
              height: 40,
              border: '1px solid #222',
              borderRadius: '5px',
              color: '#111',
              backgroundColor: '#fff',
              outline: 'none',
            }}
            placeholder="Phone Number"
            className="p-2 w-full outline-none border-none h-11 text-[var(--white-600)]"
          />
        </Form.Item>

        <Button
          htmlType="submit"
          disabled={isProfileUpdate}
          style={{
            backgroundColor: 'var(--bg-green-high)',
            color: '#fff',
            height: 40,
          }}
          className="!bg-[var(--bg-green-high] !hover:bg-[var(--bg-green-low] w-full"
        >
          {isProfileUpdate ? <Spin /> : 'Update Profile'}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
