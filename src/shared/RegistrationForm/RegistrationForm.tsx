import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import styles from './registrationForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseInputField';
import { EErrorText } from '../../types/enums/EErrorText';
import { textRegex, emailRegex, passwordRegex } from '../../utils/validationRegex';
import { RegistrationAddress } from './RagistrationAddress';

interface IFormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  email: string;
  password: string;
  passwordConfirmed: string;
}

enum EFieldsNames {
  firstName = 'firstName',
  lastName = 'lastName',
  birthDate = 'birthDate',
  email = 'email',
  password = 'password',
  passwordConfirmed = 'passwordConfirmed'
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<IFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    passwordConfirmed: ''
  });
  const [formError, setFormError] = useState<IFormData>({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
    passwordConfirmed: ''
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [addressCount, setAddressCount] = useState<number>(0);
  const [renderAddress, setRenderAddress] = useState<Array<number>>([]);

  function checkForm() {
    Object.values(formError).forEach((value) => {
      if (value) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    });
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ ...formError, [event.target.name]: '' });

    if (
      event.target.name === EFieldsNames.firstName ||
      event.target.name === EFieldsNames.lastName
    ) {
      if (event.target.value.length > 15) {
        setFormError({ ...formError, [event.target.name]: EErrorText.maxLength15 });
      }
      if (event.target.value.length < 2) {
        setFormError({ ...formError, [event.target.name]: EErrorText.minLength2 });
      }
      if (event.target.value && !textRegex.test(event.target.value)) {
        setFormError({ ...formError, [event.target.name]: EErrorText.textFormat });
      }
    }

    if (event.target.name === EFieldsNames.birthDate) {
      const currentYear = new Date().getFullYear();
      const inputYear = new Date(event.target.value).getFullYear();
      if (currentYear - inputYear > 100 || currentYear - inputYear < 16) {
        setFormError({ ...formError, [event.target.name]: EErrorText.invalidAge });
      }
    }

    if (event.target.name === EFieldsNames.email) {
      if (event.target.value && !emailRegex.test(event.target.value)) {
        setFormError({ ...formError, [event.target.name]: EErrorText.emailFormat });
      }
    }

    if (event.target.name === EFieldsNames.password) {
      if (event.target.value && !passwordRegex.test(event.target.value)) {
        setFormError({ ...formError, [event.target.name]: EErrorText.passwordFormat });
      }
    }

    if (event.target.name === EFieldsNames.passwordConfirmed) {
      if (event.target.value && event.target.value !== formData.password) {
        setFormError({ ...formError, [event.target.name]: EErrorText.passwordMatch });
      }
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
    checkForm();
  };

  const handleFocusBirthDate = (event: FormEvent<HTMLInputElement>) => {
    // eslint-disable-next-line no-param-reassign
    event.currentTarget.type = 'date';
  };

  const handleBlurRequired = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: EErrorText.requiredField
      });
    }
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: ''
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    const data = new FormData(event.currentTarget);

    console.log([...data]);
  };

  const handleClickAddAddress = () => {
    if (addressCount >= 3) {
      return;
    }

    setRenderAddress([...renderAddress, addressCount]);
    setAddressCount(addressCount + 1);
  };

  const formClassName = classNames('container', {
    [`${styles.form}`]: true
  });

  return (
    <section>
      <form className={formClassName} onSubmit={handleSubmit}>
        <h1 className={styles.form__header}>Регистрация</h1>
        <span className={styles.form__text}>
          Зарегистрируйтесь, чтобы получать специальные предложения. <br />
          Если вы уже зарегистрированы, <Link to="/login">авторизуйтесь</Link>.
        </span>
        <BaseInputField
          name={EFieldsNames.firstName}
          value={formData.firstName}
          type="text"
          placeholder="Ваше имя"
          onChange={handleChange}
          onBlur={handleBlur}
          error={formError.firstName}
        />
        <BaseInputField
          name={EFieldsNames.lastName}
          value={formData.lastName}
          type="text"
          placeholder="Ваша фамилия"
          onChange={handleChange}
          onBlur={handleBlur}
          error={formError.lastName}
        />
        <BaseInputField
          name={EFieldsNames.birthDate}
          value={formData.birthDate}
          type="text"
          placeholder="Дата рождения"
          onChange={handleChange}
          onFocus={handleFocusBirthDate}
          onBlur={handleBlur}
          error={formError.birthDate}
        />
        <BaseInputField
          name={EFieldsNames.email}
          value={formData.email}
          type="email"
          placeholder="Ваш e-mail*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.email}
        />
        <BaseInputField
          name={EFieldsNames.password}
          value={formData.password}
          type="password"
          placeholder="Придумайте пароль*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.password}
        />
        <BaseInputField
          name={EFieldsNames.passwordConfirmed}
          value={formData.passwordConfirmed}
          type="password"
          placeholder="Повторите пароль*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.passwordConfirmed}
        />
        <h2 className={styles.address_title}>Адреса</h2>
        {renderAddress.map((item, index) => (
          <RegistrationAddress
            addressCount={addressCount}
            setAddressCount={setAddressCount}
            key={index}
          />
        ))}
        {addressCount < 3 ? (
          <div className={styles.addAddress} onClick={handleClickAddAddress}>
            Добавить адрес
          </div>
        ) : null}
        <BaseButton textContent="Зарегистрироваться" isDisabled={disabled} />
      </form>
    </section>
  );
}
