import { RefObject } from 'react';

export function isFormValid(ref: RefObject<HTMLFormElement>, formError: { [k: string]: string }) {
  let flag = true;
  const requiredFields = ref.current?.querySelectorAll<HTMLInputElement>('[data-required="true"]');

  if (!requiredFields) {
    return flag;
  }

  for (let i = 0; i < requiredFields.length; i += 1) {
    const item = requiredFields[i];
    flag = item.value !== '';

    if (!flag) {
      return flag;
    }
  }

  Object.values(formError).forEach((errorValue) => {
    flag = !errorValue;
  });

  return flag;
}
