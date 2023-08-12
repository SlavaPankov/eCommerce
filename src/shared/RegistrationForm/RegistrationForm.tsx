import React, { useState, ChangeEvent, FormEvent } from 'react';
import styles from './registrationForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseInputField';

interface IFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password1: string;
  password2: string;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password1: '',
    password2: ''
  });

  const [formError, setFormError] = useState<IFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password1: '',
    password2: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'firstName' || event.target.name === 'lastName') {
      if (event.target.value.length > 15) {
        setFormError({ ...formError, [event.target.name]: 'Имя слишком длинное' });
      } else if (event.target.value.length < 3) {
        setFormError({ ...formError, [event.target.name]: 'Имя слишком короткое' });
      } else {
        setFormError({ ...formError, [event.target.name]: '' });
      }
    } else if (
      (event.target.name === 'password1' ||
        event.target.name === 'password2' ||
        event.target.name === 'email') &&
      event.target.value.length === 0
    ) {
      setFormError({ ...formError, [event.target.name]: 'Это обязательное поле' });
    } else {
      setFormError({ ...formError, [event.target.name]: '' });
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFocusBirthDate = (event: FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.type = 'date';
  };

  return (
    <form className={styles.form}>
      <h1 className={styles.form__header}>Регистрация</h1>
      <span className={styles.form__text}>
        Зарегистрируйтесь, чтобы получать специальные предложения
      </span>
      <BaseInputField
        name="firstName"
        value={formData.firstName}
        type="text"
        placeholder="Ваше имя"
        onChange={handleChange}
        error={formError.firstName}
      />
      <BaseInputField
        name="lastName"
        value={formData.lastName}
        type="text"
        placeholder="Ваша фамилия"
        onChange={handleChange}
        error={formError.lastName}
      />
      <BaseInputField
        name="birthDate"
        value={formData.birthDate}
        type="text"
        placeholder="Дата рождения"
        onChange={handleChange}
        onFocus={handleFocusBirthDate}
        error={formError.birthDate}
      />
      <BaseInputField
        name="email"
        value={formData.email}
        type="email"
        placeholder="Ваш e-mail*"
        onChange={handleChange}
        error={formError.email}
      />
      <BaseInputField
        name="password1"
        value={formData.password1}
        type="password"
        placeholder="Придумайте пароль*"
        onChange={handleChange}
        error={formError.password1}
      />
      <BaseInputField
        name="password2"
        value={formData.password2}
        type="password"
        placeholder="Повторите пароль*"
        onChange={handleChange}
        error={formError.password2}
      />

      <BaseButton textContent="Отправить" />
    </form>
  );
}
