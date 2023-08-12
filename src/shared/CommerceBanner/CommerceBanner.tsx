import React from 'react';
import classNames from 'classnames';
import { BaseButton } from '../BaseButton';
import styles from './commerceBanner.scss';

export function CommerceBanner() {
  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <section className={styles.section}>
      <div className={className}>
        <h2 className={styles.title}>Оксфорд 1950</h2>
        <div className={styles.subtitle}>Новая коллекция изысканных кресел</div>
        <BaseButton textContent="Ознакомиться" />
      </div>
    </section>
  );
}
