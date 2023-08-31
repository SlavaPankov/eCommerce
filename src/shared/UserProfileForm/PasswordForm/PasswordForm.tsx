import React, { ChangeEvent, FormEvent, useState } from 'react';
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
}

export function PasswordForm({ user }: IPasswordFormProps) {
  const dispatch = useAppDispatch();
  const [passwordFormData, setPasswordFormData] = useState<IFormData>({});
  const [passwordFormError, setPasswordFormError] = useState<IFormData>({});
  const [isPasswordFormDisabled, setIsPasswordFormDisabled] = useState<boolean>(true);

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    if (
      event.target.name === EFieldsNames.password ||
      event.target.name === EFieldsNames.newPassword
    ) {
      setPasswordFormError({
        ...passwordFormError,
        [event.target.name]: validatePassword(event.target.value)
      });
    }

    setPasswordFormData({
      ...passwordFormData,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value === '') {
      setPasswordFormError({
        ...passwordFormError,
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
            value={passwordFormData[EFieldsNames.password] || ''}
            type="password"
            placeholder="Текущий пароль*"
            onChange={handleChangePassword}
            error={passwordFormError.password}
            onBlur={handleBlur}
          />
        </div>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            isRequired={true}
            name={EFieldsNames.newPassword}
            value={passwordFormData[EFieldsNames.newPassword] || ''}
            type="password"
            placeholder="Новый пароль*"
            onChange={handleChangePassword}
            error={passwordFormError.newPassword}
            onBlur={handleBlur}
          />
        </div>
        {!isPasswordFormDisabled && <BaseButton textContent="Обновить пароль" />}
      </fieldset>
    </form>
  );
}
