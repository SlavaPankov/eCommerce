import React, { useState, MouseEvent } from 'react';
import { useAppSelector } from '../../../hooks/storeHooks';
import { HighRatingList } from '../../HighRatingContainer/HighRatingList';
import styles from './productsContainer.scss';
import { BaseHeading } from '../../BaseHeading';
import { Pagination } from '../../Pagination';
import { SkeletonCard } from '../../SkeletonCard';
import { NoFilterResults } from './NoFilterResults';
import { BaseSelect } from '../../BaseSelect';
import { SelectedSort } from './SelectedSort';

interface IProductsContainerProps {
  heading: string;
  countPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sort: Array<string>;
  setSort: (sort: Array<string>) => void;
}

export function ProductsContainer({
  heading,
  currentPage,
  setCurrentPage,
  countPerPage,
  sort,
  setSort
}: IProductsContainerProps) {
  const {
    payload: {
      filter: { products, totalCount }
    },
    loading,
    error
  } = useAppSelector((state) => state.products);
  const [emptyArray] = useState<Array<number>>(Array(countPerPage).fill(1));
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>('Самые популярные');

  const handleClickSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleClickSelectItem = (event: MouseEvent<HTMLLIElement>) => {
    setIsSelectOpen(false);
    const dataSort = event.currentTarget.getAttribute('data-sort');

    setSelectedValue(event.currentTarget.textContent || selectedValue);

    if (!dataSort) {
      return;
    }

    switch (dataSort) {
      case '0':
        setSort(['']);
        break;
      case '1':
        setSort(['price asc']);
        break;
      case '2':
        setSort(['price desc']);
        break;
      default:
        setSort(sort);
        break;
    }
  };

  return (
    <div className={styles.products}>
      <div className={styles.head_wrapper}>
        <BaseHeading textContent={heading} />
        <BaseSelect
          selectedValue={
            <SelectedSort textContent={isSelectOpen ? 'Выводить сначала' : selectedValue} />
          }
          isOpen={isSelectOpen}
          onClick={handleClickSelect}>
          <ul className={styles.sort}>
            <li data-sort="0" className={styles.sort_item} onClick={handleClickSelectItem}>
              Самые популярные
            </li>
            <li data-sort="1" className={styles.sort_item} onClick={handleClickSelectItem}>
              Самые дешевые
            </li>
            <li data-sort="2" className={styles.sort_item} onClick={handleClickSelectItem}>
              Самые дорогие
            </li>
          </ul>
        </BaseSelect>
      </div>
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
