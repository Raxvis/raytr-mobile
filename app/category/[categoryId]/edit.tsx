import { RootState } from '../../../store/configureStore';
import { useLocalSearchParams } from 'expo-router';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import EditCategory from '../../../components/form/EditCategory';

const EditCategoryPage = () => {
  const { categoryId } = useLocalSearchParams();
  const { categories } = useSelector((state: RootState) => state.categories);
  const category = useMemo(() => categories.find((category) => category.categoryId === categoryId), []);

  if (!category) {
    return null;
  }

  return <EditCategory edit initialState={category} />;
};

export default EditCategoryPage;
