import React from 'react';
import { Link } from 'react-router-dom';
import styles from './personEnter.scss';
import { ERoutes } from '../../../../../../types/enums/ERoutes';

export function PersonEnter() {
  return (
    <div className={styles.content}>
      <div className={styles.line}>Личный кабинет в SitDownPls</div>
      <div className={styles.line_bottom}>
        <Link className={styles.link} to={ERoutes.login}>
          Войти
        </Link>
        или
        <Link className={styles.link} to={ERoutes.registration}>
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
