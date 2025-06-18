import React, { memo } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/reset.css';
import { Link } from 'react-router';
import BrandLogo from '../../Components/Shared/BrandLogo';
import Logo from '../../assets/icons/brand.svg';
import { useLoginUserMutation } from '../../Redux/services/AuthApis/authApis';
import toast from 'react-hot-toast';

const Login = () => {
  const [loginUser, { isLoading: isSubmitting }] = useLoginUserMutation();

  const onFinish = async (values) => {
    const data = { email: values.email, password: values.password };
    try {
      localStorage.removeItem('accessToken');
      await loginUser({ data })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            const accessToken = res?.data?.accessToken;
            if (accessToken) {
              localStorage.setItem('accessToken', accessToken);
              toast.success(res?.message);
              window.location.href = '/';
            } else {
              toast.error(res?.data?.message || 'Something went wrong');
            }
          }
        });
    } catch (error) {
      toast.error(error?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-white)] p-4">
      <Card className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-center">
        <BrandLogo
          img={Logo}
          status="Login to your account"
          information="please enter your email and password to continue"
        />
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
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
            style={{
              marginTop: 10,
              marginBottom: 10,
              textAlign: 'start',
            }}
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone
                  twoToneColor={
                    visible ? 'var(--color-white)' : 'var(--color-white)'
                  }
                />
              )}
              placeholder="Password"
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <div className="flex items-center justify-end">
            <Link
              to="/forgot-password"
              className="!text-[var(--color-black)] hover:!underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[var(--bg-green-high)] hover:!bg-[var(--bg-green-high)] !text-white"
            style={{ marginTop: 10 }}
          >
            {isSubmitting ? 'Loading...' : 'Continue with Email'}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default memo(Login);
