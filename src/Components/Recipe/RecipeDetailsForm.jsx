import React from 'react';
import { Form, Input, TimePicker, Row, Col, Select, Typography } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

function RecipeDetailsForm({ families, familiesLoading }) {
  return (
    <>
      <Form.Item
        label={<Text strong>Recipe Title</Text>}
        name="title"
        rules={[{ required: true, message: 'Please enter the recipe title' }]}
      >
        <Input prefix={<FormOutlined />} placeholder="Enter recipe title" />
      </Form.Item>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label={<Text strong>Cooking Time</Text>}
            name="cookingTime"
            rules={[{ required: true, message: 'Select cooking time' }]}
          >
            <TimePicker
              format="HH:mm"
              style={{ width: '100%' }}
              prefix={<ClockCircleOutlined />}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            label={<Text strong>Serving</Text>}
            name="serving"
            rules={[
              { required: true, message: 'Enter servings' },
              { pattern: /^[1-9]\d*$/, message: 'Positive integers only' },
            ]}
          >
            <Input type="number" min={1} prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label={<Text strong>Family Name</Text>}
        name="familyName"
        rules={[{ required: true, message: 'Please select a family' }]}
      >
        <Select loading={familiesLoading} placeholder="Select Family">
          {families?.data?.map((fam) => (
            <Select.Option key={fam.name} value={fam.name}>
              {fam.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default RecipeDetailsForm;
