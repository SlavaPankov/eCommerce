import React, { MouseEvent } from 'react';
import classNames from 'classnames';
import styles from './categoriesList.scss';

interface ICategoryListProps {
  handleClick?: (event?: MouseEvent<HTMLLIElement>) => void;
}

export function CategoriesList({ handleClick }: ICategoryListProps) {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <ul className={listClassName}>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Диваны</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Кресла</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Пуфы</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Кровати</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Тумбы</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Комоды</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Стулья</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Столы</span>
      </li>
      <li onClick={handleClick} className={styles.item} tabIndex={0}>
        <span>Аксессуары</span>
      </li>
    </ul>
  );
}
