import React from 'react';
import classNames from 'classnames';
import { IProduct } from '../../types/interfaces/IProduct';
import styles from './highRatingList.scss';
import { ProductCard } from '../ProductCard';

interface IHighRatingList {
  list: Array<IProduct>;
}
export function HighRatingList({ list }: IHighRatingList) {
  const className = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={className}>
      {list.map((item) => (
        <li key={item.id}>
          <ProductCard
            rating={item.rating}
            imageSrc={item.images?.preview || ''}
            title={item.name}
            price={item.price}
          />
        </li>
      ))}
    </ul>
  );
}
