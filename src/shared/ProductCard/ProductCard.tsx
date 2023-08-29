import React from 'react';
import { Link } from 'react-router-dom';
import styles from './productCard.scss';
import { RatingIcon } from '../Icons';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { ICartAction } from '../../types/interfaces/ICartAction';
import { EActionTypes } from '../../types/enums/EActionTypes';
import { addLineItemRequestAsync } from '../../store/cart/cartSlice';
import { IImage } from '../../types/interfaces/IImage';

interface IProductCardProps {
  rating: number;
  imagePreview: IImage;
  title: string;
  price: string;
  id: string;
  variantId: number;
  discountedPrice: string;
  productKey: string;
}

export function ProductCard({
  rating,
  imagePreview,
  title,
  price,
  id,
  variantId,
  discountedPrice,
  productKey
}: IProductCardProps) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);

  const handleClick = () => {
    const addAction: ICartAction = {
      action: EActionTypes.addLineItem,
      productId: id,
      variantId
    };

    dispatch(
      addLineItemRequestAsync({
        cartId: cart.id,
        addAction,
        version: cart.version
      })
    );
  };

  return (
    <article className={styles.card}>
      <div className={styles.rating}>
        <RatingIcon /> {rating}
      </div>
      <Link to={`/product/${productKey}`}>
        <img
          className={styles.image}
          src={imagePreview.url}
          width={imagePreview.dimensions?.w}
          height={imagePreview.dimensions?.h}
          alt={title}
        />
      </Link>
      <div className={styles.content}>
        <h2 className={styles.title}>
          <Link to={`/product/${productKey}`}>{title}</Link>
        </h2>
        <div className={styles.prices}>
          {!discountedPrice ? (
            <div className={styles.price}>{price} руб</div>
          ) : (
            <>
              <div className={styles.price}>{discountedPrice} руб</div>
              <div className={styles.old_price}>{price} руб</div>
            </>
          )}
        </div>
        <BaseButton onClick={handleClick} textContent="Купить" mode={EBaseButtonMode.secondary} />
      </div>
    </article>
  );
}
