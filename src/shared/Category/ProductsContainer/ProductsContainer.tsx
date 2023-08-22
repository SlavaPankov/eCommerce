import React from 'react';
import { useAppSelector } from '../../../hooks/storeHooks';
import { HighRatingList } from '../../HighRatingContainer/HighRatingList';
import styles from './productsContainer.scss';
import { BaseHeading } from '../../BaseHeading';

interface IProductsContainerProps {
  heading: string;
}

export function ProductsContainer({ heading }: IProductsContainerProps) {
  const { products, loading, error } = useAppSelector((state) => state.products);

  return (
    <div className={styles.products}>
      <BaseHeading textContent={heading} />
      <div>{!loading && !error && <HighRatingList list={products} />}</div>
    </div>
  );
}
