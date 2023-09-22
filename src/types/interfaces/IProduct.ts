import { Attribute, CategoryReference } from '@commercetools/platform-sdk';
import { IImage } from './IImage';

export interface IProduct {
  id: string;
  name: string;
  key: string;
  variantId: number;
  images?: {
    preview: IImage;
    slider: Array<IImage>;
  };
  categories: Array<CategoryReference>;
  attributes: Array<Attribute>;
  price: string;
  discountedPrice: string;
  rating: number;
  description: string;
}
