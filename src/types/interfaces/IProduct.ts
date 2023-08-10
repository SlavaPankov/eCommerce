import { Attribute, CategoryReference } from '@commercetools/platform-sdk';

export interface IProduct {
  id: string;
  name: string;
  key: string;
  images?: {
    preview: string;
    slider: Array<string>;
  };
  categories: Array<CategoryReference>;
  attributes: Array<Attribute>;
  price: string;
  discountedPrice: string;
}
