import { ReactNode } from 'react';

export type ComponentWithChildren = {
  children: ReactNode;
};

export type Item = {
  itemId: string;
  itemName: string;
  itemDescription?: string;
  itemPicture?: string;
  score?: number;
  prices?: Price[];
  categories?: Category[];
  ratings?: Rating[];
};

export type Price = {
  priceId: string;
  itemId: string;
  price: number;
  location: string;
};

export type Category = {
  categoryId: string;
  categoryName: string;
};

export type ItemCategory = {
  itemId: string;
  categoryId: string;
};

export type Rating = {
  ratingId: string;
  itemId: string;
  ratingNotes?: string;
  ratingTime: number;
  overallRating?: number;
  compositeRating?: number;
  scores?: Score[];
};

export type RatingMetric = {
  ratingMetricId: string;
  ratingMetricName: string;
};

export type Score = {
  scoreId: string;
  ratingId: string;
  score?: number;
  ratingMetricId: string;
  ratingMetric?: RatingMetric;
};
