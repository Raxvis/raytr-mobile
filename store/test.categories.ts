import { Category } from '../types';

const categories: Category[] = [
  {
    categoryId: '1',
    categoryName: 'Whiskeys',
    categoryDescription: 'Whiskeys',
    ratingSchema: [
      {
        ratingSchemaId: '1',
        ratingSchemaName: 'Taste',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
      {
        ratingSchemaId: '2',
        ratingSchemaName: 'Burn',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
      {
        ratingSchemaId: '3',
        ratingSchemaName: 'Flavor',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
    ],
  },
  {
    categoryId: '2',
    categoryName: 'Cigars',
    categoryDescription: 'Cigars',
    ratingSchema: [
      {
        ratingSchemaId: '1',
        ratingSchemaName: 'Smell',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
      {
        ratingSchemaId: '2',
        ratingSchemaName: 'Smoke',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
      {
        ratingSchemaId: '3',
        ratingSchemaName: 'Vibe',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
      {
        ratingSchemaId: '4',
        ratingSchemaName: 'After Taste',
        ratingSchemaType: 'SLIDER',
        ratingSchemaWeight: 5,
      },
    ],
  },
];

export default categories;
