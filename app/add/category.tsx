import { Category } from '../../types';
import uuid from '../../utils/uuid';
import EditCategory from '../../components/form/EditCategory';

const getNewCategory = (): Category => ({
  categoryId: uuid(),
  categoryName: '',
  categoryDescription: '',
  ratingSchema: [],
});

const AddCategoryPage = () => {
  return <EditCategory initialState={getNewCategory()} />;
};

export default AddCategoryPage;
