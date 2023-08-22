import React from 'react';
import classNames from 'classnames';
import styles from './middleNavigation.scss';

export function MiddleNavigation() {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <nav className={styles.nav}>
      <ul className={listClassName}>
        <li>
          <a className={styles.link} href="#">
            <span>Каталог</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Магазины</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Шоу-рум</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Доставка и оплата</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Дисконт</span>
          </a>
        </li>
        <li>
          <a className={styles.link} href="#">
            <span>Контакты</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
