import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './baseInputField.scss';

interface IBaseTextInputFieldProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
}

export function BaseInputField({
  name,
  value,
  placeholder,
  onChange,
  error = '',
  type = 'text'
}: IBaseTextInputFieldProps) {
  const inputClassName = classNames({
    [`${styles.input}`]: true,
    [`${styles.input_error}`]: error,
    [`${styles.input_valid}`]: !error && value
  });

  return (
    <label htmlFor={name} className={styles.label}>
      {error && <span className={styles.error}>{error}</span>}
      <input
        className={inputClassName}
        type={type}
        name={name}
        id={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}
