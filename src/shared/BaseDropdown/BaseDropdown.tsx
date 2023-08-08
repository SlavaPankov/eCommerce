import React, { ReactNode, useEffect, useState, KeyboardEvent } from 'react';
import styles from './baseDropdown.scss';

interface IBaseDropdownProps {
  children: ReactNode;
  button: ReactNode;
  isOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function BaseDropdown({
  children,
  button,
  isOpen = false,
  onOpen = NOOP,
  onClose = NOOP
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

  return (
    <div className={styles.container}>
      <div onKeyDown={handleKeyDown} onClick={handleOpen}>
        {button}
      </div>
      {isDropdownOpen && (
        <div className={styles.listContainer}>
          <div
            className={styles.list}
            onClick={() => setIsDropdownOpen(false)}
            onKeyDown={handleKeyDown}>
            {children}
          </div>
        </div>
      )}
    </div>
  );
}
