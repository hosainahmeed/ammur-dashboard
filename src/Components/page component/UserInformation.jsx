import { Button, Divider, Popconfirm } from 'antd';
import React from 'react';
import toast from 'react-hot-toast';

function UserInformation({ selectedUser }) {
  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="w-24 h-24 rounded-full overflow-hidden p-1 border-1 border-[var(--bg-green-high)]">
          <img
            src="https://wallpapercat.com/w/full/b/9/2/2144467-1920x1080-desktop-full-hd-hinata-naruto-wallpaper.jpg"
            className="w-full h-full rounded-full overflow-hidden object-cover"
            alt="user"
          />
        </div>
      </div>
      <h1 className="text-center text-xl">User Name</h1>
      <Divider />
      <div className="flex flex-col gap-2">
        <div className="rounded-md px-3 py-2 border border-[#dadada]">
          <h1 className="text-[#0C469D]">─ Full Name</h1>
          <h1>Talant</h1>
        </div>
        <div className="rounded-md px-3 py-2 border border-[#dadada]">
          <h1 className="text-[#0C469D]">─ Email</h1>
          <h1>JennyWilson@gmail.com</h1>
        </div>
        <div className="rounded-md px-3 py-2 border border-[#dadada]">
          <h1 className="text-[#0C469D]">─ Phone Number</h1>
          <h1>(302) 555-0107</h1>
        </div>
        <div className="rounded-md px-3 py-2 border border-[#dadada]">
          <h1 className="text-[#0C469D]">─ Agent Type</h1>
          <div className="p-2 rounded-md bg-[#FDE68A] w-fit">Premium Agent</div>
        </div>
        <Popconfirm
          title="Are you sure you want block this user?"
          placement="top"
          onConfirm={() => {
            toast.success('successfully block this user!');
            selectedUser(false);
          }}
        >
          <Button danger>Block This User</Button>
        </Popconfirm>
      </div>
    </div>
  );
}

export default UserInformation;
