import React from 'react';
import classNames from 'classnames';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import styles from './baseButton.scss';

interface IBaseButtonProps {
  textContent: string;
  onClick?: () => void;
  mode?: EBaseButtonMode;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  form?: string;
}

export function BaseButton({
  textContent,
  onClick = () => {},
  mode = EBaseButtonMode.primary,
  isDisabled = false,
  type = 'button',
  form = ''
}: IBaseButtonProps) {
  const className = classNames({
    [`${styles.primary}`]: mode === EBaseButtonMode.primary,
    [`${styles.secondary}`]: mode === EBaseButtonMode.secondary
  });

  return (
    <button form={form} type={type} className={className} onClick={onClick} disabled={isDisabled}>
      {textContent}
    </button>
  );
}
