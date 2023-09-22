import React from 'react';
import styles from './selectedCategory.scss';

interface ISelectedCategoryProps {
  text: string;
  value: string;
}

export function SelectedCategory({ text, value }: ISelectedCategoryProps) {
  return (
    <label htmlFor="category" className={styles.label}>
      <input name="category" id="category" type="hidden" value={value} />
      <div className={styles.selected} tabIndex={0}>
        {text}
      </div>
    </label>
  );
}
