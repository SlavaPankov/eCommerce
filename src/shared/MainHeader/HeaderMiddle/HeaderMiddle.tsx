import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { HeaderLogo } from '../../Icons';
import { MiddleNavigation } from './MiddleNavigation';
import styles from './headerMiddle.scss';

export function HeaderMiddle() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <Link to="/">
        <HeaderLogo />
      </Link>
      <MiddleNavigation />
    </div>
  );
}
