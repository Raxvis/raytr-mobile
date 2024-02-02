import { Item } from '../types';

const items: Item[] = [
  {
    itemId: '1',
    itemName: 'Jim Bean',
    itemDescription: 'A Common Bourbon',
    itemCost: 24.99,
    overallRating: 5,
    ratings: [
      {
        categoryId: '1',
        ratingTotal: 5,
        ratingNotes: '',
        ratingTime: new Date(),
        scores: [
          {
            ratingSchemaId: '1',
            scoreValue: 5,
          },
          {
            ratingSchemaId: '2',
            scoreValue: 5,
          },
          {
            ratingSchemaId: '3',
            scoreValue: 5,
          },
        ],
      },
      {
        categoryId: '2',
        ratingTotal: 5,
        ratingNotes: '',
        ratingTime: new Date(),
        scores: [
          {
            ratingSchemaId: '1',
            scoreValue: 5,
          },
          {
            ratingSchemaId: '2',
            scoreValue: 5,
          },
          {
            ratingSchemaId: '3',
            scoreValue: 5,
          },
        ],
      },
    ],
  },
  {
    itemId: '2',
    itemName: 'Jack Daniels',
    itemDescription: 'A Tennesse Mash',
    overallRating: 4,
    ratings: [
      {
        categoryId: '1',
        ratingTotal: 5,
        ratingNotes: '',
        ratingTime: new Date(),
        scores: [
          {
            ratingSchemaId: '1',
            scoreValue: 4,
          },
          {
            ratingSchemaId: '2',
            scoreValue: 5,
          },
          {
            ratingSchemaId: '3',
            scoreValue: 3,
          },
        ],
      },
    ],
  },
];

export default items;
