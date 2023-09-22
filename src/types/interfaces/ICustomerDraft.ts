import { IBaseAddress } from './IBaseAddress';

export interface ICustomerDraft {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  anonymousCart: {
    id?: string;
    typeId: 'cart';
  };
  addresses: Array<IBaseAddress>;
  shippingAddresses: Array<number>;
  billingAddresses: Array<number>;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}
