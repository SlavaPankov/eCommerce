import React from 'react';
import styles from './phoneLink.scss';
import { PhoneIcon } from '../../../Icons';

export function PhoneLink() {
  return (
    <a className={styles.phone} href="tel:+74958854547">
      <PhoneIcon />
      <span>+7 (495) 885-45-47</span>
    </a>
  );
}
