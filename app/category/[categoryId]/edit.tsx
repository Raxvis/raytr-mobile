import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import CategoryForm from '../../../components/form/CategoryForm';
import { Category } from '../../../types';
import useAsyncEffect from '../../../hooks/useAsyncEffect';
import getCategoryWithRatingMetric from '../../../services/category/getCategoryWIthRatingMetric';

const EditCategory = () => {
  const { categoryId } = useLocalSearchParams();
  const [category, setCategory] = useState<Category | undefined>();

  useAsyncEffect(async () => {
    const result = await getCategoryWithRatingMetric(categoryId);

    setCategory(result);
  }, [categoryId]);

  if (!category) {
    return null;
  }

  return <CategoryForm edit initialState={category} />;
};

export default EditCategory;
