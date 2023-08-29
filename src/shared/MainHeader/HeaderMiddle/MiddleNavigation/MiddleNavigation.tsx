import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import styles from './middleNavigation.scss';
import { ERoutes } from '../../../../types/enums/ERoutes';

export function MiddleNavigation() {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <nav className={styles.nav}>
      <ul className={listClassName}>
        <li>
          <Link className={styles.link} to={ERoutes.catalog}>
            <span>Каталог</span>
          </Link>
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
