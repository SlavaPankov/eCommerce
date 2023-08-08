import React from 'react';
import { Person } from './Person';
import { Cart } from './Cart';
import styles from './userBlock.scss';

export function UserBlock() {
  return (
    <div className={styles.block}>
      <Person />
      <Cart />
    </div>
  );
}
