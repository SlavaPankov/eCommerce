import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { BaseAddress } from '@commercetools/platform-sdk';
import styles from './registrationForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseInputField';
import { EErrorText } from '../../types/enums/EErrorText';
import { textRegex, emailRegex, passwordRegex } from '../../utils/validationRegex';
import { RegistrationAddress } from './RagistrationAddress';

interface IFormData {
  [k: string]: string;
}

enum EFieldsNames {
  firstName = 'firstName',
  lastName = 'lastName',
  birthDate = 'birthDate',
  email = 'email',
  password = 'password',
  passwordConfirmed = 'passwordConfirmed'
}

interface ICustomerDraft {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  password: string;
  addresses: Array<BaseAddress>;
  shippingAddresses: Array<number>;
  billingAddresses: Array<number>;
  defaultShippingAddress?: number;
  defaultBillingAddress?: number;
}

export function RegistrationForm() {
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [addressCount, setAddressCount] = useState<number>(1);
  const [renderAddress, setRenderAddress] = useState<Array<number>>([1]);
  const [globalFormError, setGlobalFormError] = useState<string>('');

  function isFormValid() {
    let flag = true;

    document.querySelectorAll<HTMLInputElement>('[data-required="true"]').forEach((item) => {
      if (item.value === '') {
        flag = false;
      }
    });

    return flag;
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ ...formError, [event.target.name]: '' });
    setGlobalFormError('');

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

    if (event.currentTarget.name === EFieldsNames.birthDate) {
      const birthDate = new Date(event.currentTarget.value);
      const currentDate = new Date();

      if (Number.isNaN(birthDate.getTime())) {
        setFormError({
          ...formError,
          [event.currentTarget.name]: EErrorText.dateInvalid
        });
      }

      if (currentDate.getFullYear() - birthDate.getFullYear() < 13) {
        setFormError({
          ...formError,
          [event.currentTarget.name]: EErrorText.dateToYoung
        });
      }

      if (birthDate > currentDate) {
        setFormError({
          ...formError,
          [event.currentTarget.name]: EErrorText.dateOutOfLimit
        });
      }
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();

    if (!isFormValid()) {
      const tempError: { [k: string]: string } = {};
      document.querySelectorAll<HTMLInputElement>('[data-required="true"]').forEach((item) => {
        if (item.value === '') {
          tempError[item.name] = EErrorText.requiredField;
        }
      });
      setFormError({
        ...formError,
        ...tempError
      });
      setGlobalFormError('Заполните все обязательные поля');
      return;
    }

    const data = new FormData(event.currentTarget);
    const dataObject: { [p: string]: FormDataEntryValue } = Object.fromEntries(data.entries());
    const tempAddresses: Array<{ [k: string]: string }> = [];

    renderAddress.forEach((item, index) => {
      tempAddresses.push(
        Object.fromEntries(
          Object.entries(dataObject)
            .filter(([key]) => key.includes(index.toString()))
            .map(([key, value]) => [key.split('_')[0], value.toString()])
        )
      );
    });

    const customerDraft: ICustomerDraft = {
      email: dataObject.email.toString(),
      firstName: dataObject.firstName.toString(),
      lastName: dataObject.lastName.toString(),
      dateOfBirth: dataObject.birthDate.toString(),
      password: dataObject.password.toString(),
      addresses: [],
      shippingAddresses: [],
      billingAddresses: []
    };

    tempAddresses.forEach((item) => {
      if (item.typeShipping) {
        customerDraft.shippingAddresses?.push(+item.typeShipping);
      }

      if (item.typeBilling) {
        customerDraft.billingAddresses?.push(+item.typeBilling);
      }

      if (item.deafultShipping) {
        customerDraft.defaultBillingAddress = +item.deafultShipping;
      }

      if (item.deafultBilling) {
        customerDraft.defaultBillingAddress = +item.deafultBilling;
      }

      customerDraft.addresses?.push({
        country: item.country,
        postalCode: item.postalCode,
        region: item.region,
        city: item.city,
        streetName: item.streetName,
        building: item.building,
        apartment: item.apartment
      });
    });

    console.log(customerDraft);
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
          isRequired={true}
          name={EFieldsNames.firstName}
          value={formData.firstName || ''}
          type="text"
          placeholder="Ваше имя*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.firstName}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.lastName}
          value={formData.lastName || ''}
          type="text"
          placeholder="Ваша фамилия*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.lastName}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.birthDate}
          value={formData.birthDate || ''}
          type="text"
          placeholder="Дата рождения*"
          onChange={handleChange}
          onFocus={handleFocusBirthDate}
          onBlur={handleBlurRequired}
          error={formError.birthDate}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.email}
          value={formData.email || ''}
          type="email"
          placeholder="Ваш e-mail*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.email}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.password}
          value={formData.password || ''}
          type="password"
          placeholder="Придумайте пароль*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.password}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.passwordConfirmed}
          value={formData.passwordConfirmed || ''}
          type="password"
          placeholder="Повторите пароль*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError.passwordConfirmed}
        />
        <h2 className={styles.address_title}>Адреса</h2>
        {renderAddress.map((item, index) => (
          <RegistrationAddress
            formData={formData}
            formError={formError}
            setFormData={setFormData}
            setFormError={setFormError}
            index={index}
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
        {globalFormError ? <span className={styles.error}>{globalFormError}</span> : null}
        <BaseButton textContent="Зарегистрироваться" />
      </form>
    </section>
  );
}
