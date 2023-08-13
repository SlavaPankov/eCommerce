import React from 'react';
import styles from './productCard.scss';
import { RatingIcon } from '../Icons';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { ICartAction } from '../../types/interfaces/ICartAction';
import { EActionTypes } from '../../types/enums/EActionTypes';
import { addLineItemRequestAsync } from '../../store/cart/cartSlice';

interface IProductCardProps {
  rating: number;
  imageSrc: string;
  title: string;
  price: string;
  id: string;
  variantId: number;
}

export function ProductCard({ rating, imageSrc, title, price, id, variantId }: IProductCardProps) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const token = useAppSelector<string>((state) => state.token.payload.token);

  const handleClick = () => {
    const addAction: ICartAction = {
      action: EActionTypes.addLineItem,
      productId: id,
      variantId
    };

    dispatch(
      addLineItemRequestAsync({
        token,
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
      <img className={styles.image} src={imageSrc} alt={title} />
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.price}>{price} руб</div>
        <BaseButton onClick={handleClick} textContent="Купить" mode={EBaseButtonMode.secondary} />
      </div>
    </article>
  );
}