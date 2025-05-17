import React, { useState } from 'react';
import {
  Input,
  Button,
  Row,
  Col,
  Modal,
  Form,
  TimePicker,
  Upload,
  List,
  Image,
  Card,
  Typography,
  Divider,
} from 'antd';
import {
  UploadOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  UserOutlined,
  FormOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

function StylishRecipeForm({ showModal, setShowModal }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientFileList, setIngredientFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const handleAddIngredient = () => {
    if (!ingredientName.trim()) {
      alert('Please enter ingredient name');
      return;
    }
    if (ingredientFileList.length === 0) {
      alert('Please upload ingredient image');
      return;
    }

    const newIngredient = {
      name: ingredientName.trim(),
      imageFile: ingredientFileList[0].originFileObj,
      preview:
        ingredientFileList[0].thumbUrl ||
        URL.createObjectURL(ingredientFileList[0].originFileObj),
    };
    setIngredients([...ingredients, newIngredient]);

    // reset ingredient inputs
    setIngredientName('');
    setIngredientFileList([]);
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddRecipe = () => {
    form
      .validateFields()
      .then((values) => {
        if (ingredients.length === 0) {
          alert('Please add at least one ingredient');
          return;
        }
        const imageFile =
          fileList.length > 0 ? fileList[0].originFileObj : null;

        // Prepare ingredients data to show (without preview URL for example)
        const submittedIngredients = ingredients.map(({ name, imageFile }) => ({
          name,
          imageFile,
        }));

        console.log('Recipe submitted:', {
          ...values,
          imageFile,
          ingredients: submittedIngredients,
        });

        alert('Recipe added successfully!');
        form.resetFields();
        setFileList([]);
        setIngredients([]);
        setShowModal(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setIngredients([]);
    setIngredientName('');
    setIngredientFileList([]);
    setShowModal(false);
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1));
  };

  const onIngredientUploadChange = ({ fileList: newFileList }) => {
    setIngredientFileList(newFileList.slice(-1));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  const modalStyle = {
    overflow: 'hidden',
    borderRadius: '12px',
  };

  const headerStyle = {
    background: '#072656',
    borderRadius: '12px 12px 0 0',
    padding: '16px 24px',
    color: 'white',
    border: 'none',
  };

  const uploadStyle = {
    borderRadius: '8px',
    border: '2px dashed #d9d9d9',
    padding: '20px',
    textAlign: 'center',
    transition: 'all 0.3s',
  };

  const buttonStyle = {
    borderRadius: '8px',
    height: '40px',
    fontWeight: '500',
    boxShadow: '0 2px 0 rgba(0,0,0,0.015)',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    background: '#072656',
    borderColor: '#072656',
  };

  const ingredientCardStyle = {
    background: '#f9fafb',
    borderRadius: '8px',
    marginBottom: '16px',
  };

  return (
    <Modal
      visible={showModal}
      title={
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          Create New Recipe
        </Title>
      }
      onCancel={handleCancel}
      width={700}
      centered
      headerStyle={headerStyle}
      bodyStyle={{ padding: '24px', maxHeight: '80vh', overflow: 'auto' }}
      footer={[
        <Button key="cancel" onClick={handleCancel} style={buttonStyle}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleAddRecipe}
          style={primaryButtonStyle}
        >
          Create Recipe
        </Button>,
      ]}
      style={modalStyle}
      maskStyle={{ backdropFilter: 'blur(2px)' }}
    >
      <Form
        form={form}
        layout="vertical"
        requiredMark={false}
        initialValues={{
          cookingTime: dayjs('00:00:00', 'HH:mm:ss'),
        }}
      >
        {/* Recipe Title */}
        <Form.Item
          label={<Text strong>Recipe Title</Text>}
          name="title"
          rules={[{ required: true, message: 'Please enter the recipe title' }]}
        >
          <Input
            placeholder="Enter a delicious recipe title"
            prefix={<FormOutlined style={{ color: '#072656' }} />}
            size="large"
            style={{ borderRadius: '8px' }}
          />
        </Form.Item>

        <Row gutter={16}>
          {/* Cooking Time */}
          <Col span={12}>
            <Form.Item
              label={<Text strong>Cooking Time</Text>}
              name="cookingTime"
              rules={[
                { required: true, message: 'Please select cooking time' },
              ]}
            >
              <TimePicker
                format="HH:mm"
                style={{ width: '100%', borderRadius: '8px' }}
                size="large"
                prefix={<ClockCircleOutlined style={{ color: '#072656' }} />}
              />
            </Form.Item>
          </Col>

          {/* Serving */}
          <Col span={12}>
            <Form.Item
              label={<Text strong>Serving</Text>}
              name="serving"
              rules={[
                { required: true, message: 'Please enter servings number' },
                {
                  pattern: /^[1-9]\d*$/,
                  message: 'Serving must be a positive integer',
                },
              ]}
            >
              <Input
                placeholder="Number of servings"
                size="large"
                type="number"
                min={1}
                prefix={<UserOutlined style={{ color: '#072656' }} />}
                style={{ borderRadius: '8px' }}
              />
            </Form.Item>
          </Col>
        </Row>

        {/* Recipe Image */}
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
            name="recipeImage"
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={onUploadChange}
            maxCount={1}
            style={uploadStyle}
          >
            {fileList.length === 0 && (
              <div>
                <UploadOutlined
                  style={{ fontSize: '24px', color: '#072656' }}
                />
                <div style={{ marginTop: 8 }}>Upload Recipe Image</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Divider orientation="left">
          <Text strong style={{ fontSize: '16px', color: '#072656' }}>
            Ingredients
          </Text>
        </Divider>

        {/* Ingredient Input Section */}
        <Card style={ingredientCardStyle} bordered={false}>
          <Form.Item label={<Text strong>Ingredient Name</Text>}>
            <Input
              placeholder="Enter ingredient name"
              value={ingredientName}
              onChange={(e) => setIngredientName(e.target.value)}
              size="large"
              style={{ borderRadius: '8px', marginBottom: '16px' }}
            />
          </Form.Item>

          <Upload
            name="ingredientImage"
            listType="picture-card"
            beforeUpload={() => false}
            fileList={ingredientFileList}
            onChange={onIngredientUploadChange}
            maxCount={1}
          >
            {ingredientFileList.length === 0 && (
              <div>
                <UploadOutlined
                  style={{ fontSize: '20px', color: '#072656' }}
                />
                <div style={{ marginTop: 8 }}>Upload Image</div>
              </div>
            )}
          </Upload>

          <Button
            type="primary"
            onClick={handleAddIngredient}
            style={{
              ...primaryButtonStyle,
              width: '100%',
              marginTop: '16px',
            }}
          >
            Add Ingredient
          </Button>
        </Card>

        {/* Ingredients List */}
        <List
          style={{ marginTop: '20px' }}
          bordered
          dataSource={ingredients}
          locale={{
            emptyText: <Text type="secondary">No ingredients added yet</Text>,
          }}
          renderItem={(item, index) => (
            <List.Item
              style={{ padding: '12px', borderRadius: '8px' }}
              actions={[
                <Button
                  type="text"
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => handleRemoveIngredient(index)}
                  style={{ borderRadius: '50%' }}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Image
                    width={50}
                    height={50}
                    src={item.preview}
                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                    preview={false}
                  />
                }
                title={<Text strong>{item.name}</Text>}
              />
            </List.Item>
          )}
        />
      </Form>
    </Modal>
  );
}

export default StylishRecipeForm;
