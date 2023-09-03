import { RefObject } from 'react';
import { IFormData } from '../types/interfaces/IFormData';
import { EErrorText } from '../types/enums/EErrorText';

export function getGlobalError(ref: RefObject<HTMLFormElement>) {
  const tempError: IFormData = {};
  const requiredFields = ref.current?.querySelectorAll<HTMLInputElement>('[data-required="true"]');

  if (!requiredFields) {
    return {
      tempError: {},
      globalError: ''
    };
  }

  requiredFields.forEach((item) => {
    if (item.value === '') {
      tempError[item.name] = EErrorText.requiredField;
    }
  });

  return {
    tempError,
    globalError: 'Заполните все обязательные поля'
  };
}
