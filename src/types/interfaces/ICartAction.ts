import { ECartActionTypes } from '../enums/ECartActionTypes';

export interface ICartAction {
  action: ECartActionTypes;
  productId: string;
  variantId: number;
  quantity?: number;
}
