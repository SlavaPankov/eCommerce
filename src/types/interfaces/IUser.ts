import { BaseAddress } from '@commercetools/platform-sdk';

export interface IUser {
  id: string;
  addresses: Array<BaseAddress>;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: Array<string>;
  billingAddressIds: Array<string>;
  version: number;
}
