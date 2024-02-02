import { Category, Item } from '../types';

export default function getItemsByCategory(category: Category, items: Item[]) {
  return items.filter((item) => item.ratings.find((rating) => rating.categoryId === category.categoryId));
}
