import React from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import styles from './product.scss';
import 'swiper/css';
import { useProductData } from '../../hooks/useProductData';
import { ImageSlider } from './ImageSlider';
import { ProductInfo } from './ProductInfo';
import { ProductCharacteristics } from './ProductCharacteristics';
import { ProductDescription } from './ProductDescription';

export function Product() {
  const { id } = useParams();
  const { product, loading } = useProductData(id || '');

  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section>
      {!loading && (
        <div className={containerClassName}>
          <ImageSlider images={product.images?.slider} />
          <ProductInfo
            name={product.name}
            rating={product.rating}
            price={product.price}
            discountedPrice={product.discountedPrice}
            id={product.id}
            variantId={product.variantId}
          />
          <ProductDescription description={product.description} />
          <ProductCharacteristics characteristics={product.attributes} />
        </div>
      )}
    </section>
  );
}
