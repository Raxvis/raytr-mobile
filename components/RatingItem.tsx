import { Rating, Item } from '../types';
import ListItem from './ui/ListItem';

type RatingItemProps = {
  categoryId: string;
  rating: Rating;
  item: Item;
};

const RatingItem = ({ categoryId, rating, item }: RatingItemProps) => (
  <ListItem
    href={`/category/${categoryId}/item/${item.itemId}/rating/${rating.ratingId}`}
    labelText={`${rating.ratingTotal || 0}`}
    subtitle={rating.ratingNotes}
    title={new Date(rating.ratingTime).toLocaleDateString()}
  />
);

export default RatingItem;
