import React from 'react';
import { List, Button, Image, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Text } = Typography;

function IngredientList({ ingredients, setIngredients }) {
  const handleRemove = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  return (
    <div>
      <List
        itemLayout="horizontal"
        dataSource={ingredients}
        renderItem={(ingredient, index) => (
          <List.Item
            key={index}
            actions={[
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={() => handleRemove(index)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Image src={ingredient.img} width={50} height={50} />}
              title={<Text strong>{ingredient.name}</Text>}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

export default IngredientList;
