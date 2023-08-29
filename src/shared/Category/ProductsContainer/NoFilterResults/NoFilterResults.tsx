import React from 'react';
import { ElephantIcon } from '../../../Icons';
import styles from './noFilterResults.scss';

export function NoFilterResults() {
  return (
    <div className={styles.container}>
      <ElephantIcon /> <h2 className={styles.heading}>Товар не найден</h2>
    </div>
  );
}
