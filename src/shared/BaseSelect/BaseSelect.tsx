import React, { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './baseSelect.scss';
import { ArrowIcon } from '../Icons';

interface IBaseSelectProps {
  children: ReactNode;
  selectedValue?: ReactNode;
  isOpen?: boolean;
}
export function BaseSelect({ children, selectedValue, isOpen }: IBaseSelectProps) {
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

  return (
    <div className={styles.select}>
      <div className={styles.selected} onClick={handleClick}>
        {selectedValue || <li>Выберите</li>}
        <div className={arrowClassName}>
          <ArrowIcon />
        </div>
      </div>
      {isSelectOpen && (
        <div className={styles.listContainer}>
          <div className={styles.list} onClick={() => setIsSelectOpen(false)}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
