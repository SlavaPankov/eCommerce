import React, { ChangeEvent, useState, FormEvent, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import styles from './loginForm.scss';
import { BaseButton } from '../BaseButton';
import { BaseInputField } from '../BaseInputField';
import EyeIcon from '../Icons/EyeIcon/EyeIcon';
import { EErrorText } from '../../types/enums/EErrorText';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { userSignInRequestAsync } from '../../store/user/userSlice';
import { setCartData } from '../../store/cart/cartSlice';
import { ERoutes } from '../../types/enums/ERoutes';
import { validatePassword } from '../../utils/validatePassword';
import { isFormValid } from '../../utils/isFormValid';
import { getGlobalError } from '../../utils/getGlobalError';
import { checkEmail } from '../../utils/checkEmail';

enum EFormFieldsNames {
  email = 'email',
  password = 'password'
}

interface IFormData {
  [k: string]: string;
}

interface ICustomerSignIn {
  email: string;
  password: string;
  anonymousCart: {
    typeId: string;
    id: string;
  };
}

export function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [isEyeClicked, setIsEyeClicked] = useState(false);
  const [globalFormError, setGlobalFormError] = useState<string>('');
  const { id: cartId } = useAppSelector((state) => state.cart.cart);
  const { loading, error: authError } = useAppSelector((state) => state.user);

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  const eyeIconClassName = classNames({
    [`${styles.eye_icon}`]: true,
    [`${styles.eye_icon_active}`]: isEyeClicked
  });

  useEffect(() => {
    if (!authError) {
      return;
    }

    setGlobalFormError('Неверный логин или пароль');
  }, [authError]);

  useEffect(() => {
    setGlobalFormError('');
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({
      ...formError,
      [event.target.name]: ''
    });

    if (event.target.name === EFormFieldsNames.email) {
      setFormError({
        ...formError,
        [event.target.name]: checkEmail(event.target.value)
      });
    }

    if (event.target.name === EFormFieldsNames.password) {
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

  const handleEyeClick = () => {
    setIsEyeClicked(!isEyeClicked);
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

    const data = new FormData(event.currentTarget);
    const dataObject: { [k: string]: FormDataEntryValue } = Object.fromEntries(data.entries());

    const userData: ICustomerSignIn = {
      email: dataObject[EFormFieldsNames.email].toString(),
      password: dataObject[EFormFieldsNames.password].toString(),
      anonymousCart: {
        typeId: 'cart',
        id: cartId
      }
    };

    dispatch(userSignInRequestAsync(userData))
      .unwrap()
      .then((action) => {
        if (!action?.customer) {
          return;
        }

        if (action.cart) {
          dispatch(setCartData(action.cart));
        }

        localStorage.setItem('isAuth', '1');
        navigate('/');
      });
  };

  return (
    <section className={containerClassName}>
      <form ref={ref} className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.form__header_login}>Вход</h1>
        <div className={styles.form__input_wrapper}>
          <BaseInputField
            name={EFormFieldsNames.email}
            value={formData[EFormFieldsNames.email] || ''}
            type="text"
            placeholder="Ваш e-mail*"
            onChange={handleChange}
            onBlur={handleBlur}
            error={formError[EFormFieldsNames.email]}
            isRequired={true}
          />
          <div className={styles.form__password_wrapper}>
            <BaseInputField
              name={EFormFieldsNames.password}
              value={formData[EFormFieldsNames.password] || ''}
              type={isEyeClicked ? 'text' : 'password'}
              placeholder="Ваш пароль*"
              onChange={handleChange}
              onBlur={handleBlur}
              error={formError[EFormFieldsNames.password]}
              isRequired={true}
            />
            <div className={eyeIconClassName} onClick={handleEyeClick}>
              <EyeIcon />
            </div>
          </div>
        </div>
        {globalFormError ? <span className={styles.error}>{globalFormError}</span> : null}
        <BaseButton textContent="Войти" isDisabled={loading} />
      </form>
      <div className={styles.form__register_wrapper}>
        <h1 className={styles.form__header_register}>Не регистрировались?</h1>
        <Link to={ERoutes.registration}>
          <BaseButton textContent="Регистрация" />
        </Link>
      </div>
    </section>
  );
}
