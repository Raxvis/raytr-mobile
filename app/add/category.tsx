import { Category } from '../../types';
import uuid from '../../utils/uuid';
import CategoryForm from '../../components/form/CategoryForm';

const getNewCategory = (): Category => ({
  categoryId: uuid(),
  categoryName: '',
  categoryDescription: '',
  ratingSchema: [],
});

const AddCategory = () => {
  return <CategoryForm initialState={getNewCategory()} />;
};

export default AddCategory;
