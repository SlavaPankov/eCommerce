import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './baseRoundButton.scss';

interface IBaseRoundButtonProps {
  isRight?: boolean;
  handleClick?: (event?: MouseEvent<HTMLButtonElement>) => void;
}

const NOOP = () => {};

export function BaseRoundButton({ handleClick = NOOP, isRight = true }: IBaseRoundButtonProps) {
  const className = classNames('btn-reset', {
    [`${styles.btn}`]: true,
    [`${styles.btn_rotate}`]: !isRight
  });

  return <button className={className} onClick={handleClick}></button>;
}
