import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useProductsData } from '../../hooks/useProductsData';
import { BaseButton } from '../BaseButton';
import { IProduct } from '../../types/interfaces/IProduct';
import { HighRatingList } from './HighRatingList';
import styles from './highRatingContainer.scss';
import { BaseHeading } from '../BaseHeading';

export function HighRatingContainer() {
  const ref = useRef<HTMLDivElement>(null);
  const { products } = useProductsData();
  const [ratingProducts, setRatingProducts] = useState<Array<IProduct>>([]);
  const [sliceEnd, setSliceEnd] = useState<number>(8);
  const [sliceStart] = useState<number>(0);
  const [offset, setOffset] = useState<number>(4);

  useEffect(() => {
    if (products.length !== 0) {
      const temp = products.slice().sort((a, b) => b.rating - a.rating);
      setRatingProducts(temp);
    }
  }, [products]);

  const handleClick = () => {
    setSliceEnd(sliceEnd + offset);
  };

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSliceEnd(8);
      setOffset(4);

      if (window.innerWidth < 1310) {
        setSliceEnd(6);
        setOffset(2);
      }
    });
  }, []);

  return (
    <>
      {ratingProducts.length !== 0 ? (
        <div className={className} ref={ref}>
          <BaseHeading textContent="Высокий рейтинг" />
          <HighRatingList list={ratingProducts.slice(sliceStart, sliceEnd)} />
          {sliceEnd !== ratingProducts.length ? (
            <BaseButton textContent="Смотреть больше товаров" onClick={handleClick} />
          ) : null}
        </div>
      ) : null}
    </>
  );
}
