import React, { ChangeEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { ILineItem } from '../../../../types/interfaces/ILineItem';
import { BaseButton } from '../../../BaseButton';
import { EBaseButtonMode } from '../../../../types/enums/EBaseButtonMode';
import styles from './cartItem.scss';
import { TrashIcon } from '../../../Icons';

interface ICartItemProps {
  item: ILineItem;
}

export function CartItem({ item }: ICartItemProps) {
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuantity(+event.target.value);
  };

  return (
    <li className={styles.listItem}>
      <article className={styles.item}>
        <Link to={`/product/${item.key}`} className={styles.imageLink}>
          <img src={item.images?.preview.url} width="250" alt={item.name} />
        </Link>
        <h2 className={styles.title}>
          <Link to={`/product/${item.key}`}>{item.name}</Link>
        </h2>
        <div className={styles.quantity}>
          <BaseButton textContent="-" mode={EBaseButtonMode.secondary} />
          <input className={styles.input} type="number" value={quantity} onChange={handleChange} />
          <BaseButton textContent="+" mode={EBaseButtonMode.secondary} />
        </div>
        <div className={styles.prices}>
          {!item.discountedPrice ? (
            <div className={styles.price}>{item.price} руб</div>
          ) : (
            <>
              <div className={styles.price}>{item.discountedPrice} руб</div>
              <div className={styles.discountedPrice}>{item.price} руб</div>
            </>
          )}
        </div>
        <div className={styles.delete}>
          <TrashIcon />
        </div>
      </article>
    </li>
  );
}
