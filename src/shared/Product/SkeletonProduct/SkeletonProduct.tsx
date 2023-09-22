import React from 'react';
import classNames from 'classnames';
import styles from './skeletonProduct.scss';

export function SkeletonProduct() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <div className={styles.main_slider}></div>
      <div className={styles.thumb_slider}></div>
      <div className={styles.info}>
        <div className={styles.rating}></div>
        <div className={styles.title}></div>
        <div className={styles.price}></div>
        <div className={styles.button}></div>
      </div>
      <div className={styles.description}>
        <div className={styles.description_item}></div>
        <div className={styles.description_item}></div>
        <div className={styles.description_item}></div>
        <div className={styles.description_item}></div>
      </div>
      <div className={styles.characteristics}>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
        <div className={styles.characteristics_item}></div>
      </div>
    </div>
  );
}
