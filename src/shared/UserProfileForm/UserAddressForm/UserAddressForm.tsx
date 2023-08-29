import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MyCustomerUpdateAction } from '@commercetools/platform-sdk';
import { IFormData } from '../../../types/interfaces/IFormData';
import { IUser } from '../../../types/interfaces/IUser';
import { RegistrationAddress } from '../../RegistrationForm/RagistrationAddress';
import styles from './userAddressForm.scss';
import { ConfirmIcon, CrossIcon, EditIcon, ElephantIcon } from '../../Icons';
import { Modal } from '../../Modal';
import { BaseButton } from '../../BaseButton';
import { EBaseButtonMode } from '../../../types/enums/EBaseButtonMode';
import { removeAddress, updateMeRequestAsync } from '../../../store/user/userSlice';
import { createAddressFromForm } from '../../../utils/createAddressFromForm';
import { EUserActionTypes } from '../../../types/enums/EUserActionTypes';
import { useAppDispatch } from '../../../hooks/storeHooks';
import { createObjectFromFormData } from '../../../utils/createObjectFromFormData';

interface IUserAddressFormProps {
  addressId: string;
  user: IUser;
}

export function UserAddressForm({ addressId, user }: IUserAddressFormProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [isFormEditable, setIsFormEditable] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isShipping, setIsShipping] = useState<boolean>(
    user.shippingAddressIds.includes(addressId || '')
  );
  const [isBilling, setIsBilling] = useState<boolean>(
    user.billingAddressIds.includes(addressId || '')
  );
  const [isUpdateSuccessfully, setIsUpdateSuccessfully] = useState<boolean>(true);

  useEffect(() => {
    if (!addressId || !user.id) {
      return;
    }

    const addresses = user.addresses
      .filter((address) => address.id === addressId)
      .map((address, index) =>
        Object.entries(address).map(([key, value]) => ({ [`${key}_${index}`]: value }))
      )
      .flat();

    const addressObject = addresses.reduce((obj, value) => Object.assign(obj, value), {});

    setFormData({
      ...addressObject
    });
    setIsShipping(user.shippingAddressIds.includes(addressId || ''));
    setIsBilling(user.billingAddressIds.includes(addressId || ''));
  }, [addressId, user]);

  const handleClickConfirm = () => {
    dispatch(removeAddress(addressId));
    dispatch(
      updateMeRequestAsync({
        version: user.version,
        actions: [
          {
            action: EUserActionTypes.removeAddress,
            addressId
          }
        ]
      })
    ).then((payload) => {
      setIsUpdateModalOpen(true);

      if (payload.type.includes('rejected')) {
        setIsUpdateSuccessfully(false);
        return;
      }

      setIsUpdateSuccessfully(true);
      setIsFormEditable(false);
      setTimeout(() => {
        setIsUpdateModalOpen(false);
      }, 1500);
    });
    setIsModalOpen(false);
  };

  const handleClickCancel = () => {
    setIsModalOpen(false);
  };

  const handleClickCross = () => {
    setIsModalOpen(true);
  };

  const handleClickEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsFormEditable(true);

    if (isFormEditable) {
      const dataObject = Object.fromEntries(new FormData(event.currentTarget));
      const addressData = createObjectFromFormData(dataObject);

      const actions: Array<MyCustomerUpdateAction> = [
        {
          action: EUserActionTypes.changeAddress,
          addressId,
          address: createAddressFromForm(addressData)
        }
      ];

      Object.entries(addressData).forEach(([key]) => {
        switch (key) {
          case 'typeBilling':
            actions.push({
              action: EUserActionTypes.addBillingAddressId,
              addressId
            });
            break;
          case 'typeShipping':
            actions.push({
              action: EUserActionTypes.addShippingAddressId,
              addressId
            });
            break;
          case 'defaultBilling':
            actions.push({
              action: EUserActionTypes.setDefaultBillingAddress,
              addressId
            });
            break;
          case 'defaultShipping':
            actions.push({
              action: EUserActionTypes.setDefaultShippingAddress,
              addressId
            });
            break;
          default:
            break;
        }
      });

      if (isShipping && !Object.prototype.hasOwnProperty.call(addressData, 'typeShipping')) {
        actions.push({
          action: EUserActionTypes.removeShippingAddressId,
          addressId
        });
      }

      if (isBilling && !Object.prototype.hasOwnProperty.call(addressData, 'typeBilling')) {
        actions.push({
          action: EUserActionTypes.removeShippingAddressId,
          addressId
        });
      }

      dispatch(
        updateMeRequestAsync({
          version: user.version,
          actions
        })
      ).then((payload) => {
        setIsUpdateModalOpen(true);

        if (payload.type.includes('rejected')) {
          setIsUpdateSuccessfully(false);
          return;
        }

        setIsUpdateSuccessfully(true);
        setIsFormEditable(false);
        setTimeout(() => {
          setIsUpdateModalOpen(false);
        }, 1500);
      });
    }
  };

  return (
    <form className={styles.form} ref={ref} onSubmit={handleClickEdit}>
      <span className={styles.cross} onClick={handleClickCross}>
        <CrossIcon />
      </span>
      <button className={styles.edit}>{isFormEditable ? <ConfirmIcon /> : <EditIcon />}</button>
      <fieldset className={styles.fieldset} disabled={!isFormEditable}>
        <RegistrationAddress
          formData={formData}
          setFormData={setFormData}
          formError={formError}
          setFormError={setFormError}
          addressCount={3}
          setAddressCount={() => {}}
          isShipping={isShipping}
          isBilling={isBilling}
          isDefaultShipping={user.defaultShippingAddressId === addressId}
          isDefaultBilling={user.defaultBillingAddressId === addressId}
        />
      </fieldset>
      {isModalOpen && (
        <Modal>
          <article className={styles.modal}>
            <ElephantIcon />
            <h6 className={styles.modal_title}>Удалить адрес?</h6>
            <div className={styles.buttons}>
              <BaseButton textContent="Удалить" onClick={handleClickConfirm} />
              <BaseButton
                textContent="Отмена"
                mode={EBaseButtonMode.secondary}
                onClick={handleClickCancel}
              />
            </div>
          </article>
        </Modal>
      )}

      {isUpdateModalOpen && (
        <Modal onClose={() => setIsUpdateModalOpen(false)}>
          <article className={styles.modal}>
            <ElephantIcon />
            {isUpdateSuccessfully ? (
              <h4 className={styles.modal_title}>Ваши данные обновлены</h4>
            ) : (
              <h4 className={styles.modal_title}>Произошла ошибка. Попробуйте позже</h4>
            )}
          </article>
        </Modal>
      )}
    </form>
  );
}
