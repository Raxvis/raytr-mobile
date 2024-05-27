import { ReactNode } from 'react';

export type ComponentWithChildren = {
  children: ReactNode;
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

export type Category = {
  categoryId: string;
  categoryName: string;
};

export type ItemCategories = {
  itemId: string;
  categoryId: string;
};

export type Rating = {
  ratingId: string;
  itemId: string;
  itemCost?: number;
  ratingNotes?: string;
  ratingTime: number;
  overallRating?: number;
  compositeRating?: number;
  scores?: Score[];
};

export type Score = {
  scoreId: string;
  ratingId: string;
  scoreValue?: number;
  ratingMetricId: string;
  ratingMetric?: RatingMetric;
};

export type RatingMetric = {
  ratingMetricId: string;
  ratingMetricName: string;
};
