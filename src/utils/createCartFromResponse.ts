import { Cart } from '@commercetools/platform-sdk';
import { getFormattedPrice } from './getFormattedPrice';
import { ICart } from '../types/interfaces/ICart';

export function createCartFromResponse(data: Cart): ICart {
  return {
    id: data.id,
    customerId: data.customerId || '',
    lineItems: data.lineItems,
    totalPrice: getFormattedPrice({ price: data.totalPrice.centAmount }),
    billingAddress: data.billingAddress || { country: '' },
    shippingAddress: data.shippingAddress || { country: '' },
    discountCodes: data.discountCodes || [],
    version: data.version
  };
}
