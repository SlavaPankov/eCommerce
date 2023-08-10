import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.scss';
import { HeaderLogo } from '../Icons';

export function Logo() {
  return (
    <Link className={styles.logo} to="/">
      <HeaderLogo />
    </Link>
  );
}
