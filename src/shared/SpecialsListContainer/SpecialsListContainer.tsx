import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSpecialsData } from '../../hooks/useSpecialsData';
import { SpecialsList } from './SpecialsList';
import { BaseHeading } from '../BaseHeading';
import styles from './specialsListContainer.scss';
import { BaseRoundButton } from '../BaseRoundButton';

export function SpecialsListContainer() {
  const { specials, loading } = useSpecialsData();
  const [loadingList, setLoadingList] = useState<Array<string>>(Array(3).fill(1));

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  useEffect(() => {
    if (window.innerWidth < 1024) {
      setLoadingList(Array(2).fill(1));
    }

    if (window.innerWidth < 685) {
      setLoadingList(Array(1).fill(1));
    }
  }, []);

  return (
    <>
      {!loading ? (
        <div className={className}>
          <BaseHeading textContent="Специальные предложения" />
          <div className={styles.buttons}>
            <BaseRoundButton isLeft={true} id="special-prev" />
            <BaseRoundButton id="special-next" />
          </div>
          <SpecialsList list={specials} />
        </div>
      ) : (
        <div className={className}>
          <BaseHeading textContent="Специальные предложения" />
          <ul className={styles.skeletonList}>
            {loadingList.map((item, index) => (
              <li className={styles.item} key={index}>
                <div className={styles.item_preview}></div>
                <div className={styles.item_title}></div>
                <div className={styles.item_price}></div>
                <div className={styles.item_button}></div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
