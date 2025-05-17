import React from 'react';
import { Row, Col, Typography } from 'antd';
import RecipeCard from './RecipeCard';

const { Text } = Typography;

const RecipeList = ({ recipes, onView, onEdit, onDelete }) => {
  return recipes.length > 0 ? (
    <Row gutter={[16, 16]}>
      {recipes.map((recipe) => (
        <Col key={recipe.id} xs={24} sm={12} lg={8}>
          <RecipeCard
            recipe={recipe}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </Col>
      ))}
    </Row>
  ) : (
    <div style={{ textAlign: 'center', padding: '40px 0' }}>
      <Text type="secondary">No recipes found. Add your first recipe!</Text>
    </div>
  );
};

export default RecipeList;
