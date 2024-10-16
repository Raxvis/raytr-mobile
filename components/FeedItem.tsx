import { Item, Rating } from '../types';
import ListItem from './ui/ListItem';

type FeedItemProps = Item & Rating;

// Need a dual score label

const FeedItem = ({
  itemName,
  itemId,
  ratingId,
  compositeRating,
  overallRating,
  ratingNotes,
  ratingTime,
}: FeedItemProps) => (
  <ListItem
    href={`/item/${itemId}`}
    labels={[`${overallRating}`, `${compositeRating}`]}
    subtitle={ratingNotes}
    title={`${itemName} - ${new Date(ratingTime).toLocaleDateString()}`}
  />
);

export default FeedItem;
