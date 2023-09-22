import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './baseSelect.scss';
import { ArrowIcon } from '../Icons';

interface IBaseSelectProps {
  children: ReactNode;
  selectedValue?: ReactNode;
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
}
export function BaseSelect({
  children,
  selectedValue,
  isOpen,
  onClick,
  className = ''
}: IBaseSelectProps) {
  const [isSelectOpen, setIsSelectOpen] = useState(isOpen);
  useEffect(() => setIsSelectOpen(isOpen), [isOpen]);

  function handleClick() {
    if (isOpen === undefined) {
      setIsSelectOpen(!isSelectOpen);
    }
  }

  const arrowClassName = classNames({
    [`${styles.arrow}`]: true,
    [`${styles.arrowRotate}`]: isSelectOpen
  });

  const listClassName = classNames({
    [`${styles.list}`]: true,
    [`${className}`]: className !== ''
  });

  return (
    <div className={styles.select}>
      <div className={styles.selected} onClick={onClick || handleClick}>
        {selectedValue || <li>Выберите</li>}
        <div className={arrowClassName}>
          <ArrowIcon />
        </div>
      </div>
      {isSelectOpen && (
        <div className={styles.listContainer}>
          <div className={listClassName} onClick={() => setIsSelectOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
