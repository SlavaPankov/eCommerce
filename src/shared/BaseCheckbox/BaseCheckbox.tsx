import React, { ChangeEvent } from 'react';
import classNames from 'classnames';
import styles from './baseCheckbox.scss';

interface IBaseCheckboxProps {
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  isChecked: boolean;
  id: string | number;
  label: string;
}

export function BaseCheckbox({ name, value, onChange, isChecked, id, label }: IBaseCheckboxProps) {
  const inputClassName = classNames('visually-hidden', {
    [`${styles.checkbox__field}`]: true
  });

  return (
    <label className={styles.checkbox} htmlFor={`${id}`}>
      <input
        id={`${id}`}
        type="checkbox"
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
