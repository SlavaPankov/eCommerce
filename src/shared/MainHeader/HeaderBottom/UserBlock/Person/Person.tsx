import React from 'react';
import { PersonIcon } from '../../../../Icons';
import styles from './person.scss';
import { BaseDropdown } from '../../../../BaseDropdown';
import { PersonEnter } from './PersonEnter';

export function Person() {
  return (
    <BaseDropdown
      className={styles.dropdown}
      button={
        <div className={styles.link}>
          <span>
            <PersonIcon />
          </span>
        </div>
      }>
      <PersonEnter />
    </BaseDropdown>
  );
}
