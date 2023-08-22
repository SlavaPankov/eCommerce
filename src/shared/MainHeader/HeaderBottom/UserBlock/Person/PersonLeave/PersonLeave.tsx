import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../PersonEnter/personEnter.scss';
import { ERoutes } from '../../../../../../types/enums/ERoutes';

export function PersonLeave() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.content}>
      <div className={styles.line}>
        <Link to={ERoutes.person}>Личный кабинет</Link>
      </div>
      <div className={styles.line_bottom}>
        <div>
          <Link className={styles.link} to={ERoutes.login}>
            Войти
          </Link>
          или
          <Link className={styles.link} to={ERoutes.registration}>
            Зарегистрироваться
          </Link>
        </div>
        <Link onClick={handleClick} className={styles.link} to="/logout">
          Выйти
        </Link>
      </div>
    </div>
  );
}
