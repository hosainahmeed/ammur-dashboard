import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button, Typography, Spin } from 'antd';
import {
  useGetFamiliesQuery,
  useGetSingleRecipeQuery,
} from '../../Redux/services/dashboard apis/familiesApis';
import { useCreateRecipeMutation } from '../../Redux/services/dashboard apis/recipeApis';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

import RecipeImageUpload from './RecipeImageUpload';
import RecipeDetailsForm from './RecipeDetailsForm';
import RecipeDescription from './RecipeDescription';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

const { Title } = Typography;

function RecipeForm({ showModal, setShowModal, recipeId, onSuccess }) {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(ingredients);
  const [createRecipe] = useCreateRecipeMutation();
  const { data: families, isLoading: familiesLoading } = useGetFamiliesQuery();
  const { data: recipe, isLoading: recipeLoading } = useGetSingleRecipeQuery(
    { id: recipeId },
    { skip: !recipeId }
  );

  const resetForm = useCallback(() => {
    form.resetFields();
    setFileList([]);
    setIngredients([]);
  }, [form]);

  useEffect(() => {
    if (!showModal) {
      resetForm();
    }
  }, [showModal, resetForm]);

  useEffect(() => {
    if (recipe?.data) {
      const {
        title,
        cookingTime,
        serving,
        description,
        img,
        ingredients: recipeIngredients,
        family,
      } = recipe.data;

      form.setFieldsValue({
        title,
        cookingTime: dayjs(cookingTime, 'HH:mm'),
        serving,
        description,
        familyName: family?.name || '',
      });

      setFileList(
        img
          ? [
              {
                uid: '-1',
                name: 'recipe-image.png',
                status: 'done',
                url: img,
              },
            ]
          : []
      );

      setIngredients(
        recipeIngredients.map((i) => ({
          name: i.name,
          img: i.img,
          id: i._id,
        }))
      );
    }
  }, [recipe, form]);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleAddRecipe = async () => {
    try {
      setIsSubmitting(true);

      const values = await form.validateFields();

      if (ingredients.length === 0) {
        toast.error('Please add at least one ingredient');
        return;
      }

      const imageFile = fileList[0]?.originFileObj || null;
      const formattedCookingTime = values.cookingTime.format('HH:mm');

      const formattedIngredients = ingredients.map((ingredient) => ({
        name: ingredient.name,
        img: ingredient.img.uid,
      }));

      const formData = new FormData();
      const data = {
        title: values.title,
        familyName: values.familyName,
        cookingTime: formattedCookingTime,
        description: values.description,
        serving: values.serving,
        img: imageFile,
        ingredients: formattedIngredients,
      };

      if (imageFile) {
        formData.append('file', imageFile);
      }

      formData.append('data', JSON.stringify(data));

      const response = await createRecipe({ data: formData }).unwrap();

      if (response?.success) {
        toast.success(response?.message || 'Recipe created successfully');
        handleCancel();
        onSuccess?.();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create recipe');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (recipeId && recipeLoading) {
    return (
      <Modal
        visible={showModal}
        onCancel={handleCancel}
        footer={null}
        closable={false}
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
      visible={showModal}
      title={
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          {recipeId ? 'Edit Recipe' : 'Create New Recipe'}
        </Title>
      }
      onCancel={handleCancel}
      width={700}
      centered
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
      maskStyle={{ backdropFilter: 'blur(2px)' }}
      destroyOnClose
    >
      <Form form={form} layout="vertical" requiredMark={false}>
        <RecipeImageUpload fileList={fileList} setFileList={setFileList} />
        <RecipeDetailsForm
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
