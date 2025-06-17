import React from 'react';
import { Card, Button, Table, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  LinkedinOutlined,
  GithubOutlined,
  TwitterOutlined,
  InstagramOutlined,
  FacebookOutlined,
} from '@ant-design/icons';
import ActionButtons from '../ActionButtons';

const SocialTab = ({ socials, addSocial, editSocial, deleteSocial }) => {
  const getIconComponent = (platform) => {
    const iconMap = {
      LinkedIn: <LinkedinOutlined />,
      GitHub: <GithubOutlined />,
      Twitter: <TwitterOutlined />,
      Instagram: <InstagramOutlined />,
      Facebook: <FacebookOutlined />,
    };
    return iconMap[platform] || <GithubOutlined />;
  };

  const columns = [
    {
      title: 'Platform',
      dataIndex: 'name',
      key: 'name',
      render: (text) => (
        <Space>
          {getIconComponent(text)}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
    },
    {
      title: 'Actions',
      key: 'actions',
      width: 200,
      render: (_, record) => (
        <ActionButtons
          record={record}
          onEdit={editSocial}
          onDelete={deleteSocial}
          type="social"
          textToCopy={record.url}
        />
      ),
    },
  ];

  return (
    <Card
      title="Social Media Accounts"
      extra={
        <Button
          className="!bg-[#0C469D] !text-white"
          icon={<PlusOutlined />}
          onClick={addSocial}
        >
          Add Social Media
        </Button>
      }
      className="contact-card"
    >
      <Table
        dataSource={socials}
        columns={columns}
        rowKey="id"
        pagination={false}
        className="contact-table"
      />
    </Card>
  );
};

export default SocialTab;
