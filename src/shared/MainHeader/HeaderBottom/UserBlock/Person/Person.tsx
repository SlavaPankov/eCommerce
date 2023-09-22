import React, { useEffect, useState } from 'react';
import { PersonIcon } from '../../../../Icons';
import styles from './person.scss';
import { BaseDropdown } from '../../../../BaseDropdown';
import { PersonEnter } from './PersonEnter';
import { useAppSelector } from '../../../../../hooks/storeHooks';
import { PersonLeave } from './PersonLeave';

export function Person() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const { id: userId } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!userId) {
      return;
    }

    setIsAuth('1');
  }, [userId]);

  return (
    <BaseDropdown
      withArrow={false}
      className={styles.dropdown}
      button={
        <div className={styles.link}>
          <span>
            <PersonIcon />
          </span>
        </div>
      }>
      {isAuth ? <PersonLeave /> : <PersonEnter />}
    </BaseDropdown>
  );
}
