import { Customer } from '@commercetools/platform-sdk';
import { IUser } from '../types/interfaces/IUser';

export const getCustomerFromResponse = (customer: Customer): IUser => ({
  id: customer.id,
  addresses: customer.addresses,
  email: customer.email,
  firstName: customer.firstName || '',
  lastName: customer.lastName || '',
  dateOfBirth: customer.dateOfBirth || new Date(0).toLocaleDateString(),
  defaultShippingAddressId: customer.defaultShippingAddressId || '',
  defaultBillingAddressId: customer.defaultBillingAddressId || '',
  shippingAddressIds: customer.shippingAddressIds || [],
  billingAddressIds: customer.billingAddressIds || [],
  version: customer.version
});
