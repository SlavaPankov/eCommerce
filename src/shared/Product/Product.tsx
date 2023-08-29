import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import styles from './product.scss';
import 'swiper/css';
import { BaseButton } from '../BaseButton';
import { useProductData } from '../../hooks/useProductData';
import { ImageSlider } from '../Slider';
import { RatingIcon } from '../Icons';

export function Product() {
  const { id } = useParams();
  const { product } = useProductData(id || '');
  const imagePreview = product.images?.preview;
  const imageSlider = product.images?.slider;

  useEffect(() => {
    if (!product.id) {
      return;
    }
    console.log(`Your product is:`, product);
  }, [product]);

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section className={containerClassName}>
      <div className={styles.grid}>
        <ImageSlider imagePreview={imagePreview} imageSlider={imageSlider} />
        <div className={styles.product_info}>
          <div className={styles.rating}>
            {product.rating}
            <RatingIcon />
          </div>
          <h1 className={styles.title}>{product.name}</h1>
          <h1 className={styles.price}>28 490 руб</h1>
          <BaseButton textContent="Добавить в корзину" />
        </div>
      </div>
    </section>
  );
}
