import { RootState } from '../../../store/configureStore';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import CategoryForm from '../../../components/form/CategoryForm';

const EditCategory = () => {
  const { categoryId } = useLocalSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const category = useMemo(() => categories.find((category) => category.categoryId === categoryId), []);

  if (!category) {
    return null;
  }

  return <CategoryForm edit initialState={category} />;
};

export default EditCategory;
