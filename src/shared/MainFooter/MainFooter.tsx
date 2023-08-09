import React from 'react';
import styles from './mainFooter.scss';
import { FooterBottom } from './FooterBottom';
import { FooterTop } from './FooterTop';

export function MainFooter() {
  return (
    <footer className={styles.footer}>
      <FooterTop />
      <FooterBottom />
    </footer>
  );
}
