import { EActionTypes } from '../enums/EActionTypes';

export interface ICartAction {
  action: EActionTypes;
  productId: string;
  variantId: number;
  quantity?: number;
}
