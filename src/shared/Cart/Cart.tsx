import React, { useState } from 'react';
import classNames from 'classnames';
import { MyCartUpdateAction } from '@commercetools/platform-sdk';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import styles from './cart.scss';
import { CartItemList } from './CartItemList';
import { CartInfo } from './CartInfo';
import { Modal } from '../Modal';
import { ElephantIcon } from '../Icons';
import { BaseButton } from '../BaseButton';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import { ECartActionTypes } from '../../types/enums/ECartActionTypes';
import { updateCartRequestAsync } from '../../store/cart/cartSlice';
import { EmptyCart } from './EmptyCart';

export function Cart() {
  const dispatch = useAppDispatch();
  const { cart, error } = useAppSelector((state) => state.cart);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  const handleClick = () => {
    setIsModalOpen(true);
  };

  const handleClickConfirm = () => {
    const actions: Array<MyCartUpdateAction> = [];

    cart.lineItems.forEach((item) => {
      actions.push({
        action: ECartActionTypes.removeLineItem,
        lineItemId: item.lineItemId
      });
    });

    dispatch(
      updateCartRequestAsync({
        cartId: cart.id,
        payload: {
          version: cart.version,
          actions
        }
      })
    ).then(() => setIsModalOpen(false));
  };

  return (
    <section>
      <div className={className}>
        <h1 className={styles.title}>
          Корзина
          {cart.lineItems.length > 0 && <span onClick={handleClick}>Отчистить корзину</span>}
        </h1>
        {cart.lineItems.length > 0 ? (
          <div className={styles.wrapper}>
            <CartItemList list={cart.lineItems} />
            <CartInfo cart={cart} error={error} />
          </div>
        ) : (
          <EmptyCart />
        )}
      </div>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className={styles.modal_wrapper}>
            <ElephantIcon />
            <div className={styles.modal_text}>Удалить все товары из корзины?</div>
            <div className={styles.buttons}>
              <BaseButton textContent="Удалить" onClick={handleClickConfirm} />
              <BaseButton
                textContent="Отмена"
                mode={EBaseButtonMode.secondary}
                onClick={() => setIsModalOpen(false)}
              />
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
}
