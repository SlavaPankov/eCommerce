import React, { useState } from 'react';
import { useAppSelector } from '../../../hooks/storeHooks';
import { HighRatingList } from '../../HighRatingContainer/HighRatingList';
import styles from './productsContainer.scss';
import { BaseHeading } from '../../BaseHeading';
import { Pagination } from '../../Pagination';
import { SkeletonCard } from '../../SkeletonCard';
import { NoFilterResults } from './NoFilterResults';

interface IProductsContainerProps {
  heading: string;
  countPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function ProductsContainer({
  heading,
  currentPage,
  setCurrentPage,
  countPerPage
}: IProductsContainerProps) {
  const { products, loading, error, totalCount } = useAppSelector((state) => state.products);
  const [emptyArray] = useState<Array<number>>(Array(countPerPage).fill(1));

  return (
    <div className={styles.products}>
      <BaseHeading textContent={heading} />
      <div className={styles.wrapper}>
        {!loading && !error && products.length > 0 && (
          <>
            <HighRatingList list={products} />
          </>
        )}
        {loading && (
          <ul className={styles.list}>
            {emptyArray.map((item, index) => (
              <SkeletonCard key={index} />
            ))}
          </ul>
        )}
        {!loading && products.length <= 0 && <NoFilterResults />}
        <Pagination
          countPerPage={9}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}
