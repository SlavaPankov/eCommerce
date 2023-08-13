import React, { ChangeEvent, useRef, useState } from 'react';
import styles from './registrationAddress.scss';
import { BaseInputField } from '../../BaseInputField';
import { CrossIcon } from '../../Icons';

enum EFieldsNames {
  country = 'country',
  region = 'region',
  city = 'city',
  streetName = 'streetName',
  building = 'building',
  apartment = 'apartment',
  postalCode = 'postalCode'
}

interface IFormData {
  country: string;
  region: string;
  city: string;
  streetName: string;
  building: string;
  apartment: string;
  postalCode: string;
}

interface IRegistrationAddressProps {
  addressCount: number;
  setAddressCount: (count: number) => void;
}

export function RegistrationAddress({ addressCount, setAddressCount }: IRegistrationAddressProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [formData, setFormData] = useState<IFormData>({
    country: '',
    region: '',
    city: '',
    building: '',
    apartment: '',
    streetName: '',
    postalCode: ''
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleClickCross = () => {
    setAddressCount(addressCount - 1);
    console.log(ref.current?.parentElement);
    ref.current?.parentElement?.remove();
  };

  return (
    <div className={styles.address}>
      <span className={styles.cross} ref={ref} onClick={handleClickCross}>
        <CrossIcon />
      </span>
      <div className={styles.wrapper}>
        <BaseInputField
          name={EFieldsNames.country}
          value={formData.country}
          placeholder="Страна*"
          onChange={handleChange}
        />
        <BaseInputField
          name={EFieldsNames.postalCode}
          value={formData.postalCode}
          placeholder="Почтовый индекс"
          onChange={handleChange}
        />
      </div>
      <BaseInputField
        name={EFieldsNames.region}
        value={formData.region}
        placeholder="Регион"
        onChange={handleChange}
      />
      <BaseInputField
        name={EFieldsNames.city}
        value={formData.city}
        placeholder="Населенный пункт"
        onChange={handleChange}
      />
      <BaseInputField
        name={EFieldsNames.streetName}
        value={formData.streetName}
        placeholder="Улица"
        onChange={handleChange}
      />
      <div className={styles.wrapper}>
        <BaseInputField
          name={EFieldsNames.building}
          value={formData.building}
          placeholder="Дом"
          onChange={handleChange}
        />
        <BaseInputField
          name={EFieldsNames.apartment}
          value={formData.apartment}
          placeholder="Квартира"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}
