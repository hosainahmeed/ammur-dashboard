import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Button, Typography, Spin } from 'antd';
import {
  useGetFamiliesQuery,
  useGetSingleRecipeQuery,
} from '../../Redux/services/dashboard apis/familiesApis';
import {
  useCreateRecipeMutation,
  useUpdateRecipeMutation,
} from '../../Redux/services/dashboard apis/recipeApis';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

import RecipeImageUpload from './RecipeImageUpload';
import RecipeDetailsForm from './RecipeDetailsForm';
import RecipeDescription from './RecipeDescription';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';

const { Title } = Typography;

function RecipeForm({
  showModal,
  setShowModal,
  recipeId,
  setRecipeId,
  onSuccess,
}) {
  console.log(recipeId);
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  console.log(ingredients);
  const [createRecipe] = useCreateRecipeMutation();
  const [updateRecipe] = useUpdateRecipeMutation();
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
    resetForm();
    setRecipeId(null);
  };

  // const handleAddRecipe = async () => {
  //   try {
  //     setIsSubmitting(true);
  //     const values = await form.validateFields();
  //     if (ingredients.length === 0) {
  //       toast.error('Please add at least one ingredient');
  //       return;
  //     }

  //     const imageFile = fileList[0]?.originFileObj || null;
  //     const formattedCookingTime = values.cookingTime.format('HH:mm');
  //     console.log(ingredients);
  //     const formattedIngredients = ingredients.map((ingredient) => ({
  //       name: ingredient.name,
  //       img: ingredient.img,
  //     }));

  //     const formData = new FormData();
  //     const data = {
  //       title: values.title,
  //       familyName: values.familyName,
  //       cookingTime: formattedCookingTime,
  //       description: values.description,
  //       serving: values.serving,
  //       ingredients: formattedIngredients,
  //     };
  //     if (imageFile) {
  //       formData.append('file', imageFile);
  //     }
  //     formData.append('data', JSON.stringify(data));

  //     if (!recipeId) {
  //       await createRecipe({ data: formData })
  //         .unwrap()
  //         .then((res) => {
  //           if (res?.success) {
  //             toast.success(res?.message || 'Recipe created successfully');
  //             handleCancel();
  //             onSuccess?.();
  //           }
  //         });
  //     } else {
  //       await updateRecipe({ id: recipeId, data: formData })
  //         .unwrap()
  //         .then((res) => {
  //           if (res?.success) {
  //             toast.success(res?.message || 'Recipe updated successfully');
  //             handleCancel();
  //             onSuccess?.();
  //           }
  //         });
  //     }
  //   } catch (error) {
  //     toast.error(error?.data?.message || 'Failed to create recipe');
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };
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
        img: ingredient.img,
      }));

      const formData = new FormData();
      const data = {};
      if (recipeId) {
        if (values.title !== recipe?.data?.title) data.title = values.title;
        if (values.familyName !== recipe?.data?.family?.name)
          data.familyName = values.familyName;
        if (formattedCookingTime !== recipe?.data?.cookingTime)
          data.cookingTime = formattedCookingTime;
        if (values.description !== recipe?.data?.description)
          data.description = values.description;
        if (values.serving !== recipe?.data?.serving)
          data.serving = values.serving;

        const originalIngredients = recipe?.data?.ingredients?.map((i) => ({
          name: i.name,
          img: i.img,
        }));
        if (
          JSON.stringify(formattedIngredients) !==
          JSON.stringify(originalIngredients)
        ) {
          data.ingredients = formattedIngredients;
        }
      } else {
        data.title = values.title;
        data.familyName = values.familyName;
        data.cookingTime = formattedCookingTime;
        data.description = values.description;
        data.serving = values.serving;
        data.ingredients = formattedIngredients;
      }

      if (imageFile) {
        formData.append('file', imageFile);
      }
      formData.append('data', JSON.stringify(data));

      if (!recipeId) {
        await createRecipe({ data: formData })
          .unwrap()
          .then((res) => {
            if (res?.success) {
              toast.success(res?.message || 'Recipe created successfully');
              handleCancel();
              onSuccess?.();
            }
          });
      } else {
        if (Object.keys(data).length > 0 || imageFile) {
          await updateRecipe({ id: recipeId, data: formData })
            .unwrap()
            .then((res) => {
              if (res?.success) {
                toast.success(res?.message || 'Recipe updated successfully');
                handleCancel();
                onSuccess?.();
              }
            });
        } else {
          toast.success('No changes detected');
          handleCancel();
        }
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
        visible={showModal}
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
      visible={showModal}
      title={
        <Title level={4} style={{ margin: 0, color: 'white' }}>
          {recipeId ? 'Edit Recipe' : 'Create New Recipe'}
        </Title>
      }
      maskStyle={{ backdropFilter: 'blur(2px)' }}
      destroyOnClose
      onCancel={handleCancel}
      width={700}
      centered
      closable={false}
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
        <RecipeImageUpload fileList={fileList} setFileList={setFileList} />
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
