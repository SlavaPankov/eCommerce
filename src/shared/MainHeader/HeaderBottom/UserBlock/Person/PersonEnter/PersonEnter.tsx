import React from 'react';
import { Link } from 'react-router-dom';
import styles from './personEnter.scss';

export function PersonEnter() {
  return (
    <div className={styles.content}>
      <div className={styles.line}>Личный кабинет в SitDownPls</div>
      <div className={styles.line_bottom}>
        <Link className={styles.link} to="/login">
          Войти
        </Link>
        или
        <Link className={styles.link} to="/registrate">
          Зарегистрироваться
        </Link>
      </div>
    </div>
  );
}
