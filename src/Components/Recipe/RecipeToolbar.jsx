import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import RecipeForm from './RecipeForm';

const RecipeToolbar = ({ searchTerm, onSearchChange, onRecipeUpdate }) => {
  const [showModal, setShowModal] = useState(false);
  const [editingRecipeId, setEditingRecipeId] = useState(null);

  const handleAddRecipe = () => {
    setEditingRecipeId(null);
    setShowModal(true);
  };

  const handleEditRecipe = (recipeId) => {
    setEditingRecipeId(recipeId);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingRecipeId(null);
    if (onRecipeUpdate) {
      onRecipeUpdate();
    }
  };

  return (
    <div>
      <div className="flex !w-full justify-between">
        <Input
          style={{ width: 350 }}
          placeholder="Search recipes..."
          prefix={<SearchOutlined />}
          value={searchTerm}
          onChange={onSearchChange}
          allowClear
        />

        <Button
          className="!bg-[#0C469D] !text-white"
          icon={<PlusOutlined />}
          onClick={handleAddRecipe}
        >
          Add Recipe
        </Button>
      </div>

      <RecipeForm
        setShowModal={handleModalClose}
        showModal={showModal}
        recipeId={editingRecipeId}
        key={`recipe-form-${editingRecipeId}-${showModal}`}
      />
    </div>
  );
};

export default RecipeToolbar;
