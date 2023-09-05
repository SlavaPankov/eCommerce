import React, { MouseEvent } from 'react';
import styles from './categoryItem.scss';

interface ICategoryItemProps {
  text: string;
  handleClick?: (event?: MouseEvent<HTMLLIElement>) => void;
  id: string;
}

export function CategoryItem({ id, text, handleClick }: ICategoryItemProps) {
  return (
    <li data-id={id} onClick={handleClick} className={styles.item} tabIndex={0}>
      <span>{text}</span>
    </li>
  );
}
