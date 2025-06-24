import React, { useState } from 'react';
import { Form, Input, Upload, Button, Typography, Spin } from 'antd';
import { UploadOutlined, LoadingOutlined } from '@ant-design/icons';
import toast from 'react-hot-toast';
import { useUploadImageMutation } from '../../Redux/services/dashboard apis/imageUpload';

const { Text } = Typography;

function IngredientForm({ ingredients, setIngredients }) {
  const [ingredientName, setIngredientName] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [uploadImage, { isLoading }] = useUploadImageMutation();
  console.log(imageUrl);

  const handleAdd = () => {
    if (!ingredientName.trim()) {
      toast.error('Enter ingredient name');
      return;
    }
    if (!imageUrl) {
      toast.error('Upload an image for the ingredient');
      return;
    }
    const newIngredient = {
      name: ingredientName.trim(),
      img: imageUrl,
    };

    setIngredients([...ingredients, newIngredient]);
    setIngredientName('');
    setFileList([]);
    setImageUrl(null);
  };

  const uploadImageHandler = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await uploadImage({ data: formData })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.dismiss();
            toast.success(res?.message || 'Image uploaded successfully');
            setImageUrl(res?.data);
            setFileList([
              {
                uid: file.uid,
                name: file.name,
                status: 'done',
                url: res?.data,
              },
            ]);
          }
        });
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    }
  };

  const handleBeforeUpload = async (file) => {
    setFileList([
      {
        uid: file.uid,
        name: file.name,
        status: 'uploading',
      },
    ]);
    await uploadImageHandler(file);
    return false; // prevent auto upload by Ant Design
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
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        showUploadList={{ showRemoveIcon: false }}
        maxCount={1}
      >
        {fileList.length === 0 && !isLoading && (
          <div>
            <UploadOutlined />
            <div style={{ marginTop: 8 }}>Upload Image</div>
          </div>
        )}
        {isLoading && <Spin indicator={<LoadingOutlined />} />}
      </Upload>
      <Button style={{ marginTop: 16 }} type="primary" onClick={handleAdd}>
        Add Ingredient
      </Button>
    </div>
  );
}

export default IngredientForm;
