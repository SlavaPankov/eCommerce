import React from 'react';
import { Link } from 'react-router-dom';
import styles from './logo.scss';
import { HeaderLogo } from '../Icons';
import { ERoutes } from '../../types/enums/ERoutes';

export function Logo() {
  return (
    <Link className={styles.logo} to={ERoutes.main}>
      <HeaderLogo />
    </Link>
  );
}
