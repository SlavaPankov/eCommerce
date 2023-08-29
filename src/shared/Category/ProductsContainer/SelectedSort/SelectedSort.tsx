import React from 'react';
import styles from './selectedSort.scss';

interface ISelectedSortProps {
  textContent: string;
}

export function SelectedSort({ textContent }: ISelectedSortProps) {
  return <span className={styles.selected}>{textContent}</span>;
}
