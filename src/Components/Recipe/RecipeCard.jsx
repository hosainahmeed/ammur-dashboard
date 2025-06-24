import React, { useState } from 'react';
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Modal, Popconfirm, Space, Typography } from 'antd';
import { imageUrl } from '../../Utils/server';
import RecipeForm from './RecipeForm';
import { useDeleteRecipeMutation } from '../../Redux/services/dashboard apis/recipeApis';
import toast from 'react-hot-toast';

const { Text } = Typography;

export const RecipeCard = ({ data }) => {
  const [recipeModal, setRecipeModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [recipeId, setRecipeId] = useState(null);
  const [deleteRecipe] = useDeleteRecipeMutation();

  const deleteRecipehandler = async (id) => {
    try {
      await deleteRecipe({ id })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.dismiss();
            toast.success(res?.message || 'Recipe deleted successfully');
          } else {
            toast.error(res?.message || 'Failed to delete recipe');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  const formatCookingTime = (timeString) => {
    if (!timeString) return 'Not specified';
    const [hours, minutes] = timeString.split(':');
    const seconds = '00';
    return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:${seconds}`;
  };
  const cookingTime = formatCookingTime(data?.cookingTime);

  return (
    <>
      <Card
        style={{ width: '100%', margin: '1rem' }}
        cover={
          <img
            style={{
              objectFit: 'cover',
              height: '200px',
              width: '100%',
              border: '1px solid #d9d9d9',
            }}
            alt={data?.title}
            src={imageUrl(data?.img)}
          />
        }
        actions={[
          <EditOutlined
            onClick={() => {
              setRecipeId(data?._id);
              setRecipeModal(true);
            }}
            key="edit"
          />,
          <Popconfirm
            placement="bottomRight"
            title="Are you sure to delete this recipe?"
            onConfirm={() => deleteRecipehandler(data?._id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined key="delete" />{' '}
          </Popconfirm>,
          <EyeOutlined onClick={() => setShowModal(true)} key="view" />,
        ]}
      >
        <Card.Meta
          title={data?.title}
          description={
            <Space direction="vertical" size={4}>
              <div>
                <ClockCircleOutlined /> {cookingTime}
              </div>
              <div>
                <UserOutlined /> Serves: {data?.serving}
              </div>
              <div>Family: {data?.familyName}</div>
              <div>
                <strong>Description:</strong> {data?.description}...
              </div>
            </Space>
          }
        />
      </Card>

      <Modal
        bodyStyle={{ padding: '24px', maxHeight: '80vh', overflow: 'auto' }}
        centered
        visible={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
        width={800}
        maskStyle={{ backdropFilter: 'blur(2px)' }}
        destroyOnClose
      >
        <div style={{ display: 'flex', gap: '20px' }}>
          <img
            src={imageUrl(data?.img)}
            alt={data?.title}
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
                <Text strong>{data?.title}</Text>
              </div>
              <div>
                <Text>{data?.description}</Text>
              </div>
              <div>
                <Text strong>
                  <ClockCircleOutlined /> Cooking Time:
                </Text>
                <Text> {cookingTime}</Text>
              </div>
              <div>
                <Text strong>
                  <UserOutlined /> Serves:
                </Text>
                <Text> {data?.serving} people</Text>
              </div>
              <div>
                <Text strong>Family: </Text>
                <Text>{data?.familyName}</Text>
              </div>
            </Space>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h1 className="mb-3">Ingredients:</h1>
          <div>
            {data?.ingredients?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <Text type="secondary">No ingredients found.</Text>
              </div>
            ) : (
              data?.ingredients?.map((item, i) => (
                <Card key={i} className="!mb-3">
                  <div className="!w-full !flex !items-center !justify-between">
                    <img
                      src={imageUrl(item.img)}
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
      <RecipeForm
        setShowModal={setRecipeModal}
        setRecipeId={setRecipeId}
        recipeId={recipeId}
        showModal={recipeModal}
      />
    </>
  );
};
