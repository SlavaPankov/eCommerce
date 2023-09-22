import { BaseAddress } from '@commercetools/platform-sdk';

export function createAddressFromForm(address: { [k: string]: string }): BaseAddress {
  const { country } = address;

  if (!country) {
    throw new Error('Country is required field');
  }

  return {
    country: address.country,
    ...address
  };
}
