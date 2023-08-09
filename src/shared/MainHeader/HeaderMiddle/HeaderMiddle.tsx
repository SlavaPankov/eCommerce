import React from 'react';
import classNames from 'classnames';
import { MiddleNavigation } from './MiddleNavigation';
import styles from './headerMiddle.scss';
import { Burger } from '../../Burger';
import { UserBlock } from '../HeaderBottom/UserBlock';
import { Logo } from '../../Logo';

export function HeaderMiddle() {
  const containerClassName = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <div className={containerClassName}>
      <Burger>
        <MiddleNavigation />
      </Burger>
      <div className={styles.logo_wrapper}>
        <Logo />
      </div>
      <div className={styles.user_wrapper}>
        <UserBlock />
      </div>
      <div className={styles.wrapper_smtablet}>
        <MiddleNavigation />
      </div>
    </div>
  );
}
