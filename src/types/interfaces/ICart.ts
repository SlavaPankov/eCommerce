import { Address, DiscountCodeInfo } from '@commercetools/platform-sdk';
import { ILineItem } from './ILineItem';

export interface ICart {
  id: string;
  customerId?: string;
  lineItems: Array<ILineItem>;
  totalPrice: string;
  billingAddress?: Address;
  shippingAddress?: Address;
  discountCodes: Array<DiscountCodeInfo>;
  version: number;
}
