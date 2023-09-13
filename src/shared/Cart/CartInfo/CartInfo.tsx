import React, { useState } from 'react';
import styles from './cartInfo.scss';
import { ICart } from '../../../types/interfaces/ICart';
import { DiscountCodeForm } from './DiscountCodeForm';

interface ICartInfoProps {
  cart: ICart;
  error: string;
}

export function CartInfo({ cart, error }: ICartInfoProps) {
  const [isActiveDiscountCode, setIsActiveDiscountCode] = useState<boolean>(false);

  const calculateOldPrice = () => {
    return cart.lineItems
      .reduce((acc, val) => {
        return acc + Number(val.price.replaceAll(/\s/gi, '')) * val.quantity;
      }, 0)
      .toLocaleString('ru-RU');
  };

  const calculateTotalDiscount = () => {
    let itemsDiscount = cart.lineItems.reduce((acc, val) => {
      if (!val.discountedPrice) {
        return acc;
      }

      return (
        acc +
        (Number(val.price.replaceAll(/\s/gi, '')) -
          Number(val.discountedPrice.replaceAll(/\s/gi, ''))) *
          val.quantity
      );
    }, 0);

    if (isActiveDiscountCode) {
      itemsDiscount =
        Number(calculateOldPrice().replaceAll(/\s/gi, '')) -
        Number(cart.totalPrice.replaceAll(/\s/gi, ''));
    }

    return itemsDiscount.toLocaleString('ru-RU');
  };

  return (
    <div className={styles.container}>
      <div className={styles.discount}>
        Скидка: <span className={styles.discount_value}>{calculateTotalDiscount()} руб</span>
      </div>
      <div className={styles.general}>
        <div className={styles.total}>Итого {cart.lineItems.length} товара на сумму</div>
        <div className={styles.prices}>
          {Number(calculateTotalDiscount().replaceAll(/\s/gi, '')) > 0 && (
            <div className={styles.oldPrice}>{calculateOldPrice()} руб</div>
          )}
          <div className={styles.totalPrice}>{cart.totalPrice} руб</div>
        </div>
      </div>
      <DiscountCodeForm
        cartId={cart.id}
        version={cart.version}
        cartDiscountCodes={cart.discountCodes}
        isActiveDiscountCode={isActiveDiscountCode}
        setIsActiveDiscountCode={setIsActiveDiscountCode}
        error={error}
      />
    </div>
  );
}
