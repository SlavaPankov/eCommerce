// import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import styles from './registrationForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseTextInputField';

// interface IRegistrationFormFields {
//   firstName: string;
//   lastName: string;
//   DOB: string;
//   email: string;
//   password1: string;
//   password2: string;
// }

export function RegistrationForm() {
  const [form] = useState({
    firstName: '',
    lastName: '',
    DOB: '',
    email: '',
    password1: '',
    password2: ''
  });

  function handleInputChange() {
    console.log('input');
  }
  //    event: ChangeEvent<HTMLInputElement>,
  //    inputType: IRegistrationFormFields
  //  ) {
  //    setForm({ ...form, inputType: event.target.value });

  return (
    <form className={styles.form}>
      <h1 className={styles.form__header}>Регистрация</h1>
      <span className={styles.form__text}>
        Зарегистрируйтесь, чтобы получать специальные предложения
      </span>
      <BaseInputField
        name="firstName"
        value={form.firstName}
        type="text"
        placeholder="Ваше имя*"
        onChange={handleInputChange}
      />
      <BaseInputField
        name="lastName"
        value={form.lastName}
        type="text"
        placeholder="Ваша фамилия*"
        onChange={handleInputChange}
      />
      <BaseInputField
        name="DOB"
        value={form.DOB}
        type="date"
        placeholder="Дата рождения"
        onChange={handleInputChange}
      />
      <BaseInputField
        name="email"
        value={form.email}
        type="email"
        placeholder="Ваш e-mail*"
        onChange={handleInputChange}
      />
      <BaseInputField
        name="password1"
        value={form.password1}
        type="password"
        placeholder="Придумайте пароль*"
        onChange={handleInputChange}
      />
      <BaseInputField
        name="password2"
        value={form.password2}
        type="password"
        placeholder="Повторите пароль*"
        onChange={handleInputChange}
      />

      <BaseButton textContent="Отправить" />
    </form>
  );
}
