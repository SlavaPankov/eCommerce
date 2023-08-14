import React, { ChangeEvent, FormEvent } from 'react';
import classNames from 'classnames';
import InputMask from 'react-input-mask';
import styles from './baseInputField.scss';

interface IBaseInputFieldProps {
  name: string;
  value: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  onFocus?: (event: FormEvent<HTMLInputElement>) => void;
  onBlur?: (event: FormEvent<HTMLInputElement>) => void;
  isDisabled?: boolean;
  maxLength?: number;
}

const NOOP = () => {};

export function BaseInputField({
  name,
  value,
  placeholder,
  onChange,
  onFocus = NOOP,
  onBlur = NOOP,
  error = '',
  type = 'text',
  isDisabled = false,
  maxLength = 524288
}: IBaseInputFieldProps) {
  const inputClassName = classNames({
    [`${styles.input}`]: true,
    [`${styles.input_error}`]: error,
    [`${styles.input_valid}`]: !error && value
  });

  return (
    <label htmlFor={name} className={styles.label}>
      {error && <span className={styles.error}>{error}</span>}
      {type !== 'tel' ? (
        <input
          className={inputClassName}
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={isDisabled}
          maxLength={maxLength}
        />
      ) : (
        <InputMask
          className={inputClassName}
          type={type}
          name={name}
          id={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          mask="+7 (999) 999-99-99"
          disabled={isDisabled}
        />
      )}
    </label>
  );
}
