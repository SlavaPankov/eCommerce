import { IImage } from './IImage';

export interface ILineItem {
  id: string;
  name: string;
  key: string;
  images?: {
    preview: IImage;
    slider: Array<IImage>;
  };
  price: string;
  discountedPrice: string;
  quantity: number;
}
