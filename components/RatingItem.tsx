import { Rating, Item } from '../types';
import ListItem from './ui/ListItem';

type RatingItemProps = {
  rating: Rating;
  item: Item;
};

const RatingItem = ({ rating, item }: RatingItemProps) => (
  <ListItem
    href={`/item/${item.itemId}/rating/${rating.ratingId}`}
    labelText={`${rating.compositeRating || rating.overallRating}`}
    subtitle={rating.ratingNotes}
    title={new Date(rating.ratingTime).toLocaleDateString()}
  />
);

export default RatingItem;
