import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import styles from './searchResults.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { productsFiltersRequestAsync } from '../../store/products/productsSlice';
import { HighRatingList } from '../HighRatingContainer/HighRatingList';
import { Pagination } from '../Pagination';
import { NoSearchResults } from './NoSearchResults';
import { SkeletonCard } from '../SkeletonCard';

interface IUrlSearchParam {
  [k: string]: string;
}
export function SearchResults() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const {
    payload: {
      filter: { products, totalCount }
    },
    loading
  } = useAppSelector((state) => state.products);
  const [urlSearchParams, setUrlSearchParams] = useState<IUrlSearchParam>({});
  const [limit] = useState<number>(12);
  const [emptyArray] = useState<Array<number>>(Array(limit).fill(1));
  const [offset, setOffset] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);

    setUrlSearchParams(Object.fromEntries(searchParams.entries()));
  }, [params]);

  useEffect(() => {
    if (urlSearchParams.search) {
      dispatch(
        productsFiltersRequestAsync({
          filter: urlSearchParams.category ? [`categories.id: "${urlSearchParams.category}"`] : [],
          text: urlSearchParams.search,
          fuzzy: true,
          limit,
          offset
        })
      );
    }
  }, [urlSearchParams, offset]);

  useEffect(() => {
    setOffset((currentPage - 1) * limit);
  }, [currentPage]);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={className}>
      <h1>Результат поиска: {urlSearchParams.search}</h1>
      {products.length > 0 && !loading && (
        <>
          <HighRatingList list={products} />
          <Pagination
            countPerPage={limit}
            totalCount={totalCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      )}
      {!loading && products.length === 0 && <NoSearchResults />}
      {loading && (
        <ul className={styles.list}>
          {emptyArray.map((item, index) => (
            <SkeletonCard key={index} />
          ))}
        </ul>
      )}
    </div>
  );
}
