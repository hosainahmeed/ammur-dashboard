import React, { useEffect } from 'react';
import { Avatar, Badge, Button, Dropdown, Image, Menu, Spin } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router';
import logo from '../../assets/icons/brand.svg';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { useGetProfileDataQuery } from '../../Redux/services/profileApis';
import { imageUrl } from '../../Utils/server';
import { useGetNotificationQuery } from '../../Redux/services/dashboard apis/notificationApis';

export let userRole = '';

function Header({ setUserRole }) {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetProfileDataQuery();
  const { data: notificationData } = useGetNotificationQuery();
  const user = data?.data;
  useEffect(() => {
    if (user) {
      userRole = user?.role;
    }
    setUserRole(user?.role);
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const showNotification = () => {
    if (!data?.data?._id) {
      return;
    }
    navigate('/dashboard/Settings/Notification', {
      state: {
        userId: data?.data?._id,
        role: data?.data?.role,
      },
    });
  };

  const menu = (
    <Menu className="w-fit rounded-xl shadow-lg">
      <div className="p-4 flex items-center gap-3">
        <Image
          className="!w-12 !h-12 object-cover overflow-hidden rounded-full"
          src={imageUrl(user?.img)}
        />
        <div>
          <h1 className="font-semibold text-base">{user?.fullName}</h1>
          <h1 className="font-normal opacity-75 text-sm">{user?.email}</h1>
        </div>
      </div>
      <Menu.Divider />
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/dashboard/Settings/profile">Profile</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={handleSignOut}>
        Log out
      </Menu.Item>
    </Menu>
  );

  if (isLoading) {
    return (
      <div className="px-10 h-16 flex items-center justify-center shadow-md">
        <Spin />
      </div>
    );
  }

  if (error) {
    return (
      <div className="px-10 h-16 flex items-center justify-center shadow-md text-red-500">
        Failed to load user data
      </div>
    );
  }

  const unreadCount =
    notificationData?.data?.filter((notif) => !notif.isRead)
      .length || 0;

  return (
    <div className="px-10 shadow-md mb-1 !z-[999] h-16 flex justify-between items-center">
      <div className="flex items-center gap-2 font-semibold">
        <img className="h-8" src={logo} alt="Dudu" />
        Family legacy
      </div>
      <div className="flex items-center gap-4 text-2xl">
        <Badge
          onClick={() => showNotification()}
          count={unreadCount}
        >
          <Button shape="circle" icon={<IoMdNotificationsOutline />} />
        </Badge>
        <div className="flex items-center gap-3">
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <Avatar
              size={40}
              src={imageUrl(user?.img)}
              className="cursor-pointer"
            />
          </Dropdown>
          <div>
            <h1 className="text-sm font-normal leading-3">{user?.fullName}</h1>
            <div className="rounded-md flex items-center justify-center px-1 text-sm font-normal py-1 leading-3 bg-[#DCFCE7]">
              {user?.role}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
