import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './baseRoundButton.scss';

interface IBaseRoundButtonProps {
  isLeft?: boolean;
  handleClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
  id?: string;
}

const NOOP = () => {};

export function BaseRoundButton({
  handleClick = NOOP,
  isLeft = false,
  id = ''
}: IBaseRoundButtonProps) {
  const className = classNames('btn-reset', {
    [`${styles.btn}`]: true,
    [`${styles.btn_rotate}`]: isLeft
  });

  return <button id={id} className={className} onClick={handleClick}></button>;
}
