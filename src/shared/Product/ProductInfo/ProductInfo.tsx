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
  const { cart } = useAppSelector((state) => state.cart);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');

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
    setShowModal(true);
    setModalMessage(`${name} успешно удалён из корзины`);
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
    setShowModal(true);
    setModalMessage(`${name} успешно добавлен в корзину`);
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
      <BaseButton onClick={handleClick} textContent={buttonText} />

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className={styles.modal}>
            <ElephantIcon />
            <span className={styles.modal_text}>{modalMessage}</span>
          </div>
        </Modal>
      )}
    </div>
  );
}
