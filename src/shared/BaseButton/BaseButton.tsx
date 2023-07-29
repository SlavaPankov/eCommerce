import React from 'react';
import classNames from 'classnames';
import { EBaseButtonMode } from '../../types/enums/EBaseButtonMode';
import styles from './baseButton.scss';

interface IBaseButtonProps {
  textContent: string;
  onClick?: () => void;
  mode?: EBaseButtonMode;
  isDisabled?: boolean;
}

export function BaseButton({
  textContent,
  onClick = () => {},
  mode = EBaseButtonMode.primary,
  isDisabled = false
}: IBaseButtonProps) {
  const className = classNames({
    [`${styles.primary}`]: mode === EBaseButtonMode.primary,
    [`${styles.secondary}`]: mode === EBaseButtonMode.secondary
  });

  return (
    <button className={className} onClick={onClick} disabled={isDisabled}>
      {textContent}
    </button>
  );
}
