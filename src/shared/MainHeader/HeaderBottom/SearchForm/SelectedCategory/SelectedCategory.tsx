import React from 'react';
import styles from './selectedCategory.scss';

interface ISelectedCategoryProps {
  text: string;
}

export function SelectedCategory({ text }: ISelectedCategoryProps) {
  return (
    <div className={styles.selected} tabIndex={0}>
      {text}
    </div>
  );
}
