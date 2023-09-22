export interface IBaseAddress {
  country: string;
  postalCode: string;
  region: string;
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  isTypeShipping?: boolean;
  isTypeBilling?: boolean;
  isDefaultShipping?: boolean;
  isDefaultBilling?: boolean;
}
