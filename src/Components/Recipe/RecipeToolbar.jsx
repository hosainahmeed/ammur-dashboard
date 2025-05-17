import React, { useState } from 'react';
import { Input, Button, Row, Col } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import RecipeForm from './RecipeForm';

const RecipeToolbar = ({ searchTerm, onSearchChange }) => {
  const [showModal, setShowModal] = useState(false);

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
          onClick={() => setShowModal(true)}
        >
          Add Recipe
        </Button>
      </div>
      <RecipeForm setShowModal={setShowModal} showModal={showModal} />
    </div>
  );
};

export default RecipeToolbar;
