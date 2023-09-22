import React from 'react';
import { ILineItem } from '../../../types/interfaces/ILineItem';
import { CartItem } from './CartItem';
import styles from './cartItemList.scss';

interface ICartItemListProps {
  list: Array<ILineItem>;
}

export function CartItemList({ list }: ICartItemListProps) {
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
}
