import React from 'react';
import { Attribute } from '@commercetools/platform-sdk';
import styles from './productCharacteristics.scss';

interface IProductCharacteristicsProps {
  characteristics: Array<Attribute>;
}

export function ProductCharacteristics({ characteristics }: IProductCharacteristicsProps) {
  return (
    <ul className={styles.list}>
      {characteristics.map(({ name, value }, index) => (
        <li key={index} className={styles.item}>
          <span className={styles.name}>{name}</span>
          {typeof value !== 'object' ? (
            <span className={styles.value}>{value}</span>
          ) : (
            <span className={styles.value}>{value.label}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
