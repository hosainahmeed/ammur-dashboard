import React from 'react';
import { Space, Button, Tooltip, Popconfirm } from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

const ActionButtons = ({
  record,
  onEdit,
  onDelete,
  type,
}) => {

  return (
    <Space size="small">
      <Tooltip title="Edit">
        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit(record)}
          type="text"
        />
      </Tooltip>
      <Tooltip title="Delete">
        <Popconfirm
          placement="bottomRight"
          title={`Are you sure to delete this ${type}?`}
          onConfirm={() => onDelete(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="text" danger />
        </Popconfirm>
      </Tooltip>
    </Space>
  );
};

export default ActionButtons;
