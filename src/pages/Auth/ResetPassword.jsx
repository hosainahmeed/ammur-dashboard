import React from 'react';
import { Form, Button, Input, Card } from 'antd';
import 'antd/dist/reset.css';
import { EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import BrandLogo from '../../Components/Shared/BrandLogo';
import Logo from '../../assets/icons/brand.svg';

const ResetPassword = () => {
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const route = useNavigate();
  const onFinish = (values) => {
    if (values.password !== values.confirmPassword) {
      return Promise.reject(new Error('Passwords do not match!'));
    }
    console.log('Success:', values);
    route('/login');
  };

  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  return (
    <div className="flex justify-center items-center min-h-screen bg-[var(--color-white)] p-4">
      <Card className="bg-white shadow-lg relative rounded-2xl p-6 w-full max-w-lg text-start">
        <BrandLogo
          img={Logo}
          status="Create new password"
          information="To secure your account, please create a new password."
        />
        <Form requiredMark={false} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone
                  twoToneColor={
                    visible ? 'var(--color-white)' : 'var(--color-white)'
                  }
                />
              )}
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
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
          >
            <Input.Password
              iconRender={(visible) => (
                <EyeTwoTone
                  twoToneColor={
                    visible ? 'var(--color-white)' : 'var(--color-white)'
                  }
                />
              )}
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm Password"
              style={{
                width: '100%',
                marginTop: 10,
                marginBottom: 10,
                textAlign: 'start',
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            className="w-full !bg-[var(--bg-green-high)] hover:!bg-[var(--bg-green-high)] !text-white"
            style={{ marginTop: 10 }}
          >
            Confirm
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
