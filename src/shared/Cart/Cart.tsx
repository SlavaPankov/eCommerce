import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppSelector } from '../../hooks/storeHooks';
import styles from './cart.scss';

export function Cart() {
  const { cart } = useAppSelector((state) => state.cart);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      <div className={className}>
        <ul>
          {cart.lineItems.map((item) => (
            <li key={item.id}>
              {item.name} - {item.quantity}
            </li>
          ))}
        </ul>

        <div>{cart.totalPrice}</div>
      </div>
    </section>
  );
}
