import { Category, Item } from '../types';
import getRatingsByCategory from './getRatingsByCategory';

export default function getItemsWithRatingsByCategory(category: Category, items: Item[]) {
  const categoryItems = items.filter((item) =>
    item.ratings.find((rating) => rating.categoryId === category.categoryId),
  );

  return categoryItems.map((item) => ({
    ...item,
    ratings: getRatingsByCategory(category, item.ratings),
  }));
}
