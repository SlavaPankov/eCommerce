import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ElephantIcon } from '../../shared/Icons';
import styles from './notFound.scss';

export function NotFound() {
  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={className}>
      <ElephantIcon />
      <h1>К сожалению, страница не найдена</h1>
      <Link className={styles.link} to="/">
        На главную
      </Link>
    </div>
  );
}
