import { Category, Item } from '../types';
import ListItem from './ui/ListItem';

const CategoryItem = ({ category, item }: { category: Category; item: Item }) => (
  <ListItem
    href={`/category/${category.categoryId}/item/${item.itemId}`}
    labelText={`${item.overallRating || 0}`}
    subtitle={item.itemDescription}
    title={item.itemName}
  />
);

export default CategoryItem;
