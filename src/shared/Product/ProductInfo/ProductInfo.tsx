import React from 'react';
import styles from './productInfo.scss';
import { RatingIcon } from '../../Icons';
import { BaseButton } from '../../BaseButton';

interface IProductInfoProps {
  name: string;
  rating: number;
  price: string;
  discountedPrice?: string;
}

export function ProductInfo({ name, rating, price, discountedPrice }: IProductInfoProps) {
  return (
    <div className={styles.product_info}>
      <div className={styles.rating}>
        <RatingIcon />
        {rating}
      </div>
      <h1 className={styles.title}>{name}</h1>
      <div className={styles.prices}>
        {!discountedPrice ? (
          <div className={styles.price}>{price} руб</div>
        ) : (
          <>
            <div className={styles.price}>{discountedPrice} руб</div>
            <div className={styles.old_price}>{price} руб</div>
          </>
        )}
      </div>
      <BaseButton textContent="Добавить в корзину" />
    </div>
  );
}
