import React, { MouseEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../PersonEnter/personEnter.scss';
import { ERoutes } from '../../../../../../types/enums/ERoutes';

export function PersonLeave() {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className={styles.content}>
      <div className={styles.line}>
        <Link to={ERoutes.person}>Личный кабинет</Link>
      </div>
      <div className={styles.line_bottom}>
        <Link onClick={handleClick} className={styles.link} to="/logout">
          Выйти
        </Link>
      </div>
    </div>
  );
}
