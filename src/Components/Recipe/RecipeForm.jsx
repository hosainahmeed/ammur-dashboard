import React, { useState } from 'react';
import { Input, Button, Row, Col, Modal, Form, TimePicker, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import toast from 'react-hot-toast';
function RecipeForm({showModal,setShowModal}) {

  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  const handleAddRecipe = () => {
    form
      .validateFields()
      .then((values) => {
        const imageFile =
          fileList.length > 0 ? fileList[0].originFileObj : null;
        console.log('Recipe submitted:', { ...values, imageFile });

        toast.success('Recipe added successfully!');
        form.resetFields();
        setFileList([]);
        setShowModal(false);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    setShowModal(false);
  };

  const onUploadChange = ({ fileList: newFileList }) => {
    // Keep only the latest uploaded file (limit to 1)
    setFileList(newFileList.slice(-1));
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  return (
    <div>
      <Modal
        centered
        visible={showModal}
        title="Add New Recipe"
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddRecipe}>
            Create
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          initialValues={{
            cookingTime: dayjs('00:00:00', 'HH:mm:ss'),
          }}
        >
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 24 }}
          >
            <Col lg={24}>
              <Form.Item
                label="Recipe Title"
                name="title"
                rules={[
                  { required: true, message: 'Please enter the recipe title' },
                ]}
              >
                <Input placeholder="Enter recipe title" />
              </Form.Item>
            </Col>

            <Col lg={11}>
              <Form.Item
                label="Cooking Time"
                name="cookingTime"
                rules={[
                  { required: true, message: 'Please select cooking time' },
                ]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col lg={11}>
              <Form.Item
                label="Serving"
                name="serving"
                rules={[
                  { required: true, message: 'Please enter servings number' },
                  {
                    pattern: /^[1-9]\d*$/,
                    message: 'Serving must be a positive integer',
                  },
                ]}
              >
                <Input placeholder="Number of servings" />
              </Form.Item>
            </Col>

            <Col lg={24}>
              <Form.Item
                label="Add Image"
                name="upload"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[
                  {
                    validator: (_, value) =>
                      fileList.length > 0
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error('Please upload a recipe image')
                          ),
                  },
                ]}
              >
                <Upload
                  name="recipeImage"
                  listType="picture"
                  beforeUpload={() => false}
                  fileList={fileList}
                  onChange={onUploadChange}
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
}

export default RecipeForm;
