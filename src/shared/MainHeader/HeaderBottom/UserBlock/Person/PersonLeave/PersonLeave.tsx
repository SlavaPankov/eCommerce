import React, { MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import styles from '../PersonEnter/personEnter.scss';

export function PersonLeave() {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className={styles.content}>
      <div className={styles.line}>
        <Link to="/person">Личный кабинет</Link>
      </div>
      <div className={styles.line_bottom}>
        <Link onClick={handleClick} className={styles.link} to="/logout">
          Выйти
        </Link>
      </div>
    </div>
  );
}
