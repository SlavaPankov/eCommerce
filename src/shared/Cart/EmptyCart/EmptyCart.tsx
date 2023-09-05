import React from 'react';
import { Link } from 'react-router-dom';
import styles from './emptyCart.scss';
import { ElephantIcon } from '../../Icons';

export function EmptyCart() {
  return (
    <div className={styles.container}>
      <ElephantIcon />
      <h1 className={styles.title}>Ваша корзина пустая</h1>
      <Link to="/catalog" className={styles.link}>
        В каталог
      </Link>
    </div>
  );
}
