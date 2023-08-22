import React from 'react';
import classNames from 'classnames';
import styles from './topNavigation.scss';

export function TopNavigation() {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <nav className={styles.nav}>
      <ul className={listClassName}>
        <li>
          <a className={styles.link} href="#">
            <span>О компании</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Гарантия и возврат</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Корпоративным клиентам</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Дизайн-решение</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
