import React, { useState } from 'react';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Modal, Space, Typography } from 'antd';

const { Text } = Typography;

export const RecipeCard = ({ data }) => {
  const { name, descriptions, time, people, family, image, ingredients } = data;
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        style={{ width: '100%', margin: '1rem' }}
        cover={<img alt={name} src={image} />}
        actions={[
          <EditOutlined key="edit" />,
          <DeleteOutlined key="delete" />,
          <EyeOutlined key="view" onClick={() => setShowModal(true)} />,
        ]}
      >
        <Card.Meta
          title={name}
          description={
            <Space direction="vertical" size={4}>
              <div>
                <ClockCircleOutlined /> {time}
              </div>
              <div>
                <UserOutlined /> Serves: {people}
              </div>
              <div>Family: {family}</div>
              <div>
                <strong>Description:</strong> {descriptions.slice(0, 50)}...
              </div>
            </Space>
          }
        />
      </Card>

      <Modal
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={800}
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <img
            src={image}
            alt={name}
            style={{
              width: '300px',
              height: '200px',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
          <div>
            <Space direction="vertical" size={16}>
              <div>
                <Text>{name}</Text>
              </div>
              <div>
                <Text>{descriptions}</Text>
              </div>
              <div>
                <Text strong>
                  <ClockCircleOutlined /> Cooking Time:
                </Text>
                <Text>{time}</Text>
              </div>
              <div>
                <Text strong>
                  <UserOutlined /> Serves:
                </Text>
                <Text>{people} people</Text>
              </div>
              <div>
                <Text strong>Family: </Text>
                <Text>{family}</Text>
              </div>
            </Space>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h1 className="mb-3">Ingredients:</h1>
          <div>
            {ingredients.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Text type="secondary">
                  No recipes found. Add your first recipe!
                </Text>
              </div>
            ) : (
              ingredients.map((item, i) => (
                <Card key={i} className="!mb-3">
                  <div className="!w-full !flex !items-center !justify-between">
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                    <div>{item.name}</div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};
