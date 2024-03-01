import { Category } from '../types';
import ListItem from './ui/ListItem';

const CategoryListItem = ({ category }: { category: Category }) => (
  <ListItem
    href={`/category/${category.categoryId}`}
    labelText="View"
    subtitle={category.categoryDescription}
    title={category.categoryName}
  />
);

export default CategoryListItem;
