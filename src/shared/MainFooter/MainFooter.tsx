import React from 'react';
import classNames from 'classnames';
import styles from './mainFooter.scss';
import { FooterBottom } from './FooterBottom';

export function MainFooter() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={containerClassName}>
          <div></div>
          <div></div>
        </div>
      </div>
      <FooterBottom />
    </footer>
  );
}
