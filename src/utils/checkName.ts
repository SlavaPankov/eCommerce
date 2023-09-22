import { EErrorText } from '../types/enums/EErrorText';
import { textRegex } from './validationRegex';

export function checkName(value: string): string {
  if (value.length > 15) {
    return EErrorText.maxLength15;
  }
  if (value.length < 1) {
    return EErrorText.minLength1;
  }
  if (value && !textRegex.test(value)) {
    return EErrorText.textFormat;
  }

  return '';
}
