import React from 'react';
import classNames from 'classnames';
import { SearchForm } from './SearchForm';
import styles from './headerBottom.scss';
import { UserBlock } from './UserBlock';

export function HeaderBottom() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <SearchForm />
      <UserBlock />
    </div>
  );
}
