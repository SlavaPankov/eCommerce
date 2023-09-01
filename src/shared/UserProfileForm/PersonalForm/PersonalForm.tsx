import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import styles from '../userProfileForm.scss';
import { BaseInputField } from '../../BaseInputField';
import { EFieldsNames } from '../../../types/enums/EFieldsNames';
import { EditIcon, ElephantIcon } from '../../Icons';
import { IFormData } from '../../../types/interfaces/IFormData';
import { EErrorText } from '../../../types/enums/EErrorText';
import { emailRegex, passwordRegex, textRegex } from '../../../utils/validationRegex';
import { calculateAge } from '../../../utils/calculateAge';
import { updateMeRequestAsync } from '../../../store/user/userSlice';
import { EUserActionTypes } from '../../../types/enums/EUserActionTypes';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { Modal } from '../../Modal';
import { IUser } from '../../../types/interfaces/IUser';
import { BaseButton } from '../../BaseButton';

interface IPersonalFormProps {
  user: IUser;
  loading: boolean;
}

export function PersonalForm({ user, loading }: IPersonalFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(true);
  const [isUpdateSuccessfully, setIsUpdateSuccessfully] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!user.id) {
      return;
    }

    const userInfo = Object.fromEntries(
      Object.entries(user).filter(
        (item) => typeof item[1] === 'string' || typeof item[1] === 'number'
      )
    );

    setFormData({
      ...formData,
      ...userInfo
    });
  }, [user]);

  const openModalOnSuccess = (payload: { type: string }) => {
    setIsModalOpen(true);

    if (payload.type.includes('rejected')) {
      setIsUpdateSuccessfully(false);
      return;
    }

    setIsFormDisabled(true);
    setIsUpdateSuccessfully(true);
    setTimeout(() => {
      setIsModalOpen(false);
    }, 1500);
  };

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const actions: Array<MyCustomerUpdateAction> = [];

    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case EFieldsNames.firstName:
          actions.push({
            action: EUserActionTypes.setFirstName,
            firstName: value as string
          });
          break;
        case EFieldsNames.lastName:
          actions.push({
            action: EUserActionTypes.setLastName,
            lastName: value as string
          });
          break;
        case EFieldsNames.birthDate:
          actions.push({
            action: EUserActionTypes.setDateOfBirth,
            dateOfBirth: value as string
          });
          break;
        case EFieldsNames.email:
          actions.push({
            action: EUserActionTypes.changeEmail,
            email: value as string
          });
          break;
        default:
          break;
      }
    });

    dispatch(
      updateMeRequestAsync({
        version: user.version,
        actions
      })
    ).then((payload) => openModalOnSuccess(payload));
  };

  return (
    <>
      <div className={styles.head}>
        <h2 className={styles.form__subtitle}>Информация о пользователе</h2>
        {!loading && (
          <div className={styles.head_edit} onClick={() => setIsFormDisabled(false)}>
            <EditIcon />
          </div>
        )}
      </div>
      {!loading ? (
        <form className={styles.form} onSubmit={handleSubmit}>
          <fieldset className={styles.fieldset} disabled={isFormDisabled}>
            <div className={styles.form__input_wrapper}>
              <BaseInputField
                isRequired={true}
                name={EFieldsNames.firstName}
                value={formData[EFieldsNames.firstName] || ''}
                type="text"
                placeholder="Ваше имя*"
                onChange={handleChange}
                error={formError.firstName}
                label="Имя"
              />
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
                label="Фамилия"
              />
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
                label="Дата рождения"
              />
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
                label="E-mail"
              />
            </div>
          </fieldset>
          {!isFormDisabled && <BaseButton textContent="Сохранить" />}
        </form>
      ) : (
        <div className={styles.skeleton_wrapper}>
          <div className={styles.skeleton_item}></div>
          <div className={styles.skeleton_item}></div>
          <div className={styles.skeleton_item}></div>
          <div className={styles.skeleton_item}></div>
        </div>
      )}
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
    </>
  );
}
