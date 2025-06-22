import React from 'react';
import { Form, Upload, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Text } = Typography;

function RecipeImageUpload({ fileList, setFileList }) {
  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  const onChange = ({ fileList: newList }) => {
    if (
      newList.length === 0 ||
      (fileList.length > 0 && newList[0].uid !== fileList[0].uid)
    ) {
      setFileList(newList.slice(-1));
    }
  };

  return (
    <Form.Item
      label={<Text strong>Recipe Image</Text>}
      name="upload"
      valuePropName="fileList"
      getValueFromEvent={normFile}
      rules={[
        {
          validator: () =>
            fileList.length > 0
              ? Promise.resolve()
              : Promise.reject(new Error('Please upload a recipe image')),
        },
      ]}
    >
      <Upload
        listType="picture-card"
        beforeUpload={() => false}
        fileList={fileList}
        onChange={onChange}
        maxCount={1}
      >
        {fileList.length === 0 && (
          <div>
            <UploadOutlined style={{ fontSize: '24px', color: '#072656' }} />
            <div style={{ marginTop: 8 }}>Upload Recipe Image</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
}

export default RecipeImageUpload;
