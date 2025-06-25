import React, { useState } from 'react';
import RecipeToolbar from '../../../Components/Recipe/RecipeToolbar';

import { Button, Empty, Input, Spin } from 'antd';
import { useGetRecipeQuery } from '../../../Redux/services/dashboard apis/recipeApis';
import { RecipeCard } from '../../../Components/Recipe/RecipeCard';
import PageHeading from '../../../Components/Shared/PageHeading';

function RecipePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading: recipeLoading } = useGetRecipeQuery();

  const onSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return (
    <Spin spinning={recipeLoading}>
      <PageHeading title="Recipe" />
      <div className="!w-full">
        <RecipeToolbar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
        />
        <div className="grid-4">
          {data?.data.length > 0 ? (
            data?.data?.map((data, i) => <RecipeCard data={data} key={i} />)
          ) : (
            <div className="flex items-center justify-center w-full col-span-4 h-[calc(90vh-100px)]">
              <Empty
                description="No recipes found"
                image={Empty.PRESENTED_IMAGE_SIMPLE}
              />
            </div>
          )}
        </div>
      </div>
    </Spin>
  );
}

export default RecipePage;
