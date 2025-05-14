import { Avatar, Card, Button } from 'antd';
import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';

function Notify({ i, user, onRemove }) {
  return (
    <div className='mb-2'>
      <Card>
        <div className="flex  items-start gap-2">
          <Avatar
            size={40}
            src={user?.photoURL}
            className="cursor-pointer !min-w-12 !min-h-12"
          />
          <div className="relative">
            <h2>New User Joined</h2>
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero
              voluptatem porro aperiam odit fugiat? Quod?
            </h3>
            <p className="text-xs opacity-75">2025-04-24 • 09:20 AM</p>
            <Button
              className="!absolute !top-0 !right-0"
              shape="circle"
              icon={<DeleteOutlined />}
              size="small"
              type="link"
              onClick={() => onRemove(i)}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}

export default Notify;
