import { Avatar, Space, Table, Tabs, Button } from 'antd';
import React, { useState } from 'react';
import {
  CheckCircleOutlined,
  DeleteOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { FaEye } from 'react-icons/fa6';

function AgentTable() {
  const agents = [
    {
      key: '1',
      name: 'Theodore Moscicki',
      avatar: 'https://i.pravatar.cc/100?img=1',
      contactNumber: '901-474-6255',
      email: 'maka@yandex.ru',
      joined: '2025-01-10',
      agentType: 'Normal Agent',
    },
    {
      key: '2',
      name: 'Russell Veum',
      avatar: 'https://i.pravatar.cc/100?img=2',
      contactNumber: '983-842-7095',
      email: 'Ngail6@hotmail.com',
      joined: '2025-01-10',
      agentType: 'Normal Agent',
    },
    {
      key: '3',
      name: 'Tracy Grady',
      avatar: 'https://i.pravatar.cc/100?img=3',
      contactNumber: '564-667-5087',
      email: 'man@yandex.ru',
      joined: '2025-01-10',
      agentType: 'Premium Agent',
    },
    {
      key: '4',
      name: 'Dana Daniel',
      avatar: 'https://i.pravatar.cc/100?img=4',
      contactNumber: '443-353-4346',
      email: 'man@yandex.ru',
      joined: '2025-01-10',
      agentType: 'Premium Agent',
    },
    {
      key: '5',
      name: 'Gerardo Barrows',
      avatar: 'https://i.pravatar.cc/100?img=5',
      contactNumber: '344-223-4982',
      email: 'cida@gmail.com',
      joined: '2025-01-10',
      agentType: 'Normal Agent',
    },
    {
      key: '6',
      name: 'Sheryl Gusikowski',
      avatar: 'https://i.pravatar.cc/100?img=6',
      contactNumber: '752-792-1071',
      email: 'cedenna@gmail.com',
      joined: '2025-01-10',
      agentType: 'Premium Agent',
    },
    {
      key: '7',
      name: 'Theodore Moscicki',
      avatar: 'https://i.pravatar.cc/100?img=1',
      contactNumber: '901-474-6255',
      email: 'maka@yandex.ru',
      joined: '2025-01-10',
      agentType: 'Normal Agent',
    },
    {
      key: '8',
      name: 'Daniel Walker IV',
      avatar: 'https://i.pravatar.cc/100?img=8',
      contactNumber: '411-388-9234',
      email: 'ahana@mail.ru',
      joined: '2025-01-10',
      agentType: 'Premium Agent',
    },
    {
      key: '9',
      name: 'Ms. Natasha Spinka',
      avatar: 'https://i.pravatar.cc/100?img=9',
      contactNumber: '549-887-3480',
      email: 'danten@mail.ru',
      joined: '2025-01-10',
      agentType: 'Blocked Agent',
    },
    {
      key: '10',
      name: 'Forrest Kuhic',
      avatar: 'https://i.pravatar.cc/100?img=10',
      contactNumber: '638-264-7153',
      email: 'jolie@gmail.com',
      joined: '2025-01-10',
      agentType: 'Normal Agent',
    },
    {
      key: '11',
      name: 'Lillie Rempel',
      avatar: 'https://i.pravatar.cc/100?img=11',
      contactNumber: '780-352-4317',
      email: 'tinest@mail.ru',
      joined: '2025-01-10',
      agentType: 'Premium Agent',
    },
  ];

  const [filteredAgents, setFilteredAgents] = useState(agents);

  const handleTabChange = (key) => {
    switch (key) {
      case '1':
        setFilteredAgents(agents);
        break;
      case '2':
        setFilteredAgents(
          agents.filter((agent) => agent.agentType === 'Normal Agent')
        );
        break;
      case '3':
        setFilteredAgents(
          agents.filter((agent) => agent.agentType === 'Premium Agent')
        );
        break;
      case '4':
        setFilteredAgents(
          agents.filter((agent) => agent.agentType === 'Blocked Agent')
        );
        break;
      default:
        setFilteredAgents(agents);
    }
  };

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center">
          <Avatar src={record.avatar} />
          <span className="ml-2">{text}</span>
        </div>
      ),
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactNumber',
      key: 'contactNumber',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Joined',
      dataIndex: 'joined',
      key: 'joined',
    },
    {
      title: 'Agent Type',
      dataIndex: 'agentType',
      key: 'agentType',
      render: (text) => (
        <span
          className={`${
            text === 'Premium Agent'
              ? 'bg-yellow-100 text-yellow-700'
              : text === 'Normal Agent'
              ? 'bg-gray-200 text-gray-700'
              : 'bg-red-100 text-red-700'
          } px-2 py-1 rounded-md text-xs`}
        >
          {text}
        </span>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            className="!bg-[var(--bg-green-high)] !text-white"
            icon={<FaEye />}
          />
          <Button
            className="!border-red-500 !text-red-500"
            icon={<DeleteOutlined />}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-4 rounded-md shadow">
      <Tabs defaultActiveKey="1" onChange={handleTabChange} type="card">
        <Tabs.TabPane tab="All Agent" key="1" />
        <Tabs.TabPane tab="Normal Agent" key="2" />
        <Tabs.TabPane tab="Premium Agent" key="3" />
        <Tabs.TabPane tab="Blocked Agent" key="4" />
      </Tabs>

      <Table
        columns={columns}
        dataSource={filteredAgents}
        pagination={true}
        className="agent-table"
        rowKey="key"
        scroll={{ x: true }}
      />
    </div>
  );
}

export default AgentTable;
