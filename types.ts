import { ReactNode } from 'react';

export type ComponentWithChildren = {
  children: ReactNode;
};

export type Category = {
  categoryId: string;
  categoryName: string;
  categoryDescription?: string;
  ratingSchema?: RatingSchema[];
  items?: Item[];
};

export type RatingSchema = {
  ratingSchemaId: string;
  ratingSchemaName: string;
  ratingSchemaType: string;
  ratingSchemaWeight: number;
};

export type Item = {
  itemId: string;
  itemName: string;
  itemPicture?: string;
  itemDescription?: string;
  itemCost?: number;
  overallRating?: number;
};

export type Rating = {
  ratingId: string;
  categoryId: string;
  itemId: string;
  itemCost?: number;
  ratingTotal?: number;
  ratingNotes?: string;
  ratingTime: Date;
  scores?: Score[];
};

export type Score = {
  ratingSchemaId: string;
  ratingSchema?: RatingSchema;
  scoreValue: number;
};
