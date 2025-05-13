import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router';

const { Title, Text } = Typography;

const ForgetPassword = () => {
  const route = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    localStorage.setItem('forgetEmail', values.email);
    route('/otp');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-white)] p-4">
      <div className="bg-white relative shadow-lg rounded-2xl p-6 w-full max-w-lg text-center">
        <Title level={3} className="text-blue-500">
          {/* <Logo /> */}
        </Title>
        <div className="flex mb-6 flex-col items-start">
          <Title level={3} className="mb-1">
            Forgot Password
          </Title>
          <Text type="secondary">
            Enter your email address to reset your password
          </Text>
        </div>

        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Email address"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email!' },
              { type: 'email', message: 'Enter a valid email address!' },
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input
              placeholder="MichealScott@gmail.com"
              type="email"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[var(--bg-green-high)] hover:!bg-[var(--bg-green-high)] !text-white"
            style={{ marginTop: 10 }}
          >
            Continue with Email
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default ForgetPassword;
