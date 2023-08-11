import React from 'react';
import classNames from 'classnames';
import { useSpecialsData } from '../../hooks/useSpecialsData';
import { SpecialsList } from './SpecialsList';
import { BaseHeading } from '../BaseHeading';
import styles from './specialsListContainer.scss';
import { BaseRoundButton } from '../BaseRoundButton';

export function SpecialsListContainer() {
  const { specials } = useSpecialsData();

  const className = classNames('container', {
    [`${styles.container}`]: true
  });

  return (
    <>
      {specials.length > 0 ? (
        <div className={className}>
          <BaseHeading textContent="Специальные предложения" />
          <div className={styles.buttons}>
            <BaseRoundButton isLeft={true} id="special-prev" />
            <BaseRoundButton id="special-next" />
          </div>
          <SpecialsList list={specials} />
        </div>
      ) : null}
    </>
  );
}
