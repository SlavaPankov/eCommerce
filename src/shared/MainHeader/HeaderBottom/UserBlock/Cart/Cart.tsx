import React from 'react';
import { Link } from 'react-router-dom';
import { CartIcon } from '../../../../Icons';
import styles from './cart.scss';
import { useAppSelector } from '../../../../../hooks/storeHooks';
import { ICart } from '../../../../../types/interfaces/ICart';

export function Cart() {
  const { lineItems } = useAppSelector<ICart>((state) => state.cart.cart);

  return (
    <Link className={styles.cart} to="/cart">
      <span className={styles.count}>{lineItems.length}</span>
      <CartIcon />
    </Link>
  );
}
