import React, { MouseEvent } from 'react';
import styles from './categoryItem.scss';

interface ICategoryItemProps {
  text: string;
  handleClick?: (event?: MouseEvent<HTMLLIElement>) => void;
}

export function CategoryItem({ text, handleClick }: ICategoryItemProps) {
  return (
    <li onClick={handleClick} className={styles.item} tabIndex={0}>
      <span>{text}</span>
    </li>
  );
}
