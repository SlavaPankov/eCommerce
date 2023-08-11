import { Link } from 'react-router-dom';
import React, { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './loginForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseTextInputField';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const className = classNames('container', {
    [`${styles.form}`]: true
  });

  const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
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
      />
      <BaseInputField
        name="password"
        value={password}
        type="password"
        placeholder="Ваш пароль*"
        onChange={handleChangePassword}
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
