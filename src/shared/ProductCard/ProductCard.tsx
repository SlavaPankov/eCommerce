import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './productCard.scss';
import { ElephantIcon, RatingIcon } from '../Icons';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { ECartActionTypes } from '../../types/enums/ECartActionTypes';
import { updateCartRequestAsync } from '../../store/cart/cartSlice';
import { IImage } from '../../types/interfaces/IImage';
import { Modal } from '../Modal';

interface IProductCardProps {
  rating: number;
  imagePreview: IImage;
  title: string;
  price: string;
  id: string;
  variantId: number;
  discountedPrice: string;
  productKey: string;
  mode?: 'base' | 'discount';
}

export function ProductCard({
  rating,
  imagePreview,
  title,
  price,
  id,
  variantId,
  discountedPrice,
  productKey,
  mode = 'base'
}: IProductCardProps) {
  const dispatch = useAppDispatch();
  const { cart } = useAppSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isProductInCart, setIsProductInCart] = useState<boolean>(false);
  const discount: string = (
    Number(price.replace(/\s/g, '')) - Number(discountedPrice.replace(/\s/g, ''))
  ).toLocaleString('ru-RU');

  const handleClick = () => {
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

      setIsModalOpen(true);
    });
  };

  useEffect(() => {
    setIsProductInCart(cart.lineItems.filter((item) => item.id === id).length > 0);
  }, [cart]);

  return (
    <>
      <article className={styles.card}>
        {mode === 'discount' && <span className={styles.discount}>- {discount}</span>}
        {mode === 'base' && (
          <div className={styles.rating}>
            <RatingIcon /> {rating}
          </div>
        )}
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
          <BaseButton
            isDisabled={isProductInCart}
            onClick={handleClick}
            textContent={!isProductInCart ? 'В корзину' : 'В корзине'}
            mode={EBaseButtonMode.secondary}
          />
        </div>
      </article>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modal}>
            <ElephantIcon />
            <span className={styles.modal_text}>
              {title}
              <br />
              {!isProductInCart ? 'успешно удалён из корзины' : 'успешно добавлен в корзину'}
            </span>
          </div>
        </Modal>
      )}
    </>
  );
}
