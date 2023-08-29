import React, { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './userProfileForm.scss';
import { BaseInputField } from '../BaseInputField';
import { IFormData } from '../../types/interfaces/IFormData';
import { EFieldsNames } from '../../types/enums/EFieldsNames';
import { EErrorText } from '../../types/enums/EErrorText';
import { emailRegex, passwordRegex, textRegex } from '../../utils/validationRegex';
import { Modal } from '../Modal';
import { ConfirmIcon, EditIcon, ElephantIcon } from '../Icons';
import { calculateAge } from '../../utils/calculateAge';
import { useUserData } from '../../hooks/useUserData';
import { RegistrationAddress } from '../RegistrationForm/RagistrationAddress';
import { BaseButton } from '../BaseButton';

interface IEditableInput {
  [k: string]: boolean;
}

export function UserProfileForm() {
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [isFormEditable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditClicked] = useState<IEditableInput>({});
  const [isUpdateSuccessfully] = useState<boolean>(true);
  const { user } = useUserData();

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const addresses = user.addresses
      .map((address, index) =>
        Object.entries(address).map(([key, value]) => ({ [`${key}_${index}`]: value }))
      )
      .flat();

    const addressObject = addresses.reduce((obj, value) => Object.assign(obj, value), {});
    const userInfo = Object.fromEntries(
      Object.entries(user).filter(
        (item) => typeof item[1] === 'string' || typeof item[1] === 'number'
      )
    );

    setFormData({
      ...formData,
      ...userInfo,
      ...addressObject
    });
  }, [user]);

  const formClassName = classNames('container', {
    [`${styles.form}`]: true
  });

  const editIconClassName = classNames({
    [`${styles.edit_icon}`]: true,
    [`${styles.edit_icon_active}`]: isEditClicked
  });

  const validateInput = (element: HTMLInputElement) => {
    setFormError({ ...formError, [element.name]: '' });

    if (element.name === EFieldsNames.firstName || element.name === EFieldsNames.lastName) {
      if (element.value.length > 15) {
        setFormError({ ...formError, [element.name]: EErrorText.maxLength15 });
      }
      if (element.value.length < 1) {
        setFormError({ ...formError, [element.name]: EErrorText.minLength1 });
      }
      if (element.value && !textRegex.test(element.value)) {
        setFormError({ ...formError, [element.name]: EErrorText.textFormat });
      }
    }

    if (element.name === EFieldsNames.email) {
      if (element.value && !emailRegex.test(element.value)) {
        setFormError({ ...formError, [element.name]: EErrorText.emailFormat });
      }
    }

    if (element.name === EFieldsNames.birthDate) {
      try {
        const birthDate = new Date(element.value);
        const currentDate = new Date();

        if (Number.isNaN(birthDate.getTime())) {
          setFormError({
            ...formError,
            [element.name]: EErrorText.dateInvalid
          });
        }

        if (calculateAge(element.value) < 13) {
          setFormError({
            ...formError,
            [element.name]: EErrorText.dateToYoung
          });
        }

        if (birthDate > currentDate) {
          setFormError({
            ...formError,
            [element.name]: EErrorText.dateOutOfLimit
          });
        }
      } catch {
        setFormError({
          ...formError,
          [element.name]: EErrorText.dateInvalid
        });
      }
    }

    if (element.name === EFieldsNames.password || element.name === EFieldsNames.newPassword) {
      if (element.value && !passwordRegex.test(element.value)) {
        setFormError({ ...formError, [element.name]: EErrorText.passwordFormat });
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    validateInput(event.target);
    setFormData({ ...formData, [event?.target.name]: event.target.value });
  };

  const handleEditClick = (fieldName: string) => {
    console.log(fieldName);
  };

  return (
    <section>
      <form className={formClassName}>
        <h1 className={styles.form__header}>Личный кабинет</h1>
        <h2 className={styles.form__subtitle}>Информация о пользователе</h2>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.firstName}
            value={formData[EFieldsNames.firstName] || ''}
            type="text"
            placeholder="Ваше имя*"
            onChange={handleChange}
            error={formError.firstName}
            isDisabled={!isEditClicked[EFieldsNames.firstName] || false}
            label="Имя"
          />
          <div className={editIconClassName} onClick={() => handleEditClick('firstName')}>
            {isEditClicked[EFieldsNames.firstName] && !formError[EFieldsNames.firstName] ? (
              <ConfirmIcon />
            ) : (
              !formError[EFieldsNames.firstName] && <EditIcon />
            )}
          </div>
        </div>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.lastName}
            value={formData[EFieldsNames.lastName] || ''}
            type="text"
            placeholder="Ваша фамилия*"
            onChange={handleChange}
            error={formError.lastName}
            isDisabled={!isEditClicked[EFieldsNames.lastName] || false}
            label="Фамилия"
          />
          <div className={editIconClassName} onClick={() => handleEditClick('lastName')}>
            {isEditClicked[EFieldsNames.lastName] && !formError[EFieldsNames.lastName] ? (
              <ConfirmIcon />
            ) : (
              !formError[EFieldsNames.lastName] && <EditIcon />
            )}
          </div>
        </div>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.birthDate}
            value={formData[EFieldsNames.birthDate] || ''}
            type="date"
            placeholder="Дата рождения*"
            onChange={handleChange}
            error={formError.dateOfBirth}
            isDisabled={!isEditClicked[EFieldsNames.birthDate] || false}
            label="Дата рождения"
          />
          <div className={editIconClassName} onClick={() => handleEditClick('dateOfBirth')}>
            {isEditClicked[EFieldsNames.birthDate] && !formError[EFieldsNames.birthDate] ? (
              <ConfirmIcon />
            ) : (
              !formError[EFieldsNames.birthDate] && <EditIcon />
            )}
          </div>
        </div>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.email}
            value={formData[EFieldsNames.email] || ''}
            type="text"
            placeholder="Ваш e-mail*"
            onChange={handleChange}
            error={formError.email}
            isDisabled={!isEditClicked[EFieldsNames.email] || false}
            label="E-mail"
          />
          <div className={editIconClassName} onClick={() => handleEditClick('email')}>
            {isEditClicked[EFieldsNames.email] && !formError[EFieldsNames.email] ? (
              <ConfirmIcon />
            ) : (
              !formError[EFieldsNames.email] && <EditIcon />
            )}
          </div>
        </div>
        <h2 className={styles.form__subtitle}>Смена пароля</h2>
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.password}
          value={formData[EFieldsNames.password] || ''}
          type="password"
          placeholder="Ваш текущий пароль*"
          onChange={handleChange}
          error={formError.password}
        />
        <BaseInputField
          isRequired={true}
          name={EFieldsNames.newPassword}
          value={formData[EFieldsNames.newPassword] || ''}
          type="password"
          placeholder="Новый пароль*"
          onChange={handleChange}
          error={formError.newPassword}
        />
        <BaseButton textContent="Обновить пароль" />
        <h2 className={styles.form__subtitle}>Адреса</h2>
        {user.addresses.map((address, index) => {
          return (
            <RegistrationAddress
              key={address.id}
              formData={formData}
              setFormData={setFormData}
              formError={formError}
              setFormError={setFormError}
              addressCount={3}
              setAddressCount={() => {}}
              index={index}
              isShipping={user.shippingAddressIds.includes(address.id || '')}
              isBilling={user.billingAddressIds.includes(address.id || '')}
              isDefaultShipping={user.defaultShippingAddressId === address.id}
              isDefaultBilling={user.defaultBillingAddressId === address.id}
              isEditable={isFormEditable}
            />
          );
        })}
      </form>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <article className={styles.modal}>
            <ElephantIcon />
            {isUpdateSuccessfully ? (
              <h4 className={styles.modal_heading}>Ваши данные обновлены</h4>
            ) : (
              <h4 className={styles.modal_heading}>Произошла ошибка. Попробуйте позже</h4>
            )}
            <h4 className={styles.modal_heading}></h4>
          </article>
        </Modal>
      )}
    </section>
  );
}
