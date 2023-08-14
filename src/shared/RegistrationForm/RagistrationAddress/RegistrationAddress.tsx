import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import styles from './registrationAddress.scss';
import { BaseInputField } from '../../BaseInputField';
import { CrossIcon } from '../../Icons';
import { EErrorText } from '../../../types/enums/EErrorText';
import { BaseCheckbox } from '../../BaseCheckbox';

enum EFieldsNames {
  country = 'country',
  region = 'region',
  city = 'city',
  streetName = 'streetName',
  building = 'building',
  apartment = 'apartment',
  postalCode = 'postalCode',
  isDefaultShipping = 'isDefaultShipping',
  isDefaultBilling = 'isDefaultBilling'
}

interface IRegistrationAddressProps {
  addressCount: number;
  setAddressCount: (count: number) => void;
  index?: number;
}

export function RegistrationAddress({
  addressCount,
  setAddressCount,
  index = 0
}: IRegistrationAddressProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [formData, setFormData] = useState({
    [`country_${index}`]: 'Россия',
    [`region_${index}`]: '',
    [`city_${index}`]: '',
    [`building_${index}`]: '',
    [`apartment_${index}`]: '',
    [`streetName_${index}`]: '',
    [`postalCode_${index}`]: '',
    [`isDefaultBilling_${index}`]: '',
    [`isDefaultShipping_${index}`]: ''
  });
  const [formError, setFormError] = useState({
    [`country_${index}`]: '',
    [`region_${index}`]: '',
    [`city_${index}`]: '',
    [`building_${index}`]: '',
    [`apartment_${index}`]: '',
    [`streetName_${index}`]: '',
    [`postalCode_${index}`]: '',
    [`isDefaultBilling_${index}`]: '',
    [`isDefaultShipping_${index}`]: ''
  });
  const [checkboxData, setCheckboxData] = useState({
    [`isDefaultShipping_${index}`]: false,
    [`isDefaultBilling_${index}`]: false
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormError({ ...formError, [event.target.name]: '' });

    if (event.target.name === EFieldsNames.postalCode) {
      if (!/[0-9]{6}/g.test(event.target.value)) {
        setFormError({ ...formError, [event.target.name]: EErrorText.postalCode });
      }
    }

    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleBlur = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: ''
      });
    }
  };

  const handleBlurRequired = (event: FormEvent<HTMLInputElement>) => {
    if (!event.currentTarget.value) {
      setFormError({
        ...formError,
        [event.currentTarget.name]: EErrorText.requiredField
      });
    }
  };

  const handleChangeCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
    setCheckboxData({
      ...checkboxData,
      [event.target.name]: event.target.checked
    });
  };

  const handleClickCross = () => {
    setAddressCount(addressCount - 1);
    ref.current?.parentElement?.remove();
  };

  return (
    <div className={styles.address}>
      {index !== 0 ? (
        <span className={styles.cross} ref={ref} onClick={handleClickCross}>
          <CrossIcon />
        </span>
      ) : null}
      <div className={styles.wrapper}>
        <BaseInputField
          name={`${EFieldsNames.country}_${index}`}
          value={formData[`${EFieldsNames.country}_${index}`]}
          placeholder="Страна*"
          onChange={handleChange}
          isDisabled={true}
        />
        <BaseInputField
          type="number"
          name={`${EFieldsNames.postalCode}_${index}`}
          value={formData[`${EFieldsNames.postalCode}_${index}`]}
          placeholder="Почтовый индекс*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError[`${EFieldsNames.postalCode}_${index}`]}
          maxLength={6}
        />
      </div>
      <BaseInputField
        name={`${EFieldsNames.region}_${index}`}
        value={formData[`${EFieldsNames.region}_${index}`]}
        placeholder="Регион*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.region}_${index}`]}
      />
      <BaseInputField
        name={`${EFieldsNames.city}_${index}`}
        value={formData[`${EFieldsNames.city}_${index}`]}
        placeholder="Населенный пункт*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.city}_${index}`]}
      />
      <BaseInputField
        name={`${EFieldsNames.streetName}_${index}`}
        value={formData[`${EFieldsNames.streetName}_${index}`]}
        placeholder="Улица*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.streetName}_${index}`]}
      />
      <div className={styles.wrapper}>
        <BaseInputField
          name={`${EFieldsNames.building}_${index}`}
          value={formData[`${EFieldsNames.building}_${index}`]}
          placeholder="Дом*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError[`${EFieldsNames.building}_${index}`]}
        />
        <BaseInputField
          type="number"
          name={`${EFieldsNames.apartment}_${index}`}
          value={formData[`${EFieldsNames.apartment}_${index}`]}
          placeholder="Квартира"
          onChange={handleChange}
          onBlur={handleBlur}
          error={formError[`${EFieldsNames.apartment}_${index}`]}
        />
      </div>
      <BaseCheckbox
        name={`${EFieldsNames.isDefaultShipping}_${index}`}
        value={EFieldsNames.isDefaultShipping}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultShipping}
        label="Сделать адресом для доставки по умолчанию"
      />
      <BaseCheckbox
        name={`${EFieldsNames.isDefaultBilling}_${index}`}
        value={EFieldsNames.isDefaultBilling}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultBilling}
        label="Сделать адресом для счетов по умолчанию"
      />
    </div>
  );
}
