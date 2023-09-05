import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ILineItem } from '../../../../types/interfaces/ILineItem';
import { BaseButton } from '../../../BaseButton';
import { EBaseButtonMode } from '../../../../types/enums/EBaseButtonMode';
import styles from './cartItem.scss';
import { TrashIcon } from '../../../Icons';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { updateCartRequestAsync } from '../../../../store/cart/cartSlice';
import { ECartActionTypes } from '../../../../types/enums/ECartActionTypes';

interface ICartItemProps {
  item: ILineItem;
}

export function CartItem({ item }: ICartItemProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLInputElement>(null);
  const { id: cartId, version } = useAppSelector((state) => state.cart.cart);
  const { loading } = useAppSelector((state) => state.cart);
  const [quantity, setQuantity] = useState<number>(item.quantity);

  const updateQuantity = (newQuantity: number) => {
    dispatch(
      updateCartRequestAsync({
        cartId,
        payload: {
          version,
          actions: [
            {
              action: ECartActionTypes.changeLineItemQuantity,
              quantity: newQuantity,
              lineItemId: item.id
            }
          ]
        }
      })
    );
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (+event.target.value > 0) {
      setQuantity(+event.target.value);
    }
  };

  const handleClickMinus = () => {
    const { current } = ref;

    if (!current) {
      return;
    }

    if (+current.value <= 1) {
      return;
    }

    setQuantity(+current.value - 1);
    updateQuantity(+current.value - 1);
  };

  const handleClickPlus = () => {
    const { current } = ref;

    if (!current) {
      return;
    }

    setQuantity(+current.value + 1);
    updateQuantity(+current.value + 1);
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (+event.currentTarget.value > 0) {
      updateQuantity(+event.currentTarget.value);
    }
  };

  const handleClickRemove = () => {
    dispatch(
      updateCartRequestAsync({
        cartId,
        payload: {
          version,
          actions: [
            {
              action: ECartActionTypes.removeLineItem,
              lineItemId: item.id
            }
          ]
        }
      })
    );
  };

  return (
    <li className={styles.listItem}>
      <article className={styles.item}>
        <Link to={`/product/${item.key}`} className={styles.imageLink}>
          <img src={item.images?.preview.url} width="150" alt={item.name} />
        </Link>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>
            <Link to={`/product/${item.key}`}>{item.name}</Link>
          </h2>
          <div className={styles.quantity}>
            <BaseButton
              isDisabled={loading}
              textContent="-"
              mode={EBaseButtonMode.secondary}
              onClick={handleClickMinus}
            />
            <input
              className={styles.input}
              ref={ref}
              type="number"
              value={quantity}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <BaseButton
              isDisabled={loading}
              textContent="+"
              mode={EBaseButtonMode.secondary}
              onClick={handleClickPlus}
            />
          </div>
        </div>

        <div className={styles.prices}>
          {!item.discountedPrice ? (
            <div className={styles.price}>{item.price} руб</div>
          ) : (
            <>
              <div className={styles.price}>{item.discountedPrice} руб</div>
              <div className={styles.discountedPrice}>{item.price} руб</div>
            </>
          )}
        </div>
        <div className={styles.delete} onClick={handleClickRemove}>
          <TrashIcon />
        </div>
      </article>
    </li>
  );
}
