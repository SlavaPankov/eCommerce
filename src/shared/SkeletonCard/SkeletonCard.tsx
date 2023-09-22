import React from 'react';
import styles from './skeletonCard.scss';

export function SkeletonCard() {
  return (
    <li className={styles.item}>
      <div className={styles.item_preview}></div>
      <div className={styles.item_title}></div>
      <div className={styles.item_price}></div>
      <div className={styles.item_button}></div>
    </li>
  );
}
