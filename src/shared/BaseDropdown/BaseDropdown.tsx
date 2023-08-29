import React, { ReactNode, useEffect, useState, KeyboardEvent } from 'react';
import classNames from 'classnames';
import styles from './baseDropdown.scss';

interface IBaseDropdownProps {
  children: ReactNode;
  button: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  className?: string;
  withArrow?: boolean;
}

const NOOP = () => {};

export function BaseDropdown({
  children,
  button,
  isOpen = false,
  onOpen = NOOP,
  onClose = NOOP,
  className = '',
  withArrow = true
}: IBaseDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);

  const handleOpen = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.code.toLowerCase().trim() === 'space') {
      handleOpen();
    }
  };

  useEffect(() => {
    setIsDropdownOpen(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isDropdownOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isDropdownOpen]);

  const listClassName = classNames({
    [`${styles.list}`]: true,
    [`${className}`]: className !== ''
  });

  return (
    <div className={styles.container}>
      <div className={withArrow ? styles.arrow : ''} onKeyDown={handleKeyDown} onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div
            className={listClassName}
            onClick={() => setIsDropdownOpen(false)}
            onKeyDown={handleKeyDown}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
