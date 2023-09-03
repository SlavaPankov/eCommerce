import React from 'react';
import styles from './productDescription.scss';

interface IProductDescriptionProps {
  description: string;
}

export function ProductDescription({ description }: IProductDescriptionProps) {
  return <>{description && <div className={styles.description}>{description}</div>}</>;
}
