import React from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/storeHooks';
import styles from './cart.scss';
import { CartItemList } from './CartItemList';

export function Cart() {
  const { cart } = useAppSelector((state) => state.cart);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <CartItemList list={cart.lineItems} />

        <div>{cart.totalPrice}</div>
      </div>
    </section>
  );
}
