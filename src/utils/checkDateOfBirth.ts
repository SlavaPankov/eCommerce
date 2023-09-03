import { EErrorText } from '../types/enums/EErrorText';
import { calculateAge } from './calculateAge';

export function checkDateOfBirth(value: string): string {
  try {
    const birthDate = new Date(value);
    const currentDate = new Date();

    if (Number.isNaN(birthDate.getTime())) {
      return EErrorText.dateInvalid;
    }

    if (calculateAge(value) < 13) {
      return EErrorText.dateToYoung;
    }

    if (birthDate > currentDate) {
      return EErrorText.dateOutOfLimit;
    }

    return '';
  } catch {
    return EErrorText.dateInvalid;
  }
}
