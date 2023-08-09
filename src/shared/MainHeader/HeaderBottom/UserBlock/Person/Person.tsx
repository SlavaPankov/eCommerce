import React from 'react';
import { Link } from 'react-router-dom';
import { PersonIcon } from '../../../../Icons';
import styles from './person.scss';

export function Person() {
  return (
    <Link className={styles.link} to="/login">
      <div>
        <PersonIcon />
      </div>
    </Link>
  );
}
