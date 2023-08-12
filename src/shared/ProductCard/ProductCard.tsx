import React from 'react';
import styles from './productCard.scss';
import { RatingIcon } from '../Icons';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';

interface IProductCardProps {
  rating: number;
  imageSrc: string;
  title: string;
  price: string;
}

export function ProductCard({ rating, imageSrc, title, price }: IProductCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.rating}>
        <RatingIcon /> {rating}
      </div>
      <img className={styles.image} src={imageSrc} alt={title} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.price}>{price} руб</div>
        <BaseButton textContent="Купить" mode={EBaseButtonMode.secondary} />
      </div>
    </article>
  );
}
