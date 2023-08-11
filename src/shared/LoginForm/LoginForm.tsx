import { Link } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './loginForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseTextInputField';
import EyeIcon from '../Icons/EyeIcon/EyeIcon';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEyeClicked, setIsEyeClicked] = useState(false);

  const containerClassName = classNames('container', {
    [`${styles.form}`]: true
  });

  const eyeIconClassName = classNames({
    [`${styles.eye_icon}`]: true,
    [`${styles.eye_icon_active}`]: isEyeClicked
  });

  const handleEmailValidation = (input: string) => {
    const emailTrimmed = input.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      setEmailError('Введите e-mail');
    } else if (!emailRegex.test(emailTrimmed)) {
      setEmailError('Недопустимый формат!');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordValidation = (input: string) => {
    const passwordTrimmed = input.trim();
    const pwdRegex = /^(?=\S*?[A-ZА-Я])(?=\S*?[a-zа-я])(?=\S*?\d)(?=\S*?[!@#$%^&*])\S{8,30}$/;
    if (!passwordTrimmed) {
      setPasswordError('Введите пароль');
    } else if (!pwdRegex.test(passwordTrimmed)) {
      setPasswordError(`Недопустимый формат! Пароль должен содержать 8-30 символов, 
      иметь хотя бы одну заглавную и строчную буквы, один номер и один спец. символ`);
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

  const handleEyeClick = () => {
    setIsEyeClicked(!isEyeClicked);
  };

  return (
    <form className={containerClassName}>
      <div className={styles.form__header_wrapper}>
        <h1 className={styles.form__header_login}>Вход</h1>
      </div>
      <div className={styles.form__input_wrapper}>
        <BaseInputField
          name="e-mail"
          value={email}
          type="email"
          placeholder="Ваш e-mail*"
          onChange={handleChangeEmail}
          error={emailError}
        />
        <div className={styles.form__password_wrapper}>
          <BaseInputField
            name="password"
            value={password}
            type={isEyeClicked ? 'text' : 'password'}
            placeholder="Ваш пароль*"
            onChange={handleChangePassword}
            error={passwordError}
          />
          <div className={eyeIconClassName} onClick={handleEyeClick}>
            <EyeIcon />
          </div>
        </div>
      </div>

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
