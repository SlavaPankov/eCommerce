import React from 'react';
import styles from './specialCard.scss';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';

interface ISpecialCardProps {
  imageSrc: string;
  title: string;
  price: string;
  discountedPrice: string;
  productKey: string;
}

export function SpecialCard({
  imageSrc,
  title,
  price,
  discountedPrice,
  productKey
}: ISpecialCardProps) {
  const discount: string = (
    Number(price.replace(/\s/g, '')) - Number(discountedPrice.replace(/\s/g, ''))
  ).toLocaleString();

  return (
    <div className={styles.card}>
      <span className={styles.discount}>- {discount}</span>
      <img className={styles.image} src={imageSrc} alt={title} />
      <h2 className={styles.title}>
        {title
          .split(' ')
          .slice(0, title.split(' ').length - 1)
          .join(' ')}{' '}
        <br /> {title.split(' ').slice(-1).join(' ')}
      </h2>
      <div className={styles.priceBlock}>
        <span className={styles.price}>{discountedPrice.toLocaleString()} руб</span>
        <span className={styles.discountedPrice}>{price.toLocaleString()} руб</span>
      </div>
      <a href="#" data-key={productKey}>
        <BaseButton textContent="Купить" mode={EBaseButtonMode.secondary} />
      </a>
    </div>
  );
}
