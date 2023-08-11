import { Link } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './loginForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseTextInputField';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const className = classNames('container', {
    [`${styles.form}`]: true
  });

  const handleEmailValidation = (input: string) => {
    const emailTrimmed = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      setEmailError('Введите e-mail');
    } else if (!emailRegex.test(emailTrimmed)) {
      setEmailError('Неверный формат!');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordValidation = (input: string) => {
    const passwordTrimmed = input.trim();
    const pwdRegex = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?\d)(?=\S*?[!@#$%^&*])\S{8,}$/;
    if (!passwordTrimmed) {
      setPasswordError('Введите пароль');
    } else if (!pwdRegex.test(passwordTrimmed)) {
      setPasswordError(`Неверный формат! Пароль должен содержать не менее 8 символов, 
      иметь хотя бы одну заглавную (A-Z) и строчную буквы (a-z), один номер и один спец. символ`);
    } else {
      setPasswordError('');
    }
  };

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    handleEmailValidation(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    handlePasswordValidation(event.target.value);
  };

  return (
    <form className={className}>
      <div className={styles.form__header_wrapper}>
        <h1 className={styles.form__header_login}>Вход</h1>
      </div>
      <BaseInputField
        name="e-mail"
        value={email}
        type="email"
        placeholder="Ваш e-mail*"
        onChange={handleChangeEmail}
        error={emailError}
      />
      <BaseInputField
        name="password"
        value={password}
        type="password"
        placeholder="Ваш пароль*"
        onChange={handleChangePassword}
        error={passwordError}
      />

      <BaseButton textContent="Войти" />
      <div className={styles.form__register_wrapper}>
        <h1 className={styles.form__header_register}>Не регистрировались?</h1>
        <Link to="/registrate">
          <BaseButton textContent="Регистрация" />
        </Link>
      </div>
    </form>
  );
}
