import React, { ChangeEvent, useState } from 'react';
import styles from './callbackForm.scss';
import { BaseInputField } from '../../BaseTextInputField';
import { BaseButton } from '../../BaseButton';
import { BaseCheckbox } from '../../BaseCheckbox';

interface IFormData {
  name: string;
  phone: string;
  email: string;
}

const initialFormData: IFormData = {
  name: '',
  phone: '',
  email: ''
};

export function CallbackForm() {
  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [formError] = useState<IFormData>(initialFormData);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  return (
    <form className={styles.form}>
      <BaseInputField
        name="name"
        value={formData.name}
        placeholder="Ваше имя"
        onChange={handleChange}
        error={formError.name}
      />
      <BaseInputField
        name="phone"
        value={formData.phone}
        placeholder="Ваш телефон"
        onChange={handleChange}
        error={formError.phone}
      />
      <BaseInputField
        name="email"
        value={formData.email}
        placeholder="Ваш E-mail"
        onChange={handleChange}
        error={formError.email}
      />
      <BaseButton textContent="Отправить" />
      <BaseCheckbox
        name="agreement"
        value="test"
        onChange={() => {}}
        isChecked={true}
        id="checkbox"
        label="Принимаю пользовательское соглашение"
      />
    </form>
  );
}
