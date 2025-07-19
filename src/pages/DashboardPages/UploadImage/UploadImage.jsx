import React, { useState } from 'react';
import { Button, message, Card, Space, Input } from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  CopyOutlined,
} from '@ant-design/icons';
import { useUploadImageMutation } from '../../../Redux/services/dashboard apis/imageUpload';
import toast from 'react-hot-toast';

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploadImage, { isLoading: isUploading }] = useUploadImageMutation();
  const [imageUrl, setImageUrl] = useState('');
  const handleRemove = () => {
    setSelectedImage(null);
  };

  const handleUpload = (file) => {
    setSelectedImage(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      await uploadImage({ data: formData })
        .unwrap()
        .then((res) => {
          if (res?.success) {
            toast.dismiss();
            toast.success(res?.message || 'Image uploaded successfully');
            setImageUrl(res?.data);
          }
        });
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    }
  };
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', marginTop: 24 }}>
      {!selectedImage ? (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <Button
            type="primary"
            icon={<UploadOutlined />}
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => {
                const file = e.target.files[0];
                if (file && file.type.startsWith('image/')) {
                  handleUpload(file);
                } else {
                  message.error('Please select an image file');
                }
              };
              input.click();
            }}
          >
            Upload Image
          </Button>
        </div>
      ) : (
        <Card style={{ textAlign: 'center', marginTop: 16 }} title="Preview">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Preview"
            style={{ maxWidth: '100%', maxHeight: 300 }}
          />
          <Space>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              onClick={handleRemove}
              style={{ marginTop: 16 }}
            >
              Remove Image
            </Button>
            <Button
              htmlType="submit"
              type="primary"
              style={{ marginTop: 16 }}
              onClick={handleSubmit}
              loading={isUploading}
            >
              Submit
            </Button>
          </Space>
        </Card>
      )}
      {imageUrl && (
        <Space style={{ marginTop: 16 }}>
          <Input value={imageUrl} style={{ width: '100%' }} />
          <Button
            type="primary"
            icon={<CopyOutlined />}
            onClick={() => navigator.clipboard.writeText(imageUrl)}
          >
            Copy
          </Button>
        </Space>
      )}
    </div>
  );
}

export default UploadImage;
