import React from 'react';
import styles from './baseHeading.scss';

interface IBaseHeadingProps {
  textContent: string;
}

export function BaseHeading({ textContent }: IBaseHeadingProps) {
  return <h2 className={styles.heading}>{textContent}</h2>;
}
