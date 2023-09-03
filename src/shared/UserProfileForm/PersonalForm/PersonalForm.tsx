import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import styles from '../userProfileForm.scss';
import { BaseInputField } from '../../BaseInputField';
import { EFieldsNames } from '../../../types/enums/EFieldsNames';
import { EditIcon, ElephantIcon } from '../../Icons';
import { IFormData } from '../../../types/interfaces/IFormData';
import { EErrorText } from '../../../types/enums/EErrorText';
import { emailRegex, textRegex } from '../../../utils/validationRegex';
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
  const [globalFormError, setGlobalFormError] = useState<string>('');

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

  function isFormValid(form: HTMLFormElement) {
    let flag = true;

    for (
      let i = 0;
      i < form.querySelectorAll<HTMLInputElement>('[data-required="true"]').length;
      i += 1
    ) {
      const item = form.querySelectorAll<HTMLInputElement>('[data-required="true"]')[i];
      flag = item.value !== '';

      if (!flag) {
        return flag;
      }
    }

    Object.values(formError).forEach((errorValue) => {
      flag = !errorValue;
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
      if (event.target.value.length < 1) {
        setFormError({ ...formError, [event.target.name]: EErrorText.minLength1 });
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

    if (event.target.name === EFieldsNames.birthDate) {
      try {
        const birthDate = new Date(event.target.value);
        const currentDate = new Date();

        if (Number.isNaN(birthDate.getTime())) {
          setFormError({
            ...formError,
            [event.target.name]: EErrorText.dateInvalid
          });
        }

        if (calculateAge(event.target.value) < 13) {
          setFormError({
            ...formError,
            [event.target.name]: EErrorText.dateToYoung
          });
        }

        if (birthDate > currentDate) {
          setFormError({
            ...formError,
            [event.target.name]: EErrorText.dateOutOfLimit
          });
        }
      } catch {
        setFormError({
          ...formError,
          [event.target.name]: EErrorText.dateInvalid
        });
      }
    }

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleBlurRequired = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: EErrorText.requiredField
      });
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isFormValid(event.currentTarget)) {
      const tempError: IFormData = {};
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
                onBlur={handleBlurRequired}
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
                onBlur={handleBlurRequired}
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
                onBlur={handleBlurRequired}
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
                onBlur={handleBlurRequired}
                error={formError.email}
                label="E-mail"
              />
            </div>
          </fieldset>
          {globalFormError ? <span className={styles.error}>{globalFormError}</span> : null}
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
