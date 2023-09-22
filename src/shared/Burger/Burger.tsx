import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';
import styles from './burger.scss';

interface IBurgerProps {
  children: ReactNode;
}

export function Burger({ children }: IBurgerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const className = classNames({
    [`${styles.burger}`]: true,
    [`${styles.burger__active}`]: isOpen
  });

  const containerClassName = classNames({
    [`${styles.container}`]: true,
    [`${styles.container__active}`]: isOpen
  });

  return (
    <div>
      <button onClick={handleClick} className={className}>
        <span className={styles.burger_line}></span>
      </button>
      <div className={containerClassName}>{children}</div>
    </div>
  );
}
