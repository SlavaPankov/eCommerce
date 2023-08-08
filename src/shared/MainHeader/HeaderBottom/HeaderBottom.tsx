import React from 'react';
import classNames from 'classnames';
import { SearchForm } from './SearchForm';
import styles from './headerBottom.scss';

export function HeaderBottom() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <SearchForm />
    </div>
  );
}
