import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import styles from '../userProfileForm.scss';
import { BaseInputField } from '../../BaseInputField';
import { EFieldsNames } from '../../../types/enums/EFieldsNames';
import { EditIcon, ElephantIcon } from '../../Icons';
import { IFormData } from '../../../types/interfaces/IFormData';
import { EErrorText } from '../../../types/enums/EErrorText';
import { updateMeRequestAsync } from '../../../store/user/userSlice';
import { EUserActionTypes } from '../../../types/enums/EUserActionTypes';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { Modal } from '../../Modal';
import { IUser } from '../../../types/interfaces/IUser';
import { BaseButton } from '../../BaseButton';
import { isFormValid } from '../../../utils/isFormValid';
import { getGlobalError } from '../../../utils/getGlobalError';
import { checkName } from '../../../utils/checkName';
import { checkEmail } from '../../../utils/checkEmail';
import { checkDateOfBirth } from '../../../utils/checkDateOfBirth';

interface IPersonalFormProps {
  user: IUser;
  loading: boolean;
}

export function PersonalForm({ user, loading }: IPersonalFormProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLFormElement>(null);
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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ ...formError, [event.target.name]: '' });
    setGlobalFormError('');

    if (
      event.target.name === EFieldsNames.firstName ||
      event.target.name === EFieldsNames.lastName
    ) {
      setFormError({ ...formError, [event.target.name]: checkName(event.target.value) });
    }

    if (event.target.name === EFieldsNames.email) {
      setFormError({ ...formError, [event.target.name]: checkEmail(event.target.value) });
    }

    if (event.target.name === EFieldsNames.birthDate) {
      setFormError({
        ...formError,
        [event.target.name]: checkDateOfBirth(event.target.value)
      });
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

    if (!isFormValid(ref, formError)) {
      const { tempError, globalError } = getGlobalError(ref);
      setFormError({
        ...formError,
        ...tempError
      });
      setGlobalFormError(globalError);
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
        <form ref={ref} className={styles.form} onSubmit={handleSubmit}>
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
          {globalFormError && <span className={styles.global_error}>{globalFormError}</span>}
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
