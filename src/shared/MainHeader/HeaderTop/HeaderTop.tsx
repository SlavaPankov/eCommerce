import React from 'react';
import classNames from 'classnames';
import { PhoneLink } from './PhoneLink';
import { RegionDropdown } from './RegionDropdown';
import styles from './headerTop.scss';

export function HeaderTop() {
  const containerClassName = classNames({
    [`${styles.top}`]: true
  });

  return (
    <div className={styles.top}>
      <div className={containerClassName}>
        <RegionDropdown />
        <PhoneLink />
        <nav>
          <ul>
            <li>
              <a href="#">
                <span>О компании</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Гарантия и возврат</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Корпоративным клиентам</span>
              </a>
            </li>
            <li>
              <a href="#">
                <span>Дизайн-решение</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
