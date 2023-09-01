import React from 'react';
import styles from './productInfo.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { RatingIcon } from '../../Icons';
import { BaseButton } from '../../BaseButton';
import { ICartAction } from '../../../types/interfaces/ICartAction';
import { EActionTypes } from '../../../types/enums/EActionTypes';
import { addLineItemRequestAsync } from '../../../store/cart/cartSlice';

interface IProductInfoProps {
  name: string;
  rating: number;
  price: string;
  discountedPrice?: string;
  id: string;
  variantId: number;
}

export function ProductInfo({
  name,
  rating,
  price,
  discountedPrice,
  id,
  variantId
}: IProductInfoProps) {
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
    <div className={styles.product_info}>
      <div className={styles.rating}>
        <RatingIcon />
        {rating}
      </div>
      <h1 className={styles.title}>{name}</h1>
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
      <BaseButton onClick={handleClick} textContent="Добавить в корзину" />
    </div>
  );
}
