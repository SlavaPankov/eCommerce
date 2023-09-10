import React, { useEffect, useState } from 'react';
import styles from './productInfo.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { RatingIcon } from '../../Icons';
import { BaseButton } from '../../BaseButton';
import { ECartActionTypes } from '../../../types/enums/ECartActionTypes';
import { updateCartRequestAsync } from '../../../store/cart/cartSlice';

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
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);

  useEffect(() => {
    setIsProductInCart(cart.lineItems.filter((item) => item.id === id).length > 0);
  }, [cart, id]);

  const handleRemoveFromCart = () => {
    dispatch(
      updateCartRequestAsync({
        cartId: cart.id,
        payload: {
          version: cart.version,
          actions: [
            {
              action: ECartActionTypes.removeLineItem,
              lineItemId: cart.lineItems.find((item) => item.id === id)?.lineItemId || ''
            }
          ]
        }
      })
    );
  };

  const handleAddToCart = () => {
    dispatch(
      updateCartRequestAsync({
        cartId: cart.id,
        payload: {
          version: cart.version,
          actions: [
            {
              action: ECartActionTypes.addLineItem,
              productId: id,
              variantId
            }
          ]
        }
      })
    );
  };

  const buttonText = isProductInCart ? 'Удалить из корзины' : 'Добавить в корзину';
  const handleClick = isProductInCart ? handleRemoveFromCart : handleAddToCart;

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
      <BaseButton onClick={handleClick} textContent={buttonText} />
    </div>
  );
}
