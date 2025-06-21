import React, { useState } from 'react';
import { RecipeCard } from '../../../Components/Recipe/RecipeCard';
import RecipeToolbar from '../../../Components/Recipe/RecipeToolbar';

import { Button, Input } from 'antd';
import { useGetRecipeQuery } from '../../../Redux/services/dashboard apis/recipeApis';
  
function RecipePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { data, isLoading: recipeLoading } = useGetRecipeQuery();
  const datas = [
    {
      id: 1,
      name: 'Classic Pancakes',
      image:
        'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg',
      descriptions:
        'Fluffy pancakes made with fresh ingredients for a perfect breakfast.',
      time: '15 min',
      people: '4',
      family: 'brown',
      ingredients: [
        {
          name: 'Spaghetti',
          image:
            'https://afrenet.org/wp-content/uploads/2024/12/ag1-e1734623932508.webp',
        },
        {
          name: 'Eggs',
          image:
            'https://afrenet.org/wp-content/uploads/2024/12/ag1-e1734623932508.webp',
        },
      ],
    },
    {
      id: 2,
      name: 'Spaghetti Bolognese',
      image:
        'https://t3.ftcdn.net/jpg/01/79/59/92/360_F_179599293_7mePKnajSM4bggDa8NkKpcAHKl3pow2l.jpg',
      descriptions: 'Traditional Italian pasta with rich, meaty tomato sauce.',
      time: '30 min',
      people: '6',
      family: 'red',
      ingredients: [
        {
          name: 'Spaghetti',
          image:
            'https://afrenet.org/wp-content/uploads/2024/12/ag1-e1734623932508.webp',
        },
        {
          name: 'Eggs',
          image:
            'https://afrenet.org/wp-content/uploads/2024/12/ag1-e1734623932508.webp',
        },
      ],
    },
  ];
  console.log();
  const onSearchChange = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };
  return (
    <div className="!w-full">
      <RecipeToolbar searchTerm={searchTerm} onSearchChange={onSearchChange} />
      <div className="grid-4">
        {data?.data?.map((data, i) => (
          <RecipeCard data={data} key={i} />
        ))}
      </div>
    </div>
  );
}

export default RecipePage;
