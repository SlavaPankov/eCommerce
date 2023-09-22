import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { DiscountCodeInfo } from '@commercetools/platform-sdk';
import styles from './discountCodeForm.scss';
import { BaseCheckbox } from '../../../BaseCheckbox';
import { BaseInputField } from '../../../BaseInputField';
import { BaseButton } from '../../../BaseButton';
import { updateCartRequestAsync } from '../../../../store/cart/cartSlice';
import { ECartActionTypes } from '../../../../types/enums/ECartActionTypes';
import { useAppDispatch, useAppSelector } from '../../../../hooks/storeHooks';
import { getDiscountCodeByIdRequestAsync } from '../../../../store/discountCode/discountCodeSlice';

interface IDiscountCodeFormProps {
  cartId: string;
  version: number;
  cartDiscountCodes: Array<DiscountCodeInfo>;
  isActiveDiscountCode: boolean;
  setIsActiveDiscountCode: (value: boolean) => void;
  error: string;
}

export function DiscountCodeForm({
  cartId,
  version,
  cartDiscountCodes,
  isActiveDiscountCode,
  error,
  setIsActiveDiscountCode
}: IDiscountCodeFormProps) {
  const dispatch = useAppDispatch();
  const [code, setCode] = useState<string>('');
  const [formError, setFormError] = useState({ code: '' });
  const { discountCode } = useAppSelector((state) => state.discountCode);
  const [isDiscountCode, setIsDiscountCode] = useState<boolean>(false);

  useEffect(() => {
    setIsDiscountCode(cartDiscountCodes.length > 0);
    setIsActiveDiscountCode(cartDiscountCodes.length > 0);
  }, [cartDiscountCodes]);

  useEffect(() => {
    if (!discountCode) {
      return;
    }

    setCode(discountCode);
  }, [discountCode]);

  useEffect(() => {
    if (!error || error !== 'DiscountCodeNonApplicable') {
      return;
    }

    setFormError({
      ...formError,
      code: 'Промокод не может быть применен'
    });
  }, [error]);

  useEffect(() => {
    if (!isActiveDiscountCode) {
      return;
    }

    dispatch(getDiscountCodeByIdRequestAsync(cartDiscountCodes[0].discountCode.id));
  }, [isActiveDiscountCode]);

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ code: '' });
    setIsDiscountCode(event.target.checked);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ code: '' });
    setCode(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(event.currentTarget).entries());

    if (!isActiveDiscountCode) {
      dispatch(
        updateCartRequestAsync({
          cartId,
          payload: {
            version,
            actions: [
              {
                action: ECartActionTypes.addDiscountCode,
                code: data.code as string
              }
            ]
          }
        })
      );
    } else {
      dispatch(
        updateCartRequestAsync({
          cartId,
          payload: {
            version,
            actions: [
              {
                action: ECartActionTypes.removeDiscountCode,
                discountCode: {
                  typeId: 'discount-code',
                  id: cartDiscountCodes[0].discountCode.id
                }
              }
            ]
          }
        })
      );

      setCode('');
    }
  };

  return (
    <form className={styles.discountForm} onSubmit={handleSubmit}>
      <fieldset disabled={isActiveDiscountCode}>
        <BaseCheckbox
          name=""
          value=""
          onChange={handleChangeCheckbox}
          isChecked={isDiscountCode}
          label="Применить промокод"
        />
      </fieldset>
      {isDiscountCode && (
        <>
          <fieldset disabled={isActiveDiscountCode}>
            <BaseInputField
              name="code"
              value={code}
              placeholder="Промокод"
              onChange={handleChange}
              error={formError.code}
            />
          </fieldset>
          <BaseButton textContent={isActiveDiscountCode ? 'Удалить' : 'Применить'} />
        </>
      )}
    </form>
  );
}
