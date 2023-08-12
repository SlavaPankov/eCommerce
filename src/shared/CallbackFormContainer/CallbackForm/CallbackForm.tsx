import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from './callbackForm.scss';
import { BaseInputField } from '../../BaseInputField';
import { BaseButton } from '../../BaseButton';
import { BaseCheckbox } from '../../BaseCheckbox';

enum EFieldsNames {
  name = 'name',
  phone = 'phone',
  email = 'email'
}

interface IFormData {
  name: string;
  phone: string;
  email: string;
}

const initialFormData: IFormData = {
  name: '',
  phone: '',
  email: ''
};

export function CallbackForm() {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [formFieldsError, setFormFieldsError] = useState<IFormData>(initialFormData);
  const [isRequiredFieldTouch, setIsRequiredFieldTouch] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError('');

    if (event.target.name === EFieldsNames.name) {
      setFormFieldsError({
        ...formFieldsError,
        [event.target.name]: ''
      });

      if (event.target.value.length < 2) {
        setFormFieldsError({
          ...formFieldsError,
          [event.target.name]: 'Минимальная длина 2 символа'
        });
      }

      if (event.target.value.length > 30) {
        setFormFieldsError({
          ...formFieldsError,
          [event.target.name]: 'Максимальная длина 30 символов'
        });
      }

      if (!/^[а-яa-z-]+$/i.test(event.target.value)) {
        setFormFieldsError({
          ...formFieldsError,
          [event.target.name]: 'Недопустимый формат'
        });
      }
    }

    if (event.target.name === EFieldsNames.phone) {
      setFormFieldsError({
        ...formFieldsError,
        [event.target.name]: ''
      });
    }

    if (event.target.name === EFieldsNames.email) {
      setFormFieldsError({
        ...formFieldsError,
        [event.target.name]: ''
      });
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormFieldsError({
        ...formFieldsError,
        [event.currentTarget.name]: 'Поле обязательное для заполнения'
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    if (!isRequiredFieldTouch) {
      setFormError('Заполните все обязательные поля');
      return;
    }

    [...data].forEach((item) => {
      if (item[1] === '') {
        setFormError('Заполните все обязательные поля');
      }
    });

    if (!isFormValid) {
      return;
    }
    console.log('send form');
  };

  const handleFocus = () => {
    setIsRequiredFieldTouch(true);
  };

  useEffect(() => {
    if (formError !== '') {
      setIsFormValid(true);
    }
  }, [formError]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <BaseInputField
        name="name"
        value={formData.name}
        placeholder="Ваше имя"
        onChange={handleChange}
        error={formFieldsError.name}
        onBlur={handleBlur}
        onFocus={handleFocus}
      />
      <BaseInputField
        name="phone"
        value={formData.phone}
        placeholder="Ваш телефон"
        onChange={handleChange}
        error={formFieldsError.phone}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type="tel"
      />
      <BaseInputField
        name="email"
        value={formData.email}
        placeholder="Ваш E-mail"
        onChange={handleChange}
        error={formFieldsError.email}
        onBlur={handleBlur}
        onFocus={handleFocus}
        type="email"
      />
      <span className={styles.error}>{formError}</span>
      <BaseButton textContent="Отправить" />
      <BaseCheckbox
        name="agreement"
        value="agree"
        onChange={() => {}}
        isChecked={true}
        id="checkbox"
        label="Принимаю пользовательское соглашение"
      />
    </form>
  );
}
