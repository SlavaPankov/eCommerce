import { Address, DiscountCodeInfo, LineItem } from '@commercetools/platform-sdk';

export interface ICart {
  id: string;
  customerId: string;
  lineItems: Array<LineItem>;
  totalPrice: string;
  billingAddress: Address;
  shippingAddress: Address;
  discountCodes: Array<DiscountCodeInfo>;
  version: number;
}
