import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import CategoryForm from '../../../components/form/CategoryForm';
import knex from '../../../db';
import { Category } from '../../../types';
import useAsyncEffect from '../../../hooks/useAsyncEffect';

const EditCategory = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<Category | undefined>();

  useAsyncEffect(async () => {
    const category: Category = await knex('category').where({ categoryId }).first();
    const ratingSchema = await knex('ratingSchema').where({ categoryId });

    setCategory({ ...category, ratingSchema });
  }, [categoryId]);

  if (!category) {
    return null;
  }

  return <CategoryForm edit initialState={category} />;
};

export default EditCategory;
