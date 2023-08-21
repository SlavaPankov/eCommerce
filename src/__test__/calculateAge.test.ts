import { test, expect, describe } from '@jest/globals';
import { calculateAge } from '../utils/calculateAge';

describe('Testing function calculateAge', () => {
  test('Should return age', () => {
    expect(calculateAge('1994-11-27')).toBe(28);
    expect(calculateAge('1995-11-27')).toBe(27);
    expect(calculateAge('1996-11-27')).toBe(26);
    expect(calculateAge('1997-11-27')).toBe(25);
    expect(calculateAge('1998-11-27')).toBe(24);
  });

  test('Should throw Error', () => {
    expect(() => calculateAge('27-10-2000')).toThrowError('invalid Date');
    expect(() => calculateAge('lorem')).toThrowError('invalid Date');
    expect(() => calculateAge('0-19-2000')).toThrowError('invalid Date');
    expect(() => calculateAge('2000-19-11')).toThrowError('invalid Date');
    expect(() => calculateAge('test_string')).toThrowError('invalid Date');
  });
});
