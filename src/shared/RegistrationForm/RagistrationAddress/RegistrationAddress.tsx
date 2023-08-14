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
  formData: { [k: string]: string };
  setFormData: (data: { [k: string]: string }) => void;
  formError: { [k: string]: string };
  setFormError: (data: { [k: string]: string }) => void;
  addressCount: number;
  setAddressCount: (count: number) => void;
  index?: number;
}

export function RegistrationAddress({
  addressCount,
  setAddressCount,
  index = 0,
  formData,
  setFormData,
  formError,
  setFormError
}: IRegistrationAddressProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [checkboxData, setCheckboxData] = useState({
    defaultShipping: false,
    defaultBilling: false,
    [`typeShipping_${index}`]: true,
    [`typeBilling_${index}`]: false
  });
  const [selectedCountry, setSelectedCountry] = useState('Выберите*');

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
        Тип*:
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
          isRequired={true}
          type="hidden"
          name={`${EFieldsNames.country}_${index}`}
          value={formData[`${EFieldsNames.country}_${index}`] || ''}
          placeholder="Страна*"
          onChange={handleChange}
          error={formError[`${EFieldsNames.country}_${index}`]}
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
          isRequired={true}
          name={`${EFieldsNames.postalCode}_${index}`}
          value={formData[`${EFieldsNames.postalCode}_${index}`] || ''}
          placeholder="Почтовый индекс*"
          onChange={handleChange}
          onBlur={handleBlurRequired}
          error={formError[`${EFieldsNames.postalCode}_${index}`]}
          maxLength={6}
        />
      </div>
      <BaseInputField
        isRequired={true}
        name={`${EFieldsNames.region}_${index}`}
        value={formData[`${EFieldsNames.region}_${index}`] || ''}
        placeholder="Регион*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.region}_${index}`]}
      />
      <BaseInputField
        isRequired={true}
        name={`${EFieldsNames.city}_${index}`}
        value={formData[`${EFieldsNames.city}_${index}`] || ''}
        placeholder="Населенный пункт*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.city}_${index}`]}
      />
      <BaseInputField
        isRequired={true}
        name={`${EFieldsNames.streetName}_${index}`}
        value={formData[`${EFieldsNames.streetName}_${index}`] || ''}
        placeholder="Улица*"
        onChange={handleChange}
        onBlur={handleBlurRequired}
        error={formError[`${EFieldsNames.streetName}_${index}`]}
      />
      <div className={styles.wrapper}>
        <BaseInputField
          name={`${EFieldsNames.building}_${index}`}
          value={formData[`${EFieldsNames.building}_${index}`]}
          placeholder="Дом"
          onChange={handleChange}
          onBlur={handleBlur}
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
        value={`${index}`}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultShipping}
        label="Сделать адресом для доставки по умолчанию"
      />
      <BaseCheckbox
        type="radio"
        name="defaultBilling"
        value={`${index}`}
        onChange={handleChangeCheckbox}
        isChecked={checkboxData.isDefaultBilling}
        label="Сделать адресом для счетов по умолчанию"
      />
    </div>
  );
}
