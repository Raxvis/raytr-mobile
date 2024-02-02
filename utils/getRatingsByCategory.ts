import { Category, Rating } from '../types';

export default function getRatingsByCategory(category: Category, ratings: Rating[]) {
  return ratings.filter((rating) => rating.categoryId === category.categoryId);
}
