import React, { useEffect } from 'react';
import { Form, Input, TimePicker, Row, Col, Select, Typography } from 'antd';
import {
  ClockCircleOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

function RecipeDetailsForm({ families, familiesLoading, recipeData }) {
  const [form] = Form.useForm();
  useEffect(() => {
    if (recipeData) {
      form.setFieldsValue({
        title: recipeData?.title,
        cookingTime: dayjs(recipeData?.cookingTime, 'HH:mm'),
        serving: recipeData?.serving,
        familyName: recipeData?.familyName,
      });
    }
  }, [recipeData, form]);
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
              format="HH:mm:ss"
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
        validateStatus={
          form.isFieldTouched('familyName') && form.getFieldError('familyName')
            ? 'error'
            : ''
        }
        help={
          form.isFieldTouched('familyName') && form.getFieldError('familyName')
        }
      >
        <Select
          allowClear
          loading={familiesLoading}
          placeholder="Select Family"
          optionFilterProp="children"
        >
          {families?.data?.map((fam) => (
            <Select.Option key={fam._id} value={fam.name}>
              {fam.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </>
  );
}

export default RecipeDetailsForm;
