import React from 'react';
import classNames from 'classnames';
import { PhoneLink } from './PhoneLink';
import { RegionDropdown } from './RegionDropdown';
import { TopNavigation } from './TopNavigation';
import { UserBlock } from '../HeaderBottom/UserBlock';
import styles from './headerTop.scss';
import { Logo } from '../../Logo';

export function HeaderTop() {
  const containerClassName = classNames('container', {
    [`${styles.top_container}`]: true
  });

  const containerTabletClassName = classNames('container', {
    [`${styles.top_container_tablet}`]: true
  });

  return (
    <div className={styles.header_top_container}>
      <div className={styles.top_tablet}>
        <div className={containerTabletClassName}>
          <RegionDropdown />
          <PhoneLink />
        </div>
      </div>
      <div className={styles.top}>
        <div className={containerClassName}>
          <div className={styles.wrapper}>
            <RegionDropdown />
            <PhoneLink />
          </div>
          <div className={styles.logo_wrapper}>
            <Logo />
          </div>
          <div className={styles.navigation_wrapper}>
            <TopNavigation />
          </div>
          <div className={styles.user_wrapper}>
            <UserBlock />
          </div>
        </div>
      </div>
    </div>
  );
}
