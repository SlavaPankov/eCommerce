import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import styles from '../userProfileForm.scss';
import { EditIcon } from '../../Icons';
import { BaseInputField } from '../../BaseInputField';
import { EFieldsNames } from '../../../types/enums/EFieldsNames';
import { BaseButton } from '../../BaseButton';
import { IFormData } from '../../../types/interfaces/IFormData';
import { validatePassword } from '../../../utils/validatePassword';
import { EErrorText } from '../../../types/enums/EErrorText';
import { changePasswordRequestAsync, userSignInRequestAsync } from '../../../store/user/userSlice';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { IUser } from '../../../types/interfaces/IUser';

interface IPasswordFormProps {
  user: IUser;
  error: string;
}

export function PasswordForm({ user, error }: IPasswordFormProps) {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [isPasswordFormDisabled, setIsPasswordFormDisabled] = useState<boolean>(true);
  const [globalError, setGlobalError] = useState<string>('');

  useEffect(() => {
    if (!error) {
      return;
    }

    if (error === 'InvalidCurrentPassword') {
      setGlobalError('Неверный текущий пароль');
    }
  }, [error]);

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setGlobalError('');

    if (
      event.target.name === EFieldsNames.password ||
      event.target.name === EFieldsNames.newPassword
    ) {
      setFormError({
        ...formError,
        [event.target.name]: validatePassword(event.target.value)
      });
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setFormError({
        ...formError,
        [event.currentTarget.name]: EErrorText.requiredField
      });
    }
  };

  const handleSubmitPassword = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget));

    const result = await dispatch(
      changePasswordRequestAsync({
        version: user.version,
        currentPassword: data[EFieldsNames.password] as string,
        newPassword: data[EFieldsNames.newPassword] as string
      })
    );

    if (!result.type.includes('reject')) {
      dispatch(
        userSignInRequestAsync({
          email: user.email,
          password: data[EFieldsNames.newPassword] as string
        })
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmitPassword}>
      <div className={styles.head}>
        <h2 className={styles.form__subtitle}>Сменить пароль</h2>
        <div className={styles.head_edit} onClick={() => setIsPasswordFormDisabled(false)}>
          <EditIcon />
        </div>
      </div>
      <fieldset className={styles.fieldset} disabled={isPasswordFormDisabled}>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.password}
            value={formData[EFieldsNames.password] || ''}
            type="password"
            placeholder="Текущий пароль*"
            onChange={handleChangePassword}
            error={formError.password}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.newPassword}
            value={formData[EFieldsNames.newPassword] || ''}
            type="password"
            placeholder="Новый пароль*"
            onChange={handleChangePassword}
            error={formError.newPassword}
            onBlur={handleBlur}
          />
        </div>
        {globalError && <span className={styles.globalError}>{globalError}</span>}
        {!isPasswordFormDisabled && <BaseButton textContent="Обновить пароль" />}
      </fieldset>
    </form>
  );
}
