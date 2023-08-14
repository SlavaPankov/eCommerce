import React, { ChangeEvent, FormEvent, MouseEvent, useRef, useState } from 'react';
import styles from './registrationAddress.scss';
import { BaseInputField } from '../../BaseInputField';
import { CrossIcon } from '../../Icons';
import { EErrorText } from '../../../types/enums/EErrorText';
import { BaseCheckbox } from '../../BaseCheckbox';
import { BaseSelect } from '../../BaseSelect';

enum EFieldsNames {
  country = 'country',
  region = 'region',
  city = 'city',
  streetName = 'streetName',
  building = 'building',
  apartment = 'apartment',
  postalCode = 'postalCode',
  isDefaultShipping = 'isDefaultShipping',
  isDefaultBilling = 'isDefaultBilling',
  typeBilling = 'typeBilling',
  typeShipping = 'typeShipping'
}

interface ICountry {
  label: string;
  value: string;
}

const countries: Array<ICountry> = [
  {
    label: 'Россия',
    value: 'RU'
  },
  {
    label: 'Казахстан',
    value: 'KZ'
  }
];

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
    [`country_${index}`]: '',
    [`region_${index}`]: '',
    [`city_${index}`]: '',
    [`building_${index}`]: '',
    [`apartment_${index}`]: '',
    [`streetName_${index}`]: '',
    [`postalCode_${index}`]: '',
    [`isDefaultBilling_${index}`]: '',
    [`isDefaultShipping_${index}`]: '',
    [`typeShipping_${index}`]: '',
    [`typeBilling_${index}`]: ''
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
    [`isDefaultBilling_${index}`]: false,
    [`typeShipping_${index}`]: false,
    [`typeBilling_${index}`]: false
  });
  const [selectedCountry, setSelectedCountry] = useState('Выберите');

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

  const handleClickSelect = (event: MouseEvent<HTMLLIElement>) => {
    setSelectedCountry(event.currentTarget.textContent || 'Выберите');
    setFormData({
      ...formData,
      [`country_${index}`]: event.currentTarget.getAttribute('data-value') || ''
    });
  };

  return (
    <div className={styles.address}>
      {index !== 0 ? (
        <span className={styles.cross} ref={ref} onClick={handleClickCross}>
          <CrossIcon />
        </span>
      ) : null}
      <div className={styles.type_wrapper}>
        Тип:
        <BaseCheckbox
          name={`${EFieldsNames.typeShipping}_${index}`}
          value={index.toString()}
          onChange={handleChangeCheckbox}
          isChecked={checkboxData[`typeShipping_${index}`]}
          label="Адрес для доставки"
        />
        <BaseCheckbox
          name={`${EFieldsNames.typeBilling}_${index}`}
          value={index.toString()}
          onChange={handleChangeCheckbox}
          isChecked={checkboxData[`typeBilling_${index}`]}
          label="Адрес для счетов"
        />
      </div>
      <div className={styles.country_wrapper}>
        <BaseInputField
          type="hidden"
          name={`${EFieldsNames.country}_${index}`}
          value={formData[`${EFieldsNames.country}_${index}`]}
          placeholder="Страна*"
          onChange={handleChange}
        />
        <BaseSelect selectedValue={selectedCountry}>
          <ul className={styles.list}>
            {countries.map((country, countryIndex) => (
              <li
                onClick={handleClickSelect}
                className={styles.item}
                data-value={country.value}
                key={countryIndex}>
                {country.label}
              </li>
            ))}
          </ul>
        </BaseSelect>
        <BaseInputField
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
        type="radio"
        name="defaultShipping"
        value={EFieldsNames.isDefaultShipping}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultShipping}
        label="Сделать адресом для доставки по умолчанию"
      />
      <BaseCheckbox
        type="radio"
        name="defaultBilling"
        value={EFieldsNames.isDefaultBilling}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultBilling}
        label="Сделать адресом для счетов по умолчанию"
      />
    </div>
  );
}
