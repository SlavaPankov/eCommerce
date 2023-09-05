import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/storeHooks';
import styles from './cart.scss';
import { CartItemList } from './CartItemList';
import { CartInfo } from './CartInfo';

export function Cart() {
  const { cart, error } = useAppSelector((state) => state.cart);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <h1 className={styles.title}>Корзина</h1>
        <div className={styles.wrapper}>
          <CartItemList list={cart.lineItems} />
          <CartInfo cart={cart} error={error} />
        </div>
      </div>
    </section>
  );
}
