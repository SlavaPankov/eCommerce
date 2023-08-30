import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Customer, MyCustomerUpdateAction } from '@commercetools/platform-sdk';
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
import { EErrorText } from '../../../types/enums/EErrorText';

interface IUserAddressFormProps {
  addressId: string;
  user: IUser;
}

export function UserAddressForm({ addressId, user }: IUserAddressFormProps) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState<IFormData>({});
  const [formError, setFormError] = useState<IFormData>({});
  const [globalFormError, setGlobalFormError] = useState<string>('');
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
  const [isNewAddress, setIsNewAddress] = useState<boolean>(false);

  useEffect(() => {
    if (!addressId || !user.id || !Number.isNaN(Number(addressId))) {
      setIsNewAddress(true);
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

  useEffect(() => {
    if (isNewAddress) {
      setIsFormEditable(true);
    }
  }, [isNewAddress]);

  const isFormValid = () => {
    let flag = true;
    const requiredFields =
      ref.current?.querySelectorAll<HTMLInputElement>('[data-required="true"]');

    if (!requiredFields) {
      return flag;
    }

    for (let i = 0; i < requiredFields.length; i += 1) {
      const item = requiredFields[i];
      flag = item.value !== '';

      if (!flag) {
        return flag;
      }
    }

    Object.values(formError).forEach((errorValue) => {
      flag = !errorValue;
    });

    return flag;
  };

  const handleClickConfirm = () => {
    if (!addressId) {
      return;
    }

    dispatch(removeAddress(addressId));
    if (!isNewAddress) {
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
    }

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
    setGlobalFormError('');

    if (isFormEditable) {
      if (!isFormValid()) {
        const tempError: IFormData = {};
        const requiredFields =
          ref.current?.querySelectorAll<HTMLInputElement>('[data-required="true"]');

        if (!requiredFields) {
          return;
        }

        requiredFields.forEach((item) => {
          if (item.value === '') {
            tempError[item.name] = EErrorText.requiredField;
          }
        });
        setFormError({
          ...formError,
          ...tempError
        });
        setGlobalFormError('Заполните все обязательные поля');
        return;
      }

      const dataObject = Object.fromEntries(new FormData(event.currentTarget));
      const addressData = createObjectFromFormData(dataObject);

      if (!isNewAddress) {
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
      } else {
        const response = await dispatch(
          updateMeRequestAsync({
            version: user.version,
            actions: [
              {
                action: EUserActionTypes.addAddress,
                address: createAddressFromForm(addressData)
              }
            ]
          })
        );

        if (!response.type.includes('reject')) {
          const customer = response.payload as Customer;
          const actions: Array<MyCustomerUpdateAction> = [];
          const lastAddedAddress = [...customer.addresses].pop();

          if (lastAddedAddress) {
            Object.entries(addressData).forEach(([key]) => {
              switch (key) {
                case 'typeBilling':
                  actions.push({
                    action: EUserActionTypes.addBillingAddressId,
                    addressId: lastAddedAddress.id
                  });
                  break;
                case 'typeShipping':
                  actions.push({
                    action: EUserActionTypes.addShippingAddressId,
                    addressId: lastAddedAddress.id
                  });
                  break;
                case 'defaultBilling':
                  actions.push({
                    action: EUserActionTypes.setDefaultBillingAddress,
                    addressId: lastAddedAddress.id
                  });
                  break;
                case 'defaultShipping':
                  actions.push({
                    action: EUserActionTypes.setDefaultShippingAddress,
                    addressId: lastAddedAddress.id
                  });
                  break;
                default:
                  break;
              }
            });

            dispatch(
              updateMeRequestAsync({
                version: customer.version,
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
              setIsNewAddress(false);
              setTimeout(() => {
                setIsUpdateModalOpen(false);
              }, 1500);
            });
          }
        }
      }
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
      {globalFormError ? <span className={styles.error}>{globalFormError}</span> : null}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
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
