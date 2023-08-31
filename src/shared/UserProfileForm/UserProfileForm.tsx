import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './userProfileForm.scss';
import { useUserData } from '../../hooks/useUserData';
import { useAppDispatch } from '../../hooks/storeHooks';
import { addAddress } from '../../store/user/userSlice';
import { UserAddressForm } from './UserAddressForm';
import { PersonalForm } from './PersonalForm';
import { PasswordForm } from './PasswordForm';

export function UserProfileForm() {
  const dispatch = useAppDispatch();
  const [addressId, setAddressId] = useState<number>(0);
  const { user, error } = useUserData();

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  const handleClickAddAddress = () => {
    setAddressId(addressId + 1);
  };

  useEffect(() => {
    if (addressId === 0) {
      return;
    }

    dispatch(addAddress(`${addressId}`));
  }, [addressId]);

  return (
    <section>
      <div className={containerClassName}>
        <PersonalForm user={user} />
        <PasswordForm user={user} error={error} />
        <h2 className={styles.form__subtitle}>Адреса</h2>
        {user.addresses.map((address, index) => {
          return <UserAddressForm key={index} addressId={address.id || ''} user={user} />;
        })}
        <div className={styles.addAddress} onClick={handleClickAddAddress}>
          +Добавить адрес
        </div>
      </div>
    </section>
  );
}
