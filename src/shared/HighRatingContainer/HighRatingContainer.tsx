import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useProductsData } from '../../hooks/useProductsData';
import { BaseButton } from '../BaseButton';
import { IProduct } from '../../types/interfaces/IProduct';
import { HighRatingList } from './HighRatingList';
import styles from './highRatingContainer.scss';
import { BaseHeading } from '../BaseHeading';

export function HighRatingContainer() {
  const { products } = useProductsData();
  const [ratingProducts, setRatingProducts] = useState<Array<IProduct>>([]);
  const [sliceEnd, setSliceEnd] = useState<number>(8);
  const [sliceStart] = useState<number>(0);

  useEffect(() => {
    if (products.length !== 0) {
      const temp = products.slice().sort((a, b) => b.rating - a.rating);
      setRatingProducts(temp);
    }
  }, [products]);

  const handleClick = () => {
    setSliceEnd(sliceEnd + 4);
  };

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <>
      {ratingProducts.length !== 0 ? (
        <div className={className}>
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
