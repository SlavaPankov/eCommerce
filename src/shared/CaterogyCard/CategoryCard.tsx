import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ISubcategory } from '../../types/interfaces/ISubcategory';
import { BaseRoundButton } from '../BaseRoundButton';
import styles from './categoryCard.scss';

interface ICategoryCardProps {
  name: string;
  imageSrc: string;
  subcategories: Array<ISubcategory>;
}

export function CategoryCard({ name, imageSrc, subcategories }: ICategoryCardProps) {
  const listClassName = classNames('list-reset', {
    [`${styles.list}`]: true
  });

  return (
    <article className={styles.card}>
      <ul className={listClassName}>
        {subcategories.map((subcategory) => (
          <li className={styles.item} key={subcategory.id}>
            <Link className={styles.subLink} to="#">
              <span>{subcategory.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <Link className={styles.headingLink} to="#">
        <h2 className={styles.heading}>
          <span>{name}</span>
        </h2>
      </Link>
      <img className={styles.image} src={imageSrc} alt={name} />
      <Link to="#" className={styles.catalogLink}>
        <span>В каталог</span>
        <BaseRoundButton />
      </Link>
    </article>
  );
}
