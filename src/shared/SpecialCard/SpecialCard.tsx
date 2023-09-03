import React from 'react';
import { Link } from 'react-router-dom';
import styles from './specialCard.scss';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { ICartAction } from '../../types/interfaces/ICartAction';
import { ECartActionTypes } from '../../types/enums/ECartActionTypes';
import { addLineItemRequestAsync } from '../../store/cart/cartSlice';
import { IImage } from '../../types/interfaces/IImage';

interface ISpecialCardProps {
  id: string;
  imagePreview: IImage;
  title: string;
  price: string;
  discountedPrice: string;
  productKey: string;
  variantId: number;
}

export function SpecialCard({
  imagePreview,
  title,
  price,
  discountedPrice,
  productKey,
  variantId,
  id
}: ISpecialCardProps) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.cart);
  const { cart } = useAppSelector((state) => state.cart);
  const discount: string = (
    Number(price.replace(/\s/g, '')) - Number(discountedPrice.replace(/\s/g, ''))
  ).toLocaleString();

  const handleClick = () => {
    const addAction: ICartAction = {
      action: ECartActionTypes.addLineItem,
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
      <span className={styles.discount}>- {discount}</span>
      <img
        className={styles.image}
        src={imagePreview.url}
        width={imagePreview.dimensions?.w}
        height={imagePreview.dimensions?.h}
        alt={title}
      />
      <Link to="#" data-key={productKey}>
        <h2 className={styles.title}>
          {title
            .split(' ')
            .slice(0, title.split(' ').length - 1)
            .join(' ')}{' '}
          <br /> {title.split(' ').slice(-1).join(' ')}
        </h2>
      </Link>
      <div className={styles.priceBlock}>
        <span className={styles.price}>{discountedPrice.toLocaleString()} руб</span>
        <span className={styles.discountedPrice}>{price.toLocaleString()} руб</span>
      </div>
      <BaseButton
        isDisabled={loading}
        onClick={handleClick}
        textContent="Купить"
        mode={EBaseButtonMode.secondary}
      />
    </article>
  );
}
