import React from 'react';
import { Form, Typography, Input } from 'antd';

const { TextArea } = Input;
const { Text } = Typography;

function RecipeDescription() {
  return (
    <Form.Item label={<Text strong>Description</Text>} name="description">
      <TextArea rows={4} placeholder="Write recipe description..." />
    </Form.Item>
  );
}

export default RecipeDescription;
