import React from 'react';
import classNames from 'classnames';
import { PhoneLink } from './PhoneLink';
import { RegionDropdown } from './RegionDropdown';
import { TopNavigation } from './TopNavigation';
import styles from './headerTop.scss';

export function HeaderTop() {
  const containerClassName = classNames('container', {
    [`${styles.top_container}`]: true
  });

  return (
    <div className={styles.top}>
      <div className={containerClassName}>
        <RegionDropdown />
        <PhoneLink />
        <TopNavigation />
      </div>
    </div>
  );
}
