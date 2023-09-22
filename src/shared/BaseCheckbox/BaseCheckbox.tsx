import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './baseCheckbox.scss';

interface IBaseCheckboxProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  label: string;
  type?: 'checkbox' | 'radio';
}

export function BaseCheckbox({
  name,
  value,
  onChange,
  isChecked,
  label,
  type = 'checkbox'
}: IBaseCheckboxProps) {
  const inputClassName = classNames('visually-hidden', {
    [`${styles.checkbox__field}`]: true
  });

  return (
    <label className={styles.checkbox}>
      <input
        type={type}
        className={inputClassName}
        name={name}
        value={value}
        onChange={onChange}
        checked={isChecked}></input>
      <span className={styles.checkbox__content}></span>
      {label}
    </label>
  );
}
