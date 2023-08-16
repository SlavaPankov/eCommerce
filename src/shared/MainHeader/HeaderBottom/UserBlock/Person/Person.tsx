import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PersonIcon } from '../../../../Icons';
import styles from './person.scss';
import { BaseDropdown } from '../../../../BaseDropdown';
import { PersonEnter } from './PersonEnter';
import { useAppSelector } from '../../../../../hooks/storeHooks';

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
    <>
      {isAuth ? (
        <Link className={styles.link} to="/person">
          <span>
            <PersonIcon />
          </span>
        </Link>
      ) : (
        <BaseDropdown
          className={styles.dropdown}
          button={
            <div className={styles.link}>
              <span>
                <PersonIcon />
              </span>
            </div>
          }>
          <PersonEnter />
        </BaseDropdown>
      )}
    </>
  );
}
