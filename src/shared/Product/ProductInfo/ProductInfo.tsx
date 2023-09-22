import React, { useEffect, useState } from 'react';
import styles from './productInfo.scss';
import { useAppDispatch, useAppSelector } from '../../../hooks/storeHooks';
import { RatingIcon, ElephantIcon } from '../../Icons';
import { BaseButton } from '../../BaseButton';
import { ECartActionTypes } from '../../../types/enums/ECartActionTypes';
import { updateCartRequestAsync } from '../../../store/cart/cartSlice';
import { Modal } from '../../Modal';

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
  const { cart, error: cartError, loading } = useAppSelector((state) => state.cart);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsProductInCart(cart.lineItems.filter((item) => item.id === id).length > 0);
  }, [cart, id]);

  useEffect(() => {
    if (!cartError) {
      setError('');
      return;
    }

    setError('Не удалось добавить в корзину');
  }, [cartError]);

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
    ).then((result) => {
      if (result.type.includes('reject')) {
        return;
      }

      setShowModal(true);
    });
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
    ).then((result) => {
      if (result.type.includes('reject')) {
        return;
      }

      setShowModal(true);
    });
  };

  const buttonText = isProductInCart ? 'Удалить из корзины' : 'В корзину';
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
      {error && <div className={styles.error}>{error}</div>}
      <BaseButton isDisabled={loading} onClick={handleClick} textContent={buttonText} />

      {showModal && !error && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modal}>
            <ElephantIcon />
            <span className={styles.modal_text}>
              {name} {!isProductInCart ? 'успешно удалён из корзины' : 'успешно добавлен в корзину'}
            </span>
          </div>
        </Modal>
      )}
    </div>
  );
}
