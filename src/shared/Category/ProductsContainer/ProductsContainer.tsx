import React from 'react';
import { useAppSelector } from '../../../hooks/storeHooks';
import { HighRatingList } from '../../HighRatingContainer/HighRatingList';
import styles from './productsContainer.scss';
import { BaseHeading } from '../../BaseHeading';
import { Pagination } from '../../Pagination';

interface IProductsContainerProps {
  heading: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export function ProductsContainer({
  heading,
  currentPage,
  setCurrentPage
}: IProductsContainerProps) {
  const { products, loading, error, totalCount } = useAppSelector((state) => state.products);

  return (
    <div className={styles.products}>
      <BaseHeading textContent={heading} />
      <div>
        {!loading && !error && (
          <>
            <HighRatingList list={products} />
            <Pagination
              countPerPage={9}
              totalCount={totalCount}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
