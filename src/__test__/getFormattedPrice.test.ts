import { test, expect, describe } from '@jest/globals';
import { getFormattedPrice } from '../utils/getFormattedPrice';

describe('Testing function getFormattedPrice', () => {
  test('Should return expected result without second param', () => {
    expect(getFormattedPrice({ price: 1000000 })).toBe('10\xa0000');
    expect(getFormattedPrice({ price: 2000000 })).toBe('20\xa0000');
    expect(getFormattedPrice({ price: 1234567890 })).toBe('12\xa0345\xa0678');
  });

  test('Should return expected result with second param', () => {
    expect(getFormattedPrice({ price: 1000000, fractionDigits: 3 })).toBe('1\xa0000');
    expect(getFormattedPrice({ price: 2000000, fractionDigits: 4 })).toBe('200');
    expect(getFormattedPrice({ price: 1234567890, fractionDigits: 6 })).toBe('1\xa0234');
  });

  test('Should return empty string if price undefined', () => {
    expect(getFormattedPrice({ price: undefined })).toBe('');
  });
});
