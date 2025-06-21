import React, { useState } from 'react';
import { Form, Input, Upload, Button, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';

const { Text } = Typography;

function IngredientForm({ ingredients, setIngredients }) {
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientFileList, setIngredientFileList] = useState([]);

  const handleAdd = () => {
    if (!ingredientName.trim()) {
      toast.error('Enter ingredient name');
      return;
    }
    if (ingredientFileList.length === 0) {
      toast.error('Upload an image for the ingredient');
      return;
    }

    const newIngredient = {
      name: ingredientName.trim(),
      img: ingredientFileList[0].originFileObj,
    };

    setIngredients([...ingredients, newIngredient]);
    setIngredientName('');
    setIngredientFileList([]);
  };

  return (
    <div style={{ marginTop: 24 }}>
      <Form.Item label={<Text strong>Ingredient Name</Text>}>
        <Input
          value={ingredientName}
          onChange={(e) => setIngredientName(e.target.value)}
          placeholder="Ingredient name"
        />
      </Form.Item>

      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        fileList={ingredientFileList}
        onChange={({ fileList }) => setIngredientFileList(fileList.slice(-1))}
        maxCount={1}
      >
        {ingredientFileList.length === 0 && (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload Image</div>
          </div>
        )}
      </Upload>

      <Button style={{ marginTop: 16 }} type="primary" onClick={handleAdd}>
        Add Ingredient
      </Button>
    </div>
  );
}

export default IngredientForm;
