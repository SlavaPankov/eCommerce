import React from 'react';
import styles from './noSearchResults.scss';
import { ElephantIcon } from '../../Icons';

export function NoSearchResults() {
  return (
    <div className={styles.container}>
      <ElephantIcon />
      <p className={styles.text}>По вашему запросу ничего не нашлось</p>
    </div>
  );
}
