import { emailRegex } from './validationRegex';
import { EErrorText } from '../types/enums/EErrorText';

export function checkEmail(email: string): string {
  if (email && !emailRegex.test(email)) {
    return EErrorText.emailFormat;
  }

  return '';
}
