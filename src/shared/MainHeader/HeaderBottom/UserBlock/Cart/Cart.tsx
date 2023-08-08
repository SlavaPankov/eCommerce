import React from 'react';
import { Link } from 'react-router-dom';
import { CartIcon } from '../../../../Icons';
import styles from './cart.scss';

export function Cart() {
  return (
    <Link className={styles.cart} to="/cart">
      <span className={styles.count}>0</span>
      <CartIcon />
    </Link>
  );
}
