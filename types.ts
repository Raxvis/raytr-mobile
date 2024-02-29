import { ReactNode } from 'react';

export type ComponentWithChildren = {
  children: ReactNode;
};

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  ratingSchema?: RatingSchema[];
};

export type RatingSchema = {
  categoryId: string;
  ratingSchemaId: string;
  ratingSchemaName: string;
  // ratingSchemaType: string;
  // ratingSchemaWeight: number;
};

export type Item = {
  itemId: string;
  itemName: string;
  itemPicture?: string;
  itemDescription?: string;
  itemCost?: number;
  overallRating?: number;
  ratings?: Rating[];
};

export type Rating = {
  ratingId: string;
  categoryId: string;
  itemId: string;
  itemCost?: number;
  ratingTotal?: number;
  ratingNotes?: string;
  ratingTime: number;
};

export type Score = {
  scoreId: string;
  ratingId: string;
  ratingSchemaId: string;
  scoreValue: number;
};
