import React from 'react';
import styles from './baseSpinner.scss';

export function BaseSpinner() {
  return (
    <div className={styles.ldsRing}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
