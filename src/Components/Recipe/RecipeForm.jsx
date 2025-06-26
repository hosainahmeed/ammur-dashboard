import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button, Typography, Spin, Upload } from 'antd';
import { useGetFamiliesQuery } from '../../Redux/services/dashboard apis/familiesApis';
import {
  useCreateRecipeMutation,
  useGetSingleRecipeQuery,
  useUpdateRecipeMutation,
} from '../../Redux/services/dashboard apis/recipeApis';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import RecipeDetailsForm from './RecipeDetailsForm';
import RecipeDescription from './RecipeDescription';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import { UploadOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

function RecipeForm({ showModal, setShowModal, recipeId }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [originalIngredients, setOriginalIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createRecipe] = useCreateRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();

  const { data: families, isLoading: familiesLoading } = useGetFamiliesQuery();

  const {
    data: recipe,
    isLoading: recipeLoading,
    refetch: refetchRecipe,
  } = useGetSingleRecipeQuery(
    { id: recipeId },
    { skip: !recipeId || !showModal }
  );

  const resetForm = useCallback(() => {
    form.resetFields();
    setFileList([]);
    setIngredients([]);
    setOriginalIngredients([]);
  }, [form]);

  useEffect(() => {
    if (!showModal) {
      resetForm();
    }
  }, [showModal, resetForm]);

  useEffect(() => {
    if (showModal && recipeId) {
      refetchRecipe();
    }
  }, [showModal, recipeId, refetchRecipe]);

  useEffect(() => {
    if (recipe?.data && showModal) {
      const {
        title,
        cookingTime,
        serving,
        description,
        img,
        ingredients: recipeIngredients,
        familyName,
      } = recipe.data;

      const formValues = {
        title,
        cookingTime: dayjs(cookingTime, 'HH:mm'),
        serving,
        description,
        familyName: familyName || '',
      };

      const imageFileList = img
        ? [
            {
              uid: '-1',
              name: 'recipe-image.jpg',
              status: 'done',
              url: img,
              thumbUrl: img,
              response: { url: img },
            },
          ]
        : [];

      if (imageFileList.length > 0) {
        formValues.upload = imageFileList;
      }

      form.setFieldsValue(formValues);

      setFileList(imageFileList);

      const mappedIngredients = recipeIngredients.map((ingredient) => ({
        name: ingredient.name,
        img: ingredient.img,
        id: ingredient._id || Date.now() + Math.random(),
      }));

      setIngredients(mappedIngredients);
      setOriginalIngredients(mappedIngredients);
    }
  }, [recipe, form, showModal]);

  const handleCancel = () => {
    setShowModal(false);
    resetForm();
  };

  const normFile = (e) => (Array.isArray(e) ? e : e?.fileList);

  const onChange = (info) => {
    setFileList(info.fileList);
  };

  const getRemovedIngredients = () => {
    if (!recipeId) return [];

    const currentIngredientNames = ingredients.map((ing) => ing.name);
    const removedIngredients = originalIngredients.filter(
      (originalIng) => !currentIngredientNames.includes(originalIng.name)
    );

    return removedIngredients.map((ing) => ({
      name: ing.name,
      img: ing.img,
    }));
  };

  const handleAddRecipe = async () => {
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();

      if (ingredients.length === 0) {
        toast.error('Please add at least one ingredient');
        return;
      }

      const formattedCookingTime = values.cookingTime.format('HH:mm');

      const formattedIngredients = ingredients.map((ingredient) => ({
        name: ingredient.name,
        img: ingredient.img,
      }));

      const formData = new FormData();
      const data = {
        title: values.title,
        familyName: values.familyName,
        cookingTime: formattedCookingTime,
        description: values.description,
        serving: values.serving,
        ingredients: formattedIngredients,
      };

      if (recipeId) {
        const removedIngredients = getRemovedIngredients();
        if (removedIngredients.length > 0) {
          data.removeIngredients = removedIngredients;
        }
      }

      formData.append('data', JSON.stringify(data));

      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        if (file.originFileObj) {
          formData.append('file', file.originFileObj);
        } else if (file instanceof File) {
          formData.append('file', file);
        }
      }

      if (!recipeId) {
        await createRecipe({ data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Recipe created successfully');
              handleCancel();
            }
          });
      } else {
        await updateRecipe({ id: recipeId, data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Recipe updated successfully');
              handleCancel();
            }
          });
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to process recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (recipeId && recipeLoading) {
    return (
      <Modal
        open={showModal}
        onCancel={handleCancel}
        footer={null}
        closable={false}
        destroyOnClose
        centered
      >
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <Spin size="large" />
          <p>Loading recipe data...</p>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open={showModal}
      title={
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          {recipeId ? 'Edit Recipe' : 'Create New Recipe'}
        </Title>
      }
      maskStyle={{ backdropFilter: 'blur(2px)' }}
      onCancel={handleCancel}
      width={700}
      centered
      closable={false}
      destroyOnClose={true}
      bodyStyle={{ padding: '24px', maxHeight: '80vh', overflow: 'auto' }}
      footer={[
        <Button key="cancel" onClick={handleCancel} disabled={isSubmitting}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleAddRecipe}
          loading={isSubmitting}
        >
          {recipeId ? 'Update Recipe' : 'Create Recipe'}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <Form.Item
          label={<Text strong>Recipe Image</Text>}
          name="upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            listType="picture-card"
            beforeUpload={() => false}
            fileList={fileList}
            onChange={onChange}
            maxCount={1}
            onRemove={() => {
              setFileList([]);
              form.setFieldValue('upload', []);
              return true;
            }}
            showUploadList={{
              showPreviewIcon: true,
              showRemoveIcon: true,
              showDownloadIcon: false,
            }}
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
        <RecipeDetailsForm
          recipeData={recipe?.data}
          families={families}
          familiesLoading={familiesLoading}
        />
        <RecipeDescription />
        <IngredientForm
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
        <IngredientList
          ingredients={ingredients}
          setIngredients={setIngredients}
        />
      </Form>
    </Modal>
  );
}

export default RecipeForm;
