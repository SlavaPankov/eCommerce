import React from 'react';
import styles from './footerBottom.scss';

export function FooterBottom() {
  return <div className={styles.bottom}>SDP® 2011-{new Date().getFullYear()}</div>;
}
