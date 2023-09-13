import React from 'react';
import { Person } from './Person';
import { HeaderCart } from './Cart';
import styles from './userBlock.scss';

export function UserBlock() {
  return (
    <div className={styles.block}>
      <Person />
      <HeaderCart />
    </div>
  );
}
