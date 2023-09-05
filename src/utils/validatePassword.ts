import { passwordRegex } from './validationRegex';
import { EErrorText } from '../types/enums/EErrorText';

export const validatePassword = (input: string): string => {
  if (!passwordRegex.test(input)) {
    return EErrorText.passwordFormat;
  }

  if (input.length < 8) {
    return EErrorText.passwordMinLength;
  }

  return '';
};
