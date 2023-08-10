import React from 'react';
import classNames from 'classnames';
import styles from './socialsList.scss';
import { FacebookIcon, InstagramIcon, VkIcon } from '../Icons';

export function SocialsList() {
  const className = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={className}>
      <li>
        <a className={styles.link} href="#">
          <span>
            <FacebookIcon />
          </span>
        </a>
      </li>
      <li>
        <a className={styles.link} href="#">
          <span>
            <VkIcon />
          </span>
        </a>
      </li>
      <li>
        <a className={styles.link} href="#">
          <span>
            <InstagramIcon />
          </span>
        </a>
      </li>
    </ul>
  );
}
